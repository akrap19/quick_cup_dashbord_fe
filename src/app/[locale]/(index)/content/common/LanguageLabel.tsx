import { Box } from '@/components/layout/box'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

interface Props {
	language?: string
}

export const LanguageLabel = ({ language }: Props) => {
	return (
		<Box
			style={{ right: tokens.spacing[5], display: language ? 'block' : 'none' }}
			position="absolute"
			backgroundColor="primary.100"
			paddingY={1}
			paddingX={2}
			borderRadius="xxlarge">
			<Text fontSize="small" color="primary.900">
				{language}
			</Text>
		</Box>
	)
}
