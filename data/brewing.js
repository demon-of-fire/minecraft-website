// Brewing Recipes Data
const BREWING_INGREDIENTS = {
    awkward_potion: { name: "Awkward Potion", base: "water_bottle", ingredient: "nether_wart", result: "awkward_potion" },
};

const BREWING_RECIPES = [
    // Base: Water Bottle + Nether Wart = Awkward Potion
    { id: "awkward", base: "water_bottle", ingredient: "nether_wart", result: "awkward_potion", step: 1, note: "Base for most potions" },
    { id: "thick", base: "water_bottle", ingredient: "glowstone_dust", result: "thick_potion", step: 1, note: "No effect" },
    { id: "mundane", base: "water_bottle", ingredient: "redstone", result: "mundane_potion", step: 1, note: "No effect" },

    // Effect potions from Awkward Potion
    { id: "swiftness", base: "awkward_potion", ingredient: "sugar", result: "swiftness", step: 2, effect: "Speed", duration: "3:00" },
    { id: "swiftness_2", base: "swiftness", ingredient: "glowstone_dust", result: "swiftness_2", step: 3, effect: "Speed II", duration: "1:30" },
    { id: "swiftness_long", base: "swiftness", ingredient: "redstone", result: "swiftness_long", step: 3, effect: "Speed", duration: "8:00" },
    { id: "slowness_base", base: "swiftness", ingredient: "fermented_spider_eye", result: "slowness", step: 4, effect: "Slowness", duration: "1:30" },
    { id: "slowness_long", base: "slowness", ingredient: "redstone", result: "slowness_long", step: 5, effect: "Slowness", duration: "4:00" },

    { id: "strength", base: "awkward_potion", ingredient: "blaze_powder", result: "strength", step: 2, effect: "Strength", duration: "3:00" },
    { id: "strength_2", base: "strength", ingredient: "glowstone_dust", result: "strength_2", step: 3, effect: "Strength II", duration: "1:30" },
    { id: "strength_long", base: "strength", ingredient: "redstone", result: "strength_long", step: 3, effect: "Strength", duration: "8:00" },
    { id: "weakness_base", base: "strength", ingredient: "fermented_spider_eye", result: "weakness", step: 4, effect: "Weakness", duration: "1:30" },
    { id: "weakness_long", base: "weakness", ingredient: "redstone", result: "weakness_long", step: 5, effect: "Weakness", duration: "4:00" },

    { id: "healing", base: "awkward_potion", ingredient: "glistering_melon_slice", result: "healing", step: 2, effect: "Instant Health" },
    { id: "healing_2", base: "healing", ingredient: "glowstone_dust", result: "healing_2", step: 3, effect: "Instant Health II" },
    { id: "harming_base", base: "healing", ingredient: "fermented_spider_eye", result: "harming", step: 4, effect: "Instant Damage" },
    { id: "harming_2", base: "harming", ingredient: "glowstone_dust", result: "harming_2", step: 5, effect: "Instant Damage II" },

    { id: "poison", base: "awkward_potion", ingredient: "spider_eye", result: "poison", step: 2, effect: "Poison", duration: "0:45" },
    { id: "poison_2", base: "poison", ingredient: "glowstone_dust", result: "poison_2", step: 3, effect: "Poison II", duration: "0:21" },
    { id: "poison_long", base: "poison", ingredient: "redstone", result: "poison_long", step: 3, effect: "Poison", duration: "1:30" },
    { id: "harming_from_poison", base: "poison", ingredient: "fermented_spider_eye", result: "harming", step: 4, effect: "Instant Damage" },

    { id: "regeneration", base: "awkward_potion", ingredient: "ghast_tear", result: "regeneration", step: 2, effect: "Regeneration", duration: "0:45" },
    { id: "regeneration_2", base: "regeneration", ingredient: "glowstone_dust", result: "regeneration_2", step: 3, effect: "Regeneration II", duration: "0:22" },
    { id: "regeneration_long", base: "regeneration", ingredient: "redstone", result: "regeneration_long", step: 3, effect: "Regeneration", duration: "1:30" },

    { id: "fire_resistance", base: "awkward_potion", ingredient: "magma_cream", result: "fire_resistance", step: 2, effect: "Fire Resistance", duration: "3:00" },
    { id: "fire_resistance_long", base: "fire_resistance", ingredient: "redstone", result: "fire_resistance_long", step: 3, effect: "Fire Resistance", duration: "8:00" },

    { id: "night_vision", base: "awkward_potion", ingredient: "golden_carrot", result: "night_vision", step: 2, effect: "Night Vision", duration: "3:00" },
    { id: "night_vision_long", base: "night_vision", ingredient: "redstone", result: "night_vision_long", step: 3, effect: "Night Vision", duration: "8:00" },
    { id: "invisibility", base: "night_vision", ingredient: "fermented_spider_eye", result: "invisibility", step: 4, effect: "Invisibility", duration: "3:00" },
    { id: "invisibility_long", base: "invisibility", ingredient: "redstone", result: "invisibility_long", step: 5, effect: "Invisibility", duration: "8:00" },

    { id: "water_breathing", base: "awkward_potion", ingredient: "pufferfish", result: "water_breathing", step: 2, effect: "Water Breathing", duration: "3:00" },
    { id: "water_breathing_long", base: "water_breathing", ingredient: "redstone", result: "water_breathing_long", step: 3, effect: "Water Breathing", duration: "8:00" },

    { id: "leaping", base: "awkward_potion", ingredient: "rabbit_foot", result: "leaping", step: 2, effect: "Jump Boost", duration: "3:00" },
    { id: "leaping_2", base: "leaping", ingredient: "glowstone_dust", result: "leaping_2", step: 3, effect: "Jump Boost II", duration: "1:30" },
    { id: "leaping_long", base: "leaping", ingredient: "redstone", result: "leaping_long", step: 3, effect: "Jump Boost", duration: "8:00" },
    { id: "slow_falling", base: "leaping", ingredient: "fermented_spider_eye", result: "slow_falling", step: 4, effect: "Slow Falling", duration: "1:30" },
    { id: "slow_falling_long", base: "slow_falling", ingredient: "redstone", result: "slow_falling_long", step: 5, effect: "Slow Falling", duration: "4:00" },

    // Modifiers
    { id: "splash", base: "any_potion", ingredient: "gunpowder", result: "splash_potion", step: -1, note: "Makes any potion throwable" },
    { id: "lingering", base: "splash_potion", ingredient: "dragon_breath", result: "lingering_potion", step: -1, note: "Creates a cloud on impact" },
    { id: "tipped_arrow", base: "lingering_potion", ingredient: "arrow", result: "tipped_arrow", step: -1, note: "Makes 8 tipped arrows" },
];

