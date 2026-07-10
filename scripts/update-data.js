// Auto-Update Script for Minecraft Wiki Data
// Fetches from: Mojang API, PrismarineJS/minecraft-data
// Only ADDS new entries — never removes or replaces curated data

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const MOJANG_MANIFEST = 'https://launchermeta.mojang.com/mc/game/version_manifest.json';
const PRISMARINE_BASE = 'https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc';

function fetchJSON(url) {
    return fetch(url, { headers: { 'User-Agent': 'MinecraftWikiBot/1.0' } })
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
        .catch(e => { console.error(`  FAIL: ${url} - ${e.message}`); return null; });
}

function readFile(name) { return fs.readFileSync(path.join(DATA_DIR, name), 'utf8'); }
function writeFile(name, c) { fs.writeFileSync(path.join(DATA_DIR, name), c, 'utf8'); }

function getLatestVersion() {
    const content = readFile('versions.js');
    const matches = [...content.matchAll(/id: '([\d.]+)'/g)];
    let best = '1.21.1';
    for (const m of matches) {
        const v = m[1];
        if (!/^1\.\d+\.\d+$/.test(v)) continue;
        const parts = v.split('.').map(Number);
        const bestParts = best.split('.').map(Number);
        if (parts[0] > bestParts[0] || (parts[0] === bestParts[0] && parts[1] > bestParts[1]) ||
            (parts[0] === bestParts[0] && parts[1] === bestParts[1] && parts[2] > bestParts[2])) {
            best = v;
        }
    }
    return best;
}

function extractIds(content) {
    const ids = new Set();
    const re = /id:\s*["']([^"']+)["']/g;
    let match;
    while ((match = re.exec(content)) !== null) ids.add(match[1]);
    return ids;
}

// ===== 1. VERSIONS =====
async function updateVersions() {
    console.log('1. Checking versions...');
    const manifest = await fetchJSON(MOJANG_MANIFEST);
    if (!manifest) return false;

    const current = readFile('versions.js');
    const releases = manifest.versions
        .filter(v => v.type === 'release' && /^1\.\d+/.test(v.id))
        .slice(0, 50);

    // Check if there are any new versions
    const currentIds = new Set();
    const idRe = /id: '([\d.]+)'/g;
    let m;
    while ((m = idRe.exec(current)) !== null) currentIds.add(m[1]);

    const newVersions = releases.filter(v => !currentIds.has(v.id));
    if (newVersions.length === 0) {
        console.log('   No new versions');
        return false;
    }

    console.log(`   Found ${newVersions.length} new version(s): ${newVersions.map(v => v.id).join(', ')}`);

    // Build new version entries
    const newEntries = newVersions.map(v => {
        return `    { id: '${v.id}', name: '${v.id}', version: '${v.id}', releaseDate: '${v.releaseTime.split('T')[0]}', protocol: 0 }`;
    }).join(',\n');

    // Insert after the existing VERSIONS array start
    const insertPoint = current.indexOf('const VERSIONS = [');
    const afterArrayStart = current.indexOf('\n', insertPoint) + 1;

    // Find where to insert (before the closing ])
    const closingBracket = current.indexOf('];', afterArrayStart);
    const newContent = current.substring(0, closingBracket) + newEntries + ',\n' + current.substring(closingBracket);

    writeFile('versions.js', newContent);
    console.log(`   Added ${newVersions.length} new version(s)`);
    return true;
}

// ===== 2. ITEMS (additive only) =====
async function updateItems() {
    console.log('2. Checking items...');
    const version = getLatestVersion();
    console.log(`   PrismarineJS version: ${version}`);

    const data = await fetchJSON(`${PRISMARINE_BASE}/${version}/items.json`);
    if (!data) return false;

    const current = readFile('items.js');
    const existingIds = extractIds(current);

    const categoryMap = {
        building: 'building', decoration: 'decoration', redstone: 'redstone',
        food: 'food', tools: 'tools', weapons: 'weapons', armor: 'armor',
        transportation: 'transport', miscellaneous: 'misc', potions: 'potions',
        materials: 'materials', nature: 'nature', spawn_eggs: 'spawn', dye: 'dye'
    };

    const newItems = data
        .filter(item => item.stackSize !== undefined && !existingIds.has(item.name))
        .map(item => ({
            id: item.name,
            name: item.displayName || item.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            category: categoryMap[item.category] || 'misc',
            rarity: item.rarity || 'common',
            added: version,
            stackable: item.stackSize || 64,
            ...(item.hardness !== undefined && { hardness: item.hardness }),
            ...(item.tool && { tool: item.tool })
        }));

    if (newItems.length === 0) {
        console.log('   No new items to add');
        return false;
    }

    // Format each item as single-line for consistency
    const formatted = newItems.map(item => {
        const parts = [`id: "${item.id}"`, `name: "${item.name}"`, `category: "${item.category}"`, `rarity: "${item.rarity}"`, `added: "${item.added}"`, `stackable: ${item.stackable}`];
        if (item.hardness !== undefined) parts.push(`hardness: ${item.hardness}`);
        if (item.tool) parts.push(`tool: "${item.tool}"`);
        return `    { ${parts.join(', ')} }`;
    }).join(',\n');

    // Find the ITEMS array closing ];
    const itemsArrayStart = current.indexOf('const ITEMS = [');
    let bracketDepth = 0;
    let itemsEndIndex = -1;
    for (let i = itemsArrayStart; i < current.length; i++) {
        if (current[i] === '[') bracketDepth++;
        if (current[i] === ']') {
            bracketDepth--;
            if (bracketDepth === 0) { itemsEndIndex = i; break; }
        }
    }
    if (itemsEndIndex === -1) { console.log('   Could not find ITEMS array end'); return false; }

    const newContent = current.substring(0, itemsEndIndex) + ',\n' + formatted + '\n' + current.substring(itemsEndIndex);

    writeFile('items.js', newContent);
    console.log(`   Added ${newItems.length} new item(s)`);
    return true;
}

