import { create } from 'zustand'

interface INavbarItems {
	title: string
	backLabel?: string
	useUserDropdown?: boolean
}

type NavbarItemsStore = {
	navbarItems: INavbarItems | undefined
	setNavbarItems: (navbar: INavbarItems) => void
	clearNavbarItems: () => void
}

export const useNavbarItemsStore = create<NavbarItemsStore>(set => ({
	navbarItems: undefined,
	setNavbarItems: navbarItems => set(() => ({ navbarItems })),
	clearNavbarItems: () => set(() => ({ navbarItems: undefined }))
}))
