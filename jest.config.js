// eslint-disable-next-line no-undef
module.exports = {
	testEnvironment: 'jsdom',
	collectCoverageFrom: ['src/services/**/*.js', 'src/utils/**/*.js'],
	transform: {
		'\\.[jt]sx?$': 'babel-jest'
	}
};
