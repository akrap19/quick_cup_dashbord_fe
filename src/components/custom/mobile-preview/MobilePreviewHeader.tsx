import { LeftArrowIcon } from '@/components/icons/left-arrow-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useStepsStore } from '@/store/steps'

import * as styles from './MobilePreview.css'
import { MobilePreviewDropdown } from './MobilePreviewDropDown'

interface Props {
	contentTypes: string[]
	contentType: string
	handleContentType: (contentType: string) => void
}

export const MobilePreviewHeader = ({ contentTypes, contentType, handleContentType }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()

	const handleSteps = () => {
		if (currentStep) {
			setCurrentStep(currentStep - 1)
		}
	}

	return (
		<Inline justifyContent="space-between">
			<Button disabled={true} type="button" variant="adaptive" onClick={handleSteps}>
				<Box className={styles.mobilePreviewBackButtonWrapper}>
					<LeftArrowIcon size="xlarge" color="neutral.900" />
				</Box>
			</Button>
			<MobilePreviewDropdown options={contentTypes} value={contentType} handleContentType={handleContentType} />
		</Inline>
	)
}
