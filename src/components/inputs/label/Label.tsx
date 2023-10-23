import { ReactNode } from 'react'

import { Text } from 'components/typography/text'

interface Props {
	children: ReactNode
	htmlFor?: string
}

export const Label = ({ children, htmlFor }: Props) => (
	<Text as="label" color="neutral.500" lineHeight="small" fontWeight="semibold" htmlFor={htmlFor}>
		{children}
	</Text>
)
