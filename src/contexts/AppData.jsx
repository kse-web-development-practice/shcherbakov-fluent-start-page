import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import defaultData from '../constants/defaultData';
import LocalStorageService from '../services/LocalStorageService';

export const AppDataContext = createContext(null);

const initializer = (initialValue = defaultData) => LocalStorageService.getAppData() || initialValue;

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_BOOKMARK_GROUP_LAYOUT':
			return {
				...state,
				groups: state.groups.map((group) => {
					if (group.id === action.payload.id) {
						return {
							...group,
							bookmarks: group.bookmarks.map((groupBookmarks) => {
								const updatedBookmark = action.payload.layout.find(({ id }) => id === groupBookmarks.id);
								if (updatedBookmark) {
									return {
										...groupBookmarks,
										...updatedBookmark
									};
								}
								return groupBookmarks;
							})
						};
					}
					return group;
				})
			};

		case 'ADD_BOOKMARK':
			return {
				...state,
				groups: [...state.groups, action.payload]
			};

		case 'UPDATE_SETTINGS':
			return {
				...state,
				settings: {
					...state.settings,
					...action.payload
				}
			};

		case 'SET_ALL':
			return action.payload;

		default:
			return state;
	}
};

const AppDataProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, defaultData, initializer);

	useEffect(() => {
		LocalStorageService.setAppData(state);
	}, [state]);

	return <AppDataContext.Provider value={{ state, dispatch }}>{children}</AppDataContext.Provider>;
};

AppDataProvider.propTypes = {
	children: PropTypes.element
};

export default AppDataProvider;
