'use client'

import { useTranslations } from 'next-intl'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { Checkbox } from '@/components/inputs/checkbox'
import { FormControl } from '@/components/inputs/form-control'
import { InputInfo } from '@/components/inputs/input-info'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { OpenedProps } from '@/hooks/use-toggle'
import { BaseCode } from 'api/models/common/baseCode'

interface Props {
	languages: BaseCode[]
	gotDefaultLanguage: boolean
	cancelDialog?: OpenedProps
}

const LanguageForm = ({ languages, gotDefaultLanguage, cancelDialog }: Props) => {
	const t = useTranslations()
	const transformedLanguagesArray = languages?.map(location => {
		return {
			id: location.code,
			name: location.name
		}
	})

	console.log('gotDefaultLanguage', gotDefaultLanguage)
	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<Columns>
				<Columns.Item columns={6}>
					<Stack gap={7}>
						<Stack gap={8}>
							<FormControl name="language">
								<FormControl.Label>
									<RequiredLabel>{t('General.language')}</RequiredLabel>
								</FormControl.Label>
								<SearchDropdown placeholder="General.language" options={transformedLanguagesArray} alwaysShowSearch />
								<FormControl.Message />
							</FormControl>
							<InputWithInfo infoText="Languages.statusInfoText">
								<FormControl name="status">
									<FormControl.Label>
										<RequiredLabel>{t('General.status')}</RequiredLabel>
									</FormControl.Label>
									<TextInput defaultValue={t('General.draft')} disabled />
									<FormControl.Message />
								</FormControl>
							</InputWithInfo>
						</Stack>
						<Inline gap={5} alignItems="center">
							<Inline gap={2} alignItems="center">
								<Box>
									<FormControl name="autoTranslate">
										<Checkbox />
									</FormControl>
								</Box>
								<Text color="neutral.900" fontWeight="semibold" fontSize="small">
									{t('Languages.autoTranslate')}
								</Text>
							</Inline>
							<Inline alignItems="center">
								<InputInfo infoText="Languages.autoTranslateInfoText" />
							</Inline>
						</Inline>
					</Stack>
				</Columns.Item>
			</Columns>
		</FormItems>
	)
}

export default LanguageForm
