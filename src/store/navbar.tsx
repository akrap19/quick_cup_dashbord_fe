import { create } from 'zustand'

import { NavbarItems } from './models/NavbarItems'

type NavbarItemsStore = {
	navbarItems?: NavbarItems
	navbarIsLoading: boolean
	setNavbarItems: (navbar?: NavbarItems) => void
	setNavbarIsLoading: (navbarIsLoading: boolean) => void
	clearNavbarItems: () => void
}

export const useNavbarItemsStore = create<NavbarItemsStore>(set => ({
	navbarItems: undefined,
	navbarIsLoading: true,
	setNavbarItems: navbarItems => set(() => ({ navbarItems })),
	setNavbarIsLoading: navbarIsLoading => set(() => ({ navbarIsLoading })),
	clearNavbarItems: () => set(() => ({ navbarItems: undefined }))
}))
