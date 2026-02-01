'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Button } from '@/components/inputs/button'
import { DownloadIcon } from '@/components/icons/download-icon'
import { tokens } from '@/style/theme.css'
import { isImageUrl, isDocumentFile } from '@/utils/downloadFile'
import { downloadMedia } from 'api/services/media'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface FilePreviewProps {
	fileId: string
	fileUrl: string
}

export const FilePreview = ({ fileId, fileUrl }: FilePreviewProps) => {
	const t = useTranslations()

	return (
		<Stack gap={1}>
			<Box position="relative" style={{ width: '242px', height: '300px', flexShrink: 0 }}>
				{isImageUrl(fileUrl) ? (
					<>
						<Image
							alt="Uploaded file"
							src={fileUrl}
							width={242}
							height={300}
							style={{ objectFit: 'contain', borderRadius: '8px' }}
						/>
						<Box
							style={{
								position: 'absolute',
								bottom: tokens.spacing[2],
								right: tokens.spacing[2],
								zIndex: 1
							}}>
							<Button
								type="button"
								size="auto"
								variant="adaptive"
								onClick={() => downloadMedia(fileId)}
								style={{
									height: '36px',
									width: '36px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: tokens.borders.radius.xsmall,
									backgroundColor: tokens.colors['primary.50']
								}}>
								<Text
									fontSize="small"
									color="primary.500"
									style={{
										fontWeight: 'bold',
										lineHeight: 1,
										fill: tokens.colors['primary.500']
									}}>
									<DownloadIcon size="large" />
								</Text>
							</Button>
						</Box>
					</>
				) : isDocumentFile(undefined, fileUrl) ? (
					<Box
						style={{
							width: '242px',
							height: '300px',
							borderRadius: '8px',
							overflow: 'hidden',
							border: tokens.borders.border.thin,
							borderColor: tokens.borders.color['neutral.300']
						}}>
						<iframe
							src={fileUrl}
							style={{
								width: '100%',
								height: '100%',
								border: 'none',
								borderRadius: '8px'
							}}
							title="Uploaded file"
						/>
					</Box>
				) : (
					<Box
						style={{
							width: '242px',
							height: '300px',
							borderRadius: '8px',
							backgroundColor: tokens.colors['neutral.150'],
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: tokens.spacing[4],
							border: tokens.borders.border.thin,
							borderColor: tokens.borders.color['neutral.300']
						}}>
						<Box style={{ textAlign: 'center' }}>
							<Box paddingBottom={2}>
								<DownloadIcon size="large" />
							</Box>
							<Box
								style={{
									fontSize: tokens.typography.size.xsmall,
									color: tokens.colors['neutral.800'],
									wordBreak: 'break-word'
								}}>
								{t('General.file')}
							</Box>
						</Box>
					</Box>
				)}
			</Box>
			{!isDocumentFile(undefined, fileUrl) && !isImageUrl(fileUrl) && (
				<Stack gap={4} style={{ flex: 1 }}>
					<Text fontSize="small" color="neutral.800">
						{t('General.file')}
					</Text>
					<Button variant="secondary" size="small" onClick={() => downloadMedia(fileId)}>
						{t('General.download')}
					</Button>
				</Stack>
			)}
		</Stack>
	)
}

