// These need to reflect the names of the sheets you want to make available in the app
// If your sheet names contain spaces, please replace with hyphens here
export const SheetNames = [
    "Events",
    "Events-For-Trade",
    "Shiny"
]

export const SpriteURLBase = {
    // Here are most of the gifs
    NORMAL : "https://projectpokemon.org/images/normal-sprite/",
    SHINY : "https://projectpokemon.org/images/shiny-sprite/",
    // Here are gifs for SWSH that aren't above - we'll fetch all Gen 8 Mons from these
    SWSH_NORMAL : "https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/",
    SWSH_SHINY : "https://projectpokemon.org/images/sprites-models/swsh-shiny-sprites/",
    // PP does not have gifs for Crown Tundra Mons or Gen 9 Mons - we'll get from PDB Home Sprites
    PDB_NORMAL : "https://img.pokemondb.net/sprites/home/normal/",
    PDB_SHINY : "https://img.pokemondb.net/sprites/home/shiny/",
    // Here are backup gifs on PDB for Gen 5 Mons and earlier from BW
    PDB_NORMAL_BW : "https://img.pokemondb.net/sprites/black-white/anim/normal/",
    PDB_SHINY_BW : "https://img.pokemondb.net/sprites/black-white/anim/shiny/"
}

const BallArray = [
    ["Cherish Ball", "https://www.serebii.net/itemdex/sprites/sv/cherishball.png"],
    ["Poké Ball", "https://www.serebii.net/itemdex/sprites/sv/pokeball.png"],
    ["LA Poké Ball", "https://www.serebii.net/itemdex/sprites/legends/pokeballlegends.png"],
    ["Premier Ball", "https://www.serebii.net/itemdex/sprites/sv/premierball.png"],
    ["Great Ball", "https://www.serebii.net/itemdex/sprites/sv/greatball.png"],
    ["LA Great Ball", "https://www.serebii.net/itemdex/sprites/legends/greatballlegends.png"],
    ["Ultra Ball", "https://www.serebii.net/itemdex/sprites/sv/ultraball.png"],
    ["LA Ultra Ball", "https://www.serebii.net/itemdex/sprites/legends/ultraballlegends.png"],
    ["Master Ball", "https://www.serebii.net/itemdex/sprites/sv/masterball.png"],
    ["Safari Ball", "https://www.serebii.net/itemdex/sprites/sv/safariball.png"],
    ["Dive Ball", "https://www.serebii.net/itemdex/sprites/sv/diveball.png"],
    ["Dusk Ball", "https://www.serebii.net/itemdex/sprites/sv/duskball.png"],
    ["Heal Ball", "https://www.serebii.net/itemdex/sprites/sv/healball.png"],
    ["Luxury Ball", "https://www.serebii.net/itemdex/sprites/sv/luxuryball.png"],
    ["Nest Ball", "https://www.serebii.net/itemdex/sprites/sv/nestball.png"],
    ["Net Ball", "https://www.serebii.net/itemdex/sprites/sv/netball.png"],
    ["Quick Ball", "https://www.serebii.net/itemdex/sprites/sv/quickball.png"],
    ["Repeat Ball", "https://www.serebii.net/itemdex/sprites/sv/repeatball.png"],
    ["Timer Ball", "https://www.serebii.net/itemdex/sprites/sv/timerball.png"],
    ["Fast Ball", "https://www.serebii.net/itemdex/sprites/sv/fastball.png"],
    ["Friend Ball", "https://www.serebii.net/itemdex/sprites/sv/friendball.png"],
    ["Heavy Ball", "https://www.serebii.net/itemdex/sprites/sv/heavyball.png"],
    ["LA Heavy Ball", "https://www.serebii.net/itemdex/sprites/legends/heavyballlegends.png"],
    ["Level Ball", "https://www.serebii.net/itemdex/sprites/sv/levelball.png"],
    ["Love Ball", "https://www.serebii.net/itemdex/sprites/sv/loveball.png"],
    ["Lure Ball", "https://www.serebii.net/itemdex/sprites/sv/lureball.png"],
    ["Moon Ball", "https://www.serebii.net/itemdex/sprites/sv/moonball.png"],
    ["Sport Ball", "https://www.serebii.net/itemdex/sprites/sv/sportball.png"],
    ["Dream Ball", "https://www.serebii.net/itemdex/sprites/sv/dreamball.png"],
    ["Beast Ball", "https://www.serebii.net/itemdex/sprites/sv/beastball.png"],
    ["Feather Ball", "https://www.serebii.net/itemdex/sprites/legends/featherball.png"],
    ["Wing Ball", "https://www.serebii.net/itemdex/sprites/legends/wingball.png"],
    ["Jet Ball", "https://www.serebii.net/itemdex/sprites/legends/jetball.png"],
    ["Leaden Ball", "https://www.serebii.net/itemdex/sprites/legends/leadenball.png"],
    ["Gigaton Ball", "https://www.serebii.net/itemdex/sprites/legends/gigatonball.png"],
    ["Origin Ball", "https://www.serebii.net/itemdex/sprites/legends/originball.png"]
]

export const BallMap = new Map(BallArray)