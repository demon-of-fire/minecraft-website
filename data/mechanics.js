// Mob Spawning Rules & Redstone Mechanics
const MOB_SPAWNING = {
    general: {
        description: "General mob spawning rules",
        rules: [
            { rule: "Light Level", value: "Hostile mobs spawn at light level 0 in Java Edition, light level 7 or less in Bedrock Edition", detail: "Light level is checked at the block the mob spawns on" },
            { rule: "Spawning Range", value: "24-128 blocks from the player", detail: "Mobs won't spawn closer than 24 blocks or farther than 128 blocks" },
            { rule: "Mob Cap", value: "70 hostile mobs per player", detail: "When the cap is reached, no more hostile mobs will spawn" },
            { rule: "Spawning Surface", value: "Mobs need a solid, opaque block to spawn on", detail: "Transparent blocks don't count for spawning" },
            { rule: "Space Required", value: "Most mobs need 2-3 blocks of air above", detail: "Endermen need 3, most others need 2" },
            { rule: "Despawn Range", value: "Mobs beyond 128 blocks instantly despawn", detail: "Mobs between 32-128 blocks have a chance to despawn" },
        ]
    },
    hostile: {
        description: "Hostile mob spawning specifics",
        mobs: [
            { name: "Zombie", lightLevel: 0, spawnBlocks: "solid", biome: "any", note: "Can spawn in groups" },
            { name: "Skeleton", lightLevel: 0, spawnBlocks: "solid", biome: "any", note: "Avoids sunlight, burns in daylight" },
            { name: "Creeper", lightLevel: 0, spawnBlocks: "solid", biome: "any", note: "Can spawn in groups" },
            { name: "Spider", lightLevel: 0, spawnBlocks: "solid", biome: "any", note: "Can climb walls" },
            { name: "Enderman", lightLevel: 0, spawnBlocks: "solid", biome: "any", note: "Spawns in groups of 1-4" },
            { name: "Witch", lightLevel: 0, spawnBlocks: "solid", biome: "any", note: "Spawns at night or in swamp huts" },
            { name: "Slime", lightLevel: 0, spawnBlocks: "solid", biome: "swamp/underground", note: "Spawns in specific chunks below Y:40" },
            { name: "Phantom", lightLevel: 0, spawnBlocks: "air", biome: "any", note: "Spawns when player hasn't slept for 3+ days" },
            { name: "Drowned", lightLevel: 0, spawnBlocks: "water", biome: "any", note: "Can spawn in rivers and oceans" },
            { name: "Ghast", lightLevel: 0, spawnBlocks: "air", biome: "nether", note: "Needs 4x4x4 space" },
            { name: "Blaze", lightLevel: 0, spawnBlocks: "solid", biome: "nether_fortress", note: "Spawns from spawners" },
            { name: "Piglin", lightLevel: 0, spawnBlocks: "solid", biome: "nether", note: "Found in Crimson Forest" },
            { name: "Hoglin", lightLevel: 0, spawnBlocks: "solid", biome: "nether", note: "Found in Crimson Forest" },
            { name: "Guardian", lightLevel: 0, spawnBlocks: "water", biome: "ocean", note: "Found in Ocean Monuments" },
            { name: "Shulker", lightLevel: 0, spawnBlocks: "solid", biome: "the_end", note: "Found in End Cities" },
            { name: "Warden", lightLevel: 0, spawnBlocks: "solid", biome: "deep_dark", note: "Attracted by vibrations" },
            { name: "Breeze", lightLevel: 0, spawnBlocks: "solid", biome: "trial_chambers", note: "Found in Trial Chambers" },
        ]
    },
    passive: {
        description: "Passive mob spawning specifics",
        mobs: [
            { name: "Cow", lightLevel: 9, spawnBlocks: "grass", biome: "plains, sunflower_plains, savanna", note: "Spawns in groups of 2-4" },
            { name: "Pig", lightLevel: 9, spawnBlocks: "grass", biome: "plains, sunflower_plains", note: "Spawns in groups of 1-4" },
            { name: "Chicken", lightLevel: 9, spawnBlocks: "grass", biome: "plains, forest", note: "Spawns in groups of 2-4" },
            { name: "Sheep", lightLevel: 9, spawnBlocks: "grass", biome: "plains, sunflower_plains, savanna", note: "Spawns in groups of 2-4" },
            { name: "Horse", lightLevel: 9, spawnBlocks: "grass", biome: "plains, savanna", note: "Spawns in groups of 2-6" },
            { name: "Rabbit", lightLevel: 9, spawnBlocks: "grass", biome: "taiga, desert, snowy_plains", note: "Spawns in groups of 1-3" },
            { name: "Squid", lightLevel: 0, spawnBlocks: "water", biome: "ocean, river", note: "Spawns in water" },
            { name: "Axolotl", lightLevel: 0, spawnBlocks: "water", biome: "underground_water", note: "Spawns in lush caves" },
            { name: "Dolphin", lightLevel: 0, spawnBlocks: "water", biome: "ocean", note: "Spawns in water" },
            { name: "Cod", lightLevel: 0, spawnBlocks: "water", biome: "ocean", note: "Spawns in water" },
            { name: "Salmon", lightLevel: 0, spawnBlocks: "water", biome: "ocean, river", note: "Spawns in water" },
            { name: "Turtle", lightLevel: 9, spawnBlocks: "sand", biome: "beach", note: "Spawns on beaches" },
            { name: "Bee", lightLevel: 9, spawnBlocks: "flower", biome: "flower_forest, plains, sunflower_plains", note: "Spawns near flowers" },
        ]
    },
    spawner: {
        description: "Mob Spawner mechanics",
        rules: [
            { rule: "Spawner Range", value: "8x3x8 blocks from the spawner", detail: "Mobs spawn within 4 blocks horizontally and 1 block vertically" },
            { rule: "Spawn Rate", value: "Every 10-40 seconds (Java)", detail: "Spawner attempts 2-4 mobs per cycle" },
            { rule: "Activation", value: "Player must be within 16 blocks", detail: "Spawner activates when player is within 16 blocks" },
            { rule: "Max Nearby", value: "6 mobs of the same type", detail: "Spawner stops if 6+ mobs are within 9x9x9 area" },
            { rule: "Light Level", value: "Spawner-specific", detail: "Most spawners ignore light level" },
        ]
    }
};

const REDSTONE_MECHANICS = {
    basics: {
        title: "Redstone Basics",
        topics: [
            { name: "Redstone Dust", description: "Transmits signal up to 15 blocks. Signal strength decreases by 1 per block.", properties: ["Max distance: 15 blocks", "Can be placed on blocks", "Can go up 1 block without a staircase", "Connects to adjacent redstone dust"] },
            { name: "Redstone Torch", description: "Permanent power source. Can be turned off by powering the block it's attached to.", properties: ["Outputs signal strength 15", "Can be toggled", "Can create burnout clocks", "Powers adjacent blocks"] },
            { name: "Lever", description: "Toggleable power source.", properties: ["Stays in position", "Can be placed on blocks", "Outputs signal strength 15"] },
            { name: "Button", description: "Temporary power source.", properties: ["Stone button: 1.5 seconds", "Wooden button: 15 seconds", "Outputs signal strength 15"] },
            { name: "Pressure Plate", description: "Activates when player/mob stands on it.", properties: ["Outputs signal strength 15", "Can detect items", "Different types: wood (all entities), stone (only players)", "Weighted: iron (items), gold (players)"] },
            { name: "Observer", description: "Detects block changes and outputs a pulse.", properties: ["1-tick pulse", "Detects block updates", "Face direction determines input", "Output on back face"] },
        ]
    },
    components: {
        title: "Redstone Components",
        topics: [
            { name: "Repeater", description: "Delays signal and boosts signal strength.", properties: ["Delay: 1-4 redstone ticks (0.1-0.4s)", "Can be locked", "Boosts signal back to 15", "Can only receive input from back"] },
            { name: "Comparator", description: "Complex signal processing.", properties: ["Compares signal strength", "Subtracts side input from back input", "Outputs strongest signal", "Can detect container fullness", "Can detect block states"] },
            { name: "Piston", description: "Pushes blocks.", properties: ["Pushes up to 12 blocks", "0.15s extension time", "0.15s retraction time", "Cannot push certain blocks", "Can be sticky (pulls block back)"] },
            { name: "Sticky Piston", description: "Pushes and pulls blocks.", properties: ["Same as piston", "Also pulls the last block pushed", "Cannot pull blocks pushed by other pistons"] },
            { name: "Dispenser", description: "Shoots items or uses them.", properties: ["Shoots projectiles", "Places water/lava", "Equips armor", "Activates items"] },
            { name: "Dropper", description: "Drops items or moves them to containers.", properties: ["Drops items as entities", "Moves items to adjacent containers", "Cannot use items"] },
        ]
    },
    circuits: {
        title: "Common Redstone Circuits",
        topics: [
            { name: "AND Gate", description: "Output only when ALL inputs are on.", uses: ["Require multiple conditions", "Security systems", "Complex logic"], components: ["2+ redstone torches", "Redstone dust"] },
            { name: "OR Gate", description: "Output when ANY input is on.", uses: ["Multiple switches", "Alarm systems", "Flexible activation"], components: ["Redstone dust", "Torch or repeater"] },
            { name: "NOT Gate", description: "Inverts the signal.", uses: ["Toggle systems", "Conditional logic", "BUD switches"], components: ["Redstone torch"] },
            { name: "XOR Gate", description: "Output when inputs are different.", uses: ["Toggle switches", "T-flip-flops", "Memory"], components: ["Redstone torches", "Redstone dust"] },
            { name: "Clock", description: "Generates repeating signal.", uses: ["Timers", "Automatic systems", "Blinking lights"], components: ["Repeaters", "Redstone torches", "Redstone dust"] },
            { name: "T-Flip-Flop", description: "Toggles output each time input activates.", uses: ["Button to lever conversion", "Toggle systems", "Memory"], components: ["Pistons", "Redstone torches", "Redstone dust"] },
            { name: "Pulse Limiter", description: "Shortens pulse length.", uses: ["Preventing double activation", "Pulse circuits", "Item filters"], components: ["Repeater", "Redstone torch"] },
            { name: "Item Filter", description: "Sorts items by type.", uses: ["Automatic storage", "Sorting systems", "Item elevators"], components: ["Hopper", "Comparator", "Redstone dust"] },
        ]
    },
    signal: {
        title: "Redstone Signal Mechanics",
        details: [
            { property: "Signal Strength", value: "0-15", description: "0 = no signal, 15 = maximum" },
            { property: "Max Distance", value: "15 blocks", description: "Signal decreases by 1 per block of dust" },
            { property: "Repeater Boost", value: "Back to 15", description: "Repeaters reset signal to maximum" },
            { property: "Comparator Output", value: "Varies", description: "Depends on mode and input" },
            { property: "Block Powering", value: "Adjacent blocks", description: "Redstone powers blocks directly next to it" },
            { property: "Quasi-connectivity", value: "Java only", description: "Pistons, dispensers, droppers powered from 1 block above" },
            { property: "Update Order", value: "Random", description: "Multiple updates in same tick execute randomly" },
            { property: "Tick Duration", value: "0.1 seconds", description: "1 redstone tick = 2 game ticks" },
        ]
    }
};

