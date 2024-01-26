# dungeon2

This is a Vue web app that will read Pokemon data from an existing (populated) Google Sheet and provide a more dynamic view with detailed, shareable, pages. This is intended to be a supplementary display of your Pokemon Collection as well as a possible trade offering tool.

This project assumes you already have a Google Sheet with your Pokemon Information. If you do not, please utilize [this template](https://docs.google.com/spreadsheets/d/1NMDQq534O1YWQSKlitIrn2xLJPOCp5PDIqx_vCt1hAc/edit) created by /u/KoenigDerLuegner and /u/AgentKazy over on the r/pokemontrades subreddit. Minimal changes are required to that template in order to support the full feature set of this application.

## Spreadsheet Setup

At this time, the app is focused on Event sheets specifically.

If you are using the sheet template linked above you will need to:
- Edit AC1 and type in "disclosure"
- Edit AD1 and type in "box"
- Edit AF1 and type in "reddit"

Differences in my sheet compared to the template are as follows:
- Added 6 columns after AE (this means that "reddit" column is now AL)
    - AF is for generation for Sprite Images (covered below) and AF1 is "generation"
          - If you do not add this one, some Sprites may not load correctly
    - AG is for category of Event (referring to generation Event was distributed in) and AG1 is "category"
          - If you do not add this one, you will not have filtering capabilities
    - AH thru AK are for enhanced trade history expanding column AB into four columns to allow hyperlinks for each step in the trade history. These are AH1 = "tradeOrigin", AI1 = "tradeHop1", AJ1 = "tradeHop2", and AK1 = "tradeHop3"
          - If you do not add these (only looks for "tradeOrigin" column) it will default to using existing "tradeHistory" column where applicable

## Application Setup

Create a file .env in base directory, this should have two variables
- VITE_SHEETID which is your Google Sheet's unique ID
- VITE_APIKEY which is your API Key to the Google Sheet API obtained through Google Cloud Console

Edit config.js to put in your sheet names that you want loaded

Edit create a new config.yml in assets directory to override any defaults.yml entries you'd like


### Sprite Image Approach

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Deloy to Production (with Minify)

This requires some setup, change the homepage in package.json to reflect your full URL and in vite.config.js set the base to be your repo name

```sh
npm run deploy
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
