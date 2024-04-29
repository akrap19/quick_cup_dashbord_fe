import { useTranslations } from 'next-intl'

import { FormControl } from '@/components/inputs/form-control'
import { PatternInput } from '@/components/inputs/pattern-input'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

export const WorkingHours = () => {
	const t = useTranslations()

	return (
		<Box paddingTop={6} paddingRight={16}>
			<Stack gap={4}>
				<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
					{t('ManageContent.workingHours')}
				</Text>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						columnGap: tokens.spacing[6],
						rowGap: tokens.spacing[4]
					}}>
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
							<RequiredLabel>{t('ManageContent.mondayToFriday')}</RequiredLabel>
						</Text>
						<FormControl name="mondayToFriday">
							<PatternInput
								format="##:## - ##:##"
								mask="_"
								placeholder={t('ManageContent.mondayToFridayPlaceholder')}
							/>
							<FormControl.Message />
						</FormControl>
					</Stack>
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
							<RequiredLabel>{t('ManageContent.saturday')}</RequiredLabel>
						</Text>
						<FormControl name="generalIntrudactionTitle">
							<PatternInput format="##:## - ##:##" mask="_" placeholder={t('ManageContent.saturdayPlaceholder')} />
							<FormControl.Message />
						</FormControl>
					</Stack>
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
							<RequiredLabel>{t('ManageContent.sunday')}</RequiredLabel>
						</Text>
						<FormControl name="generalIntrudactionTitle">
							<TextInput placeholder={t('ManageContent.sundayPlaceholder')} />
							<FormControl.Message />
						</FormControl>
					</Stack>
				</div>
			</Stack>
		</Box>
	)
}
