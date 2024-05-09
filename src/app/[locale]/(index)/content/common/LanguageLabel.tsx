import { Box } from '@/components/layout/box'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

export const LanguageLabel = () => {
	return (
		<Box
			style={{ right: tokens.spacing[6] }}
			position="absolute"
			backgroundColor="primary.100"
			paddingY={1}
			paddingX={2}
			borderRadius="xxlarge">
			<Text fontSize="small" color="primary.900">
				English
			</Text>
		</Box>
	)
}
