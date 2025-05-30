import { defineConfig } from 'allure';

export default defineConfig({
  name: 'Hello Report Example',
  output: './allure-report',
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: 'en',
      },
    },
    classic: {
      options: {
        reportName: 'HelloWorld',
      },
    },
  },
});
