const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	transformIgnorePatterns: [
		"<rootDir>/node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
		"./src/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
	],
	moduleNameMapper: {
		"^lodash-es$": "lodash",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);