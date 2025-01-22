// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */

export default tseslint.config(
	eslint.configs.recommended,
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		rules: {
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/no-unescaped-entities': 'off',
		},
		ignores: ['vendor', 'bootstrap', 'public'],
	},
)
