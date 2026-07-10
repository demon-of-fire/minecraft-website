// Enchantment Compatibility & Advanced Data
const ENCHANTMENT_COMPATIBILITY = {
    sharpness: { conflicts: ["smite", "bane_of_arthropods"], type: "damage", group: "damage_bonus" },
    smite: { conflicts: ["sharpness", "bane_of_arthropods"], type: "damage", group: "damage_bonus" },
    bane_of_arthropods: { conflicts: ["sharpness", "smite"], type: "damage", group: "damage_bonus" },
    fire_aspect: { conflicts: ["frost_walker"], type: "weapon", group: "fire" },
    silk_touch: { conflicts: ["fortune"], type: "tool", group: "special" },
    fortune: { conflicts: ["silk_touch"], type: "tool", group: "special" },
    infinity: { conflicts: ["mending"], type: "bow", group: "arrow" },
    mending: { conflicts: ["infinity"], type: "universal", group: "repair" },
    depth_strider: { conflicts: ["frost_walker"], type: "boots", group: "water_movement" },
    frost_walker: { conflicts: ["depth_strider", "fire_aspect"], type: "boots", group: "water_movement" },
    protection: { conflicts: ["projectile_protection", "blast_protection", "fire_protection"], type: "armor", group: "damage_reduction" },
    projectile_protection: { conflicts: ["protection", "blast_protection", "fire_protection"], type: "armor", group: "damage_reduction" },
    blast_protection: { conflicts: ["protection", "projectile_protection", "fire_protection"], type: "armor", group: "damage_reduction" },
    fire_protection: { conflicts: ["protection", "projectile_protection", "blast_protection"], type: "armor", group: "damage_reduction" },
    loyalty: { conflicts: ["riptide"], type: "trident", group: "trident_return" },
    riptide: { conflicts: ["loyalty", "channeling"], type: "trident", group: "trident_return" },
    channeling: { conflicts: ["riptide"], type: "trident", group: "trident_enchant" },
    multishot: { conflicts: ["piercing"], type: "crossbow", group: "crossbow_shot" },
    piercing: { conflicts: ["multishot"], type: "crossbow", group: "crossbow_shot" },
};

const ENCHANTMENT_LEVELS = {
    sharpness: [1, 2, 3, 4, 5],
    smite: [1, 2, 3, 4, 5],
    bane_of_arthropods: [1, 2, 3, 4, 5],
    knockback: [1, 2],
    fire_aspect: [1, 2],
    looting: [1, 2, 3],
    sweeping_edge: [1, 2, 3],
    unbreaking: [1, 2, 3],
    efficiency: [1, 2, 3, 4, 5],
    silk_touch: [1],
    fortune: [1, 2, 3],
    power: [1, 2, 3, 4, 5],
    punch: [1, 2],
    flame: [1],
    infinity: [1],
    mending: [1],
    protection: [1, 2, 3, 4],
    projectile_protection: [1, 2, 3, 4],
    blast_protection: [1, 2, 3, 4],
    fire_protection: [1, 2, 3, 4],
    feather_falling: [1, 2, 3, 4],
    thorns: [1, 2, 3],
    respiration: [1, 2, 3],
    aqua_affinity: [1],
    depth_strider: [1, 2, 3],
    frost_walker: [1, 2],
    soul_speed: [1, 2, 3],
    swift_sneak: [1, 2, 3],
    binding_curse: [1],
    vanishing_curse: [1],
    loyalty: [1, 2, 3],
    channeling: [1],
    riptide: [1, 2, 3],
    impaling: [1, 2, 3, 4, 5],
    multishot: [1],
    quick_charge: [1, 2, 3],
    piercing: [1, 2, 3, 4],
};

const ENCHANTMENT_WEIGHTS = {
    sharpness: 10, smite: 5, bane_of_arthropods: 5,
    knockback: 5, fire_aspect: 2, looting: 2,
    sweeping_edge: 2, efficiency: 10, silk_touch: 1,
    fortune: 2, power: 10, punch: 2, flame: 2,
    infinity: 1, mending: 2, protection: 10,
    projectile_protection: 5, blast_protection: 2,
    fire_protection: 5, feather_falling: 10,
    thorns: 1, respiration: 2, aqua_affinity: 2,
    depth_strider: 2, frost_walker: 1, soul_speed: 1,
    swift_sneak: 1, binding_curse: 1, vanishing_curse: 1,
    loyalty: 5, channeling: 1, riptide: 2,
    impaling: 2, multishot: 10, quick_charge: 5,
    piercing: 10,
};

const ENCHANTMENT_SLOTS = {
    sharpness: ["sword", "axe"],
    smite: ["sword", "axe"],
    bane_of_arthropods: ["sword", "axe"],
    knockback: ["sword", "axe"],
    fire_aspect: ["sword"],
    looting: ["sword"],
    sweeping_edge: ["sword"],
    unbreaking: ["all"],
    efficiency: ["tools"],
    silk_touch: ["tools"],
    fortune: ["tools"],
    power: ["bow"],
    punch: ["bow"],
    flame: ["bow"],
    infinity: ["bow"],
    mending: ["all"],
    protection: ["armor"],
    projectile_protection: ["armor"],
    blast_protection: ["armor"],
    fire_protection: ["armor"],
    feather_falling: ["boots"],
    thorns: ["armor"],
    respiration: ["helmet"],
    aqua_affinity: ["helmet"],
    depth_strider: ["boots"],
    frost_walker: ["boots"],
    soul_speed: ["boots"],
    swift_sneak: ["leggings"],
    binding_curse: ["armor"],
    vanishing_curse: ["all"],
    loyalty: ["trident"],
    channeling: ["trident"],
    riptide: ["trident"],
    impaling: ["trident"],
    multishot: ["crossbow"],
    quick_charge: ["crossbow"],
    piercing: ["crossbow"],
};

function getEnchantmentCompatInfo(enchantId) {
    return ENCHANTMENT_COMPATIBILITY[enchantId] || null;
}

function areEnchantmentsCompatible(ench1, ench2) {
    const info1 = ENCHANTMENT_COMPATIBILITY[ench1];
    if (!info1) return true;
    return !info1.conflicts.includes(ench2);
}

function getConflictingEnchantments(enchantId) {
    const info = ENCHANTMENT_COMPATIBILITY[enchantId];
    return info ? info.conflicts : [];
}

function getEnchantmentsForSlot(slotType) {
    return Object.entries(ENCHANTMENT_SLOTS)
        .filter(([_, slots]) => slots.includes(slotType) || slots.includes('all'))
        .map(([id]) => id);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ENCHANTMENT_COMPATIBILITY, ENCHANTMENT_LEVELS, ENCHANTMENT_WEIGHTS, ENCHANTMENT_SLOTS, getEnchantmentCompatInfo, areEnchantmentsCompatible, getConflictingEnchantments, getEnchantmentsForSlot };
}