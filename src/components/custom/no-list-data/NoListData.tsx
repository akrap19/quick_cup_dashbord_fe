'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { MouseEventHandler } from 'react'

import { Box } from '@/components/layout/box'
import { useNavbarItems } from '@/hooks/use-navbar-items'

import { AddButton } from '../button/add-button'
import { NoListDataLayout } from './NoListDataLayout'

type Props = {
	navbarTitle?: string
	title: string
	description: string
	buttonLabel: string
	buttonLink?: string
	distanceFromTop?: string
	setNavbarItems?: boolean
	disableButton?: boolean
	onClick?: MouseEventHandler<HTMLButtonElement>
}

export const NoListData = ({
	navbarTitle,
	title,
	description,
	buttonLabel,
	buttonLink,
	distanceFromTop,
	setNavbarItems = true,
	onClick
}: Props) => {
	const t = useTranslations()
	const { push } = useRouter()
	const onClickMethod = !buttonLink ? onClick : () => push(buttonLink)

	if (setNavbarItems) {
		// eslint-disable-next-line
		useNavbarItems({ title: navbarTitle ?? '', useUserDropdown: true })
	}
	return (
		<NoListDataLayout
			navbarTitle={navbarTitle}
			title={title}
			description={description}
			distanceFromTop={distanceFromTop}
			setNavbarItems={setNavbarItems}>
			<Box>
				<AddButton buttonLabel={t(buttonLabel)} onClick={onClickMethod} />
			</Box>
		</NoListDataLayout>
	)
}
