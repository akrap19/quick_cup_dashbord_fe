'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Label } from '@/components/inputs/label'
import { Text } from '@/components/typography/text'
import { Button } from '@/components/inputs/button'
import { isImageUrl, isDocumentFile } from '@/utils/downloadFile'
import { downloadDesignTemplate } from 'api/services/products'
import { tokens } from '@/style/theme.css'
import { DownloadIcon } from '@/components/icons/download-icon'
import { DesignTemplate } from 'api/models/products/designTemplate'

interface Props {
	productId: string
	designTemplate: DesignTemplate
}

export const DesignTemplateDisplay = ({ productId, designTemplate }: Props) => {
	const t = useTranslations()

	return (
		<Box>
			<Stack gap={4}>
				<Label>{t('General.designTemplate')}</Label>
				<Inline gap={6} alignItems="flex-start">
					<Box position="relative" style={{ width: '242px', height: '300px', flexShrink: 0 }}>
						{isImageUrl(designTemplate.url) ? (
							<>
								<Image
									alt={designTemplate.name || 'Design template'}
									src={designTemplate.url}
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
										onClick={() => downloadDesignTemplate(productId, designTemplate.name)}
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
											style={{ fontWeight: 'bold', lineHeight: 1, fill: tokens.colors['primary.500'] }}>
											<DownloadIcon size="large" />
										</Text>
									</Button>
								</Box>
							</>
						) : isDocumentFile(designTemplate.name, designTemplate.url) ? (
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
									src={designTemplate.url}
									style={{
										width: '100%',
										height: '100%',
										border: 'none',
										borderRadius: '8px'
									}}
									title={designTemplate.name || 'Design template'}
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
										{designTemplate.name || 'Design template'}
									</Box>
								</Box>
							</Box>
						)}
					</Box>
					{!isDocumentFile(designTemplate.name, designTemplate.url) && !isImageUrl(designTemplate.url) && (
						<Stack gap={4} style={{ flex: 1 }}>
							<Text fontSize="small" color="neutral.800">
								{designTemplate.name || '-'}
							</Text>
							<Button
								variant="secondary"
								size="small"
								onClick={() => downloadDesignTemplate(productId, designTemplate.name)}>
								{t('General.download')}
							</Button>
						</Stack>
					)}
				</Inline>
			</Stack>
		</Box>
	)
}
