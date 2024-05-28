import { useTranslations } from 'next-intl'
import { MouseEventHandler } from 'react'

import { AddButton } from '@/components/custom/button/add-button'
import { InputInfo } from '@/components/inputs/input-info'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'

interface Props {
	buttonLabel: string
	infoText?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}

export const TitleSubsection = ({ buttonLabel, infoText, onClick }: Props) => {
	const t = useTranslations()
	const { language } = useManageContent()

	return (
		<Inline justifyContent="space-between" alignItems="center">
			<Inline gap={5} alignItems="center">
				<AddButton type="button" size="small2" variant="secondary" buttonLabel={buttonLabel} onClick={onClick} />
				{infoText && <InputInfo infoText={t(infoText)} />}
			</Inline>
			{language && (
				<Box backgroundColor="primary.100" paddingY={1} paddingX={2} borderRadius="xxlarge">
					<Text fontSize="small" color="primary.900">
						{language.name}
					</Text>
				</Box>
			)}
		</Inline>
	)
}
