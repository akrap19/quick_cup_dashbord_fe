'use client'

import { useEffect } from 'react'

import { NavbarItems } from 'store/models/NavbarItems'
import { useNavbarItemsStore } from 'store/navbar'

export const useNavbarItems = (navbarItems: NavbarItems) => {
	const { setNavbarItems } = useNavbarItemsStore()

	useEffect(() => {
		setNavbarItems(navbarItems)

		return () => {
			setNavbarItems(undefined)
		}
	}, [setNavbarItems, navbarItems.backLabel, navbarItems.title, navbarItems.useUserDropdown])
}
