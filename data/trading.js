// Villager Trading Data
const VILLAGER_PROFESSIONS = [
    { id: "farmer", name: "Farmer", workstation: "composter", icon: "🌾", color: "#8BC34A" },
    { id: "fisherman", name: "Fisherman", workstation: "barrel", icon: "🎣", color: "#2196F3" },
    { id: "shepherd", name: "Shepherd", workstation: "loom", icon: "🐑", color: "#9E9E9E" },
    { id: "fletcher", name: "Fletcher", workstation: "fletching_table", icon: "🏹", color: "#795548" },
    { id: "librarian", name: "Librarian", workstation: "lectern", icon: "📚", color: "#F44336" },
    { id: "cartographer", name: "Cartographer", workstation: "cartography_table", icon: "🗺️", color: "#FF9800" },
    { id: "cleric", name: "Cleric", workstation: "brewing_stand", icon: "⚗️", color: "#9C27B0" },
    { id: "armorer", name: "Armorer", workstation: "blast_furnace", icon: "🛡️", color: "#607D8B" },
    { id: "weaponsmith", name: "Weaponsmith", workstation: "grindstone", icon: "⚔️", color: "#B71C1C" },
    { id: "toolsmith", name: "Toolsmith", workstation: "smithing_table", icon: "🔨", color: "#5D4037" },
    { id: "butcher", name: "Butcher", workstation: "smoker", icon: "🥩", color: "#D32F2F" },
    { id: "leatherworker", name: "Leatherworker", workstation: "cauldron", icon: "👜", color: "#795548" },
    { id: "stone_mason", name: "Stone Mason", workstation: "stonecutter", icon: "🧱", color: "#455A64" },
    { id: "nitwit", name: "Nitwit", workstation: "none", icon: "🤷", color: "#9E9E9E" },
    { id: "unemployed", name: "Unemployed", workstation: "none", icon: "❓", color: "#BDBDBD" },
];

