// Minecraft Mob Drops Database
// Each mob has drops with exact chances and conditions

const MOB_CATEGORIES = {
    passive: "Passive Mobs",
    neutral: "Neutral Mobs",
    hostile: "Hostile Mobs",
    boss: "Boss Mobs",
    water: "Water Mobs",
    utility: "Utility Mobs",
    npc: "NPCs"
};

const MOBS = [
    // === PASSIVE MOBS ===
    {
        id: "cow", name: "Cow", category: "passive", health: 10, xp: 3,
        spawns: ["plains", "sunflower_plains", "savanna", "forest"],
        drops: [
            { item: "raw_beef", count: "1-3", chance: "100%", condition: "Always" },
            { item: "leather", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "pig", name: "Pig", category: "passive", health: 10, xp: 3,
        spawns: ["plains", "sunflower_plains", "flower_forest"],
        drops: [
            { item: "raw_porkchop", count: "1-3", chance: "100%", condition: "Always" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "chicken", name: "Chicken", category: "passive", health: 4, xp: 3,
        spawns: ["plains", "forest"],
        drops: [
            { item: "raw_chicken", count: "1", chance: "100%", condition: "Always" },
            { item: "feather", count: "0-2", chance: "100%", condition: "Always" },
            { item: "egg", count: "1", chance: "8%", condition: "When breeding" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "sheep", name: "Sheep", category: "passive", health: 8, xp: 3,
        spawns: ["plains", "sunflower_plains", "savanna"],
        drops: [
            { item: "mutton", count: "1-2", chance: "100%", condition: "Always" },
            { item: "wool", count: "1", chance: "100%", condition: "Always (matching color)" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "horse", name: "Horse", category: "passive", health: "15-30", xp: 1,
        spawns: ["plains", "savanna"],
        drops: [
            { item: "leather", count: "0-2", chance: "100%", condition: "Always" },
            { item: "horse_armor", count: "1", chance: "0.5%", condition: "With Looting III" }
        ],
        added: "1.6"
    },
    {
        id: "donkey", name: "Donkey", category: "passive", health: 15, xp: 1,
        spawns: ["plains"],
        drops: [
            { item: "leather", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "1.6"
    },
    {
        id: "rabbit", name: "Rabbit", category: "passive", health: 3, xp: 1,
        spawns: ["desert", "taiga", "snowy_plains"],
        drops: [
            { item: "raw_rabbit", count: "1", chance: "100%", condition: "Always" },
            { item: "rabbit_foot", count: "0-1", chance: "10%", condition: "With Looting III: up to 28%" },
            { item: "rabbit_hide", count: "0-1", chance: "100%", condition: "Always" }
        ],
        added: "1.8"
    },
    {
        id: "mooshroom", name: "Mooshroom", category: "passive", health: 10, xp: 3,
        spawns: ["mushroom_fields"],
        drops: [
            { item: "raw_beef", count: "1-3", chance: "100%", condition: "Always" },
            { item: "leather", count: "0-2", chance: "100%", condition: "Always" },
            { item: "mushroom_stew", count: "1", chance: "100%", condition: "When using bowl" }
        ],
        added: "beta-1.8"
    },
    {
        id: "squid", name: "Squid", category: "water", health: 10, xp: 1,
        spawns: ["ocean", "river"],
        drops: [
            { item: "ink_sac", count: "1-3", chance: "100%", condition: "Always" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "glow_squid", name: "Glow Squid", category: "water", health: 10, xp: 1,
        spawns: ["underground water"],
        drops: [
            { item: "glow_ink_sac", count: "1-3", chance: "100%", condition: "Always" }
        ],
        added: "1.17"
    },
    {
        id: "cod", name: "Cod", category: "water", health: 6, xp: 1,
        spawns: ["ocean"],
        drops: [
            { item: "raw_cod", count: "1-3", chance: "100%", condition: "Always" }
        ],
        added: "1.13"
    },
    {
        id: "salmon", name: "Salmon", category: "water", health: 6, xp: 1,
        spawns: ["ocean", "river"],
        drops: [
            { item: "raw_salmon", count: "1-3", chance: "100%", condition: "Always" }
        ],
        added: "1.13"
    },
    {
        id: "tropical_fish", name: "Tropical Fish", category: "water", health: 6, xp: 1,
        spawns: ["warm_ocean"],
        drops: [
            { item: "tropical_fish", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.13"
    },
    {
        id: "pufferfish", name: "Pufferfish", category: "water", health: 6, xp: 1,
        spawns: ["warm_ocean"],
        drops: [
            { item: "pufferfish", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.13"
    },
    {
        id: "axolotl", name: "Axolotl", category: "water", health: 14, xp: 1,
        spawns: ["underground_water"],
        drops: [
            { item: "axolotl_bucket", count: "1", chance: "100%", condition: "Only when killed with bucket" }
        ],
        added: "1.17"
    },
    {
        id: "dolphin", name: "Dolphin", category: "water", health: 10, xp: 1,
        spawns: ["ocean"],
        drops: [
            { item: "cod", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.13"
    },

    // === NEUTRAL MOBS ===
    {
        id: "zombie_piglin", name: "Zombified Piglin", category: "neutral", health: 20, xp: 5,
        spawns: ["nether_wastes", "crimson_forest"],
        drops: [
            { item: "rotten_flesh", count: "1", chance: "100%", condition: "Always" },
            { item: "gold_nugget", count: "0-1", chance: "100%", condition: "Always" },
            { item: "gold_ingot", count: "0-1", chance: "2.5%", condition: "With Looting III: up to 5.5%" },
            { item: "gold_sword", count: "1", chance: "0.5%", condition: "Rare drop" },
            { item: "gold_helmet", count: "1", chance: "0.5%", condition: "Rare drop" },
            { item: "gold_boots", count: "1", chance: "0.5%", condition: "Rare drop" }
        ],
        added: "1.16"
    },
    {
        id: "enderman", name: "Enderman", category: "neutral", health: 40, xp: 5,
        spawns: ["end", "plains", "desert", "forest", "taiga"],
        drops: [
            { item: "ender_pearl", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "wolf", name: "Wolf", category: "neutral", health: "8 (tamed: 20)", xp: 1,
        spawns: ["taiga", "forest", "old_growth"],
        drops: [
            { item: "bone", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "spider", name: "Spider", category: "neutral", health: 16, xp: 5,
        spawns: ["night", "dark_areas"],
        drops: [
            { item: "string", count: "0-2", chance: "100%", condition: "Always" },
            { item: "spider_eye", count: "0-1", chance: "33.3%", condition: "With Looting III: up to 52.3%" },
            { item: "spider_eye", count: "1", chance: "100%", condition: "When killed by a witch" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "iron_golem", name: "Iron Golem", category: "neutral", health: 100, xp: 5,
        spawns: ["villages"],
        drops: [
            { item: "iron_ingot", count: "3-5", chance: "100%", condition: "Always" },
            { item: "poppy", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "1.0.0"
    },
    {
        id: "bee", name: "Bee", category: "neutral", health: 10, xp: 1,
        spawns: ["flower_forest", "plains", "sunflower_plains"],
        drops: [
            { item: "honeycomb", count: "0-1", chance: "50%", condition: "When killed without angering" },
            { item: "honey_bottle", count: "1", chance: "100%", condition: "When using bottle on full hive" }
        ],
        added: "1.15"
    },
    {
        id: "llama", name: "Llama", category: "neutral", health: 15, xp: 1,
        spawns: ["savanna", "extreme_hills"],
        drops: [
            { item: "leather", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "1.11"
    },
    {
        id: "polar_bear", name: "Polar Bear", category: "neutral", health: 30, xp: 1,
        spawns: ["snowy_plains", "ice_spikes"],
        drops: [
            { item: "cod", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "1.10"
    },
    {
        id: "goat", name: "Goat", category: "neutral", health: 10, xp: 1,
        spawns: ["meadow"],
        drops: [
            { item: "mutton", count: "1-2", chance: "100%", condition: "Always" }
        ],
        added: "1.17"
    },
    {
        id: "frog", name: "Frog", category: "neutral", health: 6, xp: 1,
        spawns: ["swamp", "mangrove_swamp"],
        drops: [
            { item: "slime_ball", count: "1", chance: "100%", condition: "When eating a slime" }
        ],
        added: "1.19"
    },
    {
        id: "turtle", name: "Turtle", category: "neutral", health: 30, xp: 1,
        spawns: ["beach"],
        drops: [
            { item: "seagrass", count: "0-2", chance: "100%", condition: "Adult when killed" }
        ],
        added: "1.13"
    },
    {
        id: "cat", name: "Cat", category: "neutral", health: 10, xp: 3,
        spawns: ["villages"],
        drops: [
            { item: "string", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "1.14"
    },
    {
        id: "fox", name: "Fox", category: "neutral", health: 10, xp: 1,
        spawns: ["taiga", "grove"],
        drops: [
            { item: "rabbit_foot", count: "0-1", chance: "10%", condition: "Fox killed by player" },
            { item: "rabbit_hide", count: "0-1", chance: "100%", condition: "Fox killed by player" },
            { item: "emerald", count: "1", chance: "0.5%", condition: "Rare drop" }
        ],
        added: "1.14"
    },

    // === HOSTILE MOBS ===
    {
        id: "zombie", name: "Zombie", category: "hostile", health: 20, xp: 5,
        spawns: ["night", "dark_areas", "structures"],
        drops: [
            { item: "rotten_flesh", count: "0-2", chance: "100%", condition: "Always" },
            { item: "iron_ingot", count: "1", chance: "1%", condition: "Rare drop" },
            { item: "carrot", count: "1", chance: "0.8%", condition: "Rare drop" },
            { item: "potato", count: "1", chance: "0.8%", condition: "Rare drop" },
            { item: "iron_helmet", count: "1", chance: "100%", condition: "When wearing" },
            { item: "iron_chestplate", count: "1", chance: "100%", condition: "When wearing" },
            { item: "iron_leggings", count: "1", chance: "100%", condition: "When wearing" },
            { item: "iron_boots", count: "1", chance: "100%", condition: "When wearing" },
            { item: "iron_sword", count: "1", chance: "100%", condition: "When holding" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "skeleton", name: "Skeleton", category: "hostile", health: 20, xp: 5,
        spawns: ["night", "dark_areas"],
        drops: [
            { item: "arrow", count: "0-2", chance: "100%", condition: "Always" },
            { item: "bone", count: "0-2", chance: "100%", condition: "Always" },
            { item: "bow", count: "1", chance: "8.5%", condition: "Rare drop" },
            { item: "iron_helmet", count: "1", chance: "100%", condition: "When wearing" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "creeper", name: "Creeper", category: "hostile", health: 20, xp: 5,
        spawns: ["night", "dark_areas"],
        drops: [
            { item: "gunpowder", count: "0-2", chance: "100%", condition: "Always" },
            { item: "music_disc", count: "1", chance: "0.5%", condition: "When killed by skeleton arrow" },
            { item: "creeper_head", count: "1", chance: "0.5%", condition: "When killed by charged creeper" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "spider_jockey", name: "Spider Jockey", category: "hostile", health: "26 (skeleton 20 + spider 16)", xp: 10,
        spawns: ["night", "dark_areas"],
        drops: [
            { item: "string", count: "0-2", chance: "100%", condition: "From spider" },
            { item: "spider_eye", count: "0-1", chance: "33.3%", condition: "From spider" },
            { item: "arrow", count: "0-2", chance: "100%", condition: "From skeleton" },
            { item: "bone", count: "0-2", chance: "100%", condition: "From skeleton" },
            { item: "bow", count: "1", chance: "8.5%", condition: "From skeleton" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "witch", name: "Witch", category: "hostile", health: 26, xp: 5,
        spawns: ["swamp_hut"],
        drops: [
            { item: "glass_bottle", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "glowstone_dust", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "redstone", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "stick", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "spider_eye", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "sugar", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "gunpowder", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "coal", count: "0-6", chance: "100%", condition: "1/3 chance each" },
            { item: "emerald", count: "0-15", chance: "2.5%", condition: "Rare drop" }
        ],
        added: "1.0.0"
    },
    {
        id: "slime", name: "Slime", category: "hostile", health: "1 (big: 2, huge: 4)", xp: 1,
        spawns: ["swamp", "underground"],
        drops: [
            { item: "slime_ball", count: "0-2", chance: "100%", condition: "Small slimes only" },
            { item: "slime_ball", count: "0-6", chance: "100%", condition: "Medium slimes" },
            { item: "slime_ball", count: "0-12", chance: "100%", condition: "Large slimes" }
        ],
        added: "1.0.0"
    },
    {
        id: "ghast", name: "Ghast", category: "hostile", health: 10, xp: 5,
        spawns: ["nether_wastes", "soul_sand_valley"],
        drops: [
            { item: "gunpowder", count: "0-2", chance: "100%", condition: "Always" },
            { item: "ghast_tear", count: "0-1", chance: "50%", condition: "With Looting III: up to 12.5%" }
        ],
        added: "1.0.0"
    },
    {
        id: "blaze", name: "Blaze", category: "hostile", health: 20, xp: 10,
        spawns: ["nether_fortress"],
        drops: [
            { item: "blaze_rod", count: "0-1", chance: "50%", condition: "With Looting III: up to 75%" }
        ],
        added: "1.0.0"
    },
    {
        id: "magma_cube", name: "Magma Cube", category: "hostile", health: "1 (big: 4, huge: 16)", xp: 1,
        spawns: ["nether"],
        drops: [
            { item: "magma_cream", count: "1", chance: "100%", condition: "Medium/Large only" }
        ],
        added: "1.0.0"
    },
    {
        id: "cave_spider", name: "Cave Spider", category: "hostile", health: 12, xp: 5,
        spawns: ["mineshaft"],
        drops: [
            { item: "string", count: "0-1", chance: "100%", condition: "Always" },
            { item: "spider_eye", count: "0-1", chance: "33.3%", condition: "With Looting III: up to 52.3%" }
        ],
        added: "1.0.0"
    },
    {
        id: "silverfish", name: "Silverfish", category: "hostile", health: 8, xp: 5,
        spawns: ["stronghold", "mountains"],
        drops: [
            { item: "silverfish", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.0.0"
    },
    {
        id: "endermite", name: "Endermite", category: "hostile", health: 8, xp: 5,
        spawns: ["end_portal"],
        drops: [
            { item: "ender_pearl", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.8"
    },
    {
        id: "guardian", name: "Guardian", category: "water", health: 30, xp: 10,
        spawns: ["ocean_monument"],
        drops: [
            { item: "prismarine_crystals", count: "0-2", chance: "100%", condition: "Always" },
            { item: "cooked_cod", count: "0-1", chance: "100%", condition: "Always" },
            { item: "prismarine_shard", count: "0-1", chance: "40%", condition: "With Looting III: up to 76%" },
            { item: "sponge", count: "1", chance: "2%", condition: "Rare drop" }
        ],
        added: "1.8"
    },
    {
        id: "elder_guardian", name: "Elder Guardian", category: "water", health: 80, xp: 10,
        spawns: ["ocean_monument"],
        drops: [
            { item: "prismarine_crystals", count: "0-2", chance: "100%", condition: "Always" },
            { item: "cooked_cod", count: "0-1", chance: "100%", condition: "Always" },
            { item: "prismarine_shard", count: "0-1", chance: "40%", condition: "With Looting III: up to 76%" },
            { item: "sponge", count: "1", chance: "100%", condition: "Always" },
            { item: "wet_sponge", count: "1", chance: "100%", condition: "First kill only" },
            { item: "elder_guardian_memory", count: "1", chance: "100%", condition: "First kill only" }
        ],
        added: "1.8"
    },
    {
        id: "phantom", name: "Phantom", category: "hostile", health: 20, xp: 5,
        spawns: ["night", "rain"],
        drops: [
            { item: "phantom_membrane", count: "0-1", chance: "50%", condition: "With Looting III: up to 75%" }
        ],
        added: "1.11"
    },
    {
        id: "drowned", name: "Drowned", category: "hostile", health: 20, xp: 5,
        spawns: ["ocean", "river", "night"],
        drops: [
            { item: "rotten_flesh", count: "0-2", chance: "100%", condition: "Always" },
            { item: "trident", count: "1", chance: "6.25%", condition: "Only drowned with tridents" },
            { item: "nautilus_shell", count: "1", chance: "3%", condition: "Java Edition" },
            { item: "copper_ingot", count: "0-1", chance: "100%", condition: "Drowned only" }
        ],
        added: "1.13"
    },
    {
        id: "husk", name: "Husk", category: "hostile", health: 20, xp: 5,
        spawns: ["desert"],
        drops: [
            { item: "rotten_flesh", count: "0-2", chance: "100%", condition: "Always" },
            { item: "iron_ingot", count: "1", chance: "1%", condition: "Rare drop" },
            { item: "carrot", count: "1", chance: "0.8%", condition: "Rare drop" },
            { item: "potato", count: "1", chance: "0.8%", condition: "Rare drop" },
            { item: "iron_helmet", count: "1", chance: "100%", condition: "When wearing" },
            { item: "iron_shovel", count: "1", chance: "100%", condition: "When holding" }
        ],
        added: "1.10"
    },
    {
        id: "stray", name: "Stray", category: "hostile", health: 20, xp: 5,
        spawns: ["snowy_plains", "ice_spikes"],
        drops: [
            { item: "arrow", count: "0-2", chance: "100%", condition: "Always (slowness)" },
            { item: "bone", count: "0-2", chance: "100%", condition: "Always" },
            { item: "bow", count: "1", chance: "8.5%", condition: "Rare drop" }
        ],
        added: "1.10"
    },
    {
        id: "wither_skeleton", name: "Wither Skeleton", category: "hostile", health: 20, xp: 5,
        spawns: ["nether_fortress"],
        drops: [
            { item: "bone", count: "0-2", chance: "100%", condition: "Always" },
            { item: "coal", count: "0-1", chance: "33.3%", condition: "With Looting III: up to 55%" },
            { item: "wither_skeleton_skull", count: "1", chance: "2.5%", condition: "With Looting III: up to 5.5%" }
        ],
        added: "1.4"
    },
    {
        id: "piglin_brute", name: "Piglin Brute", category: "hostile", health: 50, xp: 20,
        spawns: ["bastion_remnant"],
        drops: [
            { item: "golden_axe", count: "1", chance: "100%", condition: "Always" },
            { item: "gold_nugget", count: "0-1", chance: "100%", condition: "Always" },
            { item: "gold_ingot", count: "0-1", chance: "2.5%", condition: "Rare drop" }
        ],
        added: "1.16"
    },
    {
        id: "hoglin", name: "Hoglin", category: "hostile", health: 40, xp: 5,
        spawns: ["crimson_forest"],
        drops: [
            { item: "raw_porkchop", count: "2-4", chance: "100%", condition: "Adult" },
            { item: "leather", count: "0-1", chance: "100%", condition: "Adult" },
            { item: "cooked_porkchop", count: "2-4", chance: "100%", condition: "Adult (on fire)" }
        ],
        added: "1.16"
    },
    {
        id: "zoglin", name: "Zoglin", category: "hostile", health: 40, xp: 5,
        spawns: ["nether"],
        drops: [
            { item: "rotten_flesh", count: "2-4", chance: "100%", condition: "Adult" }
        ],
        added: "1.16"
    },
    {
        id: "shulker", name: "Shulker", category: "hostile", health: 30, xp: 5,
        spawns: ["end_city"],
        drops: [
            { item: "shulker_shell", count: "0-1", chance: "50%", condition: "With Looting III: up to 75%" }
        ],
        added: "1.9"
    },
    {
        id: "vindicator", name: "Vindicator", category: "hostile", health: 24, xp: 10,
        spawns: ["pillager_outpost", "woodland_mansion"],
        drops: [
            { item: "emerald", count: "0-1", chance: "100%", condition: "Always" },
            { item: "iron_axe", count: "1", chance: "8.5%", condition: "Rare drop" }
        ],
        added: "1.11"
    },
    {
        id: "evoker", name: "Evoker", category: "hostile", health: 24, xp: 10,
        spawns: ["woodland_mansion"],
        drops: [
            { item: "totem_of_undying", count: "1", chance: "100%", condition: "Always" },
            { item: "emerald", count: "0-1", chance: "100%", condition: "Always" }
        ],
        added: "1.11"
    },
    {
        id: "pillager", name: "Pillager", category: "hostile", health: 24, xp: 5,
        spawns: ["pillager_outpost", "patrols"],
        drops: [
            { item: "arrow", count: "0-2", chance: "100%", condition: "Always" },
            { item: "emerald", count: "0-2", chance: "100%", condition: "Always" },
            { item: "crossbow", count: "1", chance: "8.5%", condition: "Rare drop" }
        ],
        added: "1.14"
    },
    {
        id: "ravager", name: "Ravager", category: "hostile", health: 100, xp: 20,
        spawns: ["raids"],
        drops: [
            { item: "saddle", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.14"
    },
    {
        id: "warden", name: "Warden", category: "hostile", health: 500, xp: 5,
        spawns: ["deep_dark"],
        drops: [
            { item: "sculk_catalyst", count: "1", chance: "100%", condition: "Always" },
            { item: "echo_shard", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.19"
    },
    {
        id: "breeze", name: "Breeze", category: "hostile", health: 30, xp: 10,
        spawns: ["trial_chambers"],
        drops: [
            { item: "breeze_rod", count: "1-2", chance: "100%", condition: "Always" },
            { item: "wind_charge", count: "1-2", chance: "100%", condition: "Always" }
        ],
        added: "1.21"
    },
    {
        id: "bogged", name: "Bogged", category: "hostile", health: 20, xp: 5,
        spawns: ["mangrove_swamp", "trial_chambers"],
        drops: [
            { item: "arrow", count: "0-2", chance: "100%", condition: "Poison tipped" },
            { item: "bone", count: "0-2", chance: "100%", condition: "Always" },
            { item: "bow", count: "1", chance: "8.5%", condition: "Rare drop" }
        ],
        added: "1.21"
    },

    // === BOSS MOBS ===
    {
        id: "ender_dragon", name: "Ender Dragon", category: "boss", health: 200, xp: 12000,
        spawns: ["the_end"],
        drops: [
            { item: "dragon_egg", count: "1", chance: "100%", condition: "First kill only" },
            { item: "experience_orb", count: "12000", chance: "100%", condition: "Always" },
            { item: "elytra", count: "1", chance: "100%", condition: "Found in End Ship" }
        ],
        added: "alpha-1.0.0"
    },
    {
        id: "wither", name: "Wither", category: "boss", health: 300, xp: 50,
        spawns: ["player_spawned"],
        drops: [
            { item: "nether_star", count: "1", chance: "100%", condition: "Always" }
        ],
        added: "1.4.2"
    },
    {
        id: "elder_guardian", name: "Elder Guardian", category: "boss", health: 80, xp: 10,
        spawns: ["ocean_monument"],
        drops: [
            { item: "prismarine_crystals", count: "0-2", chance: "100%", condition: "Always" },
            { item: "cooked_cod", count: "0-1", chance: "100%", condition: "Always" },
            { item: "prismarine_shard", count: "0-1", chance: "40%", condition: "With Looting III: up to 76%" },
            { item: "sponge", count: "1", chance: "100%", condition: "Always" },
            { item: "wet_sponge", count: "1", chance: "100%", condition: "First kill only" }
        ],
        added: "1.8"
    },

    // === UTILITY MOBS ===
    {
        id: "iron_golem", name: "Iron Golem", category: "utility", health: 100, xp: 5,
        spawns: ["villages"],
        drops: [
            { item: "iron_ingot", count: "3-5", chance: "100%", condition: "Always" },
            { item: "poppy", count: "0-2", chance: "100%", condition: "Always" }
        ],
        added: "1.0.0"
    },
    {
        id: "snow_golem", name: "Snow Golem", category: "utility", health: 4, xp: 0,
        spawns: ["player_spawned"],
        drops: [
            { item: "snowball", count: "4-16", chance: "100%", condition: "Always" },
            { item: "pumpkin", count: "1", chance: "100%", condition: "When broken" }
        ],
        added: "1.0.0"
    },
    {
        id: "wandering_trader", name: "Wandering Trader", category: "npc", health: 20, xp: 1,
        spawns: ["any"],
        drops: [
            { item: "milk_bucket", count: "1-3", chance: "100%", condition: "When holding" },
            { item: "lead", count: "1-3", chance: "100%", condition: "When holding" },
            { item: "emerald", count: "0-1", chance: "100%", condition: "Always" },
            { item: "potion", count: "1-3", chance: "100%", condition: "When holding" }
        ],
        added: "1.14"
    },
    {
        id: "villager", name: "Villager", category: "npc", health: 20, xp: 1,
        spawns: ["villages"],
        drops: [
            { item: "emerald", count: "0-1", chance: "100%", condition: "When killed by player" },
            { item: "bread", count: "0-2", chance: "100%", condition: "When killed by player" },
            { item: "wheat", count: "0-3", chance: "100%", condition: "When killed by player" },
            { item: "potato", count: "0-4", chance: "100%", condition: "When killed by player" },
            { item: "carrot", count: "0-3", chance: "100%", condition: "When killed by player" },
            { item: "beetroot", count: "0-3", chance: "100%", condition: "When killed by player" }
        ],
        added: "1.0.0"
    },
];

function getMobs() {
    return MOBS;
}

function getMobById(id) {
    return MOBS.find(m => m.id === id);
}

function getMobsByCategory(category) {
    if (!category) return MOBS;
    return MOBS.filter(m => m.category === category);
}

function searchMobs(query) {
    const q = query.toLowerCase();
    return MOBS.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.drops.some(d => d.item.toLowerCase().includes(q))
    );
}

function populateMobCategories(selectElement) {
    const categories = [...new Set(MOBS.map(m => m.category))];
    selectElement.innerHTML = '<option value="">All Mobs</option>';
    categories.sort().forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = MOB_CATEGORIES[cat] || cat;
        selectElement.appendChild(opt);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MOBS, MOB_CATEGORIES, getMobs, getMobById, getMobsByCategory, searchMobs, populateMobCategories };
}