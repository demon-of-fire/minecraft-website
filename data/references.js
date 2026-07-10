// Minecraft References Data

const ENCHANTMENTS = [
    { id: "aqua_affinity", name: "Aqua Affinity", type: "helmet", maxLevel: 1, description: "Increases underwater mining speed", weight: 2 },
    { id: "bane_of_arthropods", name: "Bane of Arthropods", type: "sword/axe", maxLevel: 5, description: "Increases damage to arthropods", weight: 1 },
    { id: "binding_curse", name: "Curse of Binding", type: "armor", maxLevel: 1, description: "Item cannot be removed", weight: 1 },
    { id: "depth_strider", name: "Depth Strider", type: "boots", maxLevel: 3, description: "Increases underwater movement speed", weight: 2 },
    { id: "efficiency", name: "Efficiency", type: "tools", maxLevel: 5, description: "Increases mining speed", weight: 2 },
    { id: "feather_falling", name: "Feather Falling", type: "boots", maxLevel: 4, description: "Reduces fall damage", weight: 4 },
    { id: "fire_aspect", name: "Fire Aspect", type: "sword", maxLevel: 2, description: "Sets mobs on fire", weight: 2 },
    { id: "flame", name: "Flame", type: "bow", maxLevel: 1, description: "Arrows set mobs on fire", weight: 2 },
    { id: "fortune", name: "Fortune", type: "tools", maxLevel: 3, description: "Increases block drop chances", weight: 2 },
    { id: "frost_walker", name: "Frost Walker", type: "boots", maxLevel: 2, description: "Freezes water under feet", weight: 2 },
    { id: "impaling", name: "Impaling", type: "trident", maxLevel: 5, description: "Increases damage to aquatic mobs", weight: 2 },
    { id: "infinity", name: "Infinity", type: "bow", maxLevel: 1, description: "Arrows are not consumed", weight: 2 },
    { id: "knockback", name: "Knockback", type: "sword", maxLevel: 2, description: "Increases knockback", weight: 2 },
    { id: "looting", name: "Looting", type: "sword", maxLevel: 3, description: "Increases mob drops", weight: 2 },
    { id: "loyalty", name: "Loyalty", type: "trident", maxLevel: 3, description: "Trident returns after throw", weight: 2 },
    { id: "luck_of_the_sea", name: "Luck of the Sea", type: "fishing_rod", maxLevel: 3, description: "Increases chance of valuable items", weight: 2 },
    { id: "lure", name: "Lure", type: "fishing_rod", maxLevel: 3, description: "Decreases fishing time", weight: 2 },
    { id: "mending", name: "Mending", type: "all", maxLevel: 1, description: "Repairs item with XP orbs", weight: 2 },
    { id: "multishot", name: "Multishot", type: "crossbow", maxLevel: 1, description: "Shoots 3 arrows at once", weight: 2 },
    { id: "piercing", name: "Piercing", type: "crossbow", maxLevel: 4, description: "Arrows pierce through mobs", weight: 2 },
    { id: "power", name: "Power", type: "bow", maxLevel: 5, description: "Increases arrow damage", weight: 4 },
    { id: "projectile_protection", name: "Projectile Protection", type: "armor", maxLevel: 4, description: "Reduces projectile damage", weight: 2 },
    { id: "protection", name: "Protection", type: "armor", maxLevel: 4, description: "Reduces all damage", weight: 4 },
    { id: "punch", name: "Punch", type: "bow", maxLevel: 2, description: "Increases arrow knockback", weight: 2 },
    { id: "quick_charge", name: "Quick Charge", type: "crossbow", maxLevel: 3, description: "Decreases crossbow charge time", weight: 2 },
    { id: "respiration", name: "Respiration", type: "helmet", maxLevel: 3, description: "Extends underwater breathing", weight: 2 },
    { id: "sharpness", name: "Sharpness", type: "sword/axe", maxLevel: 5, description: "Increases melee damage", weight: 4 },
    { id: "silk_touch", name: "Silk Touch", type: "tools", maxLevel: 1, description: "Mined blocks drop themselves", weight: 2 },
    { id: "smite", name: "Smite", type: "sword/axe", maxLevel: 5, description: "Increases damage to undead", weight: 2 },
    { id: "soul_speed", name: "Soul Speed", type: "boots", maxLevel: 3, description: "Increases speed on soul blocks", weight: 1 },
    { id: "sweeping_edge", name: "Sweeping Edge", type: "sword", maxLevel: 3, description: "Increases sweep attack damage", weight: 2 },
    { id: "swift_sneak", name: "Swift Sneak", type: "leggings", maxLevel: 3, description: "Increases crouch speed", weight: 1 },
    { id: "thorns", name: "Thorns", type: "armor", maxLevel: 3, description: "Damages attackers", weight: 1 },
    { id: "unbreaking", name: "Unbreaking", type: "all", maxLevel: 3, description: "Increases item durability", weight: 4 },
    { id: "vanishing_curse", name: "Curse of Vanishing", type: "all", maxLevel: 1, description: "Item disappears on death", weight: 1 },
];