const BREWING_INGREDIENT_EFFECTS = [
    { ingredient: "nether_wart", effect: "Awkward (base for most potions)", note: "Required first step" },
    { ingredient: "sugar", effect: "Speed", note: "Increases movement speed" },
    { ingredient: "blaze_powder", effect: "Strength", note: "Increases melee damage" },
    { ingredient: "magma_cream", effect: "Fire Resistance", note: "Immunity to fire/lava" },
    { ingredient: "glistering_melon_slice", effect: "Instant Health", note: "Heals immediately" },
    { ingredient: "spider_eye", effect: "Poison", note: "Deals damage over time" },
    { ingredient: "ghast_tear", effect: "Regeneration", note: "Regenerates health" },
    { ingredient: "rabbit_foot", effect: "Jump Boost", note: "Jump higher" },
    { ingredient: "fermented_spider_eye", effect: "Corrupts potion", note: "Turns positive effects negative" },
    { ingredient: "golden_carrot", effect: "Night Vision", note: "See in the dark" },
    { ingredient: "pufferfish", effect: "Water Breathing", note: "Breathe underwater" },
    { ingredient: "redstone", effect: "Extends duration", note: "Makes potion last longer" },
    { ingredient: "glowstone_dust", effect: "Increases potency", note: "Makes effect level II" },
    { ingredient: "gunpowder", effect: "Splash potion", note: "Throwable" },
    { ingredient: "dragon_breath", effect: "Lingering potion", note: "Creates cloud on impact" },
];

function getBrewingRecipes() {
    return BREWING_RECIPES;
}

function getBrewingIngredients() {
    return BREWING_INGREDIENT_EFFECTS;
}

function searchBrewing(query) {
    const q = query.toLowerCase();
    return BREWING_RECIPES.filter(r =>
        r.result.replace(/_/g, ' ').includes(q) ||
        r.ingredient.replace(/_/g, ' ').includes(q) ||
        (r.effect && r.effect.toLowerCase().includes(q))
    );
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BREWING_RECIPES, BREWING_INGREDIENT_EFFECTS, getBrewingRecipes, getBrewingIngredients, searchBrewing };
}