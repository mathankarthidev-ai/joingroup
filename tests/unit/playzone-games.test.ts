import { PLAYZONE_GAMES, GAME_CATEGORIES, GameMetadata, GameCategory } from '../../src/lib/games/catalog';

export function runPlayZoneGamesCatalogTests() {
  // Test 1: Check total number of games
  if (!Array.isArray(PLAYZONE_GAMES) || PLAYZONE_GAMES.length < 30) {
    throw new Error(`Expected at least 30 games in PLAYZONE_GAMES, found ${PLAYZONE_GAMES?.length}`);
  }

  // Test 2: Check total number of categories
  if (!Array.isArray(GAME_CATEGORIES) || GAME_CATEGORIES.length !== 10) {
    throw new Error(`Expected exactly 10 categories in GAME_CATEGORIES, found ${GAME_CATEGORIES?.length}`);
  }

  // Test 3: Uniqueness of Game IDs and Slugs
  const idSet = new Set<string>();
  const slugSet = new Set<string>();
  for (const game of PLAYZONE_GAMES) {
    if (idSet.has(game.id)) {
      throw new Error(`Duplicate game id found: ${game.id}`);
    }
    idSet.add(game.id);

    if (slugSet.has(game.slug)) {
      throw new Error(`Duplicate game slug found: ${game.slug}`);
    }
    slugSet.add(game.slug);

    // Validate fields
    if (!game.title || typeof game.title !== 'string') {
      throw new Error(`Game ${game.id} missing valid title`);
    }
    if (!game.instructions || !Array.isArray(game.instructions) || game.instructions.length === 0) {
      throw new Error(`Game ${game.slug} missing instructions array`);
    }
    if (!game.difficultyLevels || !Array.isArray(game.difficultyLevels) || game.difficultyLevels.length === 0) {
      throw new Error(`Game ${game.slug} missing difficulty levels`);
    }
    if (!['points', 'time_ms', 'percentage'].includes(game.metric)) {
      throw new Error(`Game ${game.slug} has invalid metric: ${game.metric}`);
    }
    if (!game.coverImage || typeof game.coverImage !== 'string' || !game.coverImage.startsWith('http')) {
      throw new Error(`Game ${game.slug} missing valid coverImage URL`);
    }
  }

  // Test 4: Category Slug Mapping
  const categorySlugSet = new Set(GAME_CATEGORIES.map((c) => c.slug));
  for (const game of PLAYZONE_GAMES) {
    if (!categorySlugSet.has(game.categorySlug)) {
      throw new Error(`Game ${game.slug} references invalid categorySlug: ${game.categorySlug}`);
    }
  }

  // Test 5: Verify all 10 categories have at least 3 games assigned
  for (const cat of GAME_CATEGORIES) {
    if (!cat.gameSlugs || cat.gameSlugs.length < 3) {
      throw new Error(`Category ${cat.slug} must have at least 3 games, found ${cat.gameSlugs?.length}`);
    }
    for (const gSlug of cat.gameSlugs) {
      if (!slugSet.has(gSlug)) {
        throw new Error(`Category ${cat.slug} references non-existent game: ${gSlug}`);
      }
    }
  }

  return true;
}
