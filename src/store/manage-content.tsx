import { create } from 'zustand'

import { Base } from 'api/models/common/base'
import { Content } from 'api/models/content/content'
import { ContentPayload } from 'api/models/content/contentPayload'
import { Audio } from 'api/models/common/audio'

type ManageContent = {
	contentType?: string
	setContentType: (contentType?: string) => void
	language?: Base
	setLanguage: (language?: Base) => void
	content?: Content
	setContent: (content?: Content) => void
	contentPayload?: { about?: ContentPayload[]; rooms?: ContentPayload[]; staff?: ContentPayload[] }
	setContentPayload: (key: string, contentPayload?: ContentPayload[]) => void
	removeLastContentPayload: (key: string) => void
	imagesToDisplay: { id: string; images: string[] }[]
	setImagesToDisplay: (id: string, images: string[]) => void
	audioToDisplay: { id: string; audio: Audio }[]
	setAudioToDisplay: (id: string, audio: Audio) => void
	isContentEmpty: { about: boolean; rooms: boolean; staff: boolean }
	setIsContentEmpty: (key: string, isEmpty?: boolean) => void
	isAllContentEmpty: () => boolean
	clearAll: () => void
}

export const useManageContent = create<ManageContent>((set, get) => ({
	contentType: undefined,
	setContentType: contentType => set(() => ({ contentType })),
	language: undefined,
	setLanguage: language => set(() => ({ language })),
	content: undefined,
	setContent: content => set(() => ({ content })),
	contentPayload: undefined,
	setContentPayload: (key, newContentPayload) =>
		set(state => ({
			contentPayload: {
				...state.contentPayload,
				[key]: newContentPayload
			}
		})),
	removeLastContentPayload: key => {
		set(state => {
			let content

			if (key === 'about') {
				content = state.contentPayload?.about
			} else if (key === 'rooms') {
				content = state.contentPayload?.rooms
			} else if (key === 'staff') {
				content = state.contentPayload?.staff
			}

			if (Array.isArray(content) && content.length > 0) {
				return {
					contentPayload: {
						...state.contentPayload,
						[key]: content.slice(0, -1)
					}
				}
			}

			return state
		})
	},
	imagesToDisplay: [],
	setImagesToDisplay: (id, images) => {
		set(state => {
			const index = state.imagesToDisplay.findIndex(item => item.id === id)

			if (index !== -1) {
				const updated = [...state.imagesToDisplay]
				updated[index].images = images
				return { imagesToDisplay: updated }
			} else {
				return { imagesToDisplay: [...state.imagesToDisplay, { id, images }] }
			}
		})
	},
	audioToDisplay: [],
	setAudioToDisplay: (id, audio) => {
		set(state => {
			const index = state.audioToDisplay.findIndex(item => item.id === id)

			if (index !== -1) {
				const updated = [...state.audioToDisplay]
				updated[index].audio = audio
				return { audioToDisplay: updated }
			} else {
				return { audioToDisplay: [...state.audioToDisplay, { id, audio }] }
			}
		})
	},
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
	},
	clearAll: () =>
		set(() => ({
			contentPayload: undefined,
			imagesToDisplay: [],
			audioToDisplay: []
		}))
}))
