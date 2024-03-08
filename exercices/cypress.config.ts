import { defineConfig } from "cypress";

export default defineConfig({
  
  watchForFileChanges : false,

  e2e: {
    baseUrl: "https://simplecommerce1nz5qlcr-sbc1.functions.fnc.fr-par.scw.cloud",
    //baseUrl: "http://127.0.0.1:8000/",
  },
});