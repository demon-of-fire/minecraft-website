// Block Properties Data
const BLOCKS = [
    { id: "stone", name: "Stone", hardness: 1.5, blastResistance: 6.0, tool: "pickaxe", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "cobblestone", name: "Cobblestone", hardness: 2.0, blastResistance: 6.0, tool: "pickaxe", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "deepslate", name: "Deepslate", hardness: 3.0, blastResistance: 6.0, tool: "pickaxe", toolLevel: 1, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "bedrock", name: "Bedrock", hardness: -1, blastResistance: 18000000, tool: null, toolLevel: -1, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "sand", name: "Sand", hardness: 0.5, blastResistance: 0.5, tool: "shovel", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "gravel", name: "Gravel", hardness: 0.6, blastResistance: 0.6, tool: "shovel", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "dirt", name: "Dirt", hardness: 0.5, blastResistance: 0.5, tool: "shovel", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "grass_block", name: "Grass Block", hardness: 0.6, blastResistance: 0.6, tool: "shovel", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "oak_log", name: "Oak Log", hardness: 2.0, blastResistance: 2.0, tool: "axe", toolLevel: 0, lightLevel: 0, transparent: false, flammable: true, category: "wood" },
    { id: "oak_planks", name: "Oak Planks", hardness: 2.0, blastResistance: 3.0, tool: "axe", toolLevel: 0, lightLevel: 0, transparent: false, flammable: true, category: "wood" },
    { id: "obsidian", name: "Obsidian", hardness: 50.0, blastResistance: 1200.0, tool: "pickaxe", toolLevel: 3, lightLevel: 0, transparent: false, flammable: false, category: "natural" },
    { id: "crying_obsidian", name: "Crying Obsidian", hardness: 50.0, blastResistance: 1200.0, tool: "pickaxe", toolLevel: 3, lightLevel: 10, transparent: false, flammable: false, category: "natural" },
    { id: "iron_ore", name: "Iron Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 1, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "gold_ore", name: "Gold Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 2, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "diamond_ore", name: "Diamond Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 2, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "emerald_ore", name: "Emerald Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 2, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "redstone_ore", name: "Redstone Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 2, lightLevel: 9, transparent: false, flammable: false, category: "ore" },
    { id: "lapis_ore", name: "Lapis Lazuli Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 1, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "coal_ore", name: "Coal Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "nether_gold_ore", name: "Nether Gold Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "copper_ore", name: "Copper Ore", hardness: 3.0, blastResistance: 3.0, tool: "pickaxe", toolLevel: 1, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "ancient_debris", name: "Ancient Debris", hardness: 30.0, blastResistance: 1200.0, tool: "pickaxe", toolLevel: 3, lightLevel: 0, transparent: false, flammable: false, category: "ore" },
    { id: "glass", name: "Glass", hardness: 0.3, blastResistance: 0.3, tool: null, toolLevel: -1, lightLevel: 0, transparent: true, flammable: false, category: "building" },
    { id: "glowstone", name: "Glowstone", hardness: 0.3, blastResistance: 0.3, tool: null, toolLevel: -1, lightLevel: 15, transparent: true, flammable: false, category: "nether" },
    { id: "shroomlight", name: "Shroomlight", hardness: 1.0, blastResistance: 1.0, tool: "axe", toolLevel: 0, lightLevel: 15, transparent: false, flammable: true, category: "nether" },
    { id: "sea_lantern", name: "Sea Lantern", hardness: 0.3, blastResistance: 1.5, tool: "pickaxe", toolLevel: 0, lightLevel: 15, transparent: true, flammable: false, category: "decoration" },
    { id: "jack_o_lantern", name: "Jack o'Lantern", hardness: 1.0, blastResistance: 1.0, tool: "axe", toolLevel: 0, lightLevel: 15, transparent: false, flammable: true, category: "decoration" },
    { id: "torch", name: "Torch", hardness: 0.0, blastResistance: 0.0, tool: null, toolLevel: -1, lightLevel: 14, transparent: true, flammable: true, category: "decoration" },
    { id: "lantern", name: "Lantern", hardness: 0.3, blastResistance: 1.5, tool: "pickaxe", toolLevel: 0, lightLevel: 15, transparent: true, flammable: false, category: "decoration" },
    { id: "soul_torch", name: "Soul Torch", hardness: 0.0, blastResistance: 0.0, tool: null, toolLevel: -1, lightLevel: 10, transparent: true, flammable: false, category: "decoration" },
    { id: "soul_lantern", name: "Soul Lantern", hardness: 0.3, blastResistance: 1.5, tool: "pickaxe", toolLevel: 0, lightLevel: 10, transparent: true, flammable: false, category: "decoration" },
    { id: "end_rod", name: "End Rod", hardness: 0.0, blastResistance: 0.0, tool: "pickaxe", toolLevel: 0, lightLevel: 14, transparent: true, flammable: false, category: "decoration" },
    { id: "crying_obsidian", name: "Crying Obsidian", hardness: 50.0, blastResistance: 1200.0, tool: "pickaxe", toolLevel: 3, lightLevel: 10, transparent: false, flammable: false, category: "natural" },
    { id: "oak_fence", name: "Oak Fence", hardness: 2.0, blastResistance: 3.0, tool: "axe", toolLevel: 0, lightLevel: 0, transparent: true, flammable: true, category: "building" },
    { id: "iron_bars", name: "Iron Bars", hardness: 5.0, blastResistance: 30.0, tool: "pickaxe", toolLevel: 1, lightLevel: 0, transparent: true, flammable: false, category: "building" },
    { id: "netherite_block", name: "Block of Netherite", hardness: 55.0, blastResistance: 1200.0, tool: "pickaxe", toolLevel: 3, lightLevel: 0, transparent: false, flammable: false, category: "mineral" },
    { id: "emerald_block", name: "Block of Emerald", hardness: 5.0, blastResistance: 6.0, tool: "pickaxe", toolLevel: 2, lightLevel: 0, transparent: false, flammable: false, category: "mineral" },
    { id: "diamond_block", name: "Block of Diamond", hardness: 5.0, blastResistance: 6.0, tool: "pickaxe", toolLevel: 2, lightLevel: 0, transparent: false, flammable: false, category: "mineral" },
    { id: "gold_block", name: "Block of Gold", hardness: 3.0, blastResistance: 6.0, tool: "pickaxe", toolLevel: 2, lightLevel: 0, transparent: false, flammable: false, category: "mineral" },
    { id: "iron_block", name: "Block of Iron", hardness: 5.0, blastResistance: 6.0, tool: "pickaxe", toolLevel: 1, lightLevel: 0, transparent: false, flammable: false, category: "mineral" },
    { id: "copper_block", name: "Block of Copper", hardness: 3.0, blastResistance: 6.0, tool: "pickaxe", toolLevel: 1, lightLevel: 0, transparent: false, flammable: false, category: "mineral" },
    { id: "amethyst_block", name: "Amethyst Block", hardness: 1.5, blastResistance: 1.5, tool: "pickaxe", toolLevel: 0, lightLevel: 0, transparent: false, flammable: false, category: "mineral" },
    { id: "honey_block", name: "Honey Block", hardness: 0.0, blastResistance: 0.0, tool: null, toolLevel: -1, lightLevel: 0, transparent: true, flammable: false, category: "misc" },
    { id: "slime_block", name: "Slime Block", hardness: 0.0, blastResistance: 0.0, tool: null, toolLevel: -1, lightLevel: 0, transparent: true, flammable: false, category: "misc" },
    { id: "bedrock", name: "Bedrock", hardness: -1, blastResistance: 18000003.0, tool: null, toolLevel: -1, lightLevel: 0, transparent: false, flammable: false, category: "unbreakable" },
    { id: "end_portal_frame", name: "End Portal Frame", hardness: -1, blastResistance: 18000003.0, tool: null, toolLevel: -1, lightLevel: 0, transparent: false, flammable: false, category: "unbreakable" },
    { id: "barrier", name: "Barrier", hardness: -1, blastResistance: 18000003.0, tool: null, toolLevel: -1, lightLevel: 0, transparent: true, flammable: false, category: "unbreakable" },
    { id: "command_block", name: "Command Block", hardness: -1, blastResistance: 18000003.0, tool: null, toolLevel: -1, lightLevel: 0, transparent: false, flammable: false, category: "unbreakable" },
];

const BLOCK_CATEGORIES = {
    natural: "Natural",
    building: "Building",
    wood: "Wood",
    ore: "Ore",
    mineral: "Mineral",
    decoration: "Decoration",
    nether: "Nether",
    misc: "Miscellaneous",
    unbreakable: "Unbreakable"
};

function getBlocks() {
    return BLOCKS;
}

function getBlocksByCategory(category) {
    if (!category) return BLOCKS;
    return BLOCKS.filter(b => b.category === category);
}

function searchBlocks(query) {
    const q = query.toLowerCase();
    return BLOCKS.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.tool.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
}

function compareBlocks(ids) {
    return ids.map(id => BLOCKS.find(b => b.id === id)).filter(Boolean);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BLOCKS, BLOCK_CATEGORIES, getBlocks, getBlocksByCategory, searchBlocks, compareBlocks };
}