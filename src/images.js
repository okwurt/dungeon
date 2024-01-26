import StarShiny from '@/assets/images/star-shiny.png'
import SquareShiny from '@/assets/images/square-shiny.png'
import Gigantamax from '@/assets/images/gigantamax.png'
// Type Images
import Bug from '@/assets/images/type/bug.png'
import Dark from '@/assets/images/type/dark.png'
import Dragon from '@/assets/images/type/dragon.png'
import Electric from '@/assets/images/type/electric.png'
import Fairy from '@/assets/images/type/fairy.png'
import Fighting from '@/assets/images/type/fighting.png'
import Fire from '@/assets/images/type/fire.png'
import Flying from '@/assets/images/type/flying.png'
import Ghost from '@/assets/images/type/ghost.png'
import Grass from '@/assets/images/type/grass.png'
import Ground from '@/assets/images/type/ground.png'
import Ice from '@/assets/images/type/ice.png'
import Normal from '@/assets/images/type/normal.png'
import Poison from '@/assets/images/type/poison.png'
import Psychic from '@/assets/images/type/psychic.png'
import Rock from '@/assets/images/type/rock.png'
import Steel from '@/assets/images/type/steel.png'
import Water from '@/assets/images/type/water.png'

const typeMap = new Map([
    ['bug', Bug],
    ['dark', Dark],
    ['dragon', Dragon],
    ['electric', Electric],
    ['fairy', Fairy],
    ['fighting', Fighting],
    ['fire', Fire],
    ['flying', Flying],
    ['ghost', Ghost],
    ['grass', Grass],
    ['ground', Ground],
    ['ice', Ice],
    ['normal', Normal],
    ['poison', Poison],
    ['psychic', Psychic],
    ['rock', Rock],
    ['steel', Steel],
    ['water', Water],
])

export default {
    starShinyImg : function() {
        return StarShiny
    },
    squareShinyImg : function() {
        return SquareShiny
    },
    gigantamaxImg : function() {
        return Gigantamax
    },
    typeImg : function(type) {
        if (type != null) {
            return typeMap.get(type)
        }
        return ''
    }
}