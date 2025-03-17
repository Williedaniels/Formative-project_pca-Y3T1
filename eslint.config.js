import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single']
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    ignores: ['node_modules/']
  }
];