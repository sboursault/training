import { defineConfig } from "cypress";


export default defineConfig({
  
  watchForFileChanges : false,

  e2e: {
    //setupNodeEvents(on, config) {
    //  config = dotenv(config)  // may be not necessary with dotenvx
    //  config.baseUrl = config.env.BASE_URL     
    //  return config;
    //},
  },

});