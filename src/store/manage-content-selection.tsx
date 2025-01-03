import { create } from 'zustand'

import { AboutTemplate } from 'api/models/template/aboutTemplate'
import { RoomTemplate } from 'api/models/template/roomTemplate'
import { StaffTemplate } from 'api/models/template/staffTemplate'

type ManageTemplate = {
	name?: string
	setName: (name?: string) => void
	isGeneral?: string
	setIsGeneral: (isGeneral?: string) => void
	abouts?: AboutTemplate[]
	setAbouts: (abouts?: AboutTemplate[]) => void
	rooms?: RoomTemplate[]
	setRooms: (abouts?: RoomTemplate[]) => void
	staff?: StaffTemplate[]
	setStaff: (staff?: StaffTemplate[]) => void
	resetContent: () => void
}

export const useManageContentSelection = create<ManageTemplate>(set => ({
	name: undefined,
	setName: name => set(() => ({ name })),
	isGeneral: undefined,
	setIsGeneral: isGeneral => set(() => ({ isGeneral })),
	abouts: undefined,
	setAbouts: abouts => set(() => ({ abouts })),
	rooms: undefined,
	setRooms: rooms => set(() => ({ rooms })),
	staff: undefined,
	setStaff: staff => set(() => ({ staff })),
	resetContent: () => set(() => ({ abouts: undefined, rooms: undefined, staff: undefined }))
}))
