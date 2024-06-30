import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFontAwesomeIconList from '../../../hooks/useFontAwesomeIconList';
import styles from './icon-picker.module.scss';

const FormIconPicker = ({ selectedIconName, onPick }) => {
	const [searchValue, setSearchValue] = useState('');
	const [selectedIcon, setSelectedIcon] = useState(selectedIconName);
	const icons = useFontAwesomeIconList();

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
		<fieldset className={styles.iconPicker}>
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
