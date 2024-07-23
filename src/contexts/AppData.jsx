import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import ThemeProvider from './Theme';
import defaultData from '../constants/defaultData';
import { getAppData, setAppData } from '../services/AppDataStorage';
import getFallbackIfPropertyNotExist from '../utils/getFallbackIfPropertyNotExist';

export const AppDataContext = createContext(null);

const reducer = (state, action) => {
	switch (action.type) {
		/**
		 * payload: {
		 * 	groupId: string,
		 * 	data: bookmark item props
		 * };
		 */
		case 'ADD_BOOKMARK':
			// If no groups - create a new one and insert a bookmark there
			// groupId ignored
			if (state.groups.length === 0) {
				return {
					...state,
					groups: [{ id: uuid(), bookmarks: [action.payload.data] }]
				};
			}

			// If group with groupId was not found - insert a bookmark into the first group in a list
			if (state.groups.findIndex((group) => group.id === action.payload.groupId) === -1) {
				return {
					...state,
					groups: [
						{
							...state.groups[0],
							bookmarks: [...state.groups[0].bookmarks, action.payload.data]
						},
						...state.groups.slice(1)
					]
				};
			}

			// Insert a bookmark into specific group
			return {
				...state,
				groups: state.groups.map((group) => {
					if (group.id !== action.payload.groupId) {
						return group;
					}
					return {
						...group,
						bookmarks: [...group.bookmarks, action.payload.data]
					};
				})
			};

		/**
		 * payload: {
		 * 	groupId: string;
		 * 	bookmark: { bookmark props };
		 * }
		 */
		case 'EDIT_BOOKMARK':
			return {
				...state,
				groups: state.groups.map((group) => {
					if (group.id !== action.payload.groupId) {
						return group;
					}
					return {
						...group,
						bookmarks: group.bookmarks.map((bookmark) => {
							if (bookmark.id !== action.payload.bookmark.id) {
								return bookmark;
							}
							return {
								...bookmark,
								...action.payload.bookmark
							};
						})
					};
				})
			};

		/**
		 * payload: {
		 * 	groupId: string; - bookmark group id
		 * 	bookmarkId: string; - bookmark's id to remove
		 * }
		 */
		case 'REMOVE_BOOKMARK':
			return {
				...state,
				groups: state.groups.map((group) => {
					if (group.id !== action.payload.groupId) {
						return group;
					}
					return {
						...group,
						bookmarks: group.bookmarks.filter((bookmark) => bookmark.id !== action.payload.bookmarkId)
					};
				})
			};

		/**
		 * payload can be a function that receives the current app state
		 * to solve the bug when moving bookmark item in one group first,
		 * and then moving any bookmark item in another group,
		 * causes the first moved bookmark item to reset to its initial position
		 */
		case 'SET_BOOKMARKS':
			return {
				...state,
				groups: typeof action.payload === 'function' ? action.payload(state) : action.payload
			};

		/**
		 * payload: Pick<{ app settings }>;
		 */
		case 'UPDATE_SETTINGS':
			return {
				...state,
				settings: {
					...state.settings,
					...action.payload
				}
			};

		/**
		 * payload: { settings, groups }
		 */
		case 'SET_DATA':
			return action.payload;

		default:
			return state;
	}
};

const AppDataProvider = ({ children, initialData = defaultData, useStorage = true }) => {
	const [state, dispatch] = useReducer(reducer, defaultData, (initialValue = initialData) => {
		if (!useStorage) {
			return initialData;
		}

		const savedData = getAppData();

		if (!savedData) {
			return initialValue;
		}

		// Adding new values if they don't exist
		// as a result of updating an app that adds new properties
		savedData.settings.theme = getFallbackIfPropertyNotExist(savedData, 'settings.theme', initialValue.settings.theme);

		return savedData;
	});

	useEffect(() => {
		if (!useStorage) {
			return;
		}
		setAppData(state);
	}, [state, useStorage]);

	return (
		<AppDataContext.Provider value={{ state, dispatch }}>
			<ThemeProvider>{children}</ThemeProvider>
		</AppDataContext.Provider>
	);
};

AppDataProvider.propTypes = {
	children: PropTypes.element,
	useStorage: PropTypes.bool,
	initialData: PropTypes.any
};

export default AppDataProvider;