const POTIONS = [
    { id: "awkward", name: "Awkward Potion", ingredients: ["nether_wart", "water_bottle"], effect: null, duration: 0 },
    { id: "thick", name: "Thick Potion", ingredients: ["glowstone_dust", "water_bottle"], effect: null, duration: 0 },
    { id: "mundane", name: "Mundane Potion", ingredients: ["redstone", "water_bottle"], effect: null, duration: 0 },
    { id: "fire_resistance", name: "Fire Resistance", ingredients: ["blaze_powder", "magma_cream"], effect: "Fire Resistance", duration: "3:00" },
    { id: "fire_resistance_long", name: "Fire Resistance (Extended)", ingredients: ["redstone", "fire_resistance_potion"], effect: "Fire Resistance", duration: "8:00" },
    { id: "invisibility", name: "Invisibility", ingredients: ["fermented_spider_eye", "night_vision_potion"], effect: "Invisibility", duration: "3:00" },
    { id: "invisibility_long", name: "Invisibility (Extended)", ingredients: ["redstone", "invisibility_potion"], effect: "Invisibility", duration: "8:00" },
    { id: "leaping", name: "Leaping", ingredients: ["rabbit_foot"], effect: "Jump Boost", duration: "3:00" },
    { id: "leaping_strong", name: "Leaping II", ingredients: ["glowstone_dust", "leaping_potion"], effect: "Jump Boost II", duration: "1:30" },
    { id: "leaping_long", name: "Leaping (Extended)", ingredients: ["redstone", "leaping_potion"], effect: "Jump Boost", duration: "8:00" },
    { id: "night_vision", name: "Night Vision", ingredients: ["golden_carrot"], effect: "Night Vision", duration: "3:00" },
    { id: "night_vision_long", name: "Night Vision (Extended)", ingredients: ["redstone", "night_vision_potion"], effect: "Night Vision", duration: "8:00" },
    { id: "poison", name: "Poison", ingredients: ["spider_eye"], effect: "Poison", duration: "0:45" },
    { id: "poison_strong", name: "Poison II", ingredients: ["glowstone_dust", "poison_potion"], effect: "Poison II", duration: "0:21" },
    { id: "poison_long", name: "Poison (Extended)", ingredients: ["redstone", "poison_potion"], effect: "Poison", duration: "1:30" },
    { id: "regeneration", name: "Regeneration", ingredients: ["ghast_tear"], effect: "Regeneration", duration: "0:45" },
    { id: "regeneration_strong", name: "Regeneration II", ingredients: ["glowstone_dust", "regeneration_potion"], effect: "Regeneration II", duration: "0:22" },
    { id: "regeneration_long", name: "Regeneration (Extended)", ingredients: ["redstone", "regeneration_potion"], effect: "Regeneration", duration: "1:30" },
    { id: "slow_falling", name: "Slow Falling", ingredients: ["phantom_membrane"], effect: "Slow Falling", duration: "1:30" },
    { id: "slow_falling_long", name: "Slow Falling (Extended)", ingredients: ["redstone", "slow_falling_potion"], effect: "Slow Falling", duration: "4:00" },
    { id: "slowness", name: "Slowness", ingredients: ["fermented_spider_eye", "speed_potion"], effect: "Slowness", duration: "1:30" },
    { id: "slowness_long", name: "Slowness (Extended)", ingredients: ["redstone", "slowness_potion"], effect: "Slowness", duration: "3:00" },
    { id: "speed", name: "Speed", ingredients: ["sugar"], effect: "Speed", duration: "3:00" },
    { id: "speed_strong", name: "Speed II", ingredients: ["glowstone_dust", "speed_potion"], effect: "Speed II", duration: "1:30" },
    { id: "speed_long", name: "Speed (Extended)", ingredients: ["redstone", "speed_potion"], effect: "Speed", duration: "8:00" },
    { id: "strength", name: "Strength", ingredients: ["blaze_powder"], effect: "Strength", duration: "3:00" },
    { id: "strength_strong", name: "Strength II", ingredients: ["glowstone_dust", "strength_potion"], effect: "Strength II", duration: "1:30" },
    { id: "strength_long", name: "Strength (Extended)", ingredients: ["redstone", "strength_potion"], effect: "Strength", duration: "8:00" },
    { id: "water_breathing", name: "Water Breathing", ingredients: ["pufferfish"], effect: "Water Breathing", duration: "3:00" },
    { id: "water_breathing_long", name: "Water Breathing (Extended)", ingredients: ["redstone", "water_breathing_potion"], effect: "Water Breathing", duration: "8:00" },
    { id: "weakness", name: "Weakness", ingredients: ["fermented_spider_eye"], effect: "Weakness", duration: "1:30" },
    { id: "weakness_long", name: "Weakness (Extended)", ingredients: ["redstone", "weakness_potion"], effect: "Weakness", duration: "4:00" },
];

