import { Inline } from '@/components/layout/inline'
import { useTranslations } from 'next-intl'
import { MobilePreviewButton } from './MobilePreviewButton'

export const MobilePreviewFooter = () => {
	const t = useTranslations()

	return (
		<Inline gap={2}>
			<MobilePreviewButton variant="secondary">{t('General.back')}</MobilePreviewButton>
			<MobilePreviewButton>{t('General.next')}</MobilePreviewButton>
		</Inline>
	)
}
