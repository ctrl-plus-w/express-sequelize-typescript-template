module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single', { avoidEscape: true }],
		semi: ['error', 'always'],

		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],

		'@typescript-eslint/no-explicit-any': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
	},
};
