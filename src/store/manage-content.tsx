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
	isContentEmpty: { about: boolean; rooms: boolean; staff: boolean }
	setIsContentEmpty: (key: string, isEmpty?: boolean) => void
	isAllContentEmpty: () => boolean
}

export const useManageContent = create<ManageContent>((set, get) => ({
	contentType: undefined,
	setContentType: contentType => set(() => ({ contentType })),
	language: undefined,
	setLanguage: language => set(() => ({ language })),
	content: undefined,
	setContent: content => set(() => ({ content })),
	isContentEmpty: { about: false, rooms: false, staff: false },
	setIsContentEmpty: (key, isEmpty) =>
		set(state => ({
			isContentEmpty: {
				...state.isContentEmpty,
				[key]: isEmpty ?? false
			}
		})),
	isAllContentEmpty: () => {
		const { isContentEmpty } = get()
		return isContentEmpty.about && isContentEmpty.rooms && isContentEmpty.staff
	}
}))