const BIOMES = [
    { id: "badlands", name: "Badlands", temperature: 2.0, rainfall: 0.0, biomeType: "wasteland" },
    { id: "bamboo_jungle", name: "Bamboo Jungle", temperature: 0.95, rainfall: 0.9, biomeType: "forest" },
    { id: "basalt_deltas", name: "Basalt Deltas", temperature: 2.0, rainfall: 0.0, biomeType: "nether" },
    { id: "beach", name: "Beach", temperature: 0.8, rainfall: 0.4, biomeType: "ocean" },
    { id: "birch_forest", name: "Birch Forest", temperature: 0.6, rainfall: 0.6, biomeType: "forest" },
    { id: "cherry_grove", name: "Cherry Grove", temperature: 0.5, rainfall: 0.8, biomeType: "forest" },
    { id: "cold_ocean", name: "Cold Ocean", temperature: 0.5, rainfall: 0.5, biomeType: "ocean" },
    { id: "crimson_forest", name: "Crimson Forest", temperature: 2.0, rainfall: 0.0, biomeType: "nether" },
    { id: "dark_forest", name: "Dark Forest", temperature: 0.7, rainfall: 0.8, biomeType: "forest" },
    { id: "deep_cold_ocean", name: "Deep Cold Ocean", temperature: 0.5, rainfall: 0.5, biomeType: "ocean" },
    { id: "deep_lukewarm_ocean", name: "Deep Lukewarm Ocean", temperature: 0.5, rainfall: 0.5, biomeType: "ocean" },
    { id: "deep_ocean", name: "Deep Ocean", temperature: 0.5, rainfall: 0.5, biomeType: "ocean" },
    { id: "desert", name: "Desert", temperature: 2.0, rainfall: 0.0, biomeType: "wasteland" },
    { id: "end_barrens", name: "End Barrens", temperature: 0.5, rainfall: 0.5, biomeType: "the_end" },
    { id: "end_highlands", name: "End Highlands", temperature: 0.5, rainfall: 0.5, biomeType: "the_end" },
    { id: "end_midlands", name: "End Midlands", temperature: 0.5, rainfall: 0.5, biomeType: "the_end" },
    { id: "eroded_badlands", name: "Eroded Badlands", temperature: 2.0, rainfall: 0.0, biomeType: "wasteland" },
    { id: "flower_forest", name: "Flower Forest", temperature: 0.7, rainfall: 0.8, biomeType: "forest" },
    { id: "forest", name: "Forest", temperature: 0.7, rainfall: 0.8, biomeType: "forest" },
    { id: "frozen_ocean", name: "Frozen Ocean", temperature: 0.0, rainfall: 0.5, biomeType: "ocean" },
    { id: "frozen_peaks", name: "Frozen Peaks", temperature: -0.7, rainfall: 0.9, biomeType: "mountain" },
    { id: "frozen_river", name: "Frozen River", temperature: 0.0, rainfall: 0.5, biomeType: "river" },
    { id: "grove", name: "Grove", temperature: -0.2, rainfall: 0.8, biomeType: "forest" },
    { id: "ice_spikes", name: "Ice Spikes", temperature: -0.5, rainfall: 0.5, biomeType: "icy" },
    { id: "jagged_peaks", name: "Jagged Peaks", temperature: -0.7, rainfall: 0.9, biomeType: "mountain" },
    { id: "jungle", name: "Jungle", temperature: 0.95, rainfall: 0.9, biomeType: "forest" },
    { id: "lukewarm_ocean", name: "Lukewarm Ocean", temperature: 0.5, rainfall: 0.5, biomeType: "ocean" },
    { id: "mangrove_swamp", name: "Mangrove Swamp", temperature: 0.8, rainfall: 0.9, biomeType: "swamp" },
    { id: "meadow", name: "Meadow", temperature: 0.5, rainfall: 0.8, biomeType: "plains" },
    { id: "mushroom_fields", name: "Mushroom Fields", temperature: 0.9, rainfall: 1.0, biomeType: "mushroom" },
    { id: "nether_wastes", name: "Nether Wastes", temperature: 2.0, rainfall: 0.0, biomeType: "nether" },
    { id: "ocean", name: "Ocean", temperature: 0.5, rainfall: 0.5, biomeType: "ocean" },
    { id: "old_growth_birch_forest", name: "Old Growth Birch Forest", temperature: 0.6, rainfall: 0.6, biomeType: "forest" },
    { id: "old_growth_pine_taiga", name: "Old Growth Pine Taiga", temperature: 0.25, rainfall: 0.8, biomeType: "taiga" },
    { id: "old_growth_spruce_taiga", name: "Old Growth Spruce Taiga", temperature: 0.25, rainfall: 0.8, biomeType: "taiga" },
    { id: "lush_caves", name: "Lush Caves", temperature: 0.9, rainfall: 0.5, biomeType: "underground" },
    { id: "dripstone_caves", name: "Dripstone Caves", temperature: 0.9, rainfall: 0.5, biomeType: "underground" },
    { id: "deep_dark", name: "Deep Dark", temperature: 0.8, rainfall: 0.5, biomeType: "underground" },
    { id: "plains", name: "Plains", temperature: 0.8, rainfall: 0.4, biomeType: "plains" },
    { id: "river", name: "River", temperature: 0.5, rainfall: 0.5, biomeType: "river" },
    { id: "savanna", name: "Savanna", temperature: 2.0, rainfall: 0.0, biomeType: "savanna" },
    { id: "savanna_plateau", name: "Savanna Plateau", temperature: 2.0, rainfall: 0.0, biomeType: "savanna" },
    { id: "snowy_beach", name: "Snowy Beach", temperature: 0.05, rainfall: 0.3, biomeType: "icy" },
    { id: "snowy_plains", name: "Snowy Plains", temperature: 0.0, rainfall: 0.5, biomeType: "icy" },
    { id: "snowy_slopes", name: "Snowy Slopes", temperature: -0.5, rainfall: 0.9, biomeType: "mountain" },
    { id: "soul_sand_valley", name: "Soul Sand Valley", temperature: 2.0, rainfall: 0.0, biomeType: "nether" },
    { id: "sparse_jungle", name: "Sparse Jungle", temperature: 0.95, rainfall: 0.8, biomeType: "forest" },
    { id: "stony_peaks", name: "Stony Peaks", temperature: 1.0, rainfall: 0.3, biomeType: "mountain" },
    { id: "stony_shore", name: "Stony Shore", temperature: 0.6, rainfall: 0.3, biomeType: "mountain" },
    { id: "sunflower_plains", name: "Sunflower Plains", temperature: 0.8, rainfall: 0.4, biomeType: "plains" },
    { id: "swamp", name: "Swamp", temperature: 0.8, rainfall: 0.9, biomeType: "swamp" },
    { id: "taiga", name: "Taiga", temperature: 0.25, rainfall: 0.8, biomeType: "taiga" },
    { id: "the_end", name: "The End", temperature: 0.5, rainfall: 0.5, biomeType: "the_end" },
    { id: "the_void", name: "The Void", temperature: 0.5, rainfall: 0.5, biomeType: "void" },
    { id: "warm_ocean", name: "Warm Ocean", temperature: 0.5, rainfall: 0.5, biomeType: "ocean" },
    { id: "warped_forest", name: "Warped Forest", temperature: 2.0, rainfall: 0.0, biomeType: "nether" },
    { id: "windswept_extreme_hills", name: "Windswept Extreme Hills", temperature: 0.2, rainfall: 0.3, biomeType: "mountain" },
    { id: "windswept_forest", name: "Windswept Forest", temperature: 0.7, rainfall: 0.8, biomeType: "forest" },
    { id: "windswept_gravelly_hills", name: "Windswept Gravelly Hills", temperature: 0.2, rainfall: 0.3, biomeType: "mountain" },
    { id: "windswept_savanna", name: "Windswept Savanna", temperature: 2.0, rainfall: 0.0, biomeType: "savanna" },
    { id: "wooded_badlands", name: "Wooded Badlands", temperature: 2.0, rainfall: 0.0, biomeType: "wasteland" },
];