// ===== 3. BLOCKS (additive only) =====
async function updateBlocks() {
    console.log('3. Checking blocks...');
    const version = getLatestVersion();

    const data = await fetchJSON(`${PRISMARINE_BASE}/${version}/blocks.json`);
    if (!data) return false;

    const current = readFile('blocks.js');
    const existingIds = extractIds(current);

    const newBlocks = data
        .filter(b => b.hardness !== undefined && !existingIds.has(b.name))
        .slice(0, 50)
        .map(b => ({
            id: b.name,
            name: b.displayName || b.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            hardness: b.hardness,
            blastResistance: b.blastResistance || 0,
            tool: b.tool || null,
            toolLevel: b.miningLevel || 0,
            lightLevel: b.light || 0,
            transparent: b.transparent || false,
            flammable: b.flammable || false,
            category: b.category || 'natural'
        }));

    if (newBlocks.length === 0) {
        console.log('   No new blocks to add');
        return false;
    }

    const formatted = newBlocks.map(b => {
        return `    { id: "${b.id}", name: "${b.name}", hardness: ${b.hardness}, blastResistance: ${b.blastResistance}, tool: ${b.tool ? `"${b.tool}"` : 'null'}, toolLevel: ${b.toolLevel}, lightLevel: ${b.lightLevel}, transparent: ${b.transparent}, flammable: ${b.flammable}, category: "${b.category}" }`;
    }).join(',\n');

    const blocksArrayStart = current.indexOf('const BLOCKS = [');
    let bracketDepth = 0;
    let blocksEndIndex = -1;
    for (let i = blocksArrayStart; i < current.length; i++) {
        if (current[i] === '[') bracketDepth++;
        if (current[i] === ']') {
            bracketDepth--;
            if (bracketDepth === 0) { blocksEndIndex = i; break; }
        }
    }
    if (blocksEndIndex === -1) { console.log('   Could not find BLOCKS array end'); return false; }

    const newContent = current.substring(0, blocksEndIndex) + ',\n' + formatted + '\n' + current.substring(blocksEndIndex);

    writeFile('blocks.js', newContent);
    console.log(`   Added ${newBlocks.length} new block(s)`);
    return true;
}

// ===== 4. RECIPES (detection only) =====
async function checkRecipes() {
    console.log('4. Checking recipes...');
    const version = getLatestVersion();
    const data = await fetchJSON(`${PRISMARINE_BASE}/${version}/recipes.json`);
    if (data && data.length > 0) {
        console.log(`   PrismarineJS has ${data.length} recipes (format differs - keeping curated data)`);
    } else {
        console.log('   No new recipe data available');
    }
    return false;
}

// ===== 5. MOBS (detection only) =====
async function checkMobs() {
    console.log('5. Checking mobs...');
    console.log('   Mob data requires wiki sources - keeping curated data');
    return false;
}

// ===== MAIN =====
async function main() {
    console.log('=== Minecraft Wiki Auto-Update ===');
    console.log(`Started: ${new Date().toISOString()}\n`);

    let updated = false;
    try {
        if (await updateVersions()) updated = true;
        if (await updateItems()) updated = true;
        if (await updateBlocks()) updated = true;
        await checkRecipes();
        await checkMobs();
    } catch (error) {
        console.error('\nFATAL:', error);
        process.exit(1);
    }

    console.log(`\n${updated ? 'Changes detected - will commit.' : 'No changes.'}`);
}

main();
