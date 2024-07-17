import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../../components/Modal';
import BookmarkGroup from '../../components/Bookmark/Group';
import FormEditBookmark from '../../components/Form/assembles/EditBookmark';
import styles from './bookmark.module.scss';
import { AppDataContext } from '../../contexts/AppData';

const ViewBookmarkFormEdit = () => {
	const { dispatch } = useContext(AppDataContext);

	const {
		state: { bookmark, groupId }
	} = useLocation();
	const navigate = useNavigate();

	const form = useForm({ values: bookmark });
	const formData = form.watch();

	const handleModalClose = () => {
		navigate(-1);
	};

	const handleFormSubmit = (newBookmarkData) => {
		dispatch({
			type: 'EDIT_BOOKMARK',
			payload: {
				groupId,
				bookmark: newBookmarkData
			}
		});
		handleModalClose();
	};

	const ModalFooter = () => (
		<>
			<button type="button" onClick={handleModalClose}>
				Cancel
			</button>
			<button type="submit" onClick={form.handleSubmit(handleFormSubmit)} disabled={!form.formState.isValid}>
				Edit
			</button>
		</>
	);

	return (
		<Modal title="Edit a bookmark" isVisible onClose={handleModalClose} footer={<ModalFooter />}>
			<FormProvider {...form}>
				<form className={styles.bookmarkFormLayout} onSubmit={form.handleSubmit(handleFormSubmit)}>
					<div className={styles.bookmarkFormLayoutForm}>
						<FormEditBookmark />
					</div>
					<div className={styles.bookmarkFormLayoutPreview}>
						<div className={styles.bookmarkFormLayoutPreviewContent}>
							<h3 className={styles.bookmarkFormLayoutPreviewTitle}>Preview</h3>
							<BookmarkGroup
								id="0"
								showHeader={false}
								showItemEditButton={false}
								bookmarks={[{ ...formData, link: '#', row: 0, column: 0 }]}
								maxColumns={4}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Modal>
	);
};

export default ViewBookmarkFormEdit;