const ADVANCEMENTS = [
    { id: "minecraft:story/mine_stone", name: "Stone Age", description: "Mine stone with your new pickaxe", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/smelt_iron", name: "Getting an Upgrade", description: "Construct a better pickaxe", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/obtain_armor", name: "Suit Up", description: "Protect yourself with a piece of iron armor", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/mine_diamond", name: "Hot Stuff", description: "Begin using the tools and blocks of a new age", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/enter_the_nether", name: "We Need to Go Deeper", description: "Build a Nether portal", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/shiny_gear", name: "Enchanter", description: "Enchant an item at an enchanting table", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/follow_ender_eye", name: "Eye Spy", description: "Follow an Eye of Ender", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/enter_the_end", name: "The End?", description: "Enter the End portal", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/dragon_breath", name: "The Next Generation", description: "Hold the dragon's breath in a glass bottle", category: "story", rewards: ["experience"] },
    { id: "minecraft:story/fly_elytra", name: "Aviation", description: "Fly with an elytra", category: "story", rewards: ["experience"] },

    { id: "minecraft:nether/find_fortress", name: "A Terrible Fortress", description: "Break your way into a Nether Fortress", category: "nether", rewards: ["experience"] },
    { id: "minecraft:nether/get_blaze_rod", name: "Into Fire", description: "Obtain a blaze rod", category: "nether", rewards: ["experience"] },
    { id: "minecraft:nether/nether_warts", description: "Get Nether Wart", category: "nether", rewards: ["experience"] },
    { id: "minecraft:nether/return_to_sender", name: "Return to Sender", description: "Deflect a ghast fireball", category: "nether", rewards: ["experience"] },
    { id: "minecraft:nether/find_bastion", name: "Those Were the Days", description: "Enter a Bastion Remnant", category: "nether", rewards: ["experience"] },
    { id: "minecraft:nether/obtain_ancient_debris", name: "Old Smokey", description: "Obtain ancient debris", category: "nether", rewards: ["experience"] },
    { id: "minecraft:nether/warroad", name: "War Pigs", description: "Enter a Crimson Forest biome", category: "nether", rewards: ["experience"] },
    { id: "minecraft:nether/fast_travel", name: "Subspace Bubble", description: "Use the Nether to travel 7km in the Overworld", category: "nether", rewards: ["experience"] },

    { id: "minecraft:adventure/kill_a_mob", name: "Monster Hunter", description: "Kill one of every hostile monster", category: "adventure", rewards: ["experience"] },
    { id: "minecraft:adventure/trade", name: "What a Deal!", description: "Successfully trade with a Villager", category: "adventure", rewards: ["experience"] },
    { id: "minecraft:adventure/whos_the_pillager", name: "Who's the Pillager?", description: "Defeat a Pillager captain", category: "adventure", rewards: ["experience"] },
    { id: "minecraft:adventure/salvage_stronghold", name: "The City at the End of the Game", description: "Find an End City", category: "adventure", rewards: ["experience"] },
    { id: "minecraft:adventure/hero_of_the_village", name: "Hero of the Village", description: "Win a raid", category: "adventure", rewards: ["experience"] },
    { id: "minecraft:adventure/totem", name: "Is It a Bird?", description: "Use a totem of undying to cheat death", category: "adventure", rewards: ["experience"] },
    { id: "minecraft:adventure/honey_block_slide", name: "Sticky Situation", description: "Slide down a honey block while sneaking", category: "adventure", rewards: ["experience"] },

    { id: "minecraft:husbandry/plant_seed", name: "A Seedy Place", description: "Plant a seed", category: "husbandry", rewards: ["experience"] },
    { id: "minecraft:husbandry/breed_all_animals", name: "Two by Two", description: "Breed every animal", category: "husbandry", rewards: ["experience"] },
    { id: "minecraft:husbandry/ride_a_boat", name: "Is It a Plane?", description: "Ride in a boat with an animal", category: "husbandry", rewards: ["experience"] },
    { id: "minecraft:husbandry/tactical_fishing", name: "Tactical Fishing", description: "Catch a fish", category: "husbandry", rewards: ["experience"] },
    { id: "minecraft:husbandry/balanced_diet", name: "A Balanced Diet", description: "Eat everything that is edible", category: "husbandry", rewards: ["experience"] },
    { id: "minecraft:husbandry/two_by_two", name: "The Parrots and the Bats", description: "Breed two animals", category: "husbandry", rewards: ["experience"] },

    { id: "minecraft:end/dragon_breath", name: "The Next Generation", description: "Hold the dragon's breath in a glass bottle", category: "end", rewards: ["experience"] },
    { id: "minecraft:end/elytra", name: "Aviation", description: "Fly with an elytra", category: "end", rewards: ["experience"] },
    { id: "minecraft:end/levitate", name: "Great View From Up Here", description: "Levitate up 50 blocks using a Shulker", category: "end", rewards: ["experience"] },
];

function getEnchantments() { return ENCHANTMENTS; }
function getPotions() { return POTIONS; }
function getBiomes() { return BIOMES; }
function getAdvancements() { return ADVANCEMENTS; }

function searchEnchantments(query) {
    const q = query.toLowerCase();
    return ENCHANTMENTS.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q)
    );
}

function searchPotions(query) {
    const q = query.toLowerCase();
    return POTIONS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.effect && p.effect.toLowerCase().includes(q))
    );
}

function searchBiomes(query) {
    const q = query.toLowerCase();
    return BIOMES.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.biomeType.toLowerCase().includes(q)
    );
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ENCHANTMENTS, POTIONS, BIOMES, ADVANCEMENTS, getEnchantments, getPotions, getBiomes, getAdvancements, searchEnchantments, searchPotions, searchBiomes };
}