const VILLAGER_TRADES = {
    farmer: {
        apprentice: [
            { item: "pumpkin", cost: "6-10", reward: "emerald", count: 1 },
            { item: "melon_slice", cost: "4-8", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "carrot", cost: "15-19", reward: "emerald", count: 1 },
            { item: "potato", cost: "15-19", reward: "emerald", count: 1 },
            { item: "beetroot", cost: "15-19", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "baked_potato", cost: "10-14", reward: "emerald", count: 1 },
            { item: "pumpkin_pie", cost: "14-18", reward: "emerald", count: 1 },
            { item: "cake", cost: "1-1", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "golden_carrot", cost: "12-16", reward: "emerald", count: 1 },
        ],
        novice: [
            { item: "wheat", cost: "20-26", reward: "emerald", count: 1 },
            { item: "emerald", cost: 1, reward: "bread", count: 6 },
        ]
    },
    fisherman: {
        apprentice: [
            { item: "string", cost: "20-26", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "coal", cost: "15-20", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "campfire", cost: "1-1", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "cod", cost: "18-22", reward: "emerald", count: 1 },
            { item: "salmon", cost: "18-22", reward: "emerald", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 1, reward: "cooked_cod", count: 6 },
        ]
    },
    librarian: {
        apprentice: [
            { item: "paper", cost: "24-36", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "book", cost: "8-12", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "quartz", cost: "12-16", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "clock", cost: "1-1", reward: "emerald", count: 1 },
            { item: "compass", cost: "1-1", reward: "emerald", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: "5-64", reward: "book", count: 1, note: "Enchanted book available" }
        ]
    },
    armorer: {
        apprentice: [
            { item: "coal", cost: "15-20", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "iron_ingot", cost: "4-9", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "diamond", cost: "13-27", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "emerald", cost: "13-27", reward: "diamond_chestplate", count: 1 },
            { item: "emerald", cost: "11-15", reward: "diamond_helmet", count: 1 },
            { item: "emerald", cost: "9-11", reward: "diamond_leggings", count: 1 },
            { item: "emerald", cost: "7-9", reward: "diamond_boots", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 5, reward: "iron_helmet", count: 1 },
            { item: "emerald", cost: 9, reward: "iron_chestplate", count: 1 },
            { item: "emerald", cost: 7, reward: "iron_leggings", count: 1 },
            { item: "emerald", cost: 5, reward: "iron_boots", count: 1 },
        ]
    },
    weaponsmith: {
        apprentice: [
            { item: "coal", cost: "15-20", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "iron_ingot", cost: "4-9", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "diamond", cost: "13-27", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "emerald", cost: "17-21", reward: "diamond_sword", count: 1 },
            { item: "emerald", cost: "12-15", reward: "diamond_axe", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 3, reward: "iron_sword", count: 1 },
            { item: "emerald", cost: 7, reward: "iron_axe", count: 1 },
            { item: "grindstone", cost: 1, reward: "emerald", count: 1 },
        ]
    },
    toolsmith: {
        apprentice: [
            { item: "coal", cost: "15-20", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "iron_ingot", cost: "4-9", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "diamond", cost: "13-27", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "emerald", cost: "13-15", reward: "diamond_pickaxe", count: 1 },
            { item: "emerald", cost: "9-12", reward: "diamond_shovel", count: 1 },
            { item: "emerald", cost: "8-12", reward: "diamond_hoe", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 3, reward: "stone_pickaxe", count: 1 },
            { item: "emerald", cost: 1, reward: "stone_axe", count: 1 },
        ]
    },
    cleric: {
        apprentice: [
            { item: "rotten_flesh", cost: "15-20", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "emerald", cost: 1, reward: "ender_pearl", count: 1 },
        ],
        expert: [
            { item: "emerald", cost: 1, reward: "glowstone", count: 1 },
        ],
        master: [
            { item: "emerald", cost: 3, reward: "nether_wart", count: 1 },
            { item: "bottle_o_enchanting", cost: "4-7", reward: "emerald", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 1, reward: "redstone", count: 1 },
            { item: "emerald", cost: 1, reward: "lapis_lazuli", count: 1 },
        ]
    },
    butcher: {
        apprentice: [
            { item: "raw_chicken", cost: "14-18", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "raw_beef", cost: "14-18", reward: "emerald", count: 1 },
            { item: "raw_porkchop", cost: "14-18", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "raw_mutton", cost: "14-18", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "raw_rabbit", cost: "14-18", reward: "emerald", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 1, reward: "cooked_chicken", count: 8 },
            { item: "emerald", cost: 1, reward: "cooked_porkchop", count: 8 },
        ]
    },
    leatherworker: {
        apprentice: [
            { item: "flint", cost: "10-14", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "rabbit_hide", cost: "8-12", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "leather", cost: "7-12", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "emerald", cost: "5-7", reward: "leather_helmet", count: 1 },
            { item: "emerald", cost: "7-9", reward: "leather_chestplate", count: 1 },
            { item: "emerald", cost: "5-7", reward: "leather_leggings", count: 1 },
            { item: "emerald", cost: "5-7", reward: "leather_boots", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 3, reward: "leather", count: 4 },
        ]
    },
    stone_mason: {
        apprentice: [
            { item: "clay_ball", cost: "10-14", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "stone", cost: "20-26", reward: "emerald", count: 1 },
            { item: "smooth_stone", cost: "20-26", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "dripstone_block", cost: "10-14", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "emerald", cost: "1-1", reward: "quartz", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 1, reward: "bricks", count: 10 },
            { item: "emerald", cost: 1, reward: "nether_bricks", count: 4 },
        ]
    },
    fletcher: {
        apprentice: [
            { item: "flint", cost: "10-14", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "string", cost: "14-18", reward: "emerald", count: 1 },
        ],
        expert: [
            { item: "feather", cost: "24-36", reward: "emerald", count: 1 },
        ],
        master: [
            { item: "emerald", cost: 1, reward: "bow", count: 1 },
            { item: "emerald", cost: 2, reward: "crossbow", count: 1 },
        ],
        novice: [
            { item: "emerald", cost: 1, reward: "arrow", count: 16 },
        ]
    },
    shepherd: {
        apprentice: [
            { item: "white_wool", cost: "18-22", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "emerald", cost: 3, reward: "shears", count: 1 },
        ],
        expert: [
            { item: "emerald", cost: 1, reward: "painting", count: 1 },
        ],
        master: [],
        novice: [
            { item: "emerald", cost: 1, reward: "bed", count: 1 },
        ]
    },
    cartographer: {
        apprentice: [
            { item: "paper", cost: "24-36", reward: "emerald", count: 1 },
        ],
        journeyman: [
            { item: "emerald", cost: 8, reward: "empty_map", count: 1 },
        ],
        expert: [
            { item: "compass", cost: 1, reward: "emerald", count: 1 },
        ],
        master: [
            { item: "emerald", cost: "12-14", reward: "ocean_explorer_map", count: 1 },
            { item: "emerald", cost: "14-16", reward: "woodland_explorer_map", count: 1 },
        ],
        novice: []
    },
};

function getVillagerProfessions() {
    return VILLAGER_PROFESSIONS;
}

function getVillagerTrades(professionId) {
    return VILLAGER_TRADES[professionId] || {};
}

function getAllTrades() {
    const allTrades = [];
    Object.entries(VILLAGER_TRADES).forEach(([profession, levels]) => {
        Object.entries(levels).forEach(([level, trades]) => {
            trades.forEach(trade => {
                allTrades.push({ ...trade, profession, level });
            });
        });
    });
    return allTrades;
}

function searchTrades(query) {
    const q = query.toLowerCase();
    return getAllTrades().filter(t =>
        t.item.replace(/_/g, ' ').includes(q) ||
        t.reward.replace(/_/g, ' ').includes(q) ||
        t.profession.replace(/_/g, ' ').includes(q)
    );
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VILLAGER_PROFESSIONS, VILLAGER_TRADES, getVillagerProfessions, getVillagerTrades, getAllTrades, searchTrades };
}