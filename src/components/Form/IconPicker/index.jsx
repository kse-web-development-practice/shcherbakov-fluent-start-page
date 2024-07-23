import React, { useMemo, useState, useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIconList } from '../../../services/FontAwesomeService';
import { ThemeContext } from '../../../contexts/Theme';
import styles from './icon-picker.module.scss';

const icons = getIconList();

const FormIconPicker = ({ selectedIconName, onPick }) => {
	const { themeCapitalized } = useContext(ThemeContext);

	const [searchValue, setSearchValue] = useState('');
	const [selectedIcon, setSelectedIcon] = useState(selectedIconName);

	const handleSearchInputChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleIconPick = (data) => {
		setSelectedIcon(data.fullName);
		onPick?.(data);
	};

	const memoizedFilteredIcons = useMemo(
		() => icons.filter(({ visibleName }) => visibleName.toLowerCase().includes(searchValue.trim().toLowerCase())),
		[icons, searchValue]
	);

	return (
		<fieldset className={classNames(styles.iconPicker, styles[`iconPickerTheme${themeCapitalized}`])}>
			<legend className="screenreader">Select an icon</legend>
			<label className="screenreader" htmlFor="icon-search">
				Search by icon name
			</label>
			<input id="icon-search" placeholder="Search..." value={searchValue} onChange={handleSearchInputChange} />
			<ul className={styles.iconPickerList}>
				{memoizedFilteredIcons.map(({ fullName, iconName, prefix, visibleName }) => (
					<li key={fullName} className={styles.iconPickerListItem}>
						<button
							type="button"
							className={classNames(styles.iconPickerListItemButton, {
								[styles.iconPickerListItemButtonSelected]: fullName === selectedIcon
							})}
							onClick={() => handleIconPick({ fullName, prefix, iconName })}
						>
							<FontAwesomeIcon className={styles.iconPickerIcon} fixedWidth icon={[prefix, iconName]} aria-hidden />
							{visibleName}
						</button>
					</li>
				))}
			</ul>
		</fieldset>
	);
};

FormIconPicker.propTypes = {
	selectedIconName: PropTypes.string,
	onPick: PropTypes.func
};

export default FormIconPicker;
