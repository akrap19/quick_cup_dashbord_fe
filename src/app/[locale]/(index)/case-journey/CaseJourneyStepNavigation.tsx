'use client'

import {
	RearrangeRoom,
	SelectBarnahusContent,
	SelectRoomsContent,
	SelectStaffContent
} from '@/components/custom/layouts/content-selection'
import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyWrapper'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useSCaseJourneyStore } from '@/store/case-journey'
import { useStepsStore } from '@/store/steps'
import { Base } from 'api/models/common/base'
import { Language } from 'api/models/language/language'
import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'
import { SelectLanguage } from '../content/add/SelectLanguage'

import { SelectCaseId } from './SelectCaseId'
import { SelectCaseJourneyType } from './SelectCaseJourneyType'

interface Props {
	caseFiles: Base[]
	languages: Language[]
}

const CaseJourneyStepNavigation = ({ caseFiles, languages }: Props) => {
	const { currentStep } = useStepsStore()
	const { type } = useSCaseJourneyStore()

	useSteps({
		totalSteps: 5,
		currentStep: 1
	})
	useNavbarItems({
		title: 'General.caseJourney'
	})

	return (
		<ManageJourneyWrapper>
			{currentStep === 1 && <SelectCaseId caseFiles={caseFiles} />}
			{currentStep === 2 && <SelectLanguage languages={languages} />}
			{currentStep === 3 && <SelectCaseJourneyType />}

			{currentStep === 4 && type === CaseJourneyTypeEnum.CUSTOM && <SelectBarnahusContent />}
			{currentStep === 5 && type === CaseJourneyTypeEnum.CUSTOM && <RearrangeRoom />}
			{currentStep === 6 && type === CaseJourneyTypeEnum.CUSTOM && <SelectRoomsContent />}
			{currentStep === 7 && type === CaseJourneyTypeEnum.CUSTOM && <SelectStaffContent />}
			{/* {currentStep === 4 && <SelectRoomsContent />} */}
		</ManageJourneyWrapper>
	)
}

export default CaseJourneyStepNavigation
