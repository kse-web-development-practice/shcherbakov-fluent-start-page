import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';

/**
 * Font Awesome has a lot of icons, but there's no way that users will use all of them.
 * So this hook returns only a part of them (some solid and almost all brand icons)
 */
const useFontAwesomeIconList = () => {
	const getHumanReadableFontAwesomeIconName = (iconName) => {
		let result = iconName
			.slice(2)
			.replace(/([A-Z])/g, ' $1')
			.trim();
		return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
	};

	// eslint-disable-next-line prettier/prettier
	const solidIconsWhiteList = [
		'faHouse',
		'faMagnifyingGlass',
		'faUser',
		'faCheck',
		'faDownload',
		'faImage',
		'faPhone',
		'faBars',
		'faEnvelope',
		'faStar',
		'faLocationDot',
		'faMusic',
		'faWandMagicSparkles',
		'faHeart',
		'faBomb',
		'faPoo',
		'faCameraRetro',
		'faXmark',
		'faCloud',
		'faComment',
		'faTruckFast',
		'faPenNib',
		'faHippo',
		'faFaceSmile',
		'faCalendarDays',
		'faPaperclip',
		'faShieldHalved',
		'faFile',
		'faBell',
		'faCartShopping',
		'faClipboard',
		'faFilter',
		'faArrowUpFromBracket',
		'faBolt',
		'faCar',
		'faGhost',
		'faMugHot',
		'faPen',
		'faUmbrella',
		'faGift',
		'faFilm',
		'faList',
		'faGear',
		'faTrash',
		'faInbox',
		'faLock',
		'faHeadphones',
		'faBarcode',
		'faTag',
		'faBook',
		'faBookmark',
		'faPrint',
		'faCamera',
		'faFont',
		'faVideo',
		'faDroplet',
		'faCircleHalfStroke',
		'faShare',
		'faFire',
		'faEye',
		'faPlane',
		'faMagnet',
		'faHand',
		'faFolder',
		'faFolderOpen',
		'faMoneyBill',
		'faThumbsUp',
		'faThumbsDown',
		'faComments',
		'faLemon',
		'faKey',
		'faThumbtack',
		'faGears',
		'faPaperPlane',
		'faCode',
		'faGlobe',
		'faCity',
		'faTree',
		'faWifi',
		'faCompass',
		'faAddressBook',
		'faSnowflake',
		'faGamepad',
		'faFeather',
		'faSun',
		'faPenFancy',
		'faFish',
		'faBug',
		'faShirt',
		'faAnchor',
		'faLocationPin',
		'faClock',
		'faPlay',
		'faBackward',
		'faPassport',
		'faPencil',
		'faUpload',
		'faCreditCard',
		'faDatabase',
		'faCopy',
		'faMobile',
		'faForward',
		'faNewspaper',
		'faTable',
		'faBuilding',
		'faStop',
		'faFlag',
		'faStore',
		'faNetworkWired'
	];
	const solidIconsResult = Object.keys(solidIcons)
		.filter((it) => solidIconsWhiteList.includes(it))
		.map((iconName) => ({
			visibleName: getHumanReadableFontAwesomeIconName(iconName),
			prefix: 'fas',
			iconName
		}));

	// eslint-disable-next-line prettier/prettier
	const brandIconsBlackList = ['faYandexInternational', 'faYandex', 'faVk', 'faSquareOdnoklassniki', 'faOdnoklassniki'];
	const brandIconsResult = Object.keys(brandIcons)
		.filter((it) => !brandIconsBlackList.includes(it))
		.map((iconName) => ({
			visibleName: getHumanReadableFontAwesomeIconName(iconName),
			prefix: 'fab',
			iconName
		}));

	return [...solidIconsResult, ...brandIconsResult];
};

export default useFontAwesomeIconList;
