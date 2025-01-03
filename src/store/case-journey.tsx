import { create } from 'zustand'

import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'

type CaseJourneyStore = {
	type?: CaseJourneyTypeEnum
	setType: (type?: CaseJourneyTypeEnum) => void
	customId?: string
	setCustomId: (customId?: string) => void
	password?: string
	setPassword: (password?: string) => void
	enebleNotes: boolean
	setEnebleNotes: (enebleNotes: boolean) => void
}

export const useCaseJourneyStore = create<CaseJourneyStore>(set => ({
	type: undefined,
	setType: type => set(() => ({ type })),
	customId: undefined,
	setCustomId: customId => set(() => ({ customId })),
	password: undefined,
	setPassword: password => set(() => ({ password })),
	enebleNotes: false,
	setEnebleNotes: enebleNotes => set(() => ({ enebleNotes }))
}))
