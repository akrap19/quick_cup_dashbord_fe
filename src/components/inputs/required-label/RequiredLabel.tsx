import { ReactNode } from 'react'

import { Text } from 'components/typography/text'

interface Props {
	children: ReactNode
}

export const RequiredLabel = ({ children }: Props) => (
	<>
		{children}
		<Text as="span" color="destructive.500" fontSize="small">
			*
		</Text>
	</>
)
