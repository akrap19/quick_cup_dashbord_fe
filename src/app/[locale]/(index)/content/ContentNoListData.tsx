import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'
import { ROUTES } from 'parameters'

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { useRouter } from 'next/navigation'
import { useManageContent } from '@/store/manage-content'
import { Language } from 'api/models/language/language'
import { Base } from 'api/models/common/base'

interface Props {
	contentSection: string
	languages: Language[]
	languageValue: Base
	doesLanguageHasContent: boolean
}

export const ContentNoListData = ({ contentSection, languages, languageValue, doesLanguageHasContent }: Props) => {
	const { push } = useRouter()
	const { setLanguage } = useManageContent()
	const currentLanguage = languages?.find(language => language.languageId === languageValue.id)

	const gotDefaultLanguage =
		languages?.some((language: Language) => language.isDefault && language.status === LanguageStatusEnum.PUBLISHED) ??
		false

	const handleAddContent = () => {
		if (currentLanguage) {
			setLanguage({ id: currentLanguage?.languageId, name: currentLanguage?.name })
			push(ROUTES.ADD_CONTENT)
		}
	}

	const handleAddContentInDefaultLanguage = () => {
		const defaultLanguage = languages?.find(language => language.isDefault)

		if (defaultLanguage) {
			setLanguage({ id: defaultLanguage?.languageId, name: defaultLanguage?.name })
			push(ROUTES.ADD_CONTENT)
		}
	}

	const getRouteForType = (type: string) => {
		switch (type) {
			case 'about':
				return ROUTES.ADD_ABOUT_CONTENT
			case 'rooms':
				return ROUTES.ADD_ROOM_CONTENT
			case 'staff':
				return ROUTES.ADD_STAFF_CONTENT
			default:
				return '/'
		}
	}

	const handleNavigation = () => {
		const route = getRouteForType(contentSection)
		push(route)
	}

	return doesLanguageHasContent ? (
		<NoListData
			navbarTitle="General.content"
			title={`ManageContent.add${capitalizeFirstLetter(contentSection)}`}
			description={`ManageContent.add${capitalizeFirstLetter(contentSection)}Description`}
			buttonLabel={`ManageContent.add${capitalizeFirstLetter(contentSection)}`}
			onClick={handleNavigation}
			distanceFromTop="8vh"
			setNavbarItems={false}
		/>
	) : currentLanguage?.autoTranslate ? (
		gotDefaultLanguage ? (
			<NoListData
				navbarTitle="General.content"
				title="ManageContent.addAndReviewNewContentTitle"
				description="ManageContent.addAndReviewNewContentDescription"
				buttonLabel="ManageContent.addAndReviewNewContentButtonLabel"
				buttonLink={`${ROUTES.AUTOTRANSLATE_AND_REVIEW}?languageId=${currentLanguage?.languageId}`}
				distanceFromTop="8vh"
				setNavbarItems={false}
			/>
		) : (
			<NoListData
				navbarTitle="General.content"
				title="ManageContent.contentNotAddedInDefaultLanguageTitle"
				description="ManageContent.contentNotAddedInDefaultLanguageDescription"
				buttonLabel="ManageContent.add"
				onClick={handleAddContentInDefaultLanguage}
				distanceFromTop="8vh"
				setNavbarItems={false}
			/>
		)
	) : (
		<NoListData
			navbarTitle="General.content"
			title="ManageContent.contentNotAddedTitle"
			description="ManageContent.contentNotAddedDescription"
			buttonLabel="ManageContent.add"
			onClick={handleAddContent}
			distanceFromTop="8vh"
			setNavbarItems={false}
		/>
	)
}
