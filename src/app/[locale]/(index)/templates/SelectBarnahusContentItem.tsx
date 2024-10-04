import { AudioIcon } from '@/components/icons/audio-icon'
import { Checkbox } from '@/components/inputs/checkbox'
import { FormControl } from '@/components/inputs/form-control'
import { Box } from '@/components/layout/box'
import { useTranslations } from 'next-intl'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { About, AboutImage } from 'api/models/content/about'
import Image from 'next/image'

interface Props {
	about: About
	hideDivider: boolean
}

export const SelectBarnahusContentItem = ({ about, hideDivider }: Props) => {
	const t = useTranslations()

	console.log('about', about)
	return (
		<Box>
			<Stack gap={4}>
				<Box backgroundColor="neutral.100">
					<Inline justifyContent="space-between">
						<Inline gap={4}>
							<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
								{t('General.audio')}
							</Text>
							<AudioIcon color="neutral.800" />
						</Inline>
						<FormControl name="audio">
							<Checkbox />
						</FormControl>
					</Inline>
				</Box>
				<Box paddingBottom={8}>
					<Stack gap={6}>
						<Box backgroundColor="neutral.100">
							<Stack gap={4}>
								<Inline justifyContent="space-between">
									<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
										{about.title}
									</Text>
									<FormControl name="generalIntroduction">
										<Checkbox />
									</FormControl>
								</Inline>
								<Box paddingRight={20}>
									<Text fontSize="small" color="neutral.800">
										<div dangerouslySetInnerHTML={{ __html: about?.description }} />
									</Text>
								</Box>
							</Stack>
						</Box>
						<Box backgroundColor="neutral.100">
							<Stack gap={4}>
								<Inline justifyContent="space-between">
									<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
										{t('General.photos')}
									</Text>
									<FormControl name="generalIntroduction">
										<Checkbox />
									</FormControl>
								</Inline>
								<Inline gap={6}>
									{about?.aboutImages?.map((image: AboutImage) => (
										<Image
											src={image?.url}
											width={212}
											height={212}
											alt="uploadedPhoto"
											style={{ objectFit: 'cover' }}
										/>
									))}
								</Inline>
							</Stack>
						</Box>
					</Stack>
				</Box>
			</Stack>
			{!hideDivider && <Divider />}
		</Box>
	)
}
