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
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { tokens } from '@/style/theme.css'

interface Props {
	staff: Staff
}

export const StaffDetails = ({ staff }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: staff?.title ?? t('General.title') + t('General.notDefined'),
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
						{staff?.staffImages?.length > 0 ? (
							staff?.staffImages?.map((image: StaffImage) => (
								<Image src={image?.url} width={212} height={212} alt="uploadedPhoto" style={{ objectFit: 'cover' }} />
							))
						) : (
							<Text fontSize="small" color="neutral.800">
								{t('General.photos') + t('General.notDefined')}
							</Text>
						)}
					</Inline>
				</Stack>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						columnGap: tokens.spacing[6],
						rowGap: tokens.spacing[4]
					}}>
					<Stack gap={4}>
						<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
							{t('ManageContent.staffName')}
						</Text>
						<Box paddingRight={20}>
							<Text fontSize="small" color="neutral.800">
								{staff?.name ?? t('General.staffName') + t('General.notDefined')}
							</Text>
						</Box>
					</Stack>
					<Stack gap={4}>
						<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
							{t('ManageContent.staffRole')}
						</Text>
						<Box paddingRight={20}>
							<Text fontSize="small" color="neutral.800">
								{staff?.title ?? t('General.staffRole') + t('General.notDefined')}
							</Text>
						</Box>
					</Stack>
				</div>
				<Stack gap={4}>
					<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
						{t('ManageContent.generalIntroductionDescription')}
					</Text>
					<Box paddingRight={20}>
						<Text fontSize="small" color="neutral.800">
							{removeHtmlTags(staff?.description) ? (
								<div dangerouslySetInnerHTML={{ __html: staff?.description }} />
							) : (
								t('General.description') + t('General.notDefined')
							)}
						</Text>
					</Box>
				</Stack>
			</Stack>
		</DetailsWrapper>
	)
}
