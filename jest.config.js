// eslint-disable-next-line no-undef
module.exports = {
	testEnvironment: 'jsdom',
	collectCoverageFrom: ['src/hooks/**/*.js', 'src/services/**/*.js'],
	transform: {
		'\\.[jt]sx?$': 'babel-jest'
	}
};
