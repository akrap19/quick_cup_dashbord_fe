'use client'

import { BrandLogo } from '@/components/custom/brand-logo/BrandLogo'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Heading } from '@/components/typography/heading'
import { atoms } from '@/style/atoms.css'
import { Inter } from 'next/font/google'

const inter = Inter({
	weight: ['400', '600', '700', '800'],
	subsets: ['latin'],
	variable: '--inter-font'
})

export default function Error() {
	return (
		<html>
			<body className={inter.className}>
				<Box width="100vw" justify="center" style={{ paddingTop: '18%', display: 'flex' }}>
					<Stack gap={10} alignItems="center">
						<BrandLogo />
						<Box
							backgroundColor="neutral.50"
							boxShadow="medium"
							padding={10}
							borderRadius="small"
							style={{ width: '500px' }}>
							<Stack gap={8} alignItems="center">
								<Stack gap={3}>
									<Heading variant="h3" textTransform="uppercase" textAlign="center" whiteSpace="nowrap">
										{'Something went wrong'}
									</Heading>
									<Text fontSize="small" textAlign="center">
										{'Please wait a moment and then reload. If reload doesnt help, request assistance.'}
									</Text>
								</Stack>
								<Button className={atoms({ width: '100%' })} onClick={() => window.location.reload()}>
									{'Reload'}
								</Button>
							</Stack>
						</Box>
					</Stack>
				</Box>
			</body>
		</html>
	)
}
