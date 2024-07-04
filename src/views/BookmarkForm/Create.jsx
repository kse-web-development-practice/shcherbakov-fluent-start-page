import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import Modal from '../../components/Modal';
import BookmarkGroup from '../../components/Bookmark/Group';
import FormEditBookmark, { defaultValues } from '../../components/Form/assembles/EditBookmark';
import styles from './bookmark.module.scss';
import { AppDataContext } from '../../contexts/AppData';

const ViewBookmarkFormCreate = () => {
	const { dispatch } = useContext(AppDataContext);

	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			id: uuid(),
			row: 0,
			column: 0,
			...defaultValues
		}
	});
	const formData = form.watch();

	const handleModalClose = () => {
		navigate(-1);
	};

	const handleFormSubmit = (newBookmarkData) => {
		dispatch({
			type: 'ADD_BOOKMARK',
			payload: newBookmarkData
		});
		handleModalClose();
	};

	const ModalFooter = () => (
		<>
			<button type="button" onClick={handleModalClose}>
				Cancel
			</button>
			<button type="submit" onClick={form.handleSubmit(handleFormSubmit)} disabled={!form.formState.isValid}>
				Create
			</button>
		</>
	);

	return (
		<Modal title="Create a new bookmark" isVisible onClose={handleModalClose} footer={<ModalFooter />}>
			<FormProvider {...form}>
				<form className={styles.bookmarkFormLayout} onSubmit={form.handleSubmit(handleFormSubmit)}>
					<div className={styles.bookmarkFormLayoutForm}>
						<FormEditBookmark />
					</div>
					<div className={styles.bookmarkFormLayoutPreview}>
						<div className={styles.bookmarkFormLayoutPreviewContent}>
							<h3 className={styles.bookmarkFormLayoutPreviewTitle}>Preview</h3>
							<BookmarkGroup id="0" renderGroupHeader={null} bookmarks={[{ ...formData, link: '#' }]} maxColumns={4} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Modal>
	);
};

export default ViewBookmarkFormCreate;
