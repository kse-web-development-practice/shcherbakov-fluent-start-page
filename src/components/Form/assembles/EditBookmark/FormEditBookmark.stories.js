import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EditBookmark, { defaultValues } from '.';
import FormEditBookmark from '.';
import BookmarkGroup from '../../../Bookmark/Group';

export default {
	title: 'Form/Assembles/New or Edit Bookmark',
	component: EditBookmark,
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

export const CreateBookmark = {};
