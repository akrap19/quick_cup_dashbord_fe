import { create } from 'zustand'

import { AboutTemplate } from 'api/models/template/aboutTemplate'
import { StaffTemplate } from 'api/models/template/staffTemplate'
import { RoomTemplate } from 'api/models/template/roomTemplate'

type ManageTemplate = {
	name?: string
	setName: (name?: string) => void
	abouts?: AboutTemplate[]
	setAbouts: (abouts?: AboutTemplate[]) => void
	rooms?: RoomTemplate[]
	setRooms: (abouts?: RoomTemplate[]) => void
	staff?: StaffTemplate[]
	setStaff: (staff?: StaffTemplate[]) => void
}

export const useManageTemplate = create<ManageTemplate>(set => ({
	name: undefined,
	setName: name => set(() => ({ name })),
	abouts: undefined,
	setAbouts: abouts => set(() => ({ abouts })),
	rooms: undefined,
	setRooms: rooms => set(() => ({ rooms })),
	staff: undefined,
	setStaff: staff => set(() => ({ staff }))
}))
