import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import defaultData from '../constants/defaultData';
import LocalStorageService from '../services/LocalStorageService';
import { v4 as uuid } from 'uuid';

export const AppDataContext = createContext(null);

const reducer = (state, action) => {
	switch (action.type) {
		/**
		 * payload: { bookmark item props };
		 */
		case 'ADD_BOOKMARK':
			if (state.groups.length === 0) {
				return {
					...state,
					groups: [{ id: uuid(), bookmarks: [action.payload] }]
				};
			}

			return {
				...state,
				groups: [
					{
						...state.groups[0],
						bookmarks: [...state.groups[0].bookmarks, action.payload]
					},
					...state.groups.slice(1)
				]
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

		default:
			return state;
	}
};

const AppDataProvider = ({ children, initialData = defaultData, useStorage = true }) => {
	const [state, dispatch] = useReducer(reducer, defaultData, (initialValue = initialData) => {
		if (!useStorage) {
			return initialData;
		}
		return LocalStorageService.getAppData() || initialValue;
	});

	useEffect(() => {
		if (!useStorage) {
			return;
		}
		LocalStorageService.setAppData(state);
	}, [state, useStorage]);

	useEffect(() => {
		document.body.classList.remove('light', 'dark');
		document.body.classList.add(state.settings.theme);
	}, [state.settings.theme]);

	return <AppDataContext.Provider value={{ state, dispatch }}>{children}</AppDataContext.Provider>;
};

AppDataProvider.propTypes = {
	children: PropTypes.element,
	useStorage: PropTypes.bool,
	initialData: PropTypes.any
};

export default AppDataProvider;
