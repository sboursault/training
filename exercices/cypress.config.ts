import { defineConfig } from "cypress";

import localConfig from './env.local.json'
import stagingConfig from './env.staging.json'


export default defineConfig({
  
  watchForFileChanges : false,

  e2e: {
    setupNodeEvents(on, config) {
      const targetEnv = config.env.target || 'local'
      const envConfig = targetEnv === 'local' ? localConfig : stagingConfig
      config.baseUrl = envConfig.baseUrl
      config.env = {
        ...envConfig.env, // picks values from env.*.json,
        ...config.env     // overriden by values from CYPRESS_* variables and --env argument
      }
      return config
    },
  },

});