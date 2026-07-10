// Food Properties Data
const FOODS = [
    { id: "apple", name: "Apple", hunger: 4, saturation: 2.4, category: "fruit", cooked: false, effect: null, note: "" },
    { id: "golden_apple", name: "Golden Apple", hunger: 4, saturation: 2.4, category: "special", cooked: false, effect: "Regeneration II 5s, Absorption II 2min", note: "Rare" },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", hunger: 4, saturation: 2.4, category: "special", cooked: false, effect: "Regeneration II 20s, Resistance 5min, Fire Resistance 5min, Absorption II 10min", note: "Very Rare" },
    { id: "bread", name: "Bread", hunger: 5, saturation: 6.0, category: "grain", cooked: false },
    { id: "raw_beef", name: "Raw Beef", hunger: 3, saturation: 1.8, category: "meat", cooked: false },
    { id: "steak", name: "Steak", hunger: 8, saturation: 12.8, category: "meat", cooked: true },
    { id: "raw_porkchop", name: "Raw Porkchop", hunger: 3, saturation: 1.8, category: "meat", cooked: false },
    { id: "cooked_porkchop", name: "Cooked Porkchop", hunger: 8, saturation: 12.8, category: "meat", cooked: true },
    { id: "raw_mutton", name: "Raw Mutton", hunger: 2, saturation: 1.2, category: "meat", cooked: false },
    { id: "cooked_mutton", name: "Cooked Mutton", hunger: 6, saturation: 9.6, category: "meat", cooked: true },
    { id: "raw_chicken", name: "Raw Chicken", hunger: 2, saturation: 1.2, category: "meat", cooked: false, effect: "30% Hunger I (4s)", note: "Can give Hunger" },
    { id: "cooked_chicken", name: "Cooked Chicken", hunger: 6, saturation: 7.2, category: "meat", cooked: true },
    { id: "raw_rabbit", name: "Raw Rabbit", hunger: 3, saturation: 1.8, category: "meat", cooked: false },
    { id: "cooked_rabbit", name: "Cooked Rabbit", hunger: 5, saturation: 6.0, category: "meat", cooked: true },
    { id: "raw_cod", name: "Raw Cod", hunger: 2, saturation: 0.4, category: "fish", cooked: false },
    { id: "cooked_cod", name: "Cooked Cod", hunger: 5, saturation: 6.0, category: "fish", cooked: true },
    { id: "raw_salmon", name: "Raw Salmon", hunger: 2, saturation: 0.4, category: "fish", cooked: false },
    { id: "cooked_salmon", name: "Cooked Salmon", hunger: 6, saturation: 9.6, category: "fish", cooked: true },
    { id: "tropical_fish", name: "Tropical Fish", hunger: 1, saturation: 0.2, category: "fish", cooked: false },
    { id: "pufferfish", name: "Pufferfish", hunger: 1, saturation: 0.2, category: "fish", cooked: false, effect: "Nausea I (1.5s), Poison I (1min), Poison II (20s)", note: "Only useful for potions" },
    { id: "carrot", name: "Carrot", hunger: 3, saturation: 3.6, category: "vegetable", cooked: false },
    { id: "golden_carrot", name: "Golden Carrot", hunger: 6, saturation: 14.4, category: "special", cooked: false, note: "Best saturation in game" },
    { id: "potato", name: "Potato", hunger: 1, saturation: 0.6, category: "vegetable", cooked: false },
    { id: "baked_potato", name: "Baked Potato", hunger: 5, saturation: 7.2, category: "vegetable", cooked: true },
    { id: "poisonous_potato", name: "Poisonous Potato", hunger: 2, saturation: 1.2, category: "vegetable", cooked: false, effect: "60% Poison I (5s)", note: "Can give Poison" },
    { id: "beetroot", name: "Beetroot", hunger: 1, saturation: 1.2, category: "vegetable", cooked: false },
    { id: "beetroot_soup", name: "Beetroot Soup", hunger: 6, saturation: 7.2, category: "stew", cooked: false },
    { id: "melon_slice", name: "Melon Slice", hunger: 2, saturation: 1.2, category: "fruit", cooked: false },
    { id: "sweet_berries", name: "Sweet Berries", hunger: 2, saturation: 0.4, category: "fruit", cooked: false },
    { id: "glow_berries", name: "Glow Berries", hunger: 2, saturation: 0.4, category: "fruit", cooked: false },
    { id: "cake", name: "Cake", hunger: 14, saturation: 2.8, category: "dessert", cooked: false, note: "14 slices total" },
    { id: "cookie", name: "Cookie", hunger: 2, saturation: 0.4, category: "dessert", cooked: false },
    { id: "pumpkin_pie", name: "Pumpkin Pie", hunger: 8, saturation: 4.8, category: "dessert", cooked: false },
    { id: "mushroom_stew", name: "Mushroom Stew", hunger: 6, saturation: 7.2, category: "stew", cooked: false },
    { id: "rabbit_stew", name: "Rabbit Stew", hunger: 10, saturation: 12.0, category: "stew", cooked: false },
    { id: "suspicious_stew", name: "Suspicious Stew", hunger: 6, saturation: 7.2, category: "stew", cooked: false, effect: "Varies by flower", note: "Effect depends on flower" },
    { id: "dried_kelp", name: "Dried Kelp", hunger: 1, saturation: 0.6, category: "misc", cooked: false, note: "Fastest eat time (16 ticks)" },
    { id: "honey_bottle", name: "Honey Bottle", hunger: 6, saturation: 1.2, category: "drink", cooked: false, note: "Cures Poison" },
    { id: "chorus_fruit", name: "Chorus Fruit", hunger: 4, saturation: 2.4, category: "fruit", cooked: false, effect: "Teleport randomly", note: "50% chance teleport" },
];

const FOOD_CATEGORIES = {
    meat: "Meat",
    fish: "Fish",
    fruit: "Fruit",
    vegetable: "Vegetable",
    grain: "Grain",
    stew: "Stew",
    dessert: "Dessert",
    special: "Special",
    drink: "Drink",
    misc: "Miscellaneous"
};

function getFoods() {
    return FOODS;
}

function getFoodsByCategory(category) {
    if (!category) return FOODS;
    return FOODS.filter(f => f.category === category);
}

function searchFoods(query) {
    const q = query.toLowerCase();
    return FOODS.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        (f.effect && f.effect.toLowerCase().includes(q))
    );
}

function sortFoodsByHunger() {
    return [...FOODS].sort((a, b) => b.hunger - a.hunger);
}

function sortFoodsBySaturation() {
    return [...FOODS].sort((a, b) => b.saturation - a.saturation);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FOODS, FOOD_CATEGORIES, getFoods, getFoodsByCategory, searchFoods, sortFoodsByHunger, sortFoodsBySaturation };
}