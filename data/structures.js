// Structure & Location Data
const STRUCTURES = [
    {
        id: "stronghold", name: "Stronghold", dimension: "overworld", minDistance: 1408, maxDistance: 2688,
        description: "Contains the End Portal. 3 Strongholds per world in Java Edition.",
        location: "Use Eyes of Ender to locate. Found at Y: 12-36 typically.",
        loot: ["enchanted_book", "ender_pearl", "iron_ingot", "gold_ingot", "diamond"],
        tips: ["Craft at least 12 Eyes of Ender", "Each eye has a 10% chance to break", "Found at ring distances 1408-2688 blocks from spawn"],
        added: "alpha-1.0.0"
    },
    {
        id: "nether_fortress", name: "Nether Fortress", dimension: "nether", minDistance: 192, maxDistance: 1000,
        description: "Massive bridge-like structures in the Nether. Home to Blazes and Wither Skeletons.",
        location: "Spawns in specific Nether biomes, usually at Z-axis aligned.",
        loot: ["nether_wart", "saddle", "gold_horse_armor", "iron_horse_armor", "diamond_horse_armor"],
        tips: ["Farm Blazes for Blaze Rods", "Wither Skeletons drop Wither Skeleton Skulls", "Look for Nether Wart gardens"],
        added: "alpha-1.0.0"
    },
    {
        id: "ocean_monument", name: "Ocean Monument", dimension: "overworld", minDistance: 1000, maxDistance: 3000,
        description: "Underwater temple guarded by Guardians and 3 Elder Guardians.",
        location: "Found in Deep Ocean biomes, 1000-3000 blocks from spawn.",
        loot: ["sponge", "prismarine_crystals", "prismarine_shard", "gold_block"],
        tips: ["Bring water breathing potions", "Elder Guardians give Mining Fatigue", "Elder Guardians drop sponges"],
        added: "1.8"
    },
    {
        id: "mineshaft", name: "Mineshaft", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "Underground structures with rails and minecarts. Home to Cave Spiders.",
        location: "Found underground at any distance from spawn.",
        loot: ["golden_apple", "iron_ingot", "gold_ingot", "diamond", "name_tag", "saddle"],
        tips: ["Look for cobwebs", "Cave Spider spawners can be useful", "Often connects to other structures"],
        added: "alpha-1.0.0"
    },
    {
        id: "woodland_mansion", name: "Woodland Mansion", dimension: "overworld", minDistance: 10000, maxDistance: 20000,
        description: "Massive 3-story mansion. Home to Evokers and Vindicators.",
        location: "Found in Dark Forest biomes, very far from spawn.",
        loot: ["totem_of_undying", "emerald", "diamond"],
        tips: ["Evokers drop Totems of Undying", "Use Cartographer maps to find", "Contains secret rooms"],
        added: "1.11"
    },
    {
        id: "pillager_outpost", name: "Pillager Outpost", dimension: "overworld", minDistance: 500, maxDistance: 5000,
        description: "Watchtower guarded by Pillagers and Ravagers.",
        location: "Found in most biomes, 500-5000 blocks from spawn.",
        loot: ["crossbow", "emerald", "arrow", "iron_helmet", "tripwire_hook"],
        tips: ["Raid trigger when completed", "Look for Allays in cages", "Contains a cage with a Villager"],
        added: "1.14"
    },
    {
        id: "village", name: "Village", dimension: "overworld", minDistance: 200, maxDistance: 400,
        description: "Homes to Villagers and Iron Golems. Varies by biome.",
        location: "Found in Plains, Savanna, Desert, Taiga, and Snowy biomes.",
        loot: ["iron_ingot", "emerald", "diamond", "emerald_block"],
        tips: ["Trade with Villagers", "Iron Golems spawn naturally", "Cure Zombie Villagers for discounts"],
        added: "alpha-1.0.0"
    },
    {
        id: "bastion_remnant", name: "Bastion Remnant", dimension: "nether", minDistance: 192, maxDistance: 1000,
        description: "Massive piglin structures in the Nether. Home to Piglins and Piglin Brutes.",
        location: "Found in all Nether biomes except Basalt Deltas.",
        loot: ["ancient_debris", "gold_block", "gilded_blackstone", "netherite_scrap"],
        tips: ["Don't open chests without Gold armor", "Piglin Brutes always attack", "4 variants with different loot"],
        added: "1.16"
    },
    {
        id: "end_city", name: "End City", dimension: "the_end", minDistance: 0, maxDistance: 0,
        description: "Tall towers in the outer End islands. Home to Shulkers.",
        location: "Found in the outer End islands after defeating the Ender Dragon.",
        loot: ["elytra", "diamond", "iron_ingot", "gold_ingot", "enchanted_book"],
        tips: ["Contains Elytra in End Ships", "Shulkers drop Shulker Shells", "Be careful of void falls"],
        added: "1.9"
    },
    {
        id: "ruined_portal", name: "Ruined Portal", dimension: "overworld_and_nether", minDistance: 0, maxDistance: 99999,
        description: "Partially built Nether Portals with loot chests.",
        location: "Found in both Overworld and Nether.",
        loot: ["gold_ingot", "gold_nugget", "flint_and_steel", "obsidian", "golden_apple"],
        tips: ["Can be completed quickly", "Loot scales with portal completion", "Found at any distance"],
        added: "1.16"
    },
    {
        id: "shipwreck", name: "Shipwreck", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "Sunken ships on beaches or underwater. Contains treasure maps.",
        location: "Found on beaches or underwater.",
        loot: ["treasure_map", "iron_ingot", "gold_ingot", "diamond", "emerald", "compass"],
        tips: ["Look for Buried Treasure maps", "Maps lead to Buried Treasure", "Can be partially buried"],
        added: "1.13"
    },
    {
        id: "buried_treasure", name: "Buried Treasure", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "Hidden treasure chests buried on beaches.",
        location: "Found on beaches, marked by Shipwreck treasure maps.",
        loot: ["heart_of_the_sea", "iron_ingot", "gold_ingot", "diamond", "emerald", "cooked_cod"],
        tips: ["Use treasure map from Shipwreck", "Always contains Heart of the Sea", "Usually 1 block under sand/gravel"],
        added: "1.13"
    },
    {
        id: "desert_temple", name: "Desert Temple", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "Ancient desert structure with hidden treasure and TNT trap.",
        location: "Found in Desert biomes.",
        loot: ["diamond", "emerald", "iron_ingot", "gold_ingot", "lapis_lazuli", "tnt"],
        tips: ["Careful of TNT trap under center", "Dig down in the center pattern", "Contains 4 treasure chests"],
        added: "alpha-1.0.0"
    },
    {
        id: "jungle_temple", name: "Jungle Temple", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "Hidden temple with puzzle and trap.",
        location: "Found in Jungle biomes.",
        loot: ["diamond", "emerald", "iron_ingot", "gold_ingot", "name_tag"],
        tips: ["Solve the lever puzzle", "Watch out for arrow trap", "Hidden staircase on side"],
        added: "alpha-1.0.0"
    },
    {
        id: "witch_hut", name: "Witch Hut", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "Small hut in swamp biome. Home to a Witch.",
        location: "Found in Swamp biomes.",
        loot: ["cauldron", "brewing_stand"],
        tips: ["Witch spawns on a cat", "Can be converted to Witch farm", "Contains a cat"],
        added: "1.0.0"
    },
    {
        id: "igloo", name: "Igloo", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "Small snowy structure. Some have hidden basements.",
        location: "Found in Snowy Plains and Ice Spikes biomes.",
        loot: ["bed", "furnace", "crafting_table"],
        tips: ["50% chance of hidden basement", "Basement contains Zombie Villager", "Useful for Villager trading"],
        added: "1.6.1"
    },
    {
        id: "trail_chambers", name: "Trial Chambers", dimension: "overworld", minDistance: 0, maxDistance: 99999,
        description: "New 1.21 structures with Trial Spawners and Vaults.",
        location: "Found in the Deepslate layer.",
        loot: ["trial_key", "ominous_trial_key", "heavy_core", "breeze_rod", "wind_charge"],
        tips: ["Use Trial Keys on Trial Spawners", "Ominous Events give better loot", "Home to Breeze mobs"],
        added: "1.21"
    }
];

function getStructures() {
    return STRUCTURES;
}

function getStructuresByDimension(dimension) {
    if (!dimension) return STRUCTURES;
    return STRUCTURES.filter(s => s.dimension.includes(dimension));
}

function searchStructures(query) {
    const q = query.toLowerCase();
    return STRUCTURES.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.loot.some(l => l.toLowerCase().includes(q))
    );
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STRUCTURES, getStructures, getStructuresByDimension, searchStructures };
}