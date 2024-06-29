import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormEditBookmark, { defaultValues } from '.';
import BookmarkGroup from '../../../Bookmark/Group';

export default {
	title: 'Form/Assembles/New Or Edit Bookmark',
	component: FormEditBookmark,
	decorators: [
		() => {
			const methods = useForm({
				defaultValues: {
					id: crypto.randomUUID(),
					row: 0,
					column: 0,
					...defaultValues
				}
			});

			const formData = methods.watch();

			return (
				<FormProvider {...methods}>
					<form>
						<FormEditBookmark />
					</form>

					<h1>Preview preview</h1>
					<pre>{JSON.stringify(formData, null, 4)}</pre>
					<div style={{ maxWidth: 500 }}>
						<BookmarkGroup renderGroupHeader={null} bookmarks={[{ ...formData, link: '#' }]} />
					</div>
				</FormProvider>
			);
		}
	]
};

export const NewOrEditBookmark = {};
