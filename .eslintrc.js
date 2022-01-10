/* eslint-env node */
/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "eslint-plugin-simple-import-sort", "import"],
	rules: {
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-var-requires": "off",
		"simple-import-sort/imports": "warn",
		"sort-imports": "off",
		"import/order": "off",
		"import/first": "warn",
		"import/newline-after-import": "warn",
		"import/no-duplicates": "error",
		"react/react-in-jsx-scope": "off",
		"no-console": "warn",
		"no-undef": "off",
	},
	ignorePatterns: ["**/*.test.*"],
};
