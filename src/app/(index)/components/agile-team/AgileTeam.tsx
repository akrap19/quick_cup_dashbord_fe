import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'

export const AgileTeam = () => {
	return (
		<Box paddingY={16} backgroundColor="neutral.100">
			<Container>
				<Columns gap={4}>
					<Columns.Item columns={{ mobile: 12, tablet: 6 }}>
						<Heading variant="h1">
							Agile team <br />
							on demand
						</Heading>
					</Columns.Item>
					<Columns.Item columns={{ mobile: 12, tablet: 6 }}>
						<Stack gap={8} alignItems="flex-start">
							<Text>
								Extend your team with our high performing specialists or hire us to shape your product from scratch.
								Either way, we’ll get your product off the ground and build a momentum for your success.
							</Text>
							<Button href="#">See How It Works</Button>
						</Stack>
					</Columns.Item>
				</Columns>
			</Container>
		</Box>
	)
}
