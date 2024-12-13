import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Staff } from 'api/models/content/staff'

import { LanguageLabel } from '../common/LanguageLabel'
import { StaffSectionItemsFields } from '../common/StaffSectionItemsFields'
import { ContentPayload } from 'api/models/content/contentPayload'
import { areAllItemsEmptyInArrayObject } from '@/utils/areAllItemsEmptyInArrayObject'
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'
import { Divider } from '@/components/layout/divider'

interface Props {
	staff?: Staff[]
}

const formSchema = z.object({
	items: z.array(
		z.object({
			staffId: z.string(),
			description: z.string().nullable(),
			name: z.string().nullable(),
			title: z.string().nullable(),
			images: z.array(z.string()),
			deletedImages: z.array(z.string())
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageStaffContent = ({ staff }: Props) => {
	const key = 'staff'
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language, contentPayload, imagesToDisplay, setIsContentEmpty, setContentPayload, setImagesToDisplay } =
		useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: contentPayload?.staff
				? contentPayload?.staff?.map((staffItem, index) => {
						return {
							staffId: (staff && staff[index]?.staffId) ?? '',
							title: staffItem?.title ?? '',
							name: staffItem?.name ?? '',
							description: staffItem?.description ?? '',
							images: staffItem?.images ?? [],
							deletedImages: staffItem?.deletedImages ?? []
						}
					})
				: staff?.map(item => {
						return {
							staffId: item?.staffId ?? '',
							name: item?.name ?? '',
							title: item?.title ?? '',
							description: item?.description ?? '',
							images: item?.staffImages?.map(image => image?.staffImageId) ?? [],
							deletedImages: []
						}
					})
		}
	})
	const formData = form?.getValues()

	const { fields } = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const handleNextStep = () => {
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleStaffImagesId = (staffId?: string, imagesIds?: string[]) => {
		const staffImagesIds = staff
			?.find(staff => staff?.staffId === staffId)
			?.staffImages?.map(image => image?.staffImageId)
		const newImagesIds = imagesIds?.filter(id => !staffImagesIds?.includes(id))

		return newImagesIds
	}

	const handleDeletedStaffImagesId = (staffId?: string, imagesIds?: string[]) => {
		const staffImagesIds = staff
			?.find(staff => staff?.staffId === staffId)
			?.staffImages?.map(image => image?.staffImageId)

		const deletedImagesIds = staffImagesIds?.filter(id => !imagesIds?.includes(id))

		return deletedImagesIds
	}

	const onSubmit = async () => {
		const formDataTmp: ContentPayload[] = [...formData.items]
		const formValuesCheck = areAllItemsEmptyInArrayObject(formDataTmp)
		formDataTmp.forEach(obj => {
			// eslint-disable-next-line
			obj.languageId = language?.id
			// eslint-disable-next-line
			obj.deletedImages = handleDeletedStaffImagesId(obj.staffId, obj.images)
			// eslint-disable-next-line
			obj.images = handleStaffImagesId(obj.staffId, obj.images)
		})

		if (!formValuesCheck) {
			setContentPayload(key, replaceEmptyStringsWithNull(formDataTmp))
			setIsContentEmpty(key, false)
		} else {
			setIsContentEmpty(key, true)
		}

		handleNextStep()
	}

	const onPhotosChange = (id: string, images: string[]) => {
		setImagesToDisplay(id + key, images)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Stack gap={7}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.staff')}
							</Text>
						</Box>
						<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<LanguageLabel language={language?.name} />
								{fields.map((field, index) => (
									<div key={field.id}>
										{index > 0 && (
											<Box paddingBottom={6}>
												<Divider />
											</Box>
										)}
										{staff && (
											<StaffSectionItemsFields
												index={index}
												form={form}
												initialImagesUrls={
													imagesToDisplay?.find(images => images?.id === `items[${index}].images` + key)?.images ??
													staff[index]?.staffImages?.map(image => image.url)
												}
												onPhotosChange={onPhotosChange}
											/>
										)}
									</div>
								))}
							</Stack>
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
