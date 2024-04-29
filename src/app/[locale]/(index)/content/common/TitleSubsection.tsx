import { useTranslations } from 'next-intl'

import { AddButton } from '@/components/custom/button/add-button'
import { InputInfo } from '@/components/inputs/input-info'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { ROUTES } from 'parameters'

interface Props {
	buttonLabel: string
	infoText?: string
}

export const TitleSubsection = ({ buttonLabel, infoText }: Props) => {
	const t = useTranslations()

	return (
		<Inline justifyContent="space-between" alignItems="center">
			<Inline gap={5} alignItems="center">
				<AddButton size="small2" variant="secondary" buttonLabel={buttonLabel} buttonLink={ROUTES.ADD_ADMINS} />
				{infoText && <InputInfo infoText={t(infoText)} />}
			</Inline>
			<Box backgroundColor="primary.100" paddingY={1} paddingX={2} borderRadius="xxlarge">
				<Text fontSize="small" color="primary.900">
					English
				</Text>
			</Box>
		</Inline>
	)
}
