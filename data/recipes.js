// Minecraft Crafting Recipes Database
// Recipe types: crafting_table, crafting (2x2), furnace, blast_furnace, smoker, campfire, stonecutter, smithing_table, cartography_table, loom
// Grid format: [top-left, top-center, top-right, mid-left, mid-center, mid-right, bot-left, bot-center, bot-right]
// null = empty slot, string = item id, {id: string, count: number} = item with count

const RECIPES = [
    // === BASIC RESOURCES ===
    { id: "oak_planks", name: "Oak Planks", type: "crafting", result: "oak_planks", resultCount: 4, ingredients: ["oak_log"], category: "materials", added: "alpha-1.0.0", grid: [null,"oak_log",null,null,null,null,null,null,null] },
    { id: "spruce_planks", name: "Spruce Planks", type: "crafting", result: "spruce_planks", resultCount: 4, ingredients: ["spruce_log"], category: "materials", added: "beta-1.7.3", grid: [null,"spruce_log",null,null,null,null,null,null,null] },
    { id: "birch_planks", name: "Birch Planks", type: "crafting", result: "birch_planks", resultCount: 4, ingredients: ["birch_log"], category: "materials", added: "alpha-1.0.0", grid: [null,"birch_log",null,null,null,null,null,null,null] },
    { id: "jungle_planks", name: "Jungle Planks", type: "crafting", result: "jungle_planks", resultCount: 4, ingredients: ["jungle_log"], category: "materials", added: "beta-1.8", grid: [null,"jungle_log",null,null,null,null,null,null,null] },
    { id: "acacia_planks", name: "Acacia Planks", type: "crafting", result: "acacia_planks", resultCount: 4, ingredients: ["acacia_log"], category: "materials", added: "1.7.2", grid: [null,"acacia_log",null,null,null,null,null,null,null] },
    { id: "dark_oak_planks", name: "Dark Oak Planks", type: "crafting", result: "dark_oak_planks", resultCount: 4, ingredients: ["dark_oak_log"], category: "materials", added: "1.7.2", grid: [null,"dark_oak_log",null,null,null,null,null,null,null] },
    { id: "crimson_planks", name: "Crimson Planks", type: "crafting", result: "crimson_planks", resultCount: 4, ingredients: ["crimson_stem"], category: "materials", added: "1.16", grid: [null,"crimson_stem",null,null,null,null,null,null,null] },
    { id: "warped_planks", name: "Warped Planks", type: "crafting", result: "warped_planks", resultCount: 4, ingredients: ["warped_stem"], category: "materials", added: "1.16", grid: [null,"warped_stem",null,null,null,null,null,null,null] },
    { id: "stick", name: "Sticks", type: "crafting", result: "stick", resultCount: 4, ingredients: ["oak_planks"], category: "materials", added: "alpha-1.0.0", grid: [null,"oak_planks",null,null,"oak_planks",null,null,null,null] },
    { id: "crafting_table", name: "Crafting Table", type: "crafting", result: "crafting_table", resultCount: 1, ingredients: ["oak_planks"], category: "redstone", added: "alpha-1.0.0", grid: [null,null,null,"oak_planks","oak_planks",null,"oak_planks","oak_planks",null] },
    { id: "furnace", name: "Furnace", type: "crafting", result: "furnace", resultCount: 1, ingredients: ["cobblestone"], category: "redstone", added: "alpha-1.0.0", grid: ["cobblestone","cobblestone","cobblestone","cobblestone",null,"cobblestone","cobblestone","cobblestone","cobblestone"] },
    { id: "chest", name: "Chest", type: "crafting", result: "chest", resultCount: 1, ingredients: ["oak_planks"], category: "redstone", added: "alpha-1.0.0", grid: ["oak_planks","oak_planks","oak_planks","oak_planks",null,"oak_planks","oak_planks","oak_planks","oak_planks"] },

    // === TOOLS ===
    { id: "wooden_pickaxe", name: "Wooden Pickaxe", type: "crafting", result: "wooden_pickaxe", resultCount: 1, ingredients: ["oak_planks", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["oak_planks","oak_planks","oak_planks",null,"stick",null,null,"stick",null] },
    { id: "stone_pickaxe", name: "Stone Pickaxe", type: "crafting", result: "stone_pickaxe", resultCount: 1, ingredients: ["cobblestone", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["cobblestone","cobblestone","cobblestone",null,"stick",null,null,"stick",null] },
    { id: "iron_pickaxe", name: "Iron Pickaxe", type: "crafting", result: "iron_pickaxe", resultCount: 1, ingredients: ["iron_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["iron_ingot","iron_ingot","iron_ingot",null,"stick",null,null,"stick",null] },
    { id: "golden_pickaxe", name: "Golden Pickaxe", type: "crafting", result: "golden_pickaxe", resultCount: 1, ingredients: ["golden_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["golden_ingot","golden_ingot","golden_ingot",null,"stick",null,null,"stick",null] },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe", type: "crafting", result: "diamond_pickaxe", resultCount: 1, ingredients: ["diamond", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["diamond","diamond","diamond",null,"stick",null,null,"stick",null] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", type: "smithing_table", result: "netherite_pickaxe", resultCount: 1, ingredients: ["diamond_pickaxe", "netherite_ingot"], category: "tools", added: "1.16" },
    { id: "wooden_axe", name: "Wooden Axe", type: "crafting", result: "wooden_axe", resultCount: 1, ingredients: ["oak_planks", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["oak_planks","oak_planks",null,"oak_planks","stick",null,null,"stick",null] },
    { id: "stone_axe", name: "Stone Axe", type: "crafting", result: "stone_axe", resultCount: 1, ingredients: ["cobblestone", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["cobblestone","cobblestone",null,"cobblestone","stick",null,null,"stick",null] },
    { id: "iron_axe", name: "Iron Axe", type: "crafting", result: "iron_axe", resultCount: 1, ingredients: ["iron_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["iron_ingot","iron_ingot",null,"iron_ingot","stick",null,null,"stick",null] },
    { id: "golden_axe", name: "Golden Axe", type: "crafting", result: "golden_axe", resultCount: 1, ingredients: ["golden_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["golden_ingot","golden_ingot",null,"golden_ingot","stick",null,null,"stick",null] },
    { id: "diamond_axe", name: "Diamond Axe", type: "crafting", result: "diamond_axe", resultCount: 1, ingredients: ["diamond", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["diamond","diamond",null,"diamond","stick",null,null,"stick",null] },
    { id: "netherite_axe", name: "Netherite Axe", type: "smithing_table", result: "netherite_axe", resultCount: 1, ingredients: ["diamond_axe", "netherite_ingot"], category: "tools", added: "1.16" },
    { id: "wooden_shovel", name: "Wooden Shovel", type: "crafting", result: "wooden_shovel", resultCount: 1, ingredients: ["oak_planks", "stick"], category: "tools", added: "alpha-1.0.0", grid: [null,"oak_planks",null,null,"stick",null,null,"stick",null] },
    { id: "stone_shovel", name: "Stone Shovel", type: "crafting", result: "stone_shovel", resultCount: 1, ingredients: ["cobblestone", "stick"], category: "tools", added: "alpha-1.0.0", grid: [null,"cobblestone",null,null,"stick",null,null,"stick",null] },
    { id: "iron_shovel", name: "Iron Shovel", type: "crafting", result: "iron_shovel", resultCount: 1, ingredients: ["iron_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: [null,"iron_ingot",null,null,"stick",null,null,"stick",null] },
    { id: "golden_shovel", name: "Golden Shovel", type: "crafting", result: "golden_shovel", resultCount: 1, ingredients: ["golden_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: [null,"golden_ingot",null,null,"stick",null,null,"stick",null] },
    { id: "diamond_shovel", name: "Diamond Shovel", type: "crafting", result: "diamond_shovel", resultCount: 1, ingredients: ["diamond", "stick"], category: "tools", added: "alpha-1.0.0", grid: [null,"diamond",null,null,"stick",null,null,"stick",null] },
    { id: "netherite_shovel", name: "Netherite Shovel", type: "smithing_table", result: "netherite_shovel", resultCount: 1, ingredients: ["diamond_shovel", "netherite_ingot"], category: "tools", added: "1.16" },
    { id: "wooden_hoe", name: "Wooden Hoe", type: "crafting", result: "wooden_hoe", resultCount: 1, ingredients: ["oak_planks", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["oak_planks","oak_planks",null,null,"stick",null,null,"stick",null] },
    { id: "stone_hoe", name: "Stone Hoe", type: "crafting", result: "stone_hoe", resultCount: 1, ingredients: ["cobblestone", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["cobblestone","cobblestone",null,null,"stick",null,null,"stick",null] },
    { id: "iron_hoe", name: "Iron Hoe", type: "crafting", result: "iron_hoe", resultCount: 1, ingredients: ["iron_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["iron_ingot","iron_ingot",null,null,"stick",null,null,"stick",null] },
    { id: "golden_hoe", name: "Golden Hoe", type: "crafting", result: "golden_hoe", resultCount: 1, ingredients: ["golden_ingot", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["golden_ingot","golden_ingot",null,null,"stick",null,null,"stick",null] },
    { id: "diamond_hoe", name: "Diamond Hoe", type: "crafting", result: "diamond_hoe", resultCount: 1, ingredients: ["diamond", "stick"], category: "tools", added: "alpha-1.0.0", grid: ["diamond","diamond",null,null,"stick",null,null,"stick",null] },
    { id: "netherite_hoe", name: "Netherite Hoe", type: "smithing_table", result: "netherite_hoe", resultCount: 1, ingredients: ["diamond_hoe", "netherite_ingot"], category: "tools", added: "1.16" },
    { id: "flint_and_steel", name: "Flint and Steel", type: "crafting", result: "flint_and_steel", resultCount: 1, ingredients: ["iron_ingot", "flint"], category: "tools", added: "alpha-1.0.0", grid: [null,"iron_ingot",null,null,"flint",null,null,null,null] },
    { id: "shears", name: "Shears", type: "crafting", result: "shears", resultCount: 1, ingredients: ["iron_ingot"], category: "tools", added: "1.0.0", grid: [null,"iron_ingot",null,"iron_ingot",null,null,null,null,null] },
    { id: "fishing_rod", name: "Fishing Rod", type: "crafting", result: "fishing_rod", resultCount: 1, ingredients: ["stick", "string"], category: "tools", added: "alpha-1.0.0", grid: [null,null,"stick",null,"stick","string","stick",null,"string"] },

    // === WEAPONS ===
    { id: "wooden_sword", name: "Wooden Sword", type: "crafting", result: "wooden_sword", resultCount: 1, ingredients: ["oak_planks", "stick"], category: "weapons", added: "alpha-1.0.0", grid: [null,"oak_planks",null,null,"oak_planks",null,null,"stick",null] },
    { id: "stone_sword", name: "Stone Sword", type: "crafting", result: "stone_sword", resultCount: 1, ingredients: ["cobblestone", "stick"], category: "weapons", added: "alpha-1.0.0", grid: [null,"cobblestone",null,null,"cobblestone",null,null,"stick",null] },
    { id: "iron_sword", name: "Iron Sword", type: "crafting", result: "iron_sword", resultCount: 1, ingredients: ["iron_ingot", "stick"], category: "weapons", added: "alpha-1.0.0", grid: [null,"iron_ingot",null,null,"iron_ingot",null,null,"stick",null] },
    { id: "golden_sword", name: "Golden Sword", type: "crafting", result: "golden_sword", resultCount: 1, ingredients: ["golden_ingot", "stick"], category: "weapons", added: "alpha-1.0.0", grid: [null,"golden_ingot",null,null,"golden_ingot",null,null,"stick",null] },
    { id: "diamond_sword", name: "Diamond Sword", type: "crafting", result: "diamond_sword", resultCount: 1, ingredients: ["diamond", "stick"], category: "weapons", added: "alpha-1.0.0", grid: [null,"diamond",null,null,"diamond",null,null,"stick",null] },
    { id: "netherite_sword", name: "Netherite Sword", type: "smithing_table", result: "netherite_sword", resultCount: 1, ingredients: ["diamond_sword", "netherite_ingot"], category: "weapons", added: "1.16" },
    { id: "bow", name: "Bow", type: "crafting", result: "bow", resultCount: 1, ingredients: ["stick", "string"], category: "weapons", added: "alpha-1.0.0", grid: [null,"stick","string",null,"stick","string",null,"stick","string"] },
    { id: "crossbow", name: "Crossbow", type: "crafting", result: "crossbow", resultCount: 1, ingredients: ["iron_ingot", "stick", "string"], category: "weapons", added: "1.14", grid: ["iron_ingot","iron_ingot","iron_ingot",null,"string",null,null,"stick",null] },
    { id: "arrow", name: "Arrow", type: "crafting", result: "arrow", resultCount: 4, ingredients: ["flint", "stick", "feather"], category: "weapons", added: "alpha-1.0.0", grid: [null,null,"flint",null,"stick",null,null,"feather",null] },
    { id: "tipped_arrow_poison", name: "Tipped Arrow (Poison)", type: "crafting", result: "arrow", resultCount: 8, ingredients: ["arrow", "potion"], category: "weapons", added: "1.9", grid: [null,null,"arrow",null,"potion",null,null,"arrow",null], note: "Use any potion in center" },
    { id: "fire_charge", name: "Fire Charge", type: "crafting", result: "fire_charge", resultCount: 3, ingredients: ["blaze_powder", "coal", "gunpowder"], category: "weapons", added: "1.0.0", grid: [null,"blaze_powder",null,null,"coal",null,null,"gunpowder",null] },
    { id: "shield", name: "Shield", type: "crafting", result: "shield", resultCount: 1, ingredients: ["iron_ingot", "oak_planks"], category: "armor", added: "1.9", grid: ["iron_ingot","oak_planks","iron_ingot","oak_planks","oak_planks","oak_planks",null,"oak_planks",null] },

    // === ARMOR ===
    { id: "iron_helmet", name: "Iron Helmet", type: "crafting", result: "iron_helmet", resultCount: 1, ingredients: ["iron_ingot"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"iron_ingot","iron_ingot","iron_ingot",null,null,null] },
    { id: "iron_chestplate", name: "Iron Chestplate", type: "crafting", result: "iron_chestplate", resultCount: 1, ingredients: ["iron_ingot"], category: "armor", added: "alpha-1.0.0", grid: ["iron_ingot",null,"iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot"] },
    { id: "iron_leggings", name: "Iron Leggings", type: "crafting", result: "iron_leggings", resultCount: 1, ingredients: ["iron_ingot"], category: "armor", added: "alpha-1.0.0", grid: ["iron_ingot","iron_ingot","iron_ingot",null,null,null,"iron_ingot",null,"iron_ingot"] },
    { id: "iron_boots", name: "Iron Boots", type: "crafting", result: "iron_boots", resultCount: 1, ingredients: ["iron_ingot"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"iron_ingot",null,"iron_ingot","iron_ingot",null,"iron_ingot"] },
    { id: "diamond_helmet", name: "Diamond Helmet", type: "crafting", result: "diamond_helmet", resultCount: 1, ingredients: ["diamond"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"diamond","diamond","diamond",null,null,null] },
    { id: "diamond_chestplate", name: "Diamond Chestplate", type: "crafting", result: "diamond_chestplate", resultCount: 1, ingredients: ["diamond"], category: "armor", added: "alpha-1.0.0", grid: ["diamond",null,"diamond","diamond","diamond","diamond","diamond","diamond","diamond"] },
    { id: "diamond_leggings", name: "Diamond Leggings", type: "crafting", result: "diamond_leggings", resultCount: 1, ingredients: ["diamond"], category: "armor", added: "alpha-1.0.0", grid: ["diamond","diamond","diamond",null,null,null,"diamond",null,"diamond"] },
    { id: "diamond_boots", name: "Diamond Boots", type: "crafting", result: "diamond_boots", resultCount: 1, ingredients: ["diamond"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"diamond",null,"diamond","diamond",null,"diamond"] },
    { id: "golden_helmet", name: "Golden Helmet", type: "crafting", result: "golden_helmet", resultCount: 1, ingredients: ["golden_ingot"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"golden_ingot","golden_ingot","golden_ingot",null,null,null] },
    { id: "golden_chestplate", name: "Golden Chestplate", type: "crafting", result: "golden_chestplate", resultCount: 1, ingredients: ["golden_ingot"], category: "armor", added: "alpha-1.0.0", grid: ["golden_ingot",null,"golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot"] },
    { id: "golden_leggings", name: "Golden Leggings", type: "crafting", result: "golden_leggings", resultCount: 1, ingredients: ["golden_ingot"], category: "armor", added: "alpha-1.0.0", grid: ["golden_ingot","golden_ingot","golden_ingot",null,null,null,"golden_ingot",null,"golden_ingot"] },
    { id: "golden_boots", name: "Golden Boots", type: "crafting", result: "golden_boots", resultCount: 1, ingredients: ["golden_ingot"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"golden_ingot",null,"golden_ingot","golden_ingot",null,"golden_ingot"] },
    { id: "leather_helmet", name: "Leather Cap", type: "crafting", result: "leather_helmet", resultCount: 1, ingredients: ["leather"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"leather","leather","leather",null,null,null] },
    { id: "leather_chestplate", name: "Leather Tunic", type: "crafting", result: "leather_chestplate", resultCount: 1, ingredients: ["leather"], category: "armor", added: "alpha-1.0.0", grid: ["leather",null,"leather","leather","leather","leather","leather","leather","leather"] },
    { id: "leather_leggings", name: "Leather Pants", type: "crafting", result: "leather_leggings", resultCount: 1, ingredients: ["leather"], category: "armor", added: "alpha-1.0.0", grid: ["leather","leather","leather",null,null,null,"leather",null,"leather"] },
    { id: "leather_boots", name: "Leather Boots", type: "crafting", result: "leather_boots", resultCount: 1, ingredients: ["leather"], category: "armor", added: "alpha-1.0.0", grid: [null,null,null,"leather",null,"leather","leather",null,"leather"] },
    { id: "netherite_helmet", name: "Netherite Helmet", type: "smithing_table", result: "netherite_helmet", resultCount: 1, ingredients: ["diamond_helmet", "netherite_ingot"], category: "armor", added: "1.16" },
    { id: "netherite_chestplate", name: "Netherite Chestplate", type: "smithing_table", result: "netherite_chestplate", resultCount: 1, ingredients: ["diamond_chestplate", "netherite_ingot"], category: "armor", added: "1.16" },
    { id: "netherite_leggings", name: "Netherite Leggings", type: "smithing_table", result: "netherite_leggings", resultCount: 1, ingredients: ["diamond_leggings", "netherite_ingot"], category: "armor", added: "1.16" },
    { id: "netherite_boots", name: "Netherite Boots", type: "smithing_table", result: "netherite_boots", resultCount: 1, ingredients: ["diamond_boots", "netherite_ingot"], category: "armor", added: "1.16" },

    // === BLOCKS ===
    { id: "iron_block", name: "Block of Iron", type: "crafting", result: "iron_block", resultCount: 1, ingredients: ["iron_ingot"], category: "building", added: "alpha-1.0.0", grid: ["iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot","iron_ingot"] },
    { id: "gold_block", name: "Block of Gold", type: "crafting", result: "gold_block", resultCount: 1, ingredients: ["golden_ingot"], category: "building", added: "alpha-1.0.0", grid: ["golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot","golden_ingot"] },
    { id: "diamond_block", name: "Block of Diamond", type: "crafting", result: "diamond_block", resultCount: 1, ingredients: ["diamond"], category: "building", added: "alpha-1.0.0", grid: ["diamond","diamond","diamond","diamond","diamond","diamond","diamond","diamond","diamond"] },
    { id: "emerald_block", name: "Block of Emerald", type: "crafting", result: "emerald_block", resultCount: 1, ingredients: ["emerald"], category: "building", added: "1.3.1", grid: ["emerald","emerald","emerald","emerald","emerald","emerald","emerald","emerald","emerald"] },
    { id: "lapis_block", name: "Block of Lapis Lazuli", type: "crafting", result: "lapis_block", resultCount: 1, ingredients: ["lapis_lazuli"], category: "building", added: "alpha-1.0.0", grid: ["lapis_lazuli","lapis_lazuli","lapis_lazuli","lapis_lazuli","lapis_lazuli","lapis_lazuli","lapis_lapis","lapis_lazuli","lapis_lazuli"] },
    { id: "netherite_block", name: "Block of Netherite", type: "crafting", result: "netherite_block", resultCount: 1, ingredients: ["netherite_ingot"], category: "building", added: "1.16", grid: ["netherite_ingot","netherite_ingot","netherite_ingot","netherite_ingot","netherite_ingot","netherite_ingot","netherite_ingot","netherite_ingot","netherite_ingot"] },
    { id: "copper_block", name: "Block of Copper", type: "crafting", result: "copper_block", resultCount: 1, ingredients: ["copper_ingot"], category: "building", added: "1.17", grid: ["copper_ingot","copper_ingot","copper_ingot","copper_ingot","copper_ingot","copper_ingot","copper_ingot","copper_ingot","copper_ingot"] },
    { id: "redstone_block", name: "Block of Redstone", type: "crafting", result: "redstone_block", resultCount: 1, ingredients: ["redstone"], category: "redstone", added: "1.4.2", grid: ["redstone","redstone","redstone","redstone","redstone","redstone","redstone","redstone","redstone"] },
    { id: "quartz_block", name: "Block of Quartz", type: "crafting", result: "quartz_block", resultCount: 1, ingredients: ["quartz"], category: "building", added: "1.5", grid: ["quartz","quartz","quartz","quartz","quartz","quartz","quartz","quartz","quartz"] },
    { id: "brick_block", name: "Bricks", type: "crafting", result: "bricks", resultCount: 1, ingredients: ["brick"], category: "building", added: "alpha-1.0.0", grid: ["brick","brick","brick","brick","brick","brick","brick","brick","brick"] },
    { id: "nether_bricks", name: "Nether Bricks", type: "crafting", result: "nether_bricks", resultCount: 1, ingredients: ["nether_brick"], category: "building", added: "1.0.0", grid: ["nether_brick","nether_brick","nether_brick","nether_brick","nether_brick","nether_brick","nether_brick","nether_brick","nether_brick"] },
    { id: "end_stone_bricks", name: "End Stone Bricks", type: "crafting", result: "end_stone_bricks", resultCount: 4, ingredients: ["end_stone"], category: "building", added: "1.9", grid: ["end_stone","end_stone","end_stone","end_stone",null,null,null,null,null] },
    { id: "smooth_stone_slab", name: "Smooth Stone Slab", type: "crafting", result: "smooth_stone_slab", resultCount: 2, ingredients: ["smooth_stone"], category: "building", added: "1.13", grid: ["smooth_stone","smooth_stone","smooth_stone",null,null,null,null,null,null] },
    { id: "mossy_cobblestone", name: "Mossy Cobblestone", type: "crafting", result: "mossy_cobblestone", resultCount: 1, ingredients: ["cobblestone", "vine"], category: "building", added: "alpha-1.0.0", grid: ["cobblestone","vine","vine","vine","cobblestone","cobblestone","cobblestone","cobblestone","cobblestone"] },

    // === REDSTONE ===
    { id: "redstone_torch", name: "Redstone Torch", type: "crafting", result: "redstone_torch", resultCount: 1, ingredients: ["redstone", "stick"], category: "redstone", added: "alpha-1.0.0", grid: [null,"redstone",null,null,"stick",null,null,null,null] },
    { id: "lever", name: "Lever", type: "crafting", result: "lever", resultCount: 1, ingredients: ["cobblestone", "stick"], category: "redstone", added: "alpha-1.0.0", grid: [null,null,null,"stick",null,null,null,"cobblestone",null] },
    { id: "piston", name: "Piston", type: "crafting", result: "piston", resultCount: 1, ingredients: ["oak_planks", "cobblestone", "iron_ingot", "redstone"], category: "redstone", added: "1.0.0", grid: ["oak_planks","oak_planks","oak_planks","cobblestone","iron_ingot","cobblestone","cobblestone","redstone","cobblestone"] },
    { id: "sticky_piston", name: "Sticky Piston", type: "crafting", result: "sticky_piston", resultCount: 1, ingredients: ["piston", "slime_ball"], category: "redstone", added: "1.0.0", grid: [null,null,null,null,"slime_ball",null,null,"piston",null] },
    { id: "dispenser", name: "Dispenser", type: "crafting", result: "dispenser", resultCount: 1, ingredients: ["cobblestone", "bow", "redstone"], category: "redstone", added: "1.0.0", grid: ["cobblestone","cobblestone","cobblestone","cobblestone",null,"cobblestone",null,"redstone",null] },
    { id: "dropper", name: "Dropper", type: "crafting", result: "dropper", resultCount: 1, ingredients: ["cobblestone", "redstone"], category: "redstone", added: "1.5", grid: ["cobblestone","cobblestone","cobblestone","cobblestone",null,"cobblestone",null,"redstone",null] },
    { id: "repeater", name: "Redstone Repeater", type: "crafting", result: "repeater", resultCount: 1, ingredients: ["stone", "redstone_torch"], category: "redstone", added: "1.0.0", grid: [null,"redstone_torch",null,"redstone_torch","stone","redstone_torch",null,"stone",null] },
    { id: "comparator", name: "Redstone Comparator", type: "crafting", result: "comparator", resultCount: 1, ingredients: ["stone", "redstone_torch", "nether_quartz"], category: "redstone", added: "1.5", grid: [null,"redstone_torch",null,"redstone_torch","nether_quartz","redstone_torch",null,"stone",null] },
    { id: "redstone_lamp", name: "Redstone Lamp", type: "crafting", result: "redstone_lamp", resultCount: 1, ingredients: ["glowstone", "redstone"], category: "redstone", added: "1.3.1", grid: [null,null,null,"redstone","glowstone","redstone",null,null,null] },
    { id: "hopper", name: "Hopper", type: "crafting", result: "hopper", resultCount: 1, ingredients: ["iron_ingot", "chest"], category: "redstone", added: "1.5", grid: ["iron_ingot",null,"iron_ingot","iron_ingot","chest","iron_ingot",null,"iron_ingot",null] },
    { id: "observer", name: "Observer", type: "crafting", result: "observer", resultCount: 1, ingredients: ["cobblestone", "redstone", "nether_quartz"], category: "redstone", added: "1.11", grid: ["cobblestone","cobblestone","cobblestone","nether_quartz","redstone","cobblestone","cobblestone","cobblestone","cobblestone"] },
    { id: "note_block", name: "Note Block", type: "crafting", result: "note_block", resultCount: 1, ingredients: ["oak_planks", "redstone"], category: "redstone", added: "alpha-1.0.0", grid: ["oak_planks","oak_planks","oak_planks","oak_planks","redstone","oak_planks","oak_planks","oak_planks","oak_planks"] },
    { id: "target", name: "Target", type: "crafting", result: "target", resultCount: 1, ingredients: ["redstone", "hay_block"], category: "redstone", added: "1.16", grid: [null,"redstone",null,"redstone","hay_block","redstone",null,"redstone",null] },
    { id: "daylight_detector", name: "Daylight Detector", type: "crafting", result: "daylight_detector", resultCount: 1, ingredients: ["oak_slab", "nether_quartz"], category: "redstone", added: "1.5", grid: ["nether_quartz","nether_quartz","nether_quartz","oak_planks","oak_planks","oak_planks","oak_planks","oak_planks","oak_planks"] },
    { id: "tripwire_hook", name: "Tripwire Hook", type: "crafting", result: "tripwire_hook", resultCount: 2, ingredients: ["iron_ingot", "stick", "oak_planks"], category: "redstone", added: "1.0.0", grid: ["iron_ingot",null,null,"stick",null,null,null,"oak_planks",null] },

    // === FOOD RECIPES ===
    { id: "bread", name: "Bread", type: "crafting", result: "bread", resultCount: 3, ingredients: ["wheat"], category: "food", added: "alpha-1.0.0", grid: ["wheat","wheat","wheat",null,null,null,null,null,null] },
    { id: "golden_apple", name: "Golden Apple", type: "crafting", result: "golden_apple", resultCount: 1, ingredients: ["apple", "golden_ingot"], category: "food", added: "alpha-1.0.0", grid: ["golden_ingot","golden_ingot","golden_ingot","golden_ingot","apple","golden_ingot","golden_ingot","golden_ingot","golden_ingot"] },
    { id: "cake", name: "Cake", type: "crafting", result: "cake", resultCount: 1, ingredients: ["wheat", "sugar", "egg", "milk_bucket"], category: "food", added: "alpha-1.0.0", grid: ["milk_bucket","milk_bucket","milk_bucket","sugar","egg","sugar","wheat","wheat","wheat"] },
    { id: "cookie", name: "Cookie", type: "crafting", result: "cookie", resultCount: 8, ingredients: ["wheat", "cocoa_beans"], category: "food", added: "1.0.0", grid: [null,null,null,"wheat","cocoa_beans","wheat",null,null,null] },
    { id: "pumpkin_pie", name: "Pumpkin Pie", type: "crafting", result: "pumpkin_pie", resultCount: 1, ingredients: ["pumpkin", "sugar", "egg"], category: "food", added: "1.4.2", grid: [null,null,null,null,"pumpkin",null,"sugar","egg",null] },
    { id: "mushroom_stew", name: "Mushroom Stew", type: "crafting", result: "mushroom_stew", resultCount: 1, ingredients: ["red_mushroom", "brown_mushroom", "bowl"], category: "food", added: "alpha-1.0.0", grid: [null,"red_mushroom",null,"brown_mushroom",null,null,"bowl",null,null] },
    { id: "rabbit_stew", name: "Rabbit Stew", type: "crafting", result: "rabbit_stew", resultCount: 1, ingredients: ["cooked_rabbit", "bowl", "carrot", "potato", "red_mushroom"], category: "food", added: "1.8", grid: [null,null,null,null,"cooked_rabbit",null,"carrot","potato","bowl"] },
    { id: "suspicious_stew", name: "Suspicious Stew", type: "crafting", result: "suspicious_stew", resultCount: 1, ingredients: ["red_mushroom", "brown_mushroom", "bowl", "tulip"], category: "food", added: "1.14", grid: [null,"red_mushroom",null,"brown_mushroom",null,"bowl",null,null,null], note: "Effect depends on flower used" },
    { id: "beetroot_soup", name: "Beetroot Soup", type: "crafting", result: "beetroot_soup", resultCount: 1, ingredients: ["beetroot", "bowl"], category: "food", added: "1.0.0", grid: [null,null,null,"beetroot","beetroot","beetroot","beetroot",null,"bowl"] },
    { id: "dried_kelp_block", name: "Dried Kelp Block", type: "crafting", result: "dried_kelp_block", resultCount: 1, ingredients: ["dried_kelp"], category: "food", added: "1.13", grid: ["dried_kelp","dried_kelp","dried_kelp","dried_kelp","dried_kelp","dried_kelp","dried_kelp","dried_kelp","dried_kelp"] },

    // === SMELTING RECIPES ===
    { id: "iron_ingot_from_ore", name: "Iron Ingot (from Iron Ore)", type: "furnace", result: "iron_ingot", resultCount: 1, ingredients: ["iron_ore"], category: "smelting", added: "alpha-1.0.0", xp: 0.7, cookTime: 200 },
    { id: "iron_ingot_from_raw", name: "Iron Ingot (from Raw Iron)", type: "furnace", result: "iron_ingot", resultCount: 1, ingredients: ["raw_iron"], category: "smelting", added: "1.17", xp: 0.7, cookTime: 200 },
    { id: "golden_ingot_from_ore", name: "Gold Ingot (from Gold Ore)", type: "furnace", result: "golden_ingot", resultCount: 1, ingredients: ["gold_ore"], category: "smelting", added: "alpha-1.0.0", xp: 1.0, cookTime: 200 },
    { id: "golden_ingot_from_raw", name: "Gold Ingot (from Raw Gold)", type: "furnace", result: "golden_ingot", resultCount: 1, ingredients: ["raw_gold"], category: "smelting", added: "1.17", xp: 1.0, cookTime: 200 },
    { id: "copper_ingot_from_ore", name: "Copper Ingot (from Copper Ore)", type: "furnace", result: "copper_ingot", resultCount: 1, ingredients: ["copper_ore"], category: "smelting", added: "1.17", xp: 0.7, cookTime: 200 },
    { id: "copper_ingot_from_raw", name: "Copper Ingot (from Raw Copper)", type: "furnace", result: "copper_ingot", resultCount: 1, ingredients: ["raw_copper"], category: "smelting", added: "1.17", xp: 0.7, cookTime: 200 },
    { id: "diamond_from_ore", name: "Diamond (from Diamond Ore)", type: "furnace", result: "diamond", resultCount: 1, ingredients: ["diamond_ore"], category: "smelting", added: "1.0.0", xp: 1.0, cookTime: 200 },
    { id: "emerald_from_ore", name: "Emerald (from Emerald Ore)", type: "furnace", result: "emerald", resultCount: 1, ingredients: ["emerald_ore"], category: "smelting", added: "1.3.1", xp: 1.0, cookTime: 200 },
    { id: "lapis_from_ore", name: "Lapis Lazuli (from Ore)", type: "furnace", result: "lapis_lazuli", resultCount: 9, ingredients: ["lapis_ore"], category: "smelting", added: "1.0.0", xp: 0.2, cookTime: 200 },
    { id: "redstone_from_ore", name: "Redstone (from Redstone Ore)", type: "furnace", result: "redstone", resultCount: 9, ingredients: ["redstone_ore"], category: "smelting", added: "1.0.0", xp: 0.3, cookTime: 200 },
    { id: "coal_from_ore", name: "Coal (from Coal Ore)", type: "furnace", result: "coal", resultCount: 1, ingredients: ["coal_ore"], category: "smelting", added: "alpha-1.0.0", xp: 0.1, cookTime: 200 },
    { id: "nether_gold_ore_to_gold", name: "Gold Ingot (from Nether Gold Ore)", type: "furnace", result: "golden_ingot", resultCount: 1, ingredients: ["nether_gold_ore"], category: "smelting", added: "1.16", xp: 1.0, cookTime: 200 },
    { id: "stone_from_cobblestone", name: "Stone (from Cobblestone)", type: "furnace", result: "stone", resultCount: 1, ingredients: ["cobblestone"], category: "smelting", added: "alpha-1.0.0", xp: 0.1, cookTime: 200 },
    { id: "smooth_stone", name: "Smooth Stone", type: "furnace", result: "smooth_stone", resultCount: 1, ingredients: ["stone"], category: "smelting", added: "1.13", xp: 0.1, cookTime: 200 },
    { id: "glass_from_sand", name: "Glass", type: "furnace", result: "glass", resultCount: 1, ingredients: ["sand"], category: "smelting", added: "alpha-1.0.0", xp: 0.1, cookTime: 200 },
    { id: "charcoal", name: "Charcoal", type: "furnace", result: "charcoal", resultCount: 1, ingredients: ["oak_log"], category: "smelting", added: "alpha-1.0.0", xp: 0.15, cookTime: 200 },
    { id: "cooked_beef", name: "Steak", type: "furnace", result: "steak", resultCount: 1, ingredients: ["raw_beef"], category: "smelting", added: "alpha-1.0.0", xp: 0.35, cookTime: 200 },
    { id: "cooked_porkchop", name: "Cooked Porkchop", type: "furnace", result: "cooked_porkchop", resultCount: 1, ingredients: ["raw_porkchop"], category: "smelting", added: "alpha-1.0.0", xp: 0.35, cookTime: 200 },
    { id: "cooked_mutton", name: "Cooked Mutton", type: "furnace", result: "cooked_mutton", resultCount: 1, ingredients: ["raw_mutton"], category: "smelting", added: "1.0.0", xp: 0.35, cookTime: 200 },
    { id: "cooked_chicken", name: "Cooked Chicken", type: "furnace", result: "cooked_chicken", resultCount: 1, ingredients: ["raw_chicken"], category: "smelting", added: "alpha-1.0.0", xp: 0.35, cookTime: 200 },
    { id: "cooked_rabbit", name: "Cooked Rabbit", type: "furnace", result: "cooked_rabbit", resultCount: 1, ingredients: ["raw_rabbit"], category: "smelting", added: "1.8", xp: 0.35, cookTime: 200 },
    { id: "cooked_cod", name: "Cooked Cod", type: "furnace", result: "cooked_cod", resultCount: 1, ingredients: ["raw_cod"], category: "smelting", added: "alpha-1.0.0", xp: 0.35, cookTime: 200 },
    { id: "cooked_salmon", name: "Cooked Salmon", type: "furnace", result: "cooked_salmon", resultCount: 1, ingredients: ["raw_salmon"], category: "smelting", added: "1.7.2", xp: 0.35, cookTime: 200 },
    { id: "baked_potato", name: "Baked Potato", type: "furnace", result: "baked_potato", resultCount: 1, ingredients: ["potato"], category: "smelting", added: "1.0.0", xp: 0.35, cookTime: 200 },
    { id: "dried_kelp", name: "Dried Kelp", type: "furnace", result: "dried_kelp", resultCount: 1, ingredients: ["kelp"], category: "smelting", added: "1.13", xp: 0.1, cookTime: 200 },
    { id: "cactus_green", name: "Green Dye", type: "furnace", result: "green_dye", resultCount: 1, ingredients: ["cactus"], category: "smelting", added: "alpha-1.0.0", xp: 0.2, cookTime: 200 },
    { id: "netherite_scrap", name: "Netherite Scrap", type: "furnace", result: "netherite_scrap", resultCount: 1, ingredients: ["ancient_debris"], category: "smelting", added: "1.16", xp: 2.0, cookTime: 200 },

    // === BLAST FURNACE ===
    { id: "iron_ingot_blast", name: "Iron Ingot (Blast Furnace)", type: "blast_furnace", result: "iron_ingot", resultCount: 1, ingredients: ["iron_ore"], category: "smelting", added: "1.14", xp: 0.7, cookTime: 100 },
    { id: "golden_ingot_blast", name: "Gold Ingot (Blast Furnace)", type: "blast_furnace", result: "golden_ingot", resultCount: 1, ingredients: ["gold_ore"], category: "smelting", added: "1.14", xp: 1.0, cookTime: 100 },

    // === SMOKER ===
    { id: "steak_smoker", name: "Steak (Smoker)", type: "smoker", result: "steak", resultCount: 1, ingredients: ["raw_beef"], category: "smelting", added: "1.14", xp: 0.35, cookTime: 100 },
    { id: "cooked_porkchop_smoker", name: "Cooked Porkchop (Smoker)", type: "smoker", result: "cooked_porkchop", resultCount: 1, ingredients: ["raw_porkchop"], category: "smelting", added: "1.14", xp: 0.35, cookTime: 100 },
    { id: "cooked_chicken_smoker", name: "Cooked Chicken (Smoker)", type: "smoker", result: "cooked_chicken", resultCount: 1, ingredients: ["raw_chicken"], category: "smelting", added: "1.14", xp: 0.35, cookTime: 100 },

    // === BUCKETS & CONTAINERS ===
    { id: "bucket", name: "Bucket", type: "crafting", result: "bucket", resultCount: 1, ingredients: ["iron_ingot"], category: "misc", added: "alpha-1.0.0", grid: [null,null,null,"iron_ingot",null,"iron_ingot","iron_ingot","iron_ingot","iron_ingot"] },
    { id: "milk_bucket", name: "Milk Bucket", type: "bucket", result: "milk_bucket", resultCount: 1, ingredients: ["bucket"], category: "misc", added: "alpha-1.0.0", note: "Use bucket on cow" },
    { id: "water_bucket", name: "Water Bucket", type: "bucket", result: "water_bucket", resultCount: 1, ingredients: ["bucket"], category: "misc", added: "alpha-1.0.0", note: "Use bucket on water" },
    { id: "lava_bucket", name: "Lava Bucket", type: "bucket", result: "lava_bucket", resultCount: 1, ingredients: ["bucket"], category: "misc", added: "alpha-1.0.0", note: "Use bucket on lava" },
    { id: "bowls", name: "Bowl", type: "crafting", result: "bowl", resultCount: 4, ingredients: ["oak_planks"], category: "misc", added: "alpha-1.0.0", grid: [null,null,null,"oak_planks",null,"oak_planks",null,"oak_planks",null] },
    { id: "cauldron", name: "Cauldron", type: "crafting", result: "cauldron", resultCount: 1, ingredients: ["iron_ingot"], category: "decoration", added: "1.0.0", grid: ["iron_ingot",null,"iron_ingot","iron_ingot",null,"iron_ingot","iron_ingot","iron_ingot","iron_ingot"] },

    // === BREWING ===
    { id: "brewing_stand", name: "Brewing Stand", type: "crafting", result: "brewing_stand", resultCount: 1, ingredients: ["blaze_rod", "cobblestone"], category: "redstone", added: "1.0.0", grid: [null,"blaze_rod",null,null,"cobblestone",null,"cobblestone","cobblestone","cobblestone"] },
    { id: "blaze_powder", name: "Blaze Powder", type: "crafting", result: "blaze_powder", resultCount: 2, ingredients: ["blaze_rod"], category: "materials", added: "1.0.0", grid: [null,null,null,null,"blaze_rod",null,null,null,null] },
    { id: "ender_pearl_craft", name: "Ender Pearl (Crafting)", type: "crafting", result: "ender_pearl", resultCount: 1, ingredients: ["echo_shard"], category: "materials", added: "1.19", grid: [null,null,null,null,"echo_shard",null,null,null,null] },
    { id: "magma_cream", name: "Magma Cream", type: "crafting", result: "magma_cream", resultCount: 1, ingredients: ["blaze_powder", "slime_ball"], category: "materials", added: "1.0.0", grid: [null,null,null,null,"blaze_powder",null,null,"slime_ball",null] },
    { id: "fermented_spider_eye", name: "Fermented Spider Eye", type: "crafting", result: "fermented_spider_eye", resultCount: 1, ingredients: ["spider_eye", "sugar", "brown_mushroom"], category: "materials", added: "1.0.0", grid: [null,null,null,null,"spider_eye",null,null,"brown_mushroom",null] },

    // === ENCHANTING ===
    { id: "enchanting_table", name: "Enchanting Table", type: "crafting", result: "enchanting_table", resultCount: 1, ingredients: ["diamond", "obsidian", "book"], category: "decoration", added: "alpha-1.0.0", grid: [null,"diamond",null,"diamond","obsidian","diamond",null,"obsidian",null] },
    { id: "book", name: "Book", type: "crafting", result: "book", resultCount: 1, ingredients: ["paper", "leather"], category: "materials", added: "alpha-1.0.0", grid: [null,null,null,"paper","leather","paper",null,null,null] },
    { id: "bookshelf", name: "Bookshelf", type: "crafting", result: "bookshelf", resultCount: 1, ingredients: ["oak_planks", "book"], category: "decoration", added: "alpha-1.0.0", grid: ["oak_planks","oak_planks","oak_planks","book","book","book","oak_planks","oak_planks","oak_planks"] },
    { id: "paper", name: "Paper", type: "crafting", result: "paper", resultCount: 3, ingredients: ["sugar_cane"], category: "materials", added: "alpha-1.0.0", grid: [null,null,null,"sugar_cane","sugar_cane","sugar_cane",null,null,null] },
    { id: "anvil", name: "Anvil", type: "crafting", result: "anvil", resultCount: 1, ingredients: ["iron_block", "iron_ingot"], category: "decoration", added: "1.0.0", grid: ["iron_block","iron_block","iron_block",null,"iron_ingot",null,"iron_ingot",null,null] },

    // === DYES ===
    { id: "orange_dye_from_tulip", name: "Orange Dye (Tulip)", type: "crafting", result: "orange_dye", resultCount: 3, ingredients: ["orange_tulip"], category: "dye", added: "1.7.2", grid: [null,null,null,null,"orange_tulip",null,null,null,null] },
    { id: "light_gray_dye_from_tulip", name: "Light Gray Dye (Azure Bluet)", type: "crafting", result: "light_gray_dye", resultCount: 3, ingredients: ["azure_bluet"], category: "dye", added: "1.7.2", grid: [null,null,null,null,"azure_bluet",null,null,null,null] },
    { id: "pink_dye_from_tulip", name: "Pink Dye (Pink Tulip)", type: "crafting", result: "pink_dye", resultCount: 3, ingredients: ["pink_tulip"], category: "dye", added: "1.7.2", grid: [null,null,null,null,"pink_tulip",null,null,null,null] },
    { id: "red_dye_from_tulip", name: "Red Dye (Poppy)", type: "crafting", result: "red_dye", resultCount: 1, ingredients: ["poppy"], category: "dye", added: "alpha-1.0.0", grid: [null,null,null,null,"poppy",null,null,null,null] },
    { id: "light_gray_dye_mix", name: "Light Gray Dye (Mixed)", type: "crafting", result: "light_gray_dye", resultCount: 2, ingredients: ["white_dye", "gray_dye"], category: "dye", added: "1.14", grid: [null,null,null,null,"white_dye",null,null,"gray_dye",null] },
    { id: "light_gray_dye_from_flower", name: "Light Gray Dye (Oxeye Daisy)", type: "crafting", result: "light_gray_dye", resultCount: 3, ingredients: ["oxeye_daisy"], category: "dye", added: "1.7.2", grid: [null,null,null,null,"oxeye_daisy",null,null,null,null] },
    { id: "lime_dye", name: "Lime Dye", type: "crafting", result: "lime_dye", resultCount: 2, ingredients: ["green_dye", "white_dye"], category: "dye", added: "1.14", grid: [null,null,null,null,"green_dye",null,null,"white_dye",null] },
    { id: "pink_dye_from_peony", name: "Pink Dye (Peony)", type: "crafting", result: "pink_dye", resultCount: 3, ingredients: ["peony"], category: "dye", added: "1.7.2", grid: [null,null,null,null,"peony",null,null,null,null] },
    { id: "cyan_dye", name: "Cyan Dye", type: "crafting", result: "cyan_dye", resultCount: 2, ingredients: ["blue_dye", "green_dye"], category: "dye", added: "alpha-1.0.0", grid: [null,null,null,null,"blue_dye",null,null,"green_dye",null] },
    { id: "purple_dye", name: "Purple Dye", type: "crafting", result: "purple_dye", resultCount: 2, ingredients: ["blue_dye", "red_dye"], category: "dye", added: "alpha-1.0.0", grid: [null,null,null,null,"blue_dye",null,null,"red_dye",null] },
    { id: "magenta_dye", name: "Magenta Dye", type: "crafting", result: "magenta_dye", resultCount: 2, ingredients: ["purple_dye", "pink_dye"], category: "dye", added: "1.14", grid: [null,null,null,null,"purple_dye",null,null,"pink_dye",null] },
    { id: "brown_dye", name: "Brown Dye", type: "crafting", result: "brown_dye", resultCount: 1, ingredients: ["cocoa_beans"], category: "dye", added: "1.14", grid: [null,null,null,null,"cocoa_beans",null,null,null,null] },
    { id: "blue_dye_from_lapis", name: "Blue Dye (Lapis)", type: "crafting", result: "blue_dye", resultCount: 1, ingredients: ["lapis_lazuli"], category: "dye", added: "1.14", grid: [null,null,null,null,"lapis_lazuli",null,null,null,null] },
    { id: "blue_dye_cornflower", name: "Blue Dye (Cornflower)", type: "crafting", result: "blue_dye", resultCount: 1, ingredients: ["cornflower"], category: "dye", added: "1.14", grid: [null,null,null,null,"cornflower",null,null,null,null] },
    { id: "green_dye", name: "Green Dye", type: "furnace", result: "green_dye", resultCount: 1, ingredients: ["cactus"], category: "dye", added: "alpha-1.0.0", xp: 0.2, cookTime: 200 },
    { id: "red_dye_from_beetroot", name: "Red Dye (Beetroot)", type: "crafting", result: "red_dye", resultCount: 1, ingredients: ["beetroot"], category: "dye", added: "1.0.0", grid: [null,null,null,null,"beetroot",null,null,null,null] },
    { id: "yellow_dye_from_dandelion", name: "Yellow Dye (Dandelion)", type: "crafting", result: "yellow_dye", resultCount: 1, ingredients: ["dandelion"], category: "dye", added: "alpha-1.0.0", grid: [null,null,null,null,"dandelion",null,null,null,null] },
    { id: "orange_dye_from_carrot", name: "Orange Dye", type: "crafting", result: "orange_dye", resultCount: 2, ingredients: ["red_dye", "yellow_dye"], category: "dye", added: "1.14", grid: [null,null,null,null,"red_dye",null,null,"yellow_dye",null] },

    // === WOOL FROM STRING ===
    { id: "white_wool", name: "White Wool", type: "crafting", result: "white_wool", resultCount: 1, ingredients: ["string"], category: "building", added: "alpha-1.0.0", grid: [null,null,null,null,"string",null,null,"string",null] },

    // === BED ===
    { id: "white_bed", name: "White Bed", type: "crafting", result: "white_bed", resultCount: 1, ingredients: ["oak_planks", "white_wool"], category: "decoration", added: "alpha-1.0.0", grid: [null,null,null,"oak_planks","oak_planks","oak_planks","white_wool","white_wool","white_wool"] },

    // === TORCH ===
    { id: "torch", name: "Torch", type: "crafting", result: "torch", resultCount: 4, ingredients: ["coal", "stick"], category: "decoration", added: "alpha-1.0.0", grid: [null,null,null,null,"coal",null,null,"stick",null] },
    { id: "soul_torch", name: "Soul Torch", type: "crafting", result: "soul_torch", resultCount: 4, ingredients: ["coal", "stick", "soul_sand"], category: "decoration", added: "1.16", grid: [null,null,null,null,"coal",null,null,"stick",null] },

    // === LANTERN ===
    { id: "lantern", name: "Lantern", type: "crafting", result: "lantern", resultCount: 1, ingredients: ["iron_nugget", "torch"], category: "decoration", added: "1.14", grid: [null,"iron_nugget","iron_nugget","iron_nugget","torch","iron_nugget","iron_nugget","iron_nugget","iron_nugget"] },
    { id: "soul_lantern", name: "Soul Lantern", type: "crafting", result: "soul_lantern", resultCount: 1, ingredients: ["iron_nugget", "soul_torch"], category: "decoration", added: "1.16", grid: [null,"iron_nugget","iron_nugget","iron_nugget","soul_torch","iron_nugget","iron_nugget","iron_nugget","iron_nugget"] },

    // === IRON NUGGET ===
    { id: "iron_nugget", name: "Iron Nugget", type: "crafting", result: "iron_nugget", resultCount: 9, ingredients: ["iron_ingot"], category: "materials", added: "1.0.0", grid: [null,null,null,null,"iron_ingot",null,null,null,null] },
    { id: "iron_ingot_from_nuggets", name: "Iron Ingot (from Nuggets)", type: "crafting", result: "iron_ingot", resultCount: 1, ingredients: ["iron_nugget"], category: "materials", added: "1.0.0", grid: ["iron_nugget","iron_nugget","iron_nugget","iron_nugget","iron_nugget","iron_nugget","iron_nugget","iron_nugget","iron_nugget"] },
    { id: "gold_nugget", name: "Gold Nugget", type: "crafting", result: "gold_nugget", resultCount: 9, ingredients: ["golden_ingot"], category: "materials", added: "alpha-1.0.0", grid: [null,null,null,null,"golden_ingot",null,null,null,null] },
    { id: "gold_ingot_from_nuggets", name: "Gold Ingot (from Nuggets)", type: "crafting", result: "golden_ingot", resultCount: 1, ingredients: ["gold_nugget"], category: "materials", added: "alpha-1.0.0", grid: ["gold_nugget","gold_nugget","gold_nugget","gold_nugget","gold_nugget","gold_nugget","gold_nugget","gold_nugget","gold_nugget"] },

    // === NETHERITE ===
    { id: "netherite_ingot", name: "Netherite Ingot", type: "crafting", result: "netherite_ingot", resultCount: 1, ingredients: ["netherite_scrap", "gold_ingot"], category: "materials", added: "1.16", grid: ["netherite_scrap","netherite_scrap","netherite_scrap","netherite_scrap","gold_ingot","gold_ingot","gold_ingot","gold_ingot",null] },

    // === MISC CRAFTING ===
    { id: "beacon", name: "Beacon", type: "crafting", result: "beacon", resultCount: 1, ingredients: ["nether_star", "obsidian", "glass"], category: "decoration", added: "1.4.2", grid: [null,"glass",null,"glass","nether_star","glass",null,"obsidian",null] },
    { id: "ender_chest", name: "Ender Chest", type: "crafting", result: "ender_chest", resultCount: 1, ingredients: ["obsidian", "eye_of_ender"], category: "misc", added: "1.3.1", grid: ["obsidian","obsidian","obsidian","obsidian","eye_of_ender","obsidian","obsidian","obsidian","obsidian"] },
    { id: "eye_of_ender", name: "Eye of Ender", type: "crafting", result: "eye_of_ender", resultCount: 1, ingredients: ["blaze_powder", "ender_pearl"], category: "misc", added: "1.0.0", grid: [null,null,null,null,"blaze_powder",null,null,"ender_pearl",null] },
    { id: "map", name: "Empty Map", type: "crafting", result: "map", resultCount: 1, ingredients: ["paper"], category: "misc", added: "1.0.0", grid: ["paper","paper","paper","paper","compass","paper","paper","paper","paper"] },
    { id: "clock", name: "Clock", type: "crafting", result: "clock", resultCount: 1, ingredients: ["golden_ingot", "redstone"], category: "misc", added: "alpha-1.0.0", grid: [null,"golden_ingot",null,"golden_ingot","redstone","golden_ingot",null,"golden_ingot",null] },
    { id: "compass", name: "Compass", type: "crafting", result: "compass", resultCount: 1, ingredients: ["iron_ingot", "redstone"], category: "misc", added: "alpha-1.0.0", grid: [null,"iron_ingot",null,"iron_ingot","redstone","iron_ingot",null,"iron_ingot",null] },
    { id: "name_tag", name: "Name Tag", type: "furnace", result: "name_tag", resultCount: 1, ingredients: ["paper"], category: "misc", added: "1.0.0", xp: 0.1, cookTime: 200, note: "Cannot be obtained through crafting" },
    { id: "lead", name: "Lead", type: "crafting", result: "lead", resultCount: 2, ingredients: ["string", "slime_ball"], category: "misc", added: "1.6.1", grid: [null,null,null,"string","slime_ball",null,"string","string",null] },
    { id: "saddle", name: "Saddle", type: "furnace", result: "saddle", resultCount: 1, ingredients: ["leather"], category: "misc", added: "alpha-1.0.0", note: "Cannot be obtained through crafting ( furnace used as placeholder)" },
    { id: "elytra", name: "Elytra", type: "loot", result: "elytra", resultCount: 1, ingredients: [], category: "armor", added: "1.9", note: "Found in End Ships in End Cities" },
    { id: "totem_of_undying", name: "Totem of Undying", type: "loot", result: "totem_of_undying", resultCount: 1, ingredients: [], category: "misc", added: "1.11", note: "Dropped by Evokers" },
    { id: "nether_star", name: "Nether Star", type: "loot", result: "nether_star", resultCount: 1, ingredients: [], category: "materials", added: "1.4.2", note: "Dropped by Wither" },
    { id: "conduit", name: "Conduit", type: "crafting", result: "conduit", resultCount: 1, ingredients: ["nautilus_shell", "heart_of_the_sea"], category: "decoration", added: "1.13", grid: [null,"nautilus_shell",null,"nautilus_shell","heart_of_the_sea","nautilus_shell",null,"nautilus_shell",null] },
    { id: "sponge", name: "Sponge", type: "loot", result: "sponge", resultCount: 1, ingredients: [], category: "building", added: "1.0.0", note: "Found in Ocean Monuments" },
    { id: "tide_bottle", name: "Potion", type: "crafting", result: "potion", resultCount: 1, ingredients: ["glass_bottle", "nether_wart"], category: "potions", added: "1.0.0", note: "Use brewing stand with nether wart" },
    { id: "glowstone_dust", name: "Glowstone Dust", type: "crafting", result: "glowstone_dust", resultCount: 4, ingredients: ["glowstone"], category: "materials", added: "1.0.0", grid: [null,null,null,null,"glowstone",null,null,null,null] },
    { id: "experience_bottle", name: "Bottle o' Enchanting", type: "crafting", result: "experience_bottle", resultCount: 3, ingredients: ["glass_bottle", "lapis_lazuli", "redstone"], category: "misc", added: "1.0.0", grid: [null,null,null,"glass_bottle",null,"glass_bottle",null,"glass_bottle",null] },
    { id: "trapped_chest", name: "Trapped Chest", type: "crafting", result: "trapped_chest", resultCount: 1, ingredients: ["chest", "tripwire_hook"], category: "redstone", added: "1.3.1", grid: [null,null,null,null,"tripwire_hook",null,null,"chest",null] },
    { id: "item_frame", name: "Item Frame", type: "crafting", result: "item_frame", resultCount: 1, ingredients: ["stick", "leather"], category: "decoration", added: "1.3.1", grid: ["stick","stick","stick","stick","leather","stick","stick","stick","stick"] },
    { id: "painting", name: "Painting", type: "crafting", result: "painting", resultCount: 1, ingredients: ["stick", "wool"], category: "decoration", added: "alpha-1.0.0", grid: ["stick","stick","stick","stick","wool","stick","stick","stick","stick"] },
    { id: "armor_stand", name: "Armor Stand", type: "crafting", result: "armor_stand", resultCount: 1, ingredients: ["stick", "smooth_stone_slab"], category: "decoration", added: "1.9", grid: [null,null,null,null,"smooth_stone_slab",null,null,"stick",null] },
    { id: "scaffolding", name: "Scaffolding", type: "crafting", result: "scaffolding", resultCount: 6, ingredients: ["bamboo", "string"], category: "decoration", added: "1.14", grid: ["bamboo","string","bamboo",null,"bamboo",null,null,null,null] },
    { id: "campfire", name: "Campfire", type: "crafting", result: "campfire", resultCount: 1, ingredients: ["stick", "coal", "log"], category: "decoration", added: "1.14", grid: [null,"stick",null,"stick","coal","stick","log","log","log"] },
    { id: "soul_campfire", name: "Soul Campfire", type: "crafting", result: "soul_campfire", resultCount: 1, ingredients: ["stick", "soul_sand", "log"], category: "decoration", added: "1.16", grid: [null,"stick",null,"stick","soul_sand","stick","log","log","log"] },
    { id: "respawn_anchor", name: "Respawn Anchor", type: "crafting", result: "respawn_anchor", resultCount: 1, ingredients: ["crying_obsidian", "glowstone"], category: "decoration", added: "1.16", grid: ["crying_obsidian","crying_obsidian","crying_obsidian","crying_obsidian","glowstone","crying_obsidian","crying_obsidian","crying_obsidian","crying_obsidian"] },
    { id: "bundle", name: "Bundle", type: "crafting", result: "bundle", resultCount: 1, ingredients: ["rabbit_hide", "string"], category: "misc", added: "1.17", grid: [null,"string",null,"rabbit_hide","rabbit_hide","rabbit_hide","rabbit_hide","rabbit_hide",null] },
    { id: "spyglass", name: "Spyglass", type: "crafting", result: "spyglass", resultCount: 1, ingredients: ["copper_ingot", "amethyst_shard"], category: "misc", added: "1.17", grid: [null,null,"amethyst_shard",null,null,"copper_ingot",null,"copper_ingot",null] },
    { id: "lightning_rod", name: "Lightning Rod", type: "crafting", result: "lightning_rod", resultCount: 1, ingredients: ["copper_ingot"], category: "decoration", added: "1.17", grid: [null,null,"copper_ingot",null,null,"copper_ingot",null,null,"copper_ingot"] },
    { id: "tinted_glass", name: "Tinted Glass", type: "crafting", result: "tinted_glass", resultCount: 2, ingredients: ["glass", "amethyst_shard"], category: "building", added: "1.17", grid: ["amethyst_shard",null,null,"glass",null,null,"amethyst_shard",null,null] },
    { id: "copper_bulb", name: "Copper Bulb", type: "crafting", result: "copper_bulb", resultCount: 4, ingredients: ["copper_ingot", "blaze_rod"], category: "decoration", added: "1.21", grid: ["copper_ingot","blaze_rod","copper_ingot",null,null,null,null,null,null] },
    { id: "crafter", name: "Crafter", type: "crafting", result: "crafter", resultCount: 1, ingredients: ["iron_ingot", "redstone", "dropper"], category: "redstone", added: "1.21", grid: ["iron_ingot","iron_ingot","iron_ingot","iron_ingot","redstone","iron_ingot","iron_ingot","redstone",null] },
    { id: "mace", name: "Mace", type: "crafting", result: "mace", resultCount: 1, ingredients: ["breeze_rod", "heavy_core"], category: "weapons", added: "1.21", grid: [null,null,"breeze_rod",null,"heavy_core",null,null,null,null] },
    { id: "trial_key", name: "Trial Key", type: "loot", result: "trial_key", resultCount: 1, ingredients: [], category: "misc", added: "1.21", note: "Found in Trial Chambers" },
    { id: "ominous_trial_key", name: "Ominous Trial Key", type: "loot", result: "ominous_trial_key", resultCount: 1, ingredients: [], category: "misc", added: "1.21", note: "Found during Ominous Events" },
    { id: "wind_charge", name: "Wind Charge", type: "loot", result: "wind_charge", resultCount: 1, ingredients: [], category: "misc", added: "1.21", note: "Dropped by Breeze" },
    { id: "breeze_rod", name: "Breeze Rod", type: "loot", result: "breeze_rod", resultCount: 1, ingredients: [], category: "materials", added: "1.21", note: "Dropped by Breeze" },
    { id: "heavy_core", name: "Heavy Core", type: "loot", result: "heavy_core", resultCount: 1, ingredients: [], category: "materials", added: "1.21", note: "Found in Vaults in Trial Chambers" },
];

const RECIPE_TYPES = {
    crafting_table: "Crafting Table",
    crafting: "Inventory Crafting",
    furnace: "Furnace",
    blast_furnace: "Blast Furnace",
    smoker: "Smoker",
    campfire: "Campfire",
    stonecutter: "Stonecutter",
    smithing_table: "Smithing Table",
    cartography_table: "Cartography Table",
    loom: "Loom",
    bucket: "Bucket (Use on...)",
    loot: "Loot / Drops Only"
};

const RECIPE_CATEGORIES = {
    building: "Building Blocks",
    decoration: "Decoration",
    redstone: "Redstone",
    food: "Food",
    tools: "Tools",
    weapons: "Weapons",
    armor: "Armor",
    materials: "Materials",
    dye: "Dyes",
    misc: "Miscellaneous",
    smelting: "Smelting",
    potions: "Potions"
};

function getRecipes(version) {
    if (!version || version === 'latest') return RECIPES;
    const versionData = VERSIONS.find(v => v.id === version);
    if (!versionData) return RECIPES;
    return RECIPES;
}

function getRecipeById(id) {
    return RECIPES.find(r => r.id === id);
}

function getRecipesByCategory(category) {
    if (!category) return RECIPES;
    return RECIPES.filter(r => r.category === category);
}

function getRecipesByType(type) {
    if (!type) return RECIPES;
    return RECIPES.filter(r => r.type === type);
}

function searchRecipes(query) {
    const q = query.toLowerCase();
    return RECIPES.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.result.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.toLowerCase().includes(q))
    );
}

function populateRecipeCategories(selectElement) {
    const categories = [...new Set(RECIPES.map(r => r.category))];
    selectElement.innerHTML = '<option value="">All Categories</option>';
    categories.sort().forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = RECIPE_CATEGORIES[cat] || cat;
        selectElement.appendChild(opt);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RECIPES, RECIPE_TYPES, RECIPE_CATEGORIES, getRecipes, getRecipeById, getRecipesByCategory, getRecipesByType, searchRecipes, populateRecipeCategories };
}