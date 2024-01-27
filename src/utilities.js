
export default {
    sanitizeName : function(pkmnName) {
        if (pkmnName == null || pkmnName == '') {
            return '';
        }
        // Check various name inconsistencies between the sheet and how the sprite is named
        let spriteName = pkmnName;
        if (pkmnName === 'Mr. Mime-Galarian') {
            spriteName = 'mr.-mime-galar';
        } else if (pkmnName === "Sirfetch'd") {
            spriteName = 'sirfetchd';
        } else if (pkmnName === 'Sinistea-Antique') {
            spriteName = 'sinistea';
        } else if (pkmnName.startsWith('Tapu')) {
            spriteName = 'tapu' + pkmnName.substring(5);
        } else if (pkmnName === 'Greninja-Ash') {
            spriteName = 'greninja-active';
        } else if (pkmnName.startsWith('Pikachu-')) {
            if (pkmnName === 'Pikachu-Original Cap') {
                spriteName = 'pikachu-kantocap';
            } else if (pkmnName === 'Pikachu-World Cap') {
                spriteName = 'pikachu-world-cap';
            } else {
                const index = pkmnName.indexOf('Cap');
                spriteName = pkmnName.substring(0, index - 1) + 'cap';
            }
        }
        return spriteName.toLowerCase();
    },
    sanitizeNameHomeOnly : function(pkmnName) {
        if (pkmnName == null || pkmnName == '') {
            return '';
        }
        // Check various name inconsistencies between the sheet and how the sprite is named
        let spriteName = pkmnName;
        if (pkmnName === 'Mr. Mime-Galarian') {
            spriteName = 'mr-mime-galarian';
        } else if (pkmnName === "Sirfetch'd") {
            spriteName = 'sirfetchd';
        } else if (pkmnName === 'Sinistea-Antique') {
            spriteName = 'sinistea';
        } else if (pkmnName.startsWith('Tapu')) {
            spriteName = 'tapu' + pkmnName.substring(5);
        } else if (pkmnName.startsWith('Pikachu-') && pkmnName != 'Pikachu-Gigantamax') {
            const index = pkmnName.indexOf('Cap');
            spriteName = pkmnName.substring(0, index - 1) + '-cap';
        }
        return spriteName.toLowerCase();
    }
}