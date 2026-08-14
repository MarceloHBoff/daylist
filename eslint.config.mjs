import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import importHelpers from 'eslint-plugin-import-helpers'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts']
  },
  {
    plugins: {
      'import-helpers': importHelpers
    },
    rules: {
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^next/',
            '/^react/',
            'module',
            '/^\\.\\./',
            '/^\\./',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ]
    }
  }
])
