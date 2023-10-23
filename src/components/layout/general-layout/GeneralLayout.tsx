import { ComponentProps, ReactNode } from 'react'

import { Head } from 'components/utils'

type Props = ComponentProps<typeof Head> & { children: ReactNode }

export const GeneralLayout = ({ metaTags, children }: Props) => {
	return (
		<div>
			<Head metaTags={metaTags} />
			{children}
		</div>
	)
}
