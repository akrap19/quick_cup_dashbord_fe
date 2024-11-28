import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { Checkbox } from '@/components/inputs/checkbox'
import { FormControl } from '@/components/inputs/form-control'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { AboutImage } from 'api/models/content/about'

interface Props {
	data: any
	form: any
	index: number
	hideDivider: boolean
}

export const SelectContentItem = ({ data, form, index, hideDivider }: Props) => {
	const t = useTranslations()

	return (
		<Box>
			<Stack gap={4}>
				{data?.audio && (
					<Box backgroundColor="neutral.100">
						<Stack gap={4}>
							<Inline justifyContent="space-between">
								<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
									{t('General.audio')}
								</Text>
								<FormControl {...form.register(`items[${index}].includeAudio`)}>
									<Checkbox />
								</FormControl>
							</Inline>
							<AudioUpload
								value={data?.audio?.audioId}
								initialAudio={{ id: data?.audio?.audioId, url: data?.audio?.audioURL, name: data?.audio?.audioName }}
								disableDelete
							/>
						</Stack>
					</Box>
				)}
				<Box>
					<Stack gap={6}>
						{data?.description && (
							<Box backgroundColor="neutral.100">
								<Stack gap={4}>
									<Inline justifyContent="space-between">
										<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
											{data.title}
										</Text>
										<FormControl {...form.register(`items[${index}].includeDescription`)}>
											<Checkbox />
										</FormControl>
									</Inline>
									<Box paddingRight={20}>
										<Text fontSize="small" color="neutral.800">
											<div dangerouslySetInnerHTML={{ __html: data?.description }} />
										</Text>
									</Box>
								</Stack>
							</Box>
						)}
						{(data?.aboutImages?.length > 0 || data?.roomImages?.length > 0) && (
							<Box backgroundColor="neutral.100">
								<Stack gap={4}>
									<Inline justifyContent="space-between">
										<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
											{t('General.photos')}
										</Text>
										<FormControl {...form.register(`items[${index}].includeImage`)}>
											<Checkbox />
										</FormControl>
									</Inline>
									<Inline gap={6}>
										{data?.aboutImages
											? data?.aboutImages?.map((image: AboutImage) => (
													<Image
														src={image?.url}
														width={212}
														height={212}
														alt="uploadedPhoto"
														style={{ objectFit: 'cover' }}
													/>
												))
											: data?.roomImages?.map((image: AboutImage) => (
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
						)}
					</Stack>
				</Box>
			</Stack>
			{!hideDivider && (
				<Box paddingTop={8}>
					<Divider />
				</Box>
			)}
		</Box>
	)
}
