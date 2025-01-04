import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    // linting with type information is required for some rules
    languageOptions: {
      parserOptions: {
        // reuse the existing `tsconfig.json`
        project: true,
        tsconfigRootDir: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },
  {
    ignores: ['eslint.config.mjs'],
  }
)
