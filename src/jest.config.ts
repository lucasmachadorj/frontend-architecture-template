module.exports = {
  roots: ["<rootDir>/src"],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Modue file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
