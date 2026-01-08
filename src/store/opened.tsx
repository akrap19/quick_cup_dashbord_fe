import { create } from 'zustand'

type OpenedStore = {
	opened: boolean
	toggleOpened: () => void
	setOpened: (opened: boolean) => void
}

export const useOpenedStore = create<OpenedStore>(set => ({
	opened: false,
	toggleOpened: () => set(state => ({ opened: !state.opened })),
	setOpened: (opened: boolean) => set({ opened })
}))
