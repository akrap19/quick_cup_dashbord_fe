import { create } from 'zustand'

import { Base } from 'api/models/common/base'
import { Content } from 'api/models/content/content'

type ManageContent = {
	contentType?: string
	setContentType: (contentType?: string) => void
	language?: Base
	setLanguage: (language?: Base) => void
	content?: Content
	setContent: (content?: Content) => void
}

export const useManageContent = create<ManageContent>(set => ({
	contentType: undefined,
	setContentType: contentType => set(() => ({ contentType })),
	language: undefined,
	setLanguage: language => set(() => ({ language })),
	content: undefined,
	setContent: content => set(() => ({ content }))
}))
