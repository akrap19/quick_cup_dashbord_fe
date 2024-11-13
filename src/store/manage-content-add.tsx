import { create } from 'zustand'
import { ContentPayload } from 'api/models/content/contentPayload'

type ManageContentAdd = {
	abouts?: ContentPayload[]
	setAbouts: (about: ContentPayload) => void
	rooms?: ContentPayload[]
	setRooms: (room: ContentPayload) => void
	staff?: ContentPayload[]
	setStaff: (staff: ContentPayload) => void
}

export const useManageContentAdd = create<ManageContentAdd>(set => ({
	abouts: [],
	setAbouts: about => set(state => ({ abouts: [...(state.abouts || []), about] })),
	rooms: [],
	setRooms: room => set(state => ({ rooms: [...(state.rooms || []), room] })),
	staff: [],
	setStaff: staff => set(state => ({ staff: [...(state.staff || []), staff] }))
}))
