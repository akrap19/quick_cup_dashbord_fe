'use client'

import { ReactElement, ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type Props = { children: ReactNode; loader: ReactElement }

export const LoadingBoundary = ({ children, loader }: Props) => {
	return (
		// eslint-disable-next-line react/no-unstable-nested-components
		<ErrorBoundary fallbackRender={() => <p>Errored</p>}>
			<Suspense fallback={loader}>{children}</Suspense>
		</ErrorBoundary>
	)
}
