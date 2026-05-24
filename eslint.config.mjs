import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@next/next/no-assign-module-variable': 'off',
      'prefer-const': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'warn',
    },
    ignores: [
      '.next/**',
      '.open-next/**',
      '.source/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'data/**',
      'src/config/db/migrations*/**',
      'src/shared/types/cloudflare.d.ts',
    ],
  },
];

export default eslintConfig;
