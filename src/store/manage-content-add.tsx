import { create } from 'zustand'
import { ContentPayload } from 'api/models/content/contentPayload'
import { Audio } from 'api/models/common/audio'

type ManageContentAdd = {
	abouts?: ContentPayload[]
	setAbouts: (about: ContentPayload) => void
	removeAboutsByLanguageId: (languageId: string) => void
	removeAboutsByTranslationId: (aboutTranslationId: string) => void
	rooms?: ContentPayload[]
	setRooms: (room: ContentPayload) => void
	removeRoomsByLanguageId: (languageId: string) => void
	removeRoomsByTranslationId: (roomTranslationId: string) => void
	staff?: ContentPayload[]
	setStaff: (staff: ContentPayload) => void
	removeStaffByLanguageId: (languageId: string) => void
	removeStaffByTranslationId: (staffTranslationId: string) => void
	imagesToDisplay?: string[]
	setImagesToDisplay: (imagesToDisplay: string[]) => void
	audioToDisplay: { languageId: string; audio: Audio | undefined }[]
	setAudioToDisplay: (languageId: string, audio: Audio | undefined) => void
	removeaudioByLanguageId: (languageId: string) => void
	clearAll: () => void
}

export const useManageContentAdd = create<ManageContentAdd>(set => ({
	abouts: [],
	setAbouts: about => set(state => ({ abouts: [...(state.abouts || []), about] })),
	removeAboutsByLanguageId: (languageId: string) =>
		set(state => ({
			abouts: state.abouts?.filter(about => about.languageId !== languageId) || []
		})),
	removeAboutsByTranslationId: (aboutTranslationId: string) =>
		set(state => ({
			abouts: state.abouts?.filter(about => about.aboutTranslationId !== aboutTranslationId) || []
		})),
	rooms: [],
	setRooms: room => set(state => ({ rooms: [...(state.rooms || []), room] })),
	removeRoomsByLanguageId: (languageId: string) =>
		set(state => ({
			rooms: state.rooms?.filter(room => room.languageId !== languageId) || []
		})),
	removeRoomsByTranslationId: (roomTranslationId: string) =>
		set(state => ({
			rooms: state.rooms?.filter(room => room.roomTranslationId !== roomTranslationId) || []
		})),
	staff: [],
	setStaff: staff => set(state => ({ staff: [...(state.staff || []), staff] })),
	removeStaffByLanguageId: (languageId: string) =>
		set(state => ({
			staff: state.staff?.filter(staff => staff.languageId !== languageId) || []
		})),
	removeStaffByTranslationId: (staffTranslationId: string) =>
		set(state => ({
			staff: state.staff?.filter(staff => staff.staffTranslationId !== staffTranslationId) || []
		})),
	imagesToDisplay: [],
	setImagesToDisplay: imagesToDisplay => set(() => ({ imagesToDisplay })),
	audioToDisplay: [],
	setAudioToDisplay: (languageId, audio) => {
		set(state => {
			const index = state.audioToDisplay.findIndex(item => item.languageId === languageId)

			if (index !== -1) {
				const updated = [...state.audioToDisplay]
				updated[index].audio = audio
				return { audioToDisplay: updated }
			} else {
				return { audioToDisplay: [...state.audioToDisplay, { languageId, audio }] }
			}
		})
	},
	removeaudioByLanguageId: (languageId: string) =>
		set(state => ({
			audioToDisplay: state.audioToDisplay?.filter(about => about.languageId !== languageId) || []
		})),
	clearAll: () =>
		set(() => ({
			abouts: [],
			rooms: [],
			staff: [],
			imagesToDisplay: [],
			audioToDisplay: []
		}))
}))
