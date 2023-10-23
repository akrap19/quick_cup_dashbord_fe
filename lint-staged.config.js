// lint-staged.config.js
module.exports = {
	// Type check TypeScript files
	'**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

	// Lint then format TypeScript and JavaScript files
	'**/*.(ts|tsx|js|jsx)': filenames => [
		`yarn prettier --write ${filenames.join(' ')}`,
		`yarn eslint --fix ${filenames.join(' ')}`,
		`yarn eslint ${filenames.join(' ')}`
	],

	// Format MarkDown and JSON
	'**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`
}
