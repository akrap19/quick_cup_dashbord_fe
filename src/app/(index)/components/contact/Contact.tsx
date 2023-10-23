import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

export const Contact = () => {
	return (
		<Box paddingY={16} alignItems="center" justifyContent="center" backgroundColor="neutral.100" textAlign="center">
			<Container>
				<Stack gap={10}>
					<Text variant="h1">Have a project in mind? Let&apos;s work together.</Text>
					<div>
						<Button href="#">Contact Us</Button>
					</div>
				</Stack>
			</Container>
		</Box>
	)
}
