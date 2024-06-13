/* eslint-disable no-undef */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
	plugins: [autoprefixer(['defaults']), cssnano()]
};
