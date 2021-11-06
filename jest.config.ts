export default {
    roots: ['<rootDir>/src'],
    collectCoverage: false,
    collectCoverageFrom: [
        '<rootDir>/src/modules/**/*.ts',
        '!<rootDir>/src/modules/**/{dtos, repositories}/*.ts',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
};
