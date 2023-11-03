import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { BrandLogo } from '../brandLogo/BrandLogo'
import * as styles from './Drawer.css'
import House from '@/components/icons/block-icon/assets/house.svg'
import { Text } from '../../typography/text'

export const Drawer = () => {
	return (
		<Box className={styles.Drawer}>
			<Stack gap={13}>
				<BrandLogo addHomeLink={true} />
				<Stack gap={4}>
					<Box className={styles.DrawerItem} paddingX="6" paddingY="3">
						<Inline gap="4" alignItems="center">
							<House />
							<Text fontSize="big" fontWeight="semibold">
								Barnahuses
							</Text>
						</Inline>
					</Box>
				</Stack>
			</Stack>
		</Box>
	)
}
