import { useTranslations } from 'next-intl'

import { Inline } from '@/components/layout/inline'

import { MobilePreviewButton } from './MobilePreviewButton'

interface Props {
	totalContentPages: number
	currentContentPage: number
	handleContentPage: (contentPage: number) => void
}

export const MobilePreviewFooter = ({ totalContentPages, currentContentPage, handleContentPage }: Props) => {
	const t = useTranslations()

	return (
		<Inline gap={2}>
			<MobilePreviewButton
				variant="secondary"
				disabled={currentContentPage === 0}
				onClick={() => handleContentPage(currentContentPage - 1)}>
				{t('General.back')}
			</MobilePreviewButton>
			<MobilePreviewButton
				disabled={currentContentPage + 1 === totalContentPages}
				onClick={() => handleContentPage(currentContentPage + 1)}>
				{`${t('General.next')} ${currentContentPage + 1}/${totalContentPages}`}
			</MobilePreviewButton>
		</Inline>
	)
}
