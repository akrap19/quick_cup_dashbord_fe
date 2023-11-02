import { ReactNode } from 'react'

import { Text } from 'components/typography/text'

interface Props {
	children: ReactNode
	htmlFor?: string
}

export const Label = ({ children, htmlFor }: Props) => (
	<Text
		as="label"
		fontSize="small"
		color="neutral.900"
		lineHeight="medium"
		fontWeight="semibold"
		textTransform="uppercase"
		htmlFor={htmlFor}>
		{children}
	</Text>
)
