'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Staff, StaffImage } from 'api/models/content/staff'
import { ROUTES } from 'parameters'

interface Props {
	staff: Staff
}

export const StaffDetails = ({ staff }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: staff?.title,
		backLabel: 'ManageContent.back',
		actionButton: (
			<EditButton
				buttonLabel="ManageContent.editStaff"
				buttonLink={`${ROUTES.EDIT_STAFF_CONTENT}/${staff.staffTranslationId}`}
			/>
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Stack gap={4}>
					<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
						{t('General.photos')}
					</Text>
					<Inline gap={6}>
						{staff?.staffImages?.map((image: StaffImage) => (
							<Image src={image?.url} width={212} height={212} alt="uploadedPhoto" style={{ objectFit: 'cover' }} />
						))}
					</Inline>
				</Stack>
				<Stack gap={4}>
					<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
						{t('ManageContent.staffName')}
					</Text>
					<Box paddingRight={20}>
						<Text fontSize="small" color="neutral.800">
							{staff?.name}
						</Text>
					</Box>
				</Stack>
				<Stack gap={4}>
					<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
						{t('ManageContent.generalIntroductionDescription')}
					</Text>
					<Box paddingRight={20}>
						<Text fontSize="small" color="neutral.800">
							<div dangerouslySetInnerHTML={{ __html: staff?.description }} />
						</Text>
					</Box>
				</Stack>
			</Stack>
		</DetailsWrapper>
	)
}
