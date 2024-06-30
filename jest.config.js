module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    browsers: ["chrome", "firefox", "safari"],
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.(css|scss|sass)$": "jest-transform-stub",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["/node_modules/(?!antd)"],
};
