import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import FormLabel from '../../Label';
import RadioGroup from '../../RadioGroup';
import UrlService from '../../../../services/UrlService';
import FormIconPicker from '../../IconPicker';

export const defaultValues = {
	size: 'medium',
	favicon: {
		type: 'none'
	}
};

const FormEditBookmark = () => {
	const {
		register,
		setValue,
		formState: { errors }
	} = useFormContext();

	const watchedValues = useWatch();
	const watchedFaviconType = useWatch({ name: 'favicon.type' });

	useEffect(() => {
		setValue('favicon.data', {});
	}, [watchedFaviconType]);

	return (
		<>
			<FormLabel label="Name" required error={errors.text}>
				<input aria-invalid={errors.text ? 'true' : 'false'} {...register('text', { required: 'This field is required' })} />
			</FormLabel>
			<FormLabel label="URL" required error={errors.link}>
				<input
					aria-invalid={errors.link ? 'true' : 'false'}
					{...register('link', {
						required: 'This field is required',
						validate: {
							validUrl: (value) => UrlService.isValid(value) || 'Invalid URL'
						}
					})}
				/>
			</FormLabel>
			<FormLabel label="Size" error={errors.size}>
				<select {...register('size')}>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="wide">Wide</option>
					<option value="large">Large</option>
				</select>
			</FormLabel>

			<h2>Favicon</h2>
			<RadioGroup label="Method of getting a favicon">
				<>
					<label>
						<input type="radio" value="none" {...register('favicon.type')} />
						None
					</label>
					<label>
						<input type="radio" value="icon" {...register('favicon.type')} />
						Icon
					</label>
					<label>
						<input type="radio" value="auto" {...register('favicon.type')} />
						Auto
					</label>
					<label>
						<input type="radio" value="text" {...register('favicon.type')} />
						Text
					</label>
					<label>
						<input type="radio" value="image" {...register('favicon.type')} />
						Image
					</label>
				</>
			</RadioGroup>

			{watchedValues.favicon.type === 'text' && (
				<FormLabel label="Favicon text">
					<input aria-invalid={errors.favicon?.text ? 'true' : 'false'} {...register('favicon.data.text')} />
				</FormLabel>
			)}

			{watchedValues.favicon.type === 'icon' && (
				<FormIconPicker
					onPick={({ prefix, iconName }) => {
						setValue('favicon.data.iconStyle', prefix);
						setValue('favicon.data.name', iconName);
					}}
				/>
			)}

			{watchedValues.favicon.type === 'auto' && (
				<FormLabel label="Website URL" required>
					<input
						aria-invalid={errors.favicon?.websiteUrl ? 'true' : 'false'}
						{...register('favicon.data.websiteUrl', {
							required: 'This field is required',
							validate: {
								validUrl: (value) => UrlService.isValid(value) || 'Invalid URL'
							}
						})}
					/>
				</FormLabel>
			)}

			{watchedValues.favicon.type === 'image' && (
				<FormLabel label="Image direct URL" required>
					<input
						aria-invalid={errors.favicon?.url ? 'true' : 'false'}
						{...register('favicon.data.url', {
							required: 'This field is required',
							validate: {
								validUrl: (value) => UrlService.isValid(value) || 'Invalid URL'
							}
						})}
					/>
				</FormLabel>
			)}
		</>
	);
};

export default FormEditBookmark;
