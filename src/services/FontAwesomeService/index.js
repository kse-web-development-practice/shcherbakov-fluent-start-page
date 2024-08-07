import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

let iconsCache = null;

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
const brandIconsBlackList = ['faYandexInternational', 'faYandex', 'faVk', 'faSquareOdnoklassniki', 'faOdnoklassniki'];

export const getIconVisibleName = (name) => {
	const result = name.replace(/-/g, ' ');
	return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
};

/**
 * Font Awesome has a lot of icons, but there's no way that users will use all of them.
 * So this function returns only a part of them (some solid and almost all brand icons)
 */
export const getIconList = () => {
	if (iconsCache) {
		return iconsCache;
	}

	const solidIconsResult = Object.entries(fas)
		.filter(([key]) => solidIconsWhiteList.includes(key))
		.map(([key, { prefix, iconName }]) => ({
			fullName: key,
			visibleName: getIconVisibleName(iconName),
			prefix,
			iconName
		}));

	const brandIconsResult = Object.entries(fab)
		.filter(([key]) => !brandIconsBlackList.includes(key))
		.map(([key, { prefix, iconName }]) => ({
			fullName: key,
			visibleName: getIconVisibleName(iconName),
			prefix,
			iconName
		}));

	iconsCache = [...solidIconsResult, ...brandIconsResult];
	return iconsCache;
};

export const resetIconCache = () => {
	iconsCache = null;
};