const ENCHANTMENT_TABLE = {
    title: "Enchantment Table Mechanics",
    rules: [
        { name: "Bookshelves", value: "0-15", description: "More bookshelves = higher level enchantments. Maximum at 15 bookshelves." },
        { name: "Placement", value: "1 block away, same level", description: "Bookshelves must be 1 block away and at the same Y level as the enchantment table." },
        { name: "Enchantment Levels", value: "1-30", description: "Maximum enchantment level is 30 with 15 bookshelves." },
        { name: "Lapis Lazuli", value: "1-3", description: "Higher enchantments require more lapis lazuli." },
        { name: "Enchantment Levels", value: "1-3", description: "Three enchantment options available, costing 1-3 levels." },
        { name: "Item Quality", value: "Higher is better", description: "Better items (diamond, netherite) get higher enchantments." },
        { name: "Enchantment Weight", value: "Varies", description: "Each enchantment has a weight affecting its chance of appearing." },
        { name: "Treasure Enchantments", value: "Not from table", description: "Mending, Soul Speed, Swift Sneak, etc. can't be obtained from enchanting." },
    ],
    layout: [
        [null, "bookshelf", null, "bookshelf", null, "bookshelf", null],
        ["bookshelf", null, null, null, null, null, "bookshelf"],
        [null, null, null, "enchanting_table", null, null, null],
        ["bookshelf", null, null, null, null, null, "bookshelf"],
        [null, "bookshelf", null, "bookshelf", null, "bookshelf", null],
    ]
};

function getMobSpawning() {
    return MOB_SPAWNING;
}

function getRedstoneMechanics() {
    return REDSTONE_MECHANICS;
}

function getEnchantmentTableInfo() {
    return ENCHANTMENT_TABLE;
}

function calculateEnchantingLevel(bookshelves) {
    const capped = Math.min(bookshelves, 15);
    return Math.floor(capped * 2);
}

function searchRedstone(query) {
    const q = query.toLowerCase();
    const results = [];
    Object.values(REDSTONE_MECHANICS).forEach(section => {
        if (section.topics) {
            section.topics.forEach(topic => {
                if (topic.name.toLowerCase().includes(q) || topic.description.toLowerCase().includes(q)) {
                    results.push(topic);
                }
            });
        }
    });
    return results;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MOB_SPAWNING, REDSTONE_MECHANICS, ENCHANTMENT_TABLE, getMobSpawning, getRedstoneMechanics, getEnchantmentTableInfo, calculateEnchantingLevel, searchRedstone };
}