import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../../components/Modal';
import BookmarkContainer from '../../components/Bookmark/Container';
import FormEditBookmark from '../../components/Form/assembles/EditBookmark';
import styles from './bookmark.module.scss';
import { AppDataContext } from '../../contexts/AppData';

const ViewBookmarkFormEdit = () => {
	const { dispatch } = useContext(AppDataContext);

	const {
		state: { bookmark, groupId: originalGroupId }
	} = useLocation();
	const navigate = useNavigate();

	const form = useForm({ values: { ...bookmark, groupId: originalGroupId } });
	const formData = form.watch();

	const handleModalClose = () => {
		navigate(-1);
	};

	const handleFormSubmit = ({ groupId, ...bookmark }) => {
		console.log(originalGroupId, groupId, bookmark);

		if (groupId !== originalGroupId) {
			dispatch({
				type: 'ADD_BOOKMARK',
				payload: {
					groupId,
					data: bookmark
				}
			});
			dispatch({
				type: 'REMOVE_BOOKMARK',
				payload: {
					groupId: originalGroupId,
					bookmarkId: bookmark.id
				}
			});
		} else {
			dispatch({
				type: 'EDIT_BOOKMARK',
				payload: {
					groupId,
					bookmark
				}
			});
		}

		handleModalClose();
	};

	const handleRemoveButtonClick = () => {
		dispatch({
			type: 'REMOVE_BOOKMARK',
			payload: {
				groupId: formData.groupId,
				bookmarkId: bookmark.id
			}
		});
		handleModalClose();
	};

	const ModalFooter = () => (
		<>
			<button type="button" onClick={handleRemoveButtonClick}>
				Remove
			</button>
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
							<BookmarkContainer
								groups={[
									{
										id: '0',
										bookmarks: [{ ...formData, link: '#', row: 0, column: 0 }]
									}
								]}
								editAppData={false}
								showCreateGroupButton={false}
								groupProps={{ showHeader: false }}
								groupItemProps={{ showEditButton: false }}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Modal>
	);
};

export default ViewBookmarkFormEdit;
