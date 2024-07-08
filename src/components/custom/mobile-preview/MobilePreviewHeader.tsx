import { LeftArrowIcon } from '@/components/icons/left-arrow-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Dispatch, SetStateAction } from 'react'

import * as styles from './MobilePreview.css'
import { MobilePreviewDropdown } from './MobilePreviewDropDown'

interface Props {
	contentTypes: string[]
	contentType: string
	setContentType: Dispatch<SetStateAction<string>>
}

export const MobilePreviewHeader = ({ contentTypes, contentType, setContentType }: Props) => {
	return (
		<Inline justifyContent="space-between">
			<Button variant="adaptive">
				<Box className={styles.mobilePreviewBackButtonWrapper}>
					<LeftArrowIcon size="xlarge" color="neutral.900" />
				</Box>
			</Button>
			<MobilePreviewDropdown options={contentTypes} value={contentType} setValue={setContentType} />
		</Inline>
	)
}
