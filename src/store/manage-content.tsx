import { Base } from 'api/models/common/base'
import { create } from 'zustand'

type ManageContent = {
	contentType?: string
	setContentType: (contentType?: string) => void
	language?: Base
	setLanguage: (language?: Base) => void
}

export const useManageContent = create<ManageContent>(set => ({
	contentType: undefined,
	setContentType: contentType => set(() => ({ contentType })),
	language: undefined,
	setLanguage: language => set(() => ({ language }))
}))
