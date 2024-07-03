import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'
import { useNavbarItemsStore } from '@/store/navbar'

import { Loader } from '../../loader/Loader'

interface Props {
	children: ReactNode
}

export const FormWrapper = ({ children }: Props) => {
	const { navbarIsLoading } = useNavbarItemsStore()

	return (
		<>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Box padding={10} width="100%">
					<Box
						padding={6}
						style={{ maxWidth: '60rem' }}
						backgroundColor="neutral.50"
						border="thin"
						borderColor="neutral.300">
						{children}
					</Box>
				</Box>
			)}
		</>
	)
}
