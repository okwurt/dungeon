import Egg from '@/assets/images/pokemon-egg.png'
import EggManaphy from '@/assets/images/manaphy-egg.png'

import { SpriteURLBase, BallMap } from './config.js';

const homeSpriteOnlyPKMN = [
    'pikachu-world-cap' // World Cap doesn't have gif on PDB
]

export default {
    fetchSprite : function(pkmnName, isShiny, generation) {
        // Ignore any potential empty rows
        if (pkmnName == null || pkmnName == '') {
            return '';
        }

        // We need to fetch PNG from PDB if Crown Tundra or Gen 9 mon or any Home sprite only mons
        if (generation == '8-CT' || generation == 'PLA' || generation == '9' || homeSpriteOnlyPKMN.includes(pkmnName)) {
            return this.fetchHomeSprite(pkmnName, isShiny)
        }
        // Separate URL string for Gen 8 mons in PP
        else if (generation == '8') {
            return this.fetchSpriteSWSH(pkmnName, isShiny);
        }

        return this.fetchSpriteGIF(pkmnName, isShiny)
    },
    fetchSpriteGIF : function (pkmnName, isShiny) {
        return (isShiny === true ? SpriteURLBase.SHINY : SpriteURLBase.NORMAL) +
            pkmnName +
            '.gif';
    },
    fetchSpriteSWSH : function (pkmnName, isShiny) {
        return (isShiny === true ? SpriteURLBase.SWSH_SHINY : SpriteURLBase.SWSH_NORMAL) +
            pkmnName +
            '.gif';
    },
    fetchHomeSprite : function (pkmnName, isShiny) {
        // This will be hit for one-offs or for mons not currently in PP GIFS
        return (isShiny === true ? SpriteURLBase.PDB_SHINY : SpriteURLBase.PDB_NORMAL) +
            pkmnName +
            '.png';
    },
    fetchBallIMG : function (ball, pkmnName) {
        if (ball === 'Egg' && pkmnName === 'manaphy') {
            return EggManaphy;
        } else if (ball == 'Egg') {
            return Egg;
        }
        
        return BallMap.get(ball);
    }
};