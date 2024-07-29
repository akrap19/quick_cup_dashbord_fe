import { create } from 'zustand'

import { Base } from 'api/models/common/base'
import { About } from 'api/models/content/about'
import { Room } from 'api/models/content/room'
import { Staff } from 'api/models/content/staff'
import { Content } from 'api/models/content/content'

type ManageContent = {
	contentType?: string
	setContentType: (contentType?: string) => void
	language?: Base
	setLanguage: (language?: Base) => void
	about?: About[]
	setAbout: (about?: About[]) => void
	room?: Room[]
	setRoom: (room?: Room[]) => void
	staff?: Staff[]
	setStaff: (staff?: Staff[]) => void
	content?: Content
	setContent: (content?: Content) => void
}

export const useManageContent = create<ManageContent>(set => ({
	contentType: undefined,
	setContentType: contentType => set(() => ({ contentType })),
	language: undefined,
	setLanguage: language => set(() => ({ language })),
	about: undefined,
	setAbout: about => set(() => ({ about })),
	room: undefined,
	setRoom: room => set(() => ({ room })),
	staff: undefined,
	setStaff: staff => set(() => ({ staff })),
	content: undefined,
	setContent: content => set(() => ({ content }))
}))
