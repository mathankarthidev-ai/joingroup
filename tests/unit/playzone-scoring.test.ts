import {
  calculatePointsForSession,
  validateAndRecordScore,
  createSessionToken,
} from '../../src/lib/games/engine';

export function runPlayZoneScoringUnitTests() {
  // Test 1: Difficulty base points
  const easyPts = calculatePointsForSession('easy', false, false, false);
  if (easyPts !== 10) throw new Error(`Expected easy=10, got ${easyPts}`);

  const medPts = calculatePointsForSession('medium', false, false, false);
  if (medPts !== 20) throw new Error(`Expected medium=20, got ${medPts}`);

  const hardPts = calculatePointsForSession('hard', false, false, false);
  if (hardPts !== 35) throw new Error(`Expected hard=35, got ${hardPts}`);

  const expPts = calculatePointsForSession('expert', false, false, false);
  if (expPts !== 50) throw new Error(`Expected expert=50, got ${expPts}`);

  // Test 2: Bonus points combinations
  // Expert (50) + Daily (25) + PB (10) + Perfect (15) = 100
  const maxPts = calculatePointsForSession('expert', true, true, true);
  if (maxPts !== 100) throw new Error(`Expected maxPts=100, got ${maxPts}`);

  // Easy (10) + Daily (25) = 35
  const dailyEasy = calculatePointsForSession('easy', true, false, false);
  if (dailyEasy !== 35) throw new Error(`Expected dailyEasy=35, got ${dailyEasy}`);

  // Test 3: Session Token Generation
  const token1 = createSessionToken('reaction-time-test');
  const token2 = createSessionToken('reaction-time-test');
  if (!token1.startsWith('pz_reaction-time-test_')) {
    throw new Error(`Token format invalid: ${token1}`);
  }
  if (token1 === token2) {
    throw new Error(`Tokens must be distinct`);
  }

  // Test 4: Anti-Cheat Rejection for Improbable Time (e.g. 50ms for Arrow Maze where min is 2500ms)
  const antiCheatTimeFail = validateAndRecordScore({
    gameSlug: 'arrow-maze',
    difficulty: 'easy',
    rawScore: 100,
    timeMs: 50, // Sub-human limit (impossible for Arrow Maze)
    accuracy: 100,
    timestamp: Date.now(),
    sessionToken: token1,
  });

  if (antiCheatTimeFail.isValid) {
    throw new Error('Expected anti-cheat validation to reject sub-physiological completion time');
  }

  // Test 5: Rejection of unknown game
  const unknownGameResult = validateAndRecordScore({
    gameSlug: 'non-existent-game-xyz',
    difficulty: 'easy',
    rawScore: 100,
    timeMs: 5000,
    accuracy: 100,
    timestamp: Date.now(),
    sessionToken: token1,
  });

  if (unknownGameResult.isValid) {
    throw new Error('Expected validation to reject unknown game');
  }

  return true;
}
