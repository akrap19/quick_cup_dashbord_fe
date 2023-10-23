import { Pattern } from '@/components/custom/pattern'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

import * as styles from './Hero.css'

export const Hero = () => {
	return (
		<Pattern>
			<Box paddingY={16}>
				<Container>
					<Stack gap={6}>
						<h1 className={styles.heroHeading}>Results focused design & development agency.</h1>
						<Columns gap={4}>
							<Columns.Item columns={{ mobile: 12, tablet: 8, desktop: 6 }}>
								<Text color="shades.00" fontSize="xbig">
									Extend your team with our high performing specialists or hire us to shape your product from scratch.
									Either way, we’ll get your product off the ground and build a momentum for your success.
								</Text>
							</Columns.Item>
						</Columns>
					</Stack>
				</Container>
			</Box>
		</Pattern>
	)
}
