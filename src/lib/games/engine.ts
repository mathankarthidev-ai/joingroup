/**
 * PLAYZONE – Client-Side Game Engine, Storage, Audio & Anti-Cheat Validation
 * Zero continuous server traffic • LocalStorage personal records • Web Audio SFX
 */

import { GameDifficulty, GameMetadata, PLAYZONE_GAMES } from './catalog';

export interface GameResult {
  gameSlug: string;
  difficulty: GameDifficulty;
  rawScore: number;
  timeMs: number;
  accuracy: number; // 0 - 100
  moves?: number;
  timestamp: number;
  sessionToken: string;
}

export interface PersonalRecord {
  gameSlug: string;
  difficulty: GameDifficulty;
  bestScore: number;
  bestTimeMs: number;
  gamesPlayed: number;
  lastPlayed: number;
}

export interface PlayerStats {
  totalPoints: number;
  gamesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string; // YYYY-MM-DD
  achievements: string[];
}

const STORAGE_KEYS = {
  RECORDS: 'playzone_records_v1',
  STATS: 'playzone_stats_v1',
  SOUND_ENABLED: 'playzone_sound_v1',
  GUEST_ID: 'playzone_guest_id_v1',
};

// ==========================================
// 1. Procedural Web Audio Synthesizer (0 KB)
// ==========================================
class PlayZoneAudio {
  private ctx: AudioContext | null = null;
  public enabled = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
      this.enabled = saved !== 'false';
    }
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(this.enabled));
    }
    return this.enabled;
  }

  public playTone(freq: number, type: OscillatorType = 'sine', durationSec = 0.12, gain = 0.15) {
    if (!this.enabled || typeof window === 'undefined') return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const amp = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      amp.gain.setValueAtTime(gain, this.ctx.currentTime);
      amp.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);
      osc.connect(amp);
      amp.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + durationSec);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public tap() {
    this.playTone(480, 'triangle', 0.05, 0.1);
  }

  public correct() {
    this.playTone(587.33, 'sine', 0.08, 0.15);
    setTimeout(() => this.playTone(880, 'sine', 0.12, 0.15), 80);
  }

  public wrong() {
    this.playTone(180, 'sawtooth', 0.18, 0.2);
  }

  public win() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.18, 0.2), i * 90);
    });
  }

  public gameOver() {
    const notes = [400, 350, 300, 240];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sawtooth', 0.2, 0.18), i * 110);
    });
  }
}

export const playzoneAudio = new PlayZoneAudio();

// ==========================================
// 2. Personal Records & Stats Store
// ==========================================
export function getStoredRecords(): Record<string, PersonalRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getPlayerStats(): PlayerStats {
  if (typeof window === 'undefined') {
    return {
      totalPoints: 0,
      gamesCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: '',
      achievements: [],
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return {
    totalPoints: 0,
    gamesCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '',
    achievements: [],
  };
}

export function getGuestId(): string {
  if (typeof window === 'undefined') return 'guest-ssr';
  let id = localStorage.getItem(STORAGE_KEYS.GUEST_ID);
  if (!id) {
    id = `guest_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.GUEST_ID, id);
  }
  return id;
}

// ==========================================
// 3. Central Scoring & Anti-Cheat Validation
// ==========================================
export interface ScoreValidationResult {
  isValid: boolean;
  pointsEarned: number;
  isNewPersonalBest: boolean;
  reason?: string;
}

export function calculatePointsForSession(
  difficulty: GameDifficulty,
  isDaily: boolean,
  isPersonalBest: boolean,
  perfectAccuracy: boolean
): number {
  let pts = 10;
  if (difficulty === 'medium') pts = 20;
  else if (difficulty === 'hard') pts = 35;
  else if (difficulty === 'expert') pts = 50;

  if (isDaily) pts += 25;
  if (isPersonalBest) pts += 10;
  if (perfectAccuracy) pts += 15;

  return pts;
}

export function validateAndRecordScore(result: GameResult): ScoreValidationResult {
  const game = PLAYZONE_GAMES.find((g) => g.slug === result.gameSlug);
  if (!game) {
    return { isValid: false, pointsEarned: 0, isNewPersonalBest: false, reason: 'Unknown game' };
  }

  // Anti-cheat rule 1: Minimum plausible duration check
  if (game.minPlausibleTimeMs && result.timeMs < game.minPlausibleTimeMs) {
    return {
      isValid: false,
      pointsEarned: 0,
      isNewPersonalBest: false,
      reason: `Completion time ${result.timeMs}ms is below human physiological threshold (${game.minPlausibleTimeMs}ms).`,
    };
  }

  // Anti-cheat rule 2: Plausible score boundary check
  if (game.maxPlausibleScore !== undefined && result.rawScore > game.maxPlausibleScore) {
    return {
      isValid: false,
      pointsEarned: 0,
      isNewPersonalBest: false,
      reason: `Score exceeds verified computational limit.`,
    };
  }

  if (typeof window === 'undefined') {
    return { isValid: true, pointsEarned: 10, isNewPersonalBest: false };
  }

  const recordKey = `${result.gameSlug}__${result.difficulty}`;
  const records = getStoredRecords();
  const currentRecord = records[recordKey];

  let isNewPersonalBest = false;
  if (!currentRecord) {
    isNewPersonalBest = true;
  } else {
    if (game.higherIsBetter) {
      if (result.rawScore > currentRecord.bestScore) isNewPersonalBest = true;
    } else {
      if (result.timeMs < currentRecord.bestTimeMs) isNewPersonalBest = true;
    }
  }

  // Update records
  records[recordKey] = {
    gameSlug: result.gameSlug,
    difficulty: result.difficulty,
    bestScore: isNewPersonalBest ? result.rawScore : currentRecord?.bestScore ?? result.rawScore,
    bestTimeMs: isNewPersonalBest ? result.timeMs : currentRecord?.bestTimeMs ?? result.timeMs,
    gamesPlayed: (currentRecord?.gamesPlayed ?? 0) + 1,
    lastPlayed: Date.now(),
  };
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));

  // Update player stats & streak
  const stats = getPlayerStats();
  const todayUtc = new Date().toISOString().split('T')[0];

  if (stats.lastPlayedDate !== todayUtc) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (stats.lastPlayedDate === yesterday) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }
    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    stats.lastPlayedDate = todayUtc;
  }

  const pointsEarned = calculatePointsForSession(
    result.difficulty,
    Boolean(game.dailyChallenge),
    isNewPersonalBest,
    result.accuracy === 100
  );

  stats.totalPoints += pointsEarned;
  stats.gamesCompleted += 1;

  // Milestone achievements
  if (stats.gamesCompleted === 1 && !stats.achievements.includes('first_game')) {
    stats.achievements.push('first_game');
  }
  if (stats.currentStreak >= 7 && !stats.achievements.includes('streak_7')) {
    stats.achievements.push('streak_7');
  }
  if (result.accuracy === 100 && !stats.achievements.includes('perfect_score')) {
    stats.achievements.push('perfect_score');
  }

  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));

  return {
    isValid: true,
    pointsEarned,
    isNewPersonalBest,
  };
}

// Generate unique session token for anti-replay
export function createSessionToken(gameSlug: string): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 8);
  return `pz_${gameSlug}_${ts}_${rand}`;
}
