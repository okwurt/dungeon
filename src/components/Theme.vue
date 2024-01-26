<template>
    <DynamicStyle>
      :root, body #app {
      {{ getVars(themes.default) }}
      } @media (prefers-color-scheme: dark) { :root, body #app {
      {{ getVars(themes.default) }}
      } } @media (prefers-color-scheme: light) { :root, body #app {
      {{ getVars(themes.light) }}
      } }
    </DynamicStyle>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Theme",
    props: {
      themes: Object,
    },
    methods: {
      getVars: function (theme) {
        let vars = [];
        for (const themeVars in theme) {
          let value = `${theme[themeVars]}`;
          if (!value) {
            value = "initial";
          } else if (themeVars == "background-image") {
            value = `url(${theme[themeVars]})`;
          }
          vars.push(`--${themeVars}: ${value}`);
        }
        return vars.join(";");
      },
    },
  };
  </script>