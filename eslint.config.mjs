import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore patterns
  {
    ignores: [
      '.next/**',
      '.next',
      '**/node_modules/**',
      'node_modules',
      'dist',
      '**/.git/**',
    ],
  },

  // Import the Next.js and TypeScript configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Add Prettier support
  ...compat.extends('plugin:prettier/recommended'),

  // Add custom rules
  {
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
    },
  },
];

export default eslintConfig;
