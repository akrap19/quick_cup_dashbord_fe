import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Checkbox } from '@/components/inputs/checkbox'
import { FormControl } from '@/components/inputs/form-control'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Staff, StaffImage } from 'api/models/content/staff'

interface Props {
	data: Staff
	form: any
	index: number
	hideDivider: boolean
}

export const SelectStaffContentItem = ({ data, form, index, hideDivider }: Props) => {
	const t = useTranslations()

	return (
		<Box>
			<Stack gap={4}>
				{data?.staffImages?.length > 0 && (
					<Box backgroundColor="neutral.100">
						<Stack gap={4}>
							<Inline justifyContent="space-between">
								<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
									{t('General.photos')}
								</Text>
								<FormControl {...form.register(`items[${index}].includeImage`)}>
									<Checkbox />
								</FormControl>
							</Inline>
							<Inline gap={6}>
								{data?.staffImages?.map((image: StaffImage) => (
									<Image src={image?.url} width={212} height={212} alt="uploadedPhoto" style={{ objectFit: 'cover' }} />
								))}
							</Inline>
						</Stack>
					</Box>
				)}
				{data?.name && (
					<Stack gap={6}>
						<Box backgroundColor="neutral.100">
							<Stack gap={4}>
								<Inline justifyContent="space-between">
									<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
										{t('ManageContent.staffName')}
									</Text>
									<FormControl {...form.register(`items[${index}].includeName`)}>
										<Checkbox />
									</FormControl>
								</Inline>
								<Box paddingRight={20}>
									<Text fontSize="small" color="neutral.800">
										{data?.name}
									</Text>
								</Box>
							</Stack>
						</Box>
					</Stack>
				)}
				{data?.description?.length > 0 && (
					<Box paddingBottom={8}>
						<Stack gap={6}>
							<Box backgroundColor="neutral.100">
								<Stack gap={4}>
									<Inline justifyContent="space-between">
										<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
											{t('ManageContent.generalIntroductionDescription')}
										</Text>
										<FormControl {...form.register(`items[${index}].includeDescription`)}>
											<Checkbox />
										</FormControl>
									</Inline>
									<Box paddingRight={20}>
										<Text fontSize="small" color="neutral.800">
											<div dangerouslySetInnerHTML={{ __html: data?.description }} />
										</Text>
									</Box>
								</Stack>
							</Box>
						</Stack>
					</Box>
				)}
			</Stack>
			{!hideDivider && <Divider />}
		</Box>
	)
}
