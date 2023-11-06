import { ReactNode } from 'react'

import { Text } from '../text/Text'
import { TextAtomsProps } from '../types'

interface Props extends TextAtomsProps {
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
	children: ReactNode
}

export const Heading = ({ variant, ...rest }: Props) => <Text as={variant} variant={variant} {...rest} />
