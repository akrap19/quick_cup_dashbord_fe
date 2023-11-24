import { create } from 'zustand'

type ManageContent = {
	contentType?: string
	setContentType: (contentType?: string) => void
	language?: string
	setLanguage: (language?: string) => void
}

export const useManageContent = create<ManageContent>(set => ({
	contentType: undefined,
	setContentType: contentType => set(() => ({ contentType })),
	language: undefined,
	setLanguage: language => set(() => ({ language }))
}))
