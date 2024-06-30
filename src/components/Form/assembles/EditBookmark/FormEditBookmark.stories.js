import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import FormEditBookmark, { defaultValues } from '.';
import BookmarkGroup from '../../../Bookmark/Group';

export default {
	title: 'Form/Assembles/New Or Edit Bookmark',
	component: FormEditBookmark,
	decorators: [
		(Story) => {
			const methods = useForm({
				defaultValues: {
					id: uuid(),
					row: 0,
					column: 0,
					...defaultValues
				}
			});

			const formData = methods.watch();

			return (
				<FormProvider {...methods}>
					<form>
						<Story />
					</form>

					<h1>Preview preview</h1>
					<pre>{JSON.stringify(formData, null, 4)}</pre>
					<div style={{ maxWidth: 500 }}>
						<BookmarkGroup id="0" renderGroupHeader={null} bookmarks={[{ ...formData, link: '#' }]} />
					</div>
				</FormProvider>
			);
		}
	]
};

export const NewOrEditBookmark = {};
