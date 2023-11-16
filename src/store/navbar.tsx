import { create } from 'zustand'

import { NavbarItems } from './models/NavbarItems'

type NavbarItemsStore = {
	navbarItems?: NavbarItems
	setNavbarItems: (navbar?: NavbarItems) => void
	clearNavbarItems: () => void
}

export const useNavbarItemsStore = create<NavbarItemsStore>(set => ({
	navbarItems: undefined,
	setNavbarItems: navbarItems => set(() => ({ navbarItems })),
	clearNavbarItems: () => set(() => ({ navbarItems: undefined }))
}))
