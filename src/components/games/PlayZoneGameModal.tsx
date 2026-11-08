'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Timer,
  Zap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Hash,
  ListOrdered,
  Check,
  Flame,
} from 'lucide-react';
import { GameDifficulty, GameMetadata, PLAYZONE_GAMES } from '@/lib/games/catalog';
import {
  playzoneAudio,
  validateAndRecordScore,
  createSessionToken,
  getStoredRecords,
  PersonalRecord,
} from '@/lib/games/engine';

interface PlayZoneGameModalProps {
  game: GameMetadata | null;
  onClose: () => void;
  onSelectGame?: (game: GameMetadata) => void;
}

export const PlayZoneGameModal: React.FC<PlayZoneGameModalProps> = ({ game, onClose, onSelectGame }) => {
  const [difficulty, setDifficulty] = useState<GameDifficulty>('medium');
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [soundOn, setSoundOn] = useState(playzoneAudio.enabled);
  const [personalBest, setPersonalBest] = useState<PersonalRecord | null>(null);
  const [completionResult, setCompletionResult] = useState<{
    pointsEarned: number;
    isNewPersonalBest: boolean;
  } | null>(null);

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTokenRef = useRef<string>('');

  // Specific Game State
  // 1. Reaction Test State
  const [reactionStage, setReactionStage] = useState<'wait' | 'ready' | 'flash' | 'early' | 'done'>('wait');
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 2. Chimp Memory State
  const [chimpTiles, setChimpTiles] = useState<Array<{ id: number; num: number; x: number; y: number; hidden: boolean; cleared: boolean }>>([]);
  const [chimpCurrentTarget, setChimpCurrentTarget] = useState(1);
  const [chimpLevel, setChimpLevel] = useState(4);

  // 3. Memory Match State
  const [memoryCards, setMemoryCards] = useState<Array<{ id: number; symbol: string; flipped: boolean; matched: boolean }>>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // 4. Stroop / Color Reflex State
  const [stroopWord, setStroopWord] = useState('');
  const [stroopColor, setStroopColor] = useState('');
  const [stroopTimer, setStroopTimer] = useState(30);

  // 5. Mental Math Sprint State (+ - × ÷ %)
  const [mathProblem, setMathProblem] = useState<{ q: string; a: number; options: number[]; opLabel?: string }>({ q: '', a: 0, options: [] });
  const [mathTimer, setMathTimer] = useState(60);
  const [mathOpMode, setMathOpMode] = useState<'all' | '+' | '-' | '×' | '÷' | '%'>('all');
  const [mathStreak, setMathStreak] = useState(0);

  // 6. Odd One Out State
  const [oddGrid, setOddGrid] = useState<{ symbols: string[]; oddIndex: number }>({ symbols: [], oddIndex: 0 });

  // 7. Word Guess (Wordle style) State
  const [wordTarget, setWordTarget] = useState('SMART');
  const [wordGuesses, setWordGuesses] = useState<string[]>([]);
  const [wordCurrentInput, setWordCurrentInput] = useState('');

  // 8. 2048 Tile Merger State (Multi-level: 3x3, 4x4, 5x5)
  const [gridSize2048, setGridSize2048] = useState<3 | 4 | 5>(4);
  const [grid2048, setGrid2048] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [highestTile2048, setHighestTile2048] = useState(2);
  const [won2048, setWon2048] = useState(false);
  const [gameOver2048, setGameOver2048] = useState(false);
  const touchStartRef2048 = useRef<{ x: number; y: number } | null>(null);

  // 9. Count Numbers State (60s Sprint)
  const [countNumbersData, setCountNumbersData] = useState<{
    targetNum: number;
    numbers: number[];
    actualCount: number;
    options: number[];
  }>({ targetNum: 7, numbers: [], actualCount: 0, options: [] });
  const [countNumbersStreak, setCountNumbersStreak] = useState(0);

  // 10. Count Cat State (60s Sprint)
  const [countCatData, setCountCatData] = useState<{
    animals: string[];
    catCount: number;
    options: number[];
    targetAnimal: string;
    targetName: string;
  }>({ animals: [], catCount: 0, options: [], targetAnimal: '🐱', targetName: 'Cats' });
  const [countCatStreak, setCountCatStreak] = useState(0);

  // 11. Count Serial Numbers State (60s Sprint)
  const [serialGrid, setSerialGrid] = useState<Array<{ num: number; tapped: boolean }>>([]);
  const [serialTarget, setSerialTarget] = useState(1);
  const [serialRangeMax, setSerialRangeMax] = useState(16);
  const [serialBoardsCleared, setSerialBoardsCleared] = useState(0);

  // Load personal best
  const loadPB = useCallback(() => {
    if (!game) return;
    const records = getStoredRecords();
    const pb = records[`${game.slug}__${difficulty}`];
    setPersonalBest(pb || null);
  }, [game, difficulty]);

  useEffect(() => {
    loadPB();
  }, [loadPB]);

  // Stop timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    };
  }, []);

  if (!game) return null;

  // Toggle audio
  const handleToggleAudio = () => {
    const next = playzoneAudio.toggleSound();
    setSoundOn(next);
  };

  // Start Game Handler
  const handleStartGame = () => {
    setGameState('playing');
    setScore(0);
    setMoves(0);
    setElapsedMs(0);
    setCompletionResult(null);
    sessionTokenRef.current = createSessionToken(game.slug);
    startTimeRef.current = Date.now();

    playzoneAudio.tap();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current);
    }, 100);

    // Init specific game logic
    if (game.slug === 'reaction-time-test') {
      startReactionRound();
    } else if (game.slug === 'chimp-memory') {
      initChimpLevel(difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : difficulty === 'hard' ? 8 : 10);
    } else if (game.slug === 'memory-tile-match') {
      initMemoryMatch(difficulty);
    } else if (game.slug === 'color-reflex') {
      initStroopRound();
      setStroopTimer(30);
    } else if (game.slug === 'mental-math-sprint') {
      initMathProblem();
      setMathTimer(60);
    } else if (game.slug === 'odd-one-out') {
      initOddOneOut();
    } else if (game.slug === 'word-guess') {
      initWordGuess();
    } else if (game.slug === '2048') {
      const initialSize: 3 | 4 | 5 = difficulty === 'easy' ? 5 : difficulty === 'hard' || difficulty === 'expert' ? 3 : 4;
      setGridSize2048(initialSize);
      init2048(initialSize);
    } else if (game.slug === 'count-numbers') {
      initCountNumbers();
      setCountNumbersStreak(0);
    } else if (game.slug === 'count-cat') {
      initCountCat();
      setCountCatStreak(0);
    } else if (game.slug === 'count-serial-numbers') {
      initCountSerialNumbers(1, 16);
      setSerialBoardsCleared(0);
    }
  };

  // Game Over and Score Submission
  const finishGame = (finalScore: number, accuracy = 100) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const finalTime = Date.now() - startTimeRef.current;
    setElapsedMs(finalTime);
    setGameState('gameover');

    const result = validateAndRecordScore({
      gameSlug: game.slug,
      difficulty,
      rawScore: finalScore,
      timeMs: finalTime,
      accuracy,
      moves,
      timestamp: Date.now(),
      sessionToken: sessionTokenRef.current,
    });

    if (result.isValid) {
      playzoneAudio.win();
      setCompletionResult({
        pointsEarned: result.pointsEarned,
        isNewPersonalBest: result.isNewPersonalBest,
      });
      loadPB();
    } else {
      playzoneAudio.gameOver();
    }
  };

  // 60-Second Countdown Monitor for Sprint Games
  useEffect(() => {
    if (gameState !== 'playing' || !game) return;
    const is60sSprint = [
      'mental-math-sprint',
      'count-numbers',
      'count-cat',
      'count-serial-numbers',
    ].includes(game.slug);

    if (is60sSprint) {
      const remainingSec = 60 - Math.floor(elapsedMs / 1000);
      if (remainingSec <= 0) {
        playzoneAudio.gameOver();
        finishGame(score, 100);
      }
    }
  }, [elapsedMs, gameState, game, score]);

  // ==========================================
  // GAME IMPLEMENTATION 1: Reaction Time Test
  // ==========================================
  const startReactionRound = () => {
    setReactionStage('wait');
    const delay = Math.floor(Math.random() * 2500) + 1500; // 1.5 - 4.0s
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      setReactionStage('flash');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionStage === 'wait') {
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      setReactionStage('early');
      playzoneAudio.wrong();
    } else if (reactionStage === 'flash') {
      const ms = Date.now() - startTimeRef.current;
      setScore(ms);
      setReactionStage('done');
      playzoneAudio.correct();
      finishGame(ms, 100);
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 2: Chimp Memory Test
  // ==========================================
  const initChimpLevel = (count: number) => {
    setChimpCurrentTarget(1);
    const cells: Array<{ x: number; y: number }> = [];
    while (cells.length < count) {
      const x = Math.floor(Math.random() * 5);
      const y = Math.floor(Math.random() * 5);
      if (!cells.some((c) => c.x === x && c.y === y)) {
        cells.push({ x, y });
      }
    }
    const tiles = cells.map((c, i) => ({
      id: i + 1,
      num: i + 1,
      x: c.x,
      y: c.y,
      hidden: false,
      cleared: false,
    }));
    setChimpTiles(tiles);
  };

  const handleChimpClick = (num: number) => {
    if (num === chimpCurrentTarget) {
      playzoneAudio.tap();
      const nextTarget = num + 1;
      const updated = chimpTiles.map((t) => {
        if (t.num === num) return { ...t, cleared: true };
        return { ...t, hidden: true };
      });
      setChimpTiles(updated);
      setChimpCurrentTarget(nextTarget);

      if (num === chimpTiles.length) {
        // Level complete!
        playzoneAudio.correct();
        const nextCount = chimpTiles.length + 1;
        setScore((prev) => prev + chimpTiles.length * 10);
        if (nextCount > 12) {
          finishGame(score + 150, 100);
        } else {
          setChimpLevel(nextCount);
          initChimpLevel(nextCount);
        }
      }
    } else {
      // Wrong tap
      playzoneAudio.wrong();
      finishGame(score, 80);
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 3: Memory Tile Match
  // ==========================================
  const initMemoryMatch = (diff: GameDifficulty) => {
    const symbols = ['⚡', '💎', '🔥', '🚀', '🌟', '🎯', '🍎', '🧩', '🏆', '🎨', '🎲', '🧠'];
    const pairCount = diff === 'easy' ? 4 : diff === 'medium' ? 6 : diff === 'hard' ? 8 : 12;
    const selected = symbols.slice(0, pairCount);
    const deck = [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map((sym, idx) => ({
        id: idx,
        symbol: sym,
        flipped: false,
        matched: false,
      }));
    setMemoryCards(deck);
    setSelectedCards([]);
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length >= 2) return;
    const card = memoryCards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    playzoneAudio.tap();
    const nextFlipped = memoryCards.map((c) => (c.id === cardId ? { ...c, flipped: true } : c));
    setMemoryCards(nextFlipped);

    const nextSelected = [...selectedCards, cardId];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = nextSelected;
      const card1 = memoryCards.find((c) => c.id === firstId);
      const card2 = memoryCards.find((c) => c.id === secondId);

      if (card1 && card2 && card1.symbol === card2.symbol) {
        playzoneAudio.correct();
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c))
          );
          setSelectedCards([]);
          // Check win
          const remaining = nextFlipped.filter((c) => !c.matched && c.id !== firstId && c.id !== secondId);
          if (remaining.length === 0) {
            finishGame(1000 - moves * 15, 100);
          }
        }, 300);
      } else {
        playzoneAudio.wrong();
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c))
          );
          setSelectedCards([]);
        }, 700);
      }
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 4: Stroop / Color Reflex
  // ==========================================
  const initStroopRound = () => {
    const colors = [
      { name: 'RED', hex: '#ef4444' },
      { name: 'BLUE', hex: '#3b82f6' },
      { name: 'GREEN', hex: '#10b981' },
      { name: 'YELLOW', hex: '#f59e0b' },
      { name: 'PURPLE', hex: '#8b5cf6' },
    ];
    const wordItem = colors[Math.floor(Math.random() * colors.length)];
    // 50% chance match, 50% mismatch
    const isMatch = Math.random() > 0.5;
    const colorItem = isMatch
      ? wordItem
      : colors.filter((c) => c.name !== wordItem.name)[Math.floor(Math.random() * (colors.length - 1))];

    setStroopWord(wordItem.name);
    setStroopColor(colorItem.hex);
  };

  const handleStroopAnswer = (userSaysMatch: boolean) => {
    const colorNamesMap: Record<string, string> = {
      '#ef4444': 'RED',
      '#3b82f6': 'BLUE',
      '#10b981': 'GREEN',
      '#f59e0b': 'YELLOW',
      '#8b5cf6': 'PURPLE',
    };
    const actualMatches = colorNamesMap[stroopColor] === stroopWord;

    if (userSaysMatch === actualMatches) {
      playzoneAudio.correct();
      setScore((s) => s + 10);
    } else {
      playzoneAudio.wrong();
      setScore((s) => Math.max(0, s - 5));
    }
    initStroopRound();
  };

  // ==========================================
  // GAME IMPLEMENTATION 5: Mental Math Sprint
  // ==========================================
  // GAME IMPLEMENTATION 5: Mental Math Sprint (+ - × ÷ %)
  // ==========================================
  const initMathProblem = (opModeOverride?: 'all' | '+' | '-' | '×' | '÷' | '%') => {
    const activeMode = opModeOverride || mathOpMode;
    const ops = activeMode === 'all' ? ['+', '-', '×', '÷', '%'] : [activeMode];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let q = '';
    let a = 0;
    let opLabel = '';

    if (op === '+') {
      opLabel = 'Addition (+)';
      const n1 = Math.floor(Math.random() * 45) + 5;
      const n2 = Math.floor(Math.random() * 45) + 5;
      a = n1 + n2;
      q = `${n1} + ${n2} = ?`;
    } else if (op === '-') {
      opLabel = 'Subtraction (−)';
      const n1 = Math.floor(Math.random() * 60) + 20;
      const n2 = Math.floor(Math.random() * (n1 - 5)) + 5;
      a = n1 - n2;
      q = `${n1} − ${n2} = ?`;
    } else if (op === '×') {
      opLabel = 'Multiplication (×)';
      const n1 = Math.floor(Math.random() * 12) + 2;
      const n2 = Math.floor(Math.random() * 12) + 2;
      a = n1 * n2;
      q = `${n1} × ${n2} = ?`;
    } else if (op === '÷') {
      opLabel = 'Division (÷)';
      const divisor = Math.floor(Math.random() * 10) + 2;
      const quotient = Math.floor(Math.random() * 12) + 2;
      const dividend = divisor * quotient;
      a = quotient;
      q = `${dividend} ÷ ${divisor} = ?`;
    } else {
      // op === '%' Percentage Calculation
      opLabel = 'Percentage (%)';
      const pcts = [10, 20, 25, 50, 75, 5, 40];
      const pct = pcts[Math.floor(Math.random() * pcts.length)];
      const bases = [40, 60, 80, 100, 120, 140, 150, 160, 200, 240, 300, 400, 500].filter(
        (b) => (b * pct) % 100 === 0
      );
      const base = bases[Math.floor(Math.random() * bases.length)] || 100;
      a = Math.round((base * pct) / 100);
      q = `${pct}% of ${base} = ?`;
    }

    // Generate unique believable wrong answers
    const wrongAnswers = new Set<number>();
    const candidateOffsets = [
      Math.random() > 0.5 ? 2 : -2,
      Math.random() > 0.5 ? 5 : -5,
      Math.random() > 0.5 ? 10 : -10,
      Math.random() > 0.5 ? 1 : -1,
      Math.random() > 0.5 ? 3 : -3,
    ];
    for (const off of candidateOffsets) {
      const candidate = a + off;
      if (candidate > 0 && candidate !== a) {
        wrongAnswers.add(candidate);
      }
      if (wrongAnswers.size === 3) break;
    }
    while (wrongAnswers.size < 3) {
      const randOffset = (Math.floor(Math.random() * 15) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const cand = Math.max(1, a + randOffset);
      if (cand !== a) wrongAnswers.add(cand);
    }

    const options = [a, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);

    setMathProblem({ q, a, options, opLabel });
  };

  const handleMathChoice = (chosen: number) => {
    if (chosen === mathProblem.a) {
      playzoneAudio.correct();
      const newStreak = mathStreak + 1;
      setMathStreak(newStreak);
      const streakBonus = newStreak > 3 ? 10 : newStreak > 1 ? 5 : 0;
      setScore((s) => s + 20 + streakBonus);
      initMathProblem();
    } else {
      playzoneAudio.wrong();
      setMathStreak(0);
      setScore((s) => Math.max(0, s - 10));
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 6: Odd One Out
  // ==========================================
  const initOddOneOut = () => {
    const pairs = [
      { normal: '▲', odd: '▼' },
      { normal: '●', odd: '◐' },
      { normal: '★', odd: '☆' },
      { normal: '◆', odd: '◇' },
      { normal: '✚', odd: '✖' },
    ];
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const size = difficulty === 'easy' ? 9 : difficulty === 'medium' ? 16 : 25;
    const oddIdx = Math.floor(Math.random() * size);
    const symbols = Array.from({ length: size }, (_, i) => (i === oddIdx ? pair.odd : pair.normal));
    setOddGrid({ symbols, oddIndex: oddIdx });
  };

  const handleOddTileClick = (index: number) => {
    if (index === oddGrid.oddIndex) {
      playzoneAudio.correct();
      setScore((s) => s + 15);
      initOddOneOut();
    } else {
      playzoneAudio.wrong();
      setScore((s) => Math.max(0, s - 10));
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 7: Word Guess (Wordle Style)
  // ==========================================
  const initWordGuess = () => {
    const words = ['SMART', 'BRAIN', 'LOGIC', 'FOCUS', 'POWER', 'SPEED', 'LEARN', 'CHAMP', 'SKILL', 'SOLVE'];
    setWordTarget(words[Math.floor(Math.random() * words.length)]);
    setWordGuesses([]);
    setWordCurrentInput('');
  };

  const handleWordSubmit = () => {
    if (wordCurrentInput.length !== 5) return;
    const guess = wordCurrentInput.toUpperCase();
    const nextGuesses = [...wordGuesses, guess];
    setWordGuesses(nextGuesses);
    setWordCurrentInput('');

    if (guess === wordTarget) {
      playzoneAudio.win();
      finishGame(100 - (nextGuesses.length - 1) * 15, 100);
    } else if (nextGuesses.length >= 6) {
      playzoneAudio.gameOver();
      finishGame(10, 50);
    } else {
      playzoneAudio.tap();
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 8: 2048 TILE MERGER
  // Multi-level Grid Support: 3x3 (Hard), 4x4 (Classic), 5x5 (Master)
  // ==========================================
  const createEmpty2048Grid = (size: number): number[][] => {
    return Array.from({ length: size }, () => Array(size).fill(0));
  };

  const addRandomTile2048 = (grid: number[][], size: number): boolean => {
    const empty: [number, number][] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 0) empty.push([r, c]);
      }
    }
    if (empty.length === 0) return false;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return true;
  };

  const init2048 = (size: 3 | 4 | 5 = gridSize2048) => {
    const newGrid = createEmpty2048Grid(size);
    addRandomTile2048(newGrid, size);
    addRandomTile2048(newGrid, size);
    setGrid2048(newGrid);
    setScore(0);
    setMoves(0);
    setWon2048(false);
    setGameOver2048(false);
    setHighestTile2048(Math.max(...newGrid.flat(), 2));
  };

  const slideRowLeft2048 = (row: number[], size: number) => {
    const nonZero = row.filter((v) => v !== 0);
    const merged: number[] = [];
    let gain = 0;
    for (let i = 0; i < nonZero.length; i++) {
      if (i < nonZero.length - 1 && nonZero[i] === nonZero[i + 1]) {
        const val = nonZero[i] * 2;
        merged.push(val);
        gain += val;
        i++; // skip combined neighbor
      } else {
        merged.push(nonZero[i]);
      }
    }
    while (merged.length < size) {
      merged.push(0);
    }
    return { newRow: merged, gain };
  };

  const checkGameOver2048 = (grid: number[][], size: number): boolean => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 0) return false;
        if (r + 1 < size && grid[r][c] === grid[r + 1][c]) return false;
        if (c + 1 < size && grid[r][c] === grid[r][c + 1]) return false;
      }
    }
    return true;
  };

  const move2048 = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver2048) return;
    const size = gridSize2048;
    let working = grid2048.map((row) => [...row]);
    let totalGain = 0;

    // 1. Orient to Left
    if (direction === 'right') {
      working = working.map((row) => row.reverse());
    } else if (direction === 'up') {
      const transposed = createEmpty2048Grid(size);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          transposed[c][r] = working[r][c];
        }
      }
      working = transposed;
    } else if (direction === 'down') {
      const transposed = createEmpty2048Grid(size);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          transposed[c][r] = working[r][c];
        }
      }
      working = transposed.map((row) => row.reverse());
    }

    // 2. Slide and merge
    let moved = false;
    for (let r = 0; r < size; r++) {
      const original = [...working[r]];
      const { newRow, gain } = slideRowLeft2048(working[r], size);
      working[r] = newRow;
      totalGain += gain;
      if (original.some((val, idx) => val !== newRow[idx])) {
        moved = true;
      }
    }

    // 3. Revert orientation back to original
    if (direction === 'right') {
      working = working.map((row) => row.reverse());
    } else if (direction === 'up') {
      const transposed = createEmpty2048Grid(size);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          transposed[c][r] = working[r][c];
        }
      }
      working = transposed;
    } else if (direction === 'down') {
      const reversed = working.map((row) => row.reverse());
      const transposed = createEmpty2048Grid(size);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          transposed[c][r] = reversed[r][c];
        }
      }
      working = transposed;
    }

    if (!moved) return;

    // 4. Add random tile on valid move
    addRandomTile2048(working, size);
    playzoneAudio.tap();

    const maxVal = Math.max(...working.flat());
    setHighestTile2048(maxVal);

    setMoves((m) => m + 1);
    setScore((s) => s + totalGain);
    setGrid2048(working);

    if (maxVal >= 2048 && !won2048) {
      setWon2048(true);
      playzoneAudio.win();
    }

    if (checkGameOver2048(working, size)) {
      setGameOver2048(true);
      playzoneAudio.gameOver();
      finishGame(score + totalGain, 100);
    }
  };

  // Keyboard controls for 2048
  useEffect(() => {
    if (!game || game.slug !== '2048' || gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        move2048('up');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        move2048('down');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        move2048('left');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        move2048('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [game, gameState, grid2048, gameOver2048, gridSize2048, score, won2048]);

  // Touch swipe support for 2048
  const handleTouchStart2048 = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef2048.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd2048 = (e: React.TouchEvent) => {
    if (!touchStartRef2048.current || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef2048.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef2048.current.y;
    const minDistance = 25;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minDistance) {
        if (deltaX > 0) move2048('right');
        else move2048('left');
      }
    } else {
      if (Math.abs(deltaY) > minDistance) {
        if (deltaY > 0) move2048('down');
        else move2048('up');
      }
    }
    touchStartRef2048.current = null;
  };

  const get2048TileClass = (val: number) => {
    switch (val) {
      case 0:
        return 'bg-[#cdc1b4]/40 dark:bg-[#9e8f7f]/25 text-transparent';
      case 2:
        return 'bg-[#eee4da] text-[#776e65] shadow-xs';
      case 4:
        return 'bg-[#ede0c8] text-[#776e65] shadow-xs';
      case 8:
        return 'bg-[#f2b179] text-[#f9f6f2] shadow-sm font-black';
      case 16:
        return 'bg-[#f59563] text-[#f9f6f2] shadow-sm font-black';
      case 32:
        return 'bg-[#f67c5f] text-[#f9f6f2] shadow-md font-black';
      case 64:
        return 'bg-[#f65e3b] text-[#f9f6f2] shadow-md font-black';
      case 128:
        return 'bg-[#edcf72] text-[#f9f6f2] shadow-[0_0_12px_rgba(237,207,114,0.6)] font-black';
      case 256:
        return 'bg-[#edcc61] text-[#f9f6f2] shadow-[0_0_15px_rgba(237,204,97,0.7)] font-black';
      case 512:
        return 'bg-[#edc850] text-[#f9f6f2] shadow-[0_0_18px_rgba(237,200,80,0.8)] font-black';
      case 1024:
        return 'bg-[#edc53f] text-[#f9f6f2] shadow-[0_0_20px_rgba(237,197,63,0.85)] font-black';
      case 2048:
        return 'bg-[#edc22e] text-[#f9f6f2] shadow-[0_0_25px_rgba(237,194,46,0.95)] font-black animate-pulse';
      default:
        return 'bg-[#3c3a32] text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.9)] font-black border-2 border-amber-400';
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 9: Count Numbers (60s)
  // ==========================================
  const initCountNumbers = () => {
    const target = Math.floor(Math.random() * 9) + 1;
    const total = 20;
    const count = Math.floor(Math.random() * 5) + 3; // 3 to 7 target digits
    const targetArr = Array(count).fill(target);
    const fillerArr: number[] = [];
    while (fillerArr.length < total - count) {
      const rand = Math.floor(Math.random() * 9) + 1;
      if (rand !== target) fillerArr.push(rand);
    }
    const numbers = [...targetArr, ...fillerArr].sort(() => Math.random() - 0.5);

    const wrong = new Set<number>();
    const offsets = [1, -1, 2, -2, 3, -3];
    for (const off of offsets) {
      const cand = count + off;
      if (cand > 0 && cand !== count) wrong.add(cand);
      if (wrong.size === 3) break;
    }
    while (wrong.size < 3) {
      const randOffset = Math.floor(Math.random() * 6) + 1;
      const cand = Math.max(1, count + (Math.random() > 0.5 ? randOffset : -randOffset));
      if (cand !== count) wrong.add(cand);
    }
    const options = [count, ...Array.from(wrong)].sort(() => Math.random() - 0.5);

    setCountNumbersData({
      targetNum: target,
      numbers,
      actualCount: count,
      options,
    });
  };

  const handleCountNumbersChoice = (choice: number) => {
    if (choice === countNumbersData.actualCount) {
      playzoneAudio.correct();
      const nextStreak = countNumbersStreak + 1;
      setCountNumbersStreak(nextStreak);
      const streakBonus = nextStreak > 3 ? 30 : nextStreak > 1 ? 15 : 0;
      setScore((s) => s + 100 + streakBonus);
      initCountNumbers();
    } else {
      playzoneAudio.wrong();
      setCountNumbersStreak(0);
      setScore((s) => Math.max(0, s - 30));
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 10: Count Cat (60s)
  // ==========================================
  const initCountCat = () => {
    const targetEmoji = '🐱';
    const targetName = 'Cats';
    const otherAnimals = ['🐶', '🐰', '🦊', '🐼', '🐻', '🦁', '🐸', '🐵', '🐨', '🦄', '🐯', '🐮'];
    const total = 20;
    const catCount = Math.floor(Math.random() * 6) + 3; // 3 to 8 cats
    const cats = Array(catCount).fill(targetEmoji);
    const others: string[] = [];
    while (others.length < total - catCount) {
      const rand = otherAnimals[Math.floor(Math.random() * otherAnimals.length)];
      others.push(rand);
    }
    const animals = [...cats, ...others].sort(() => Math.random() - 0.5);

    const wrong = new Set<number>();
    const offsets = [1, -1, 2, -2, 3, -3];
    for (const off of offsets) {
      const cand = catCount + off;
      if (cand > 0 && cand !== catCount) wrong.add(cand);
      if (wrong.size === 3) break;
    }
    while (wrong.size < 3) {
      const randOffset = Math.floor(Math.random() * 5) + 1;
      const cand = Math.max(1, catCount + (Math.random() > 0.5 ? randOffset : -randOffset));
      if (cand !== catCount) wrong.add(cand);
    }
    const options = [catCount, ...Array.from(wrong)].sort(() => Math.random() - 0.5);

    setCountCatData({
      animals,
      catCount,
      options,
      targetAnimal: targetEmoji,
      targetName,
    });
  };

  const handleCountCatChoice = (choice: number) => {
    if (choice === countCatData.catCount) {
      playzoneAudio.correct();
      const nextStreak = countCatStreak + 1;
      setCountCatStreak(nextStreak);
      const streakBonus = nextStreak > 3 ? 35 : nextStreak > 1 ? 20 : 0;
      setScore((s) => s + 100 + streakBonus);
      initCountCat();
    } else {
      playzoneAudio.wrong();
      setCountCatStreak(0);
      setScore((s) => Math.max(0, s - 25));
    }
  };

  // ==========================================
  // GAME IMPLEMENTATION 11: Count Serial Numbers (60s)
  // ==========================================
  const initCountSerialNumbers = (startNum = 1, total = 16) => {
    const nums: number[] = [];
    for (let i = 0; i < total; i++) {
      nums.push(startNum + i);
    }
    const shuffled = [...nums].sort(() => Math.random() - 0.5);
    setSerialGrid(shuffled.map((n) => ({ num: n, tapped: false })));
    setSerialTarget(startNum);
    setSerialRangeMax(startNum + total - 1);
  };

  const handleSerialTileClick = (num: number) => {
    if (num === serialTarget) {
      playzoneAudio.tap();
      setSerialGrid((prev) =>
        prev.map((t) => (t.num === num ? { ...t, tapped: true } : t))
      );
      setScore((s) => s + 25);

      if (num === serialRangeMax) {
        // Complete serial sequence cleared!
        playzoneAudio.correct();
        setScore((s) => s + 350); // 350 pts clear bonus
        setSerialBoardsCleared((b) => b + 1);
        setTimeout(() => {
          initCountSerialNumbers(1, 16);
        }, 180);
      } else {
        setSerialTarget(num + 1);
      }
    } else {
      playzoneAudio.wrong();
      setScore((s) => Math.max(0, s - 10));
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-5 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-150 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shadow-md shadow-purple-600/20 shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">sports_esports</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-base tracking-tight truncate">
                  {game.title}
                </h3>
                <span className={`text-[9px] px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full font-black border shrink-0 ${game.badgeColor}`}>
                  {game.categoryTitle}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium line-clamp-1">{game.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title={soundOn ? 'Sound FX On' : 'Sound FX Muted'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 flex flex-col justify-center items-center">
          {/* =====================================
              STATE 1: READY / START SCREEN
             ===================================== */}
          {gameState === 'ready' && (
            <div className="w-full max-w-md mx-auto text-center space-y-4 animate-fade-in py-1">
              {/* Game Cover Art Banner */}
              {game.coverImage ? (
                <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md bg-slate-950">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/30 pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none text-left">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-purple-600 text-white shadow-sm uppercase tracking-wider">
                        {game.categoryTitle}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-white mt-1 leading-tight">
                        {game.title}
                      </h2>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-white/20">
                      {game.metricLabel}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 mx-auto flex items-center justify-center shadow-inner">
                  <Trophy className="w-8 h-8" />
                </div>
              )}

              {game.comingSoon ? (
                <div className="space-y-4 text-center py-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                    <span>🚀 COMING SOON IN NEXT EXPANSION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Expanding Soon!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    We are currently focusing exclusively on our <strong>Maths (+ - × %)</strong> arithmetic suite and <strong>2048</strong> number merger. This game will unlock in our upcoming expansion!
                  </p>

                  <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-900 dark:text-purple-200 text-center space-y-1">
                    <span className="font-extrabold text-sm block">Try Our Live Maths & Numbers Games:</span>
                    <span>Instant rapid-fire arithmetic (+, −, ×, ÷, %) and 2048 grid merger!</span>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const mathGame = PLAYZONE_GAMES.find((g) => g.slug === 'mental-math-sprint');
                        if (mathGame && onSelectGame) onSelectGame(mathGame);
                      }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Play Mental Math Sprint (+ - × %)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const g2048 = PLAYZONE_GAMES.find((g) => g.slug === '2048');
                        if (g2048 && onSelectGame) onSelectGame(g2048);
                      }}
                      className="w-full py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      <span>🔢 Play 2048 Tile Merger</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Client-side instant play • Zero downloads • Official record saved locally
                    </p>
                  </div>

                  {/* Difficulty Selector */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Select Difficulty Level
                    </span>
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
                      {game.difficultyLevels.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setDifficulty(lvl)}
                          className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer min-h-[38px] flex items-center justify-center ${
                            difficulty === lvl
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Personal Best Stat Box */}
                  {personalBest && (
                    <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between text-xs font-semibold text-purple-900 dark:text-purple-200">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span>Your Personal Best ({difficulty})</span>
                      </span>
                      <span className="font-extrabold text-sm">
                        {game.higherIsBetter ? `${personalBest.bestScore} pts` : `${personalBest.bestTimeMs} ms`}
                      </span>
                    </div>
                  )}

                  {/* Instructions List */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-left space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white block text-[11px] uppercase tracking-wider">
                      How to Play:
                    </span>
                    {game.instructions.map((inst, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-700 dark:text-purple-300 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>

                  {/* Start Button */}
                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <span>Play Now (Instant)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          )}

          {/* =====================================
              STATE 2: ACTIVE GAMEPLAY
             ===================================== */}
          {gameState === 'playing' && (
            <div className="w-full flex flex-col items-center space-y-4">
              {/* Gameplay Mini HUD */}
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Score: <strong className="text-purple-600 dark:text-purple-400">{score}</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5 text-blue-500" />
                  <span>{(elapsedMs / 1000).toFixed(1)}s</span>
                </span>
                <button
                  type="button"
                  onClick={handleStartGame}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restart</span>
                </button>
              </div>

              {/* --- GAME 1: REACTION TIME TEST --- */}
              {game.slug === 'reaction-time-test' && (
                <div
                  onClick={handleReactionClick}
                  className={`w-full h-64 sm:h-80 rounded-3xl flex flex-col items-center justify-center cursor-pointer select-none transition-colors shadow-inner text-white font-black text-center p-6 ${
                    reactionStage === 'wait'
                      ? 'bg-rose-600 hover:bg-rose-500'
                      : reactionStage === 'flash'
                      ? 'bg-emerald-500'
                      : reactionStage === 'early'
                      ? 'bg-amber-600'
                      : 'bg-slate-800'
                  }`}
                >
                  {reactionStage === 'wait' && (
                    <>
                      <span className="text-2xl sm:text-3xl">WAIT FOR GREEN...</span>
                      <span className="text-xs opacity-80 mt-2">Do not tap yet!</span>
                    </>
                  )}
                  {reactionStage === 'flash' && (
                    <>
                      <span className="text-3xl sm:text-4xl animate-bounce">TAP NOW! ⚡</span>
                      <span className="text-xs opacity-90 mt-2">Tap as fast as you can!</span>
                    </>
                  )}
                  {reactionStage === 'early' && (
                    <>
                      <span className="text-xl sm:text-2xl">Too Early! ⚠️</span>
                      <span className="text-xs opacity-90 mt-2">Tap anywhere to try again</span>
                    </>
                  )}
                </div>
              )}

              {/* --- GAME 2: CHIMP MEMORY --- */}
              {game.slug === 'chimp-memory' && (
                <div className="w-full max-w-sm aspect-square grid grid-cols-5 gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  {Array.from({ length: 25 }).map((_, idx) => {
                    const x = idx % 5;
                    const y = Math.floor(idx / 5);
                    const tile = chimpTiles.find((t) => t.x === x && t.y === y);
                    if (!tile || tile.cleared) {
                      return <div key={idx} className="rounded-xl bg-slate-800/40" />;
                    }
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleChimpClick(tile.num)}
                        className="rounded-xl bg-white text-slate-950 font-black text-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md cursor-pointer"
                      >
                        {tile.hidden ? '' : tile.num}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* --- GAME 3: MEMORY TILE MATCH --- */}
              {game.slug === 'memory-tile-match' && (
                <div className="w-full max-w-md grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
                  {memoryCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleCardClick(card.id)}
                      className={`aspect-square rounded-2xl text-2xl flex items-center justify-center font-black transition-all cursor-pointer shadow-sm ${
                        card.flipped || card.matched
                          ? 'bg-purple-600 text-white shadow-purple-500/20 rotate-0'
                          : 'bg-white dark:bg-slate-700 text-transparent hover:border-purple-400'
                      }`}
                    >
                      {card.flipped || card.matched ? card.symbol : '?'}
                    </button>
                  ))}
                </div>
              )}

              {/* --- GAME 4: COLOR REFLEX (STROOP TEST) --- */}
              {game.slug === 'color-reflex' && (
                <div className="w-full max-w-md text-center space-y-6 py-6">
                  <div className="text-4xl sm:text-5xl font-black tracking-wider transition-all select-none" style={{ color: stroopColor }}>
                    {stroopWord}
                  </div>
                  <p className="text-xs text-slate-400 font-semibold">
                    Does the ink color match the word meaning?
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => handleStroopAnswer(true)}
                      className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md cursor-pointer transition-transform active:scale-95"
                    >
                      MATCH (Yes)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStroopAnswer(false)}
                      className="py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-md cursor-pointer transition-transform active:scale-95"
                    >
                      NO MATCH (No)
                    </button>
                  </div>
                </div>
              )}

              {/* --- GAME 5: MENTAL MATH SPRINT (+ - × ÷ %) --- */}
              {game.slug === 'mental-math-sprint' && (
                <div className="w-full max-w-md text-center space-y-4 py-3">
                  {/* Operator Mode Selector Tabs */}
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    {(
                      [
                        { id: 'all', label: 'All (+ - × ÷ %)' },
                        { id: '+', label: '+ Add' },
                        { id: '-', label: '− Sub' },
                        { id: '×', label: '× Mult' },
                        { id: '÷', label: '÷ Div' },
                        { id: '%', label: '% Pct' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMathOpMode(m.id);
                          initMathProblem(m.id);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          mathOpMode === m.id
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Operation Category Pill & Streak Indicator */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs px-3 py-0.5 rounded-full font-black bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {mathProblem.opLabel || 'Mental Math'}
                    </span>
                    {mathStreak > 1 && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-black bg-amber-400 text-slate-950 shadow-xs animate-bounce">
                        ⚡ {mathStreak} streak! (+{mathStreak > 3 ? 10 : 5} pts)
                      </span>
                    )}
                  </div>

                  {/* Math Equation */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white select-none shadow-inner tracking-wide">
                    {mathProblem.q}
                  </div>

                  {/* 4 Answer Choice Buttons */}
                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    {mathProblem.options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleMathChoice(opt)}
                        className="py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 hover:scale-105 text-slate-900 dark:text-white font-black text-xl shadow-md cursor-pointer transition-all active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- GAME 6: ODD ONE OUT --- */}
              {game.slug === 'odd-one-out' && (
                <div className="w-full max-w-xs aspect-square grid grid-cols-4 gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
                  {oddGrid.symbols.map((sym, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOddTileClick(idx)}
                      className="aspect-square rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xl flex items-center justify-center font-bold hover:scale-105 transition-transform shadow-xs cursor-pointer"
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              )}

              {/* --- GAME 7: WORD GUESS (WORDLE STYLE) --- */}
              {game.slug === 'word-guess' && (
                <div className="w-full max-w-xs space-y-3">
                  <div className="space-y-1.5">
                    {Array.from({ length: 6 }).map((_, rIdx) => {
                      const guess = wordGuesses[rIdx] || (rIdx === wordGuesses.length ? wordCurrentInput : '');
                      return (
                        <div key={rIdx} className="grid grid-cols-5 gap-1.5">
                          {Array.from({ length: 5 }).map((_, cIdx) => {
                            const char = guess[cIdx] || '';
                            const isSubmitted = rIdx < wordGuesses.length;
                            let bg = 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white';
                            if (isSubmitted) {
                              if (wordTarget[cIdx] === char) bg = 'bg-emerald-600 text-white';
                              else if (wordTarget.includes(char)) bg = 'bg-amber-500 text-white';
                              else bg = 'bg-slate-500 text-white';
                            }
                            return (
                              <div
                                key={cIdx}
                                className={`aspect-square rounded-xl flex items-center justify-center font-black text-lg border border-slate-300 dark:border-slate-700 ${bg}`}
                              >
                                {char}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                  {/* Word Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={5}
                      value={wordCurrentInput}
                      onChange={(e) => setWordCurrentInput(e.target.value.toUpperCase())}
                      placeholder="Type 5 letters..."
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-black uppercase text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleWordSubmit}
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
                    >
                      Enter
                    </button>
                  </div>
                </div>
              )}

              {/* --- GAME 8: 2048 TILE MERGER --- */}
              {game.slug === '2048' && (
                <div className="space-y-3.5 max-w-sm mx-auto">
                  {/* Level / Grid Size Selection: 3*3, 4*4, 5*5 */}
                  <div className="flex items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
                      {[
                        { size: 3 as const, label: '3×3', hint: 'Hard' },
                        { size: 4 as const, label: '4×4', hint: 'Classic' },
                        { size: 5 as const, label: '5×5', hint: 'Master' },
                      ].map((lvl) => (
                        <button
                          key={lvl.size}
                          type="button"
                          onClick={() => {
                            setGridSize2048(lvl.size);
                            init2048(lvl.size);
                          }}
                          className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            gridSize2048 === lvl.size
                              ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span>{lvl.label}</span>
                          <span className="hidden sm:inline text-[9px] font-bold opacity-80 ml-1">({lvl.hint})</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-center">
                        <span className="text-[9px] font-bold text-slate-400 block leading-none">HIGHEST</span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400">{highestTile2048}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => init2048(gridSize2048)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Reset 2048 Board"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* 2048 Authentic Picture-Style Board */}
                  <div
                    onTouchStart={handleTouchStart2048}
                    onTouchEnd={handleTouchEnd2048}
                    className={`w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] mx-auto p-2.5 sm:p-3 rounded-2xl bg-[#bbada0] dark:bg-[#776e65] shadow-2xl border-4 border-[#bbada0] dark:border-[#776e65] grid gap-2 sm:gap-2.5 touch-none select-none relative ${
                      gridSize2048 === 3
                        ? 'grid-cols-3 grid-rows-3'
                        : gridSize2048 === 4
                        ? 'grid-cols-4 grid-rows-4'
                        : 'grid-cols-5 grid-rows-5'
                    }`}
                  >
                    {grid2048.flat().map((val, idx) => (
                      <div
                        key={`cell-${idx}-${val}`}
                        className={`rounded-xl flex items-center justify-center transition-all select-none duration-150 transform ${
                          gridSize2048 === 3
                            ? 'text-2xl sm:text-3xl'
                            : gridSize2048 === 4
                            ? 'text-lg sm:text-2xl'
                            : 'text-sm sm:text-lg'
                        } ${get2048TileClass(val)}`}
                      >
                        {val !== 0 && <span>{val}</span>}
                      </div>
                    ))}

                    {/* Milestone 2048 Overlay */}
                    {won2048 && !gameOver2048 && (
                      <div className="absolute inset-0 bg-amber-500/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-slate-950 p-4 text-center animate-fade-in z-20">
                        <span className="text-3xl mb-1">🏆</span>
                        <h3 className="text-xl font-black">You Reached 2048!</h3>
                        <p className="text-xs font-bold mb-3">Milestone completed on {gridSize2048}×{gridSize2048}!</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setWon2048(false)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-white font-bold text-xs cursor-pointer shadow-md"
                          >
                            Keep Going
                          </button>
                          <button
                            type="button"
                            onClick={() => init2048(gridSize2048)}
                            className="px-3.5 py-1.5 rounded-xl bg-white text-slate-950 font-black text-xs cursor-pointer shadow-md"
                          >
                            New Game
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Game Over Overlay */}
                    {gameOver2048 && (
                      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white p-4 text-center animate-fade-in z-20">
                        <span className="text-3xl mb-1">💥</span>
                        <h3 className="text-xl font-black">Game Over!</h3>
                        <p className="text-xs text-slate-300 mb-3">No moves left on the {gridSize2048}×{gridSize2048} board.</p>
                        <button
                          type="button"
                          onClick={() => init2048(gridSize2048)}
                          className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                        >
                          Try Again 🔄
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Swipe / D-Pad Buttons for Touch & Click */}
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-3 gap-1.5 max-w-[150px] mx-auto text-xs">
                      <div />
                      <button
                        type="button"
                        onClick={() => move2048('up')}
                        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                        aria-label="Move Up"
                      >
                        ▲
                      </button>
                      <div />
                      <button
                        type="button"
                        onClick={() => move2048('left')}
                        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                        aria-label="Move Left"
                      >
                        ◀
                      </button>
                      <button
                        type="button"
                        onClick={() => move2048('down')}
                        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                        aria-label="Move Down"
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        onClick={() => move2048('right')}
                        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                        aria-label="Move Right"
                      >
                        ▶
                      </button>
                    </div>

                    <div className="text-center text-[10px] text-slate-400 font-medium space-y-0.5">
                      <p className="hidden sm:block">💡 Use Arrow Keys (↑, ↓, ←, →) or WASD to slide tiles</p>
                      <p className="sm:hidden">💡 Swipe anywhere on the board or tap D-pad</p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- GAME 9: COUNT NUMBERS (60S SPRINT) --- */}
              {game.slug === 'count-numbers' && (
                <div className="w-full max-w-md mx-auto space-y-4 text-center">
                  {/* Top Sprint Bar: 60s Countdown + Streak */}
                  <div className="flex items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-black">
                      <Timer className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{Math.max(0, 60 - Math.floor(elapsedMs / 1000))}s left</span>
                    </div>

                    {countNumbersStreak > 1 && (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-xs animate-bounce">
                        <Flame className="w-3.5 h-3.5 fill-slate-950" />
                        <span>{countNumbersStreak}x Streak (+{countNumbersStreak > 3 ? 30 : 15} pts)</span>
                      </div>
                    )}

                    <div className="text-[11px] font-bold text-slate-400">
                      Target: <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Digit &quot;{countNumbersData.targetNum}&quot;</span>
                    </div>
                  </div>

                  {/* Target Prompt Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md flex items-center justify-center gap-2">
                    <Hash className="w-5 h-5 text-emerald-200" />
                    <span className="text-sm sm:text-base font-black">
                      How many times does <span className="underline decoration-wavy decoration-amber-300 font-extrabold text-amber-200 text-lg sm:text-xl px-1">&quot;{countNumbersData.targetNum}&quot;</span> appear below?
                    </span>
                  </div>

                  {/* Number Grid (20 numbers) */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-inner grid grid-cols-5 gap-2 sm:gap-2.5 max-w-sm mx-auto">
                    {countNumbersData.numbers.map((num, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-xs transition-all select-none ${
                          num === countNumbersData.targetNum
                            ? 'bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40'
                            : 'bg-white dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-600/80'
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  {/* 4 Answer Choice Buttons */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tap Your Count:
                    </span>
                    <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                      {countNumbersData.options.map((opt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleCountNumbersChoice(opt)}
                          className="py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:scale-105 active:scale-95 text-slate-900 dark:text-white font-black text-xl shadow-md cursor-pointer transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- GAME 10: COUNT CAT (60S SPRINT) --- */}
              {game.slug === 'count-cat' && (
                <div className="w-full max-w-md mx-auto space-y-4 text-center">
                  {/* Top Sprint Bar: 60s Countdown + Streak */}
                  <div className="flex items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-black">
                      <Timer className="w-3.5 h-3.5 text-amber-600" />
                      <span>{Math.max(0, 60 - Math.floor(elapsedMs / 1000))}s left</span>
                    </div>

                    {countCatStreak > 1 && (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-xs animate-bounce">
                        <Flame className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Purr-fect! {countCatStreak}x (+{countCatStreak > 3 ? 35 : 20} pts)</span>
                      </div>
                    )}

                    <div className="text-[11px] font-bold text-slate-400">
                      Find: <span className="text-base font-black">🐱 Cats</span>
                    </div>
                  </div>

                  {/* Target Prompt Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md flex items-center justify-center gap-2">
                    <span className="text-2xl animate-pulse">🐱</span>
                    <span className="text-sm sm:text-base font-black">
                      How many <span className="underline decoration-wavy decoration-white font-extrabold text-yellow-100 text-lg sm:text-xl px-1">🐱 Cats</span> do you see in the grid?
                    </span>
                  </div>

                  {/* Animal Grid (20 emoji tiles) */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/50 dark:bg-slate-800/80 border border-amber-200/60 dark:border-slate-700 shadow-inner grid grid-cols-5 gap-2 sm:gap-2.5 max-w-sm mx-auto">
                    {countCatData.animals.map((emoji, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-xs transition-all select-none hover:scale-110 ${
                          emoji === '🐱'
                            ? 'bg-amber-100/80 dark:bg-amber-950/60 border-2 border-amber-400/50'
                            : 'bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600/80'
                        }`}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>

                  {/* 4 Answer Choice Buttons */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tap The Number of Cats (🐱):
                    </span>
                    <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                      {countCatData.options.map((opt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleCountCatChoice(opt)}
                          className="py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:scale-105 active:scale-95 text-slate-900 dark:text-white font-black text-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1"
                        >
                          <span>{opt}</span>
                          <span className="text-xs opacity-70">🐱</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- GAME 11: COUNT SERIAL NUMBERS (60S SPEED) --- */}
              {game.slug === 'count-serial-numbers' && (
                <div className="w-full max-w-md mx-auto space-y-4 text-center">
                  {/* Top Sprint Bar: 60s Countdown + Boards Cleared */}
                  <div className="flex items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700 text-xs font-black">
                      <Timer className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{Math.max(0, 60 - Math.floor(elapsedMs / 1000))}s left</span>
                    </div>

                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500 text-white font-black text-xs shadow-xs">
                      <Trophy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Boards: {serialBoardsCleared}</span>
                    </div>

                    <div className="text-[11px] font-bold text-slate-400">
                      Target: <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">Next ➔ {serialTarget}</span>
                    </div>
                  </div>

                  {/* Target Prompt Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-md flex items-center justify-center gap-2">
                    <ListOrdered className="w-5 h-5 text-indigo-200" />
                    <span className="text-sm sm:text-base font-black">
                      Tap in serial order ➔ Next:{' '}
                      <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-xl bg-amber-400 text-slate-950 font-black text-lg sm:text-xl shadow-md animate-pulse">
                        {serialTarget}
                      </span>
                    </span>
                  </div>

                  {/* 4x4 Schulte Serial Number Grid */}
                  <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-inner grid grid-cols-4 gap-2 sm:gap-2.5 max-w-[320px] sm:max-w-[340px] mx-auto select-none">
                    {serialGrid.map((tile) => (
                      <button
                        key={tile.num}
                        type="button"
                        disabled={tile.tapped}
                        onClick={() => handleSerialTileClick(tile.num)}
                        className={`aspect-square rounded-xl flex items-center justify-center font-black text-lg sm:text-2xl transition-all cursor-pointer shadow-sm ${
                          tile.tapped
                            ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 opacity-40 cursor-default scale-95'
                            : tile.num === serialTarget
                            ? 'bg-amber-400 text-slate-950 border-2 border-amber-500 font-black scale-105 shadow-md animate-pulse'
                            : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 hover:border-indigo-500 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {tile.tapped ? <Check className="w-5 h-5" /> : tile.num}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium">
                    ⚡ Tap 1 to {serialRangeMax} in ascending serial order. Clearing all numbers grants a +350 bonus!
                  </p>
                </div>
              )}

              {/* --- UNIVERSAL SIMULATION ENGINE FOR OTHER GAMES --- */}
              {![
                'reaction-time-test',
                'chimp-memory',
                'memory-tile-match',
                'color-reflex',
                'mental-math-sprint',
                'odd-one-out',
                'word-guess',
                '2048',
                'count-numbers',
                'count-cat',
                'count-serial-numbers',
              ].includes(game.slug) && (
                <div className="w-full max-w-sm text-center space-y-5 py-8">
                  <div className="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 mx-auto flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                      Live Challenge Round Active
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Tap the challenge button to score points and test your reflex calibration.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playzoneAudio.correct();
                      const nextScore = score + 25;
                      setScore(nextScore);
                      if (nextScore >= 100) {
                        finishGame(nextScore, 100);
                      }
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95 transition-transform"
                  >
                    Tap to Score (+25 pts)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =====================================
              STATE 3: GAME OVER / RESULTS SCREEN
             ===================================== */}
          {gameState === 'gameover' && (
            <div className="w-full max-w-md mx-auto text-center space-y-5 animate-fade-in py-2">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Trophy className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Game Completed
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                  {game.higherIsBetter ? `${score} Points` : `${score || elapsedMs} ms`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Difficulty: <strong className="capitalize">{difficulty}</strong> • Time:{' '}
                  {(elapsedMs / 1000).toFixed(1)}s
                </p>
              </div>

              {/* Award / Personal Best Highlight */}
              {completionResult?.isNewPersonalBest && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-center gap-2 text-xs font-black animate-bounce">
                  <span>🏆</span>
                  <span>NEW PERSONAL BEST RECORD ACHIEVED! (+10 BONUS PTS)</span>
                </div>
              )}

              {/* Points Summary Badge */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Rank Points</span>
                  <span className="text-base font-black text-purple-600 dark:text-purple-400">
                    +{completionResult?.pointsEarned ?? 10} pts
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Anti-Cheat</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Locally</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleStartGame}
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  Play Again
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Exit Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
