// Minecraft Commands Database

const COMMAND_CATEGORIES = {
    gameplay: "Gameplay",
    world: "World Management",
    player: "Player Management",
    entity: "Entities",
    block: "Blocks",
    scoreboard: "Scoreboard",
    data: "Data Management",
    utility: "Utility",
    creative: "Creative",
    other: "Other"
};

const COMMANDS = [
    // === GAMEPLAY ===
    {
        id: "gamemode",
        name: "/gamemode",
        category: "gameplay",
        description: "Changes the game mode of a player.",
        syntax: "/gamemode <mode> [target]",
        aliases: [],
        permission: "commands.gamemode",
        added: "alpha-1.0.0",
        examples: [
            "/gamemode survival @s",
            "/gamemode creative",
            "/gamemode adventure @a",
            "/gamemode spectator @p"
        ],
        params: [
            { name: "mode", type: "string", required: true, description: "Game mode: survival, creative, adventure, spectator", options: ["survival", "creative", "adventure", "spectator"] },
            { name: "target", type: "target", required: false, description: "Target player (defaults to self)" }
        ]
    },
    {
        id: "difficulty",
        name: "/difficulty",
        category: "gameplay",
        description: "Changes the difficulty level of the game.",
        syntax: "/difficulty [difficulty|permit]",
        aliases: [],
        permission: "commands.difficulty",
        added: "alpha-1.0.0",
        examples: [
            "/difficulty peaceful",
            "/difficulty easy",
            "/difficulty normal",
            "/difficulty hard"
        ],
        params: [
            { name: "difficulty", type: "string", required: true, description: "Difficulty level", options: ["peaceful", "easy", "normal", "hard"] }
        ]
    },
    {
        id: "time",
        name: "/time",
        category: "gameplay",
        description: "Changes or queries the world's game time.",
        syntax: "/time <set|add|query> <value>",
        aliases: [],
        permission: "commands.time",
        added: "alpha-1.0.0",
        examples: [
            "/time set day",
            "/time set night",
            "/time set midnight",
            "/time set noon",
            "/time add 1000",
            "/time set 13000"
        ],
        params: [
            { name: "action", type: "string", required: true, description: "Action: set, add, query", options: ["set", "add", "query"] },
            { name: "value", type: "string", required: true, description: "Time value (ticks) or preset" }
        ]
    },
    {
        id: "weather",
        name: "/weather",
        category: "gameplay",
        description: "Changes the current weather.",
        syntax: "/weather <clear|rain|thunder> [duration]",
        aliases: [],
        permission: "commands.weather",
        added: "alpha-1.0.0",
        examples: [
            "/weather clear",
            "/weather rain",
            "/weather thunder 6000"
        ],
        params: [
            { name: "weather", type: "string", required: true, description: "Weather type", options: ["clear", "rain", "thunder"] },
            { name: "duration", type: "integer", required: false, description: "Duration in seconds (default: random 6000-18000)" }
        ]
    },
    {
        id: "time_set",
        name: "/time set",
        category: "gameplay",
        description: "Sets the world's game time.",
        syntax: "/time set <value>",
        aliases: [],
        permission: "commands.time",
        added: "alpha-1.0.0",
        examples: [
            "/time set day",
            "/time set night",
            "/time set 0",
            "/time set 13000"
        ],
        params: [
            { name: "value", type: "string", required: true, description: "Time value in ticks or preset name" }
        ]
    },
    {
        id: "gamerule",
        name: "/gamerule",
        category: "gameplay",
        description: "Changes or queries a game rule value.",
        syntax: "/gamerule [rule] [value]",
        aliases: [],
        permission: "commands.gamerule",
        added: "1.0.0",
        examples: [
            "/gamerule doDaylightCycle false",
            "/gamerule keepInventory true",
            "/gamerule doMobSpawning false",
            "/gamerule doFireTick false",
            "/gamerule mobGriefing false",
            "/gamerule naturalRegeneration false"
        ],
        params: [
            { name: "rule", type: "string", required: false, description: "Game rule name" },
            { name: "value", type: "string", required: false, description: "New value for the rule" }
        ]
    },
    {
        id: "give",
        name: "/give",
        category: "gameplay",
        description: "Gives an item to a player.",
        syntax: "/give <target> <item> [count]",
        aliases: [],
        permission: "commands.give",
        added: "alpha-1.0.0",
        examples: [
            "/give @s diamond 64",
            "/give @a minecraft:stone 100",
            "/give @p netherite_sword",
            "/give @s enchanted_golden_apple 10"
        ],
        params: [
            { name: "target", type: "target", required: true, description: "Target player" },
            { name: "item", type: "item", required: true, description: "Item to give" },
            { name: "count", type: "integer", required: false, description: "Amount (default: 1, max: 64)" }
        ]
    },
    {
        id: "clear",
        name: "/clear",
        category: "gameplay",
        description: "Clears items from a player's inventory.",
        syntax: "/clear [target] [item] [count]",
        aliases: [],
        permission: "commands.clear",
        added: "1.0.0",
        examples: [
            "/clear",
            "/clear @s",
            "/clear @a minecraft:diamond",
            "/clear @p diamond 16"
        ],
        params: [
            { name: "target", type: "target", required: false, description: "Target player (defaults to self)" },
            { name: "item", type: "item", required: false, description: "Specific item to clear" },
            { name: "count", type: "integer", required: false, description: "Amount to clear" }
        ]
    },
    {
        id: "effect",
        name: "/effect",
        category: "gameplay",
        description: "Adds or removes potion effects to/from entities.",
        syntax: "/effect <target> <effect> [seconds] [amplifier] [hideParticles]",
        aliases: [],
        permission: "commands.effect",
        added: "1.0.0",
        examples: [
            "/effect give @s speed 30 2",
            "/effect give @a regeneration 60 1 true",
            "/effect clear @s",
            "/effect clear @s poison"
        ],
        params: [
            { name: "target", type: "target", required: true, description: "Target entity" },
            { name: "effect", type: "string", required: true, description: "Potion effect name" },
            { name: "seconds", type: "integer", required: false, description: "Duration in seconds (default: 30)" },
            { name: "amplifier", type: "integer", required: false, description: "Effect level (default: 0)" },
            { name: "hideParticles", type: "boolean", required: false, description: "Hide particles (default: false)" }
        ]
    },
    {
        id: "enchant",
        name: "/enchant",
        category: "gameplay",
        description: "Enchants the item held by the target player.",
        syntax: "/enchant <target> <enchantment> [level]",
        aliases: [],
        permission: "commands.enchant",
        added: "alpha-1.0.0",
        examples: [
            "/enchant @s sharpness 5",
            "/enchant @s diamond_pickaxe efficiency 5",
            "/enchant @a unbreaking 3"
        ],
        params: [
            { name: "target", type: "target", required: true, description: "Target player" },
            { name: "enchantment", type: "string", required: true, description: "Enchantment name" },
            { name: "level", type: "integer", required: false, description: "Enchantment level (default: 1)" }
        ]
    },
    {
        id: "experience",
        name: "/experience",
        category: "gameplay",
        description: "Adds or removes experience points from a player.",
        syntax: "/experience <target> <amount> [levels|points]",
        aliases: ["/xp"],
        permission: "commands.xp",
        added: "alpha-1.0.0",
        examples: [
            "/experience add @s 100",
            "/experience add @s 10 levels",
            "/xp 100",
            "/xp add @a 500 points"
        ],
        params: [
            { name: "target", type: "target", required: true, description: "Target player" },
            { name: "amount", type: "integer", required: true, description: "Amount of experience" },
            { name: "unit", type: "string", required: false, description: "Levels or points (default: points)" }
        ]
    },
    {
        id: "fill",
        name: "/fill",
        category: "block",
        description: "Fills a region with a block.",
        syntax: "/fill <from> <to> <block> [replace|keep|outline|hollow|destroy]",
        aliases: [],
        permission: "commands.fill",
        added: "1.0.0",
        examples: [
            "/fill 0 0 0 10 10 10 stone",
            "/fill ~ ~ ~ ~5 ~5 ~5 air replace stone",
            "/fill 0 0 0 10 10 10 air hollow"
        ],
        params: [
            { name: "from", type: "position", required: true, description: "First corner position" },
            { name: "to", type: "position", required: true, description: "Second corner position" },
            { name: "block", type: "block", required: true, description: "Block to fill with" },
            { name: "mode", type: "string", required: false, description: "Fill mode", options: ["replace", "keep", "outline", "hollow", "destroy"] }
        ]
    },
    {
        id: "setblock",
        name: "/setblock",
        category: "block",
        description: "Changes a block to another block.",
        syntax: "/setblock <pos> <block> [replace|destroy|keep]",
        aliases: [],
        permission: "commands.setblock",
        added: "alpha-1.0.0",
        examples: [
            "/setblock 0 64 0 diamond_block",
            "/setblock ~ ~1 ~ minecraft:torch",
            "/setblock 100 64 100 air destroy"
        ],
        params: [
            { name: "pos", type: "position", required: true, description: "Block position" },
            { name: "block", type: "block", required: true, description: "Block to set" },
            { name: "mode", type: "string", required: false, description: "Replace mode" }
        ]
    },
    {
        id: "clone",
        name: "/clone",
        category: "block",
        description: "Clones blocks from one region to another.",
        syntax: "/clone <begin> <end> <destination> [replace|masked|filtered]",
        aliases: [],
        permission: "commands.clone",
        added: "1.0.0",
        examples: [
            "/clone 0 0 0 10 10 10 20 64 20",
            "/clone ~ ~ ~ ~10 ~10 ~10 ~20 ~ ~ replace"
        ],
        params: [
            { name: "begin", type: "position", required: true, description: "Source region start" },
            { name: "end", type: "position", required: true, description: "Source region end" },
            { name: "destination", type: "position", required: true, description: "Destination position" },
            { name: "mode", type: "string", required: false, description: "Clone mode", options: ["replace", "masked", "filtered"] }
        ]
    },

    // === PLAYER MANAGEMENT ===
    {
        id: "teleport",
        name: "/teleport",
        category: "player",
        description: "Teleports entities to a location.",
        syntax: "/teleport <target> <location|destination>",
        aliases: ["/tp"],
        permission: "commands.teleport",
        added: "alpha-1.0.0",
        examples: [
            "/tp @s 100 64 100",
            "/tp @a 0 64 0",
            "/tp @s ~ ~10 ~",
            "/tp @p @s"
        ],
        params: [
            { name: "target", type: "target", required: true, description: "Target entity" },
            { name: "destination", type: "position", required: true, description: "Teleport destination" }
        ]
    },
    {
        id: "kill",
        name: "/kill",
        category: "player",
        description: "Kills entities.",
        syntax: "/kill [target]",
        aliases: [],
        permission: "commands.kill",
        added: "alpha-1.0.0",
        examples: [
            "/kill",
            "/kill @s",
            "/kill @e[type=zombie]",
            "/kill @e"
        ],
        params: [
            { name: "target", type: "target", required: false, description: "Target entity (defaults to self)" }
        ]
    },
    {
        id: "tp",
        name: "/tp",
        category: "player",
        description: "Teleports entities to a location.",
        syntax: "/tp <target> <location>",
        aliases: [],
        permission: "commands.teleport",
        added: "alpha-1.0.0",
        examples: [
            "/tp @s 100 64 100",
            "/tp @a 0 64 0",
            "/tp @s ~ ~10 ~"
        ],
        params: [
            { name: "target", type: "target", required: true, description: "Target entity" },
            { name: "destination", type: "position", required: true, description: "Teleport destination" }
        ]
    },
    {
        id: "spawnpoint",
        name: "/spawnpoint",
        category: "player",
        description: "Sets the spawn point for a player.",
        syntax: "/spawnpoint [target] [pos]",
        aliases: [],
        permission: "commands.spawnpoint",
        added: "1.0.0",
        examples: [
            "/spawnpoint @s",
            "/spawnpoint @p 100 64 100",
            "/spawnpoint @a ~ ~ ~"
        ],
        params: [
            { name: "target", type: "target", required: false, description: "Target player (defaults to nearest)" },
            { name: "pos", type: "position", required: false, description: "Spawn position" }
        ]
    },
    {
        id: "setworldspawn",
        name: "/setworldspawn",
        category: "player",
        description: "Sets the world spawn point.",
        syntax: "/setworldspawn [pos]",
        aliases: [],
        permission: "commands.setworldspawn",
        added: "1.0.0",
        examples: [
            "/setworldspawn",
            "/setworldspawn 0 64 0",
            "/setworldspawn ~ ~ ~"
        ],
        params: [
            { name: "pos", type: "position", required: false, description: "Spawn position" }
        ]
    },
    {
        id: "op",
        name: "/op",
        category: "player",
        description: "Grants operator status to a player.",
        syntax: "/op <player>",
        aliases: [],
        permission: "commands.op",
        added: "alpha-1.0.0",
        examples: [
            "/op Notch",
            "/op @a"
        ],
        params: [
            { name: "player", type: "target", required: true, description: "Target player" }
        ]
    },
    {
        id: "deop",
        name: "/deop",
        category: "player",
        description: "Revokes operator status from a player.",
        syntax: "/deop <player>",
        aliases: [],
        permission: "commands.deop",
        added: "1.0.0",
        examples: [
            "/deop Notch",
            "/deop @a"
        ],
        params: [
            { name: "player", type: "target", required: true, description: "Target player" }
        ]
    },
    {
        id: "whitelist",
        name: "/whitelist",
        category: "player",
        description: "Manages the server whitelist.",
        syntax: "/whitelist <on|off|add|remove|list>",
        aliases: [],
        permission: "commands.whitelist",
        added: "alpha-1.0.0",
        examples: [
            "/whitelist on",
            "/whitelist add Notch",
            "/whitelist remove Herobrine",
            "/whitelist list"
        ],
        params: [
            { name: "action", type: "string", required: true, description: "Whitelist action", options: ["on", "off", "add", "remove", "list"] },
            { name: "player", type: "string", required: false, description: "Player name (for add/remove)" }
        ]
    },
    {
        id: "ban",
        name: "/ban",
        category: "player",
        description: "Bans a player.",
        syntax: "/ban <player> [reason]",
        aliases: [],
        permission: "commands.ban",
        added: "alpha-1.0.0",
        examples: [
            "/ban Notch griefing",
            "/ban @a"
        ],
        params: [
            { name: "player", type: "target", required: true, description: "Target player" },
            { name: "reason", type: "string", required: false, description: "Ban reason" }
        ]
    },
    {
        id: "pardon",
        name: "/pardon",
        category: "player",
        description: "Pardons a banned player.",
        syntax: "/pardon <player>",
        aliases: [],
        permission: "commands.pardon",
        added: "alpha-1.0.0",
        examples: [
            "/pardon Notch"
        ],
        params: [
            { name: "player", type: "string", required: true, description: "Player name" }
        ]
    },
    {
        id: "msg",
        name: "/msg",
        category: "player",
        description: "Sends a private message to a player.",
        syntax: "/msg <target> <message>",
        aliases: ["/tell", "/w", "/message", "/whisper"],
        permission: "commands.msg",
        added: "alpha-1.0.0",
        examples: [
            "/msg Notch Hello!",
            "/w @p How are you?",
            "/tell Notch Check this out!"
        ],
        params: [
            { name: "target", type: "target", required: true, description: "Target player" },
            { name: "message", type: "string", required: true, description: "Message to send" }
        ]
    },

    // === ENTITY ===
    {
        id: "summon",
        name: "/summon",
        category: "entity",
        description: "Summons an entity.",
        syntax: "/summon <entity> [pos] [nbt]",
        aliases: [],
        permission: "commands.summon",
        added: "1.0.0",
        examples: [
            "/summon zombie",
            "/summon minecraft:dragon ~ ~ ~",
            "/summon creeper ~ ~1 ~ {powered:1}"
        ],
        params: [
            { name: "entity", type: "entity", required: true, description: "Entity type to summon" },
            { name: "pos", type: "position", required: false, description: "Summon position" },
            { name: "nbt", type: "nbt", required: false, description: "NBT data tag" }
        ]
    },
    {
        id: "kill_entity",
        name: "/kill (entity)",
        category: "entity",
        description: "Kills entities matching a selector.",
        syntax: "/kill [target]",
        aliases: [],
        permission: "commands.kill",
        added: "alpha-1.0.0",
        examples: [
            "/kill @e[type=zombie]",
            "/kill @e[distance=..10]",
            "/kill @e[type=arrow]",
            "/kill @e[type=creeper,distance=..5]"
        ],
        params: [
            { name: "target", type: "target", required: false, description: "Target entity selector" }
        ]
    },
    {
        id: "tp_entity",
        name: "/teleport (entity)",
        category: "entity",
        description: "Teleports entities to another entity or position.",
        syntax: "/tp <targets> <destination>",
        aliases: [],
        permission: "commands.teleport",
        added: "alpha-1.0.0",
        examples: [
            "/tp @e @s",
            "/tp @e[type=creeper] 0 64 0",
            "/tp @e[type=!player] ~ ~10 ~"
        ],
        params: [
            { name: "targets", type: "target", required: true, description: "Target entities" },
            { name: "destination", type: "position", required: true, description: "Destination" }
        ]
    },
    {
        id: "data",
        name: "/data",
        category: "data",
        description: "Modifies or queries entity/block data.",
        syntax: "/data <entity|block> <target> <merge|get|remove> [...]",
        aliases: [],
        permission: "commands.data",
        added: "1.13",
        examples: [
            "/data get entity @s Pos",
            "/data get block 0 64 0",
            "/data merge entity @s {Health:20}"
        ],
        params: [
            { name: "type", type: "string", required: true, description: "Entity or block", options: ["entity", "block"] },
            { name: "target", type: "target", required: true, description: "Target" },
            { name: "action", type: "string", required: true, description: "Action", options: ["merge", "get", "remove"] }
        ]
    },
    {
        id: "execute",
        name: "/execute",
        category: "utility",
        description: "Executes a command as/for other entities.",
        syntax: "/execute <target> [position|rotation|align|anchored|as|at|facing|if|in|positioned|rotated|run|store|unless]",
        aliases: [],
        permission: "commands.execute",
        added: "1.0.0",
        examples: [
            "/execute as @e[type=zombie] run say I'm a zombie!",
            "/execute at @p run summon minecraft:tnt",
            "/execute if entity @e[type=arrow,distance=..5] run say Close arrow!"
        ],
        params: [
            { name: "selector", type: "target", required: true, description: "Execute as entity" },
            { name: "subcommand", type: "string", required: true, description: "Execute subcommand" }
        ]
    },
    {
        id: "particle",
        name: "/particle",
        category: "entity",
        description: "Spawns particles.",
        syntax: "/particle <effect> <pos> <dx> <dy> <dz> <speed> <count>",
        aliases: [],
        permission: "commands.particle",
        added: "1.0.0",
        examples: [
            "/particle minecraft:flame ~ ~1 ~ 0.5 0.5 0.5 0.1 100",
            "/particle minecraft:heart ~ ~1 ~ 1 1 1 0 10"
        ],
        params: [
            { name: "effect", type: "string", required: true, description: "Particle effect name" },
            { name: "pos", type: "position", required: true, description: "Position" },
            { name: "speed", type: "float", required: false, description: "Particle speed" },
            { name: "count", type: "integer", required: false, description: "Number of particles" }
        ]
    },

    // === WORLD MANAGEMENT ===
    {
        id: "worldborder",
        name: "/worldborder",
        category: "world",
        description: "Manages the world border.",
        syntax: "/worldborder <set|center|damage|warning|get>",
        aliases: [],
        permission: "commands.worldborder",
        added: "1.8",
        examples: [
            "/worldborder set 1000",
            "/worldborder center 0 0",
            "/worldborder damage amount 1"
        ],
        params: [
            { name: "action", type: "string", required: true, description: "World border action", options: ["set", "center", "damage", "warning", "get"] }
        ]
    },
    {
        id: "difficulty_set",
        name: "/difficulty set",
        category: "world",
        description: "Sets the difficulty.",
        syntax: "/difficulty <peaceful|easy|normal|hard>",
        aliases: [],
        permission: "commands.difficulty",
        added: "alpha-1.0.0",
        examples: [
            "/difficulty hard"
        ],
        params: [
            { name: "difficulty", type: "string", required: true, description: "Difficulty level" }
        ]
    },
    {
        id: "defaultgamemode",
        name: "/defaultgamemode",
        category: "world",
        description: "Sets the default game mode.",
        syntax: "/defaultgamemode <mode>",
        aliases: [],
        permission: "commands.defaultgamemode",
        added: "1.0.0",
        examples: [
            "/defaultgamemode survival",
            "/defaultgamemode creative"
        ],
        params: [
            { name: "mode", type: "string", required: true, description: "Default game mode", options: ["survival", "creative", "adventure", "spectator"] }
        ]
    },

    // === SCOREBOARD ===
    {
        id: "scoreboard",
        name: "/scoreboard",
        category: "scoreboard",
        description: "Manages objectives and scores.",
        syntax: "/scoreboard <objectives|players> [...]",
        aliases: [],
        permission: "commands.scoreboard",
        added: "1.0.0",
        examples: [
            "/scoreboard objectives add money dummy",
            "/scoreboard players add @s money 100",
            "/scoreboard players set @s money 1000",
            "/scoreboard players list"
        ],
        params: [
            { name: "section", type: "string", required: true, description: "Section: objectives, players", options: ["objectives", "players"] }
        ]
    },
    {
        id: "scoreboard_objectives",
        name: "/scoreboard objectives",
        category: "scoreboard",
        description: "Manages scoreboard objectives.",
        syntax: "/scoreboard objectives <add|remove|setdisplay|list>",
        aliases: [],
        permission: "commands.scoreboard",
        added: "1.0.0",
        examples: [
            "/scoreboard objectives add money dummy Money",
            "/scoreboard objectives remove money",
            "/scoreboard objectives setdisplay sidebar money",
            "/scoreboard objectives list"
        ],
        params: [
            { name: "action", type: "string", required: true, description: "Action", options: ["add", "remove", "setdisplay", "list"] }
        ]
    },
    {
        id: "scoreboard_players",
        name: "/scoreboard players",
        category: "scoreboard",
        description: "Manages player scores.",
        syntax: "/scoreboard players <add|remove|set|get|reset|list|operation>",
        aliases: [],
        permission: "commands.scoreboard",
        added: "1.0.0",
        examples: [
            "/scoreboard players add @s money 100",
            "/scoreboard players set @s money 1000",
            "/scoreboard players get @s money",
            "/scoreboard players reset @s money"
        ],
        params: [
            { name: "action", type: "string", required: true, description: "Action", options: ["add", "remove", "set", "get", "reset", "list", "operation"] }
        ]
    },

    // === UTILITY ===
    {
        id: "say",
        name: "/say",
        category: "utility",
        description: "Displays a message to all players.",
        syntax: "/say <message>",
        aliases: [],
        permission: "commands.say",
        added: "alpha-1.0.0",
        examples: [
            "/say Hello everyone!",
            "/say Server is restarting in 5 minutes"
        ],
        params: [
            { name: "message", type: "string", required: true, description: "Message to broadcast" }
        ]
    },
    {
        id: "msg_command",
        name: "/msg",
        category: "utility",
        description: "Sends a private message to a player.",
        syntax: "/msg <player> <message>",
        aliases: ["/tell", "/w"],
        permission: "commands.msg",
        added: "alpha-1.0.0",
        examples: [
            "/msg Notch Hello!",
            "/w @p Are you there?"
        ],
        params: [
            { name: "player", type: "target", required: true, description: "Target player" },
            { name: "message", type: "string", required: true, description: "Message" }
        ]
    },
    {
        id: "help",
        name: "/help",
        category: "utility",
        description: "Provides help for commands.",
        syntax: "/help [page|command]",
        aliases: ["?"],
        permission: "commands.help",
        added: "alpha-1.0.0",
        examples: [
            "/help",
            "/help 2",
            "/help give"
        ],
        params: [
            { name: "page", type: "string", required: false, description: "Page number or command name" }
        ]
    },
    {
        id: "list",
        name: "/list",
        category: "utility",
        description: "Lists online players.",
        syntax: "/list [uuids]",
        aliases: [],
        permission: "commands.list",
        added: "alpha-1.0.0",
        examples: [
            "/list",
            "/list uuids"
        ],
        params: [
            { name: "uuids", type: "boolean", required: false, description: "Show UUIDs" }
        ]
    },
    {
        id: "seed",
        name: "/seed",
        category: "utility",
        description: "Displays the world seed.",
        syntax: "/seed",
        aliases: [],
        permission: "commands.seed",
        added: "alpha-1.0.0",
        examples: [
            "/seed"
        ],
        params: []
    },

    // === OTHER ===
    {
        id: "reload",
        name: "/reload",
        category: "other",
        description: "Reloads all loot tables, advancements, and functions.",
        syntax: "/reload",
        aliases: [],
        permission: "commands.reload",
        added: "1.0.0",
        examples: [
            "/reload"
        ],
        params: []
    },
    {
        id: "stop",
        name: "/stop",
        category: "other",
        description: "Stops a server.",
        syntax: "/stop",
        aliases: [],
        permission: "commands.stop",
        added: "alpha-1.0.0",
        examples: [
            "/stop"
        ],
        params: []
    },
    {
        id: "save-all",
        name: "/save-all",
        category: "other",
        description: "Saves all worlds.",
        syntax: "/save-all [flush]",
        aliases: [],
        permission: "commands.save-all",
        added: "alpha-1.0.0",
        examples: [
            "/save-all",
            "/save-all flush"
        ],
        params: []
    },
    {
        id: "save-off",
        name: "/save-off",
        category: "other",
        description: "Disables automatic saving.",
        syntax: "/save-off",
        aliases: [],
        permission: "commands.save-off",
        added: "alpha-1.0.0",
        examples: [
            "/save-off"
        ],
        params: []
    },
    {
        id: "save-on",
        name: "/save-on",
        category: "other",
        description: "Enables automatic saving.",
        syntax: "/save-on",
        aliases: [],
        permission: "commands.save-on",
        added: "alpha-1.0.0",
        examples: [
            "/save-on"
        ],
        params: []
    },
    {
        id: "publish",
        name: "/publish",
        category: "other",
        description: "Opens the single-player world to LAN.",
        syntax: "/publish [port]",
        aliases: [],
        permission: "commands.publish",
        added: "alpha-1.0.0",
        examples: [
            "/publish",
            "/publish 25565"
        ],
        params: [
            { name: "port", type: "integer", required: false, description: "Port number" }
        ]
    },
    {
        id: "trigger",
        name: "/trigger",
        category: "scoreboard",
        description: "Modifies a trigger objective.",
        syntax: "/trigger <objective> <add|set|enable|disable> [value]",
        aliases: [],
        permission: "commands.trigger",
        added: "1.0.0",
        examples: [
            "/trigger myTrigger add 1",
            "/trigger myTrigger set 10",
            "/trigger myTrigger enable @s"
        ],
        params: [
            { name: "objective", type: "string", required: true, description: "Trigger objective" },
            { name: "action", type: "string", required: true, description: "Action", options: ["add", "set", "enable", "disable"] },
            { name: "value", type: "integer", required: false, description: "Value" }
        ]
    },
    {
        id: "place",
        name: "/place",
        category: "block",
        description: "Places a structure template.",
        syntax: "/place <template> [at] [rotation]",
        aliases: [],
        permission: "commands.place",
        added: "1.21",
        examples: [
            "/place my_template",
            "/place my_template at 0 64 0"
        ],
        params: [
            { name: "template", type: "string", required: true, description: "Template name" },
            { name: "pos", type: "position", required: false, description: "Place position" },
            { name: "rotation", type: "string", required: false, description: "Rotation" }
        ]
    }
];

function getCommands() {
    return COMMANDS;
}

function getCommandById(id) {
    return COMMANDS.find(c => c.id === id);
}

function getCommandsByCategory(category) {
    if (!category) return COMMANDS;
    return COMMANDS.filter(c => c.category === category);
}

function searchCommands(query) {
    const q = query.toLowerCase();
    return COMMANDS.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.syntax.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.examples.some(e => e.toLowerCase().includes(q))
    );
}

function populateCommandCategories(selectElement) {
    const categories = [...new Set(COMMANDS.map(c => c.category))];
    selectElement.innerHTML = '<option value="">All Categories</option>';
    categories.sort().forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = COMMAND_CATEGORIES[cat] || cat;
        selectElement.appendChild(opt);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COMMANDS, COMMAND_CATEGORIES, getCommands, getCommandById, getCommandsByCategory, searchCommands, populateCommandCategories };
}