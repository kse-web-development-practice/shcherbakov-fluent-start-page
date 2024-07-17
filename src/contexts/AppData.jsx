import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import defaultData from '../constants/defaultData';
import LocalStorageService from '../services/LocalStorageService';

export const AppDataContext = createContext(null);

const initializer = (initialValue = defaultData) => LocalStorageService.getAppData() || initialValue;

const reducer = (state, action) => {
	switch (action.type) {
		case 'RENAME_BOOKMARK_GROUP':
			return {
				...state,
				groups: state.groups.map((group) => {
					if (group.id !== action.payload.id) {
						return group;
					}
					return {
						...group,
						name: action.payload.newName
					};
				})
			};

		case 'SET_BOOKMARK_GROUP_LAYOUT':
			return {
				...state,
				groups: state.groups.map((group) => {
					if (group.id !== action.payload.id) {
						return group;
					}
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
				})
			};

		case 'ADD_BOOKMARK':
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
