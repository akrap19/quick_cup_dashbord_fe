import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'

export const Services = () => {
	return (
		<Box paddingY={16} backgroundColor="neutral.600">
			<Container>
				<Columns gap={4}>
					<Columns.Item columns={{ mobile: 12, desktop: 5 }}>
						<Heading variant="h2" color="shades.00">
							Our services
						</Heading>
					</Columns.Item>
					<Columns.Item columns={{ mobile: 12, desktop: 7 }}>
						<Stack gap={10}>
							<Columns gap={4}>
								<Columns.Item columns={{ mobile: 12, tablet: 6 }}>
									<Stack gap={3}>
										<Text color="shades.00" fontWeight="bold" fontSize="xxbig">
											Product design
										</Text>
										<Text color="shades.00">
											Producing, prototyping and testing sketches, high-fidelity wireframes and the final UI is a
											process that results in intuitive and impactful design that’s easy on the eyes.
										</Text>
									</Stack>
								</Columns.Item>
								<Columns.Item columns={{ mobile: 12, tablet: 6 }}>
									<Stack gap={3}>
										<Text color="shades.00" fontWeight="bold" fontSize="xxbig">
											Development
										</Text>
										<Text color="shades.00">
											By selecting the befitting tech stack and architecture for the deliverable in question, we build
											out the product until it`&apos;`s a fully-fledged digital solution.
										</Text>
									</Stack>
								</Columns.Item>
								<Columns.Item columns={{ mobile: 12, tablet: 6 }}>
									<Stack gap={3}>
										<Text color="shades.00" fontWeight="bold" fontSize="xxbig">
											Quality assurance
										</Text>
										<Text color="shades.00">
											Our QA engineering team makes your product bug-free, bulletproof and performance-driven through
											both automatic and manual testing.
										</Text>
									</Stack>
								</Columns.Item>
								<Columns.Item columns={{ mobile: 12, tablet: 6 }}>
									<Stack gap={3}>
										<Text color="shades.00" fontWeight="bold" fontSize="xxbig">
											Marketing & growth
										</Text>
										<Text color="shades.00">
											By understanding the mechanics of digital marketing, we make sure to put your product, at the
											right time, in front of the right people.
										</Text>
									</Stack>
								</Columns.Item>
							</Columns>
							<div>
								<Button href="#">See Our Services</Button>
							</div>
						</Stack>
					</Columns.Item>
				</Columns>
			</Container>
		</Box>
	)
}
