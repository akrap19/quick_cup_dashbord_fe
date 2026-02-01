'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { useTranslations } from 'next-intl'
import { FilePreview } from '@/components/custom/file-preview'
import { getFileUrl } from '@/utils/downloadFile'

interface ProductQuantityItemProps {
	productId: string
	productName: string
	quantity: number
	fileId?: string
	fileUrl?: string
}

export const ProductQuantityItem = ({
	productId,
	productName,
	quantity,
	fileId,
	fileUrl
}: ProductQuantityItemProps) => {
	const t = useTranslations()
	const resolvedFileUrl = fileUrl || (fileId ? getFileUrl(fileId) : null)

	return (
		<Stack key={productId} gap={2}>
			<Inline justifyContent="space-between" alignItems="center" gap={3}>
				<Box display="flex" style={{ flex: 1 }}>
					<Stack gap={1}>
						<Text color="neutral.700" fontSize="small" fontWeight="semibold">
							{productName}
						</Text>
						{quantity > 0 && (
							<Text color="neutral.600" fontSize="small">
								{t('General.quantity')}: {Math.round(quantity)}
							</Text>
						)}
					</Stack>
				</Box>
			</Inline>
			{resolvedFileUrl && fileId && (
				<Box paddingLeft={2}>
					<FilePreview fileId={fileId} fileUrl={resolvedFileUrl} />
				</Box>
			)}
		</Stack>
	)
}

