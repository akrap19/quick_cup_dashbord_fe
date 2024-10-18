import { create } from 'zustand'

import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'

type CaseJourneyStore = {
	type?: CaseJourneyTypeEnum
	setType: (type?: CaseJourneyTypeEnum) => void
	customId?: string
	setCustomId: (customId?: string) => void
}

export const useCaseJourneyStore = create<CaseJourneyStore>(set => ({
	type: undefined,
	setType: type => set(() => ({ type })),
	customId: undefined,
	setCustomId: customId => set(() => ({ customId }))
}))
