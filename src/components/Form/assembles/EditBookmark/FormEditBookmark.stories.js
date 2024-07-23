import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import FormEditBookmark, { defaultValues } from '.';
import BookmarkContainer from '../../../Bookmark/Container';
import { AppDataContext } from '../../../../contexts/AppData';

export default {
	title: 'Form/Assembles/New Or Edit Bookmark',
	component: FormEditBookmark,
	decorators: [
		(Story) => {
			const { state } = useContext(AppDataContext);
			const methods = useForm({
				defaultValues: {
					id: uuid(),
					row: 0,
					column: 0,
					groupId: state.groups[0].id,
					...defaultValues
				}
			});

			const formData = methods.watch();

			return (
				<FormProvider {...methods}>
					<form>
						<Story />
					</form>

					<h1>Preview</h1>
					<pre>{JSON.stringify(formData, null, 4)}</pre>
					<div style={{ maxWidth: 500 }}>
						<BookmarkContainer
							groups={[{ id: '0', bookmarks: [{ ...formData, link: '#' }] }]}
							editAppData={false}
							showCreateGroupButton={false}
							groupProps={{ showHeader: false }}
							groupItemProps={{ showEditButton: false }}
						/>
					</div>
				</FormProvider>
			);
		}
	]
};

export const NewOrEditBookmark = {};
