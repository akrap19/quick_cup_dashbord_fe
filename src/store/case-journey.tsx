import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'
import { create } from 'zustand'

type CaseJourneyStore = {
	type?: CaseJourneyTypeEnum
	setType: (type?: CaseJourneyTypeEnum) => void
}

export const useSCaseJourneyStore = create<CaseJourneyStore>(set => ({
	type: undefined,
	setType: type => set(() => ({ type }))
}))
