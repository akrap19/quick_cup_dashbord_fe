export interface OnboardingData {
	title: string
	description: string
	additionalDescription?: string
	image: string
	link1?: string
	link2?: string
}

interface onboardingDataByRole {
	[key: string]: OnboardingData[]
}

export const onboardingData: onboardingDataByRole = {
	SuperAdmin: [
		{
			title: 'Barnahuses.add',
			description: 'General.addBarnahusOnboardingDescription',
			image: '/images/onboardingImages/superAdmin/add-barnahus.png'
		},
		{
			title: 'MasterAdmins.add',
			description: 'General.addMasterAdminOnboardingDescription',
			image: '/images/onboardingImages/superAdmin/add-master-admin.png'
		},
		{
			title: 'General.onboardingLastStepTitle',
			description: 'General.onboardingLastStepDescriptionPartOne',
			additionalDescription: 'General.onboardingLastStepDescriptionPartTwo',
			image: '/images/onboardingImages/journeysBanner.png',
			link1: 'https://childrenatrisk.cbss.org/the-journeys-app-supporting-safe-and-informed-pathways-for-each-child/',
			link2: ' https://www.youtube.com/playlist?list=PLSlqZEsR51bn4xqY25BvQXfmHOvH0nwe7'
		}
	],
	MasterAdmin: [
		{
			title: 'Admins.add',
			description: 'MasterAdmins.onboardingAddAdminDescription',
			image: '/images/onboardingImages/masterAdmin/add-admin.png'
		},
		{
			title: 'Practitioners.add',
			description: 'MasterAdmins.onboardingAddPractitionerDescription',
			image: '/images/onboardingImages/masterAdmin/add-practitioner.png'
		},
		{
			title: 'MasterAdmins.onboardingSetupAppContentTitle',
			description: 'MasterAdmins.onboardingSetupAppContentDescription',
			image: '/images/onboardingImages/masterAdmin/set-up-content.png'
		},
		{
			title: 'MasterAdmins.onboardingCreateTemplateTitle',
			description: 'MasterAdmins.onboardingCreateTemplateDescription',
			image: '/images/onboardingImages/masterAdmin/create-template.png'
		},
		// {
		// 	title: 'MasterAdmins.onboardingCreateCustomiedIDTitle',
		// 	description: 'MasterAdmins.onboardingCreateCustomiedIDDescription',
		// 	image: '/images/onboardingImages/masterAdmin/create-customized-id.png'
		// },
		{
			title: 'MasterAdmins.onboardingCreateCaseJourneyTitle',
			description: 'MasterAdmins.onboardingCreateCaseJourneyDescription',
			image: '/images/onboardingImages/masterAdmin/create-case-journey.png'
		},
		{
			title: 'General.onboardingLastStepTitle',
			description: 'General.onboardingLastStepDescriptionPartOne',
			additionalDescription: 'General.onboardingLastStepDescriptionPartTwo',
			image: '/images/onboardingImages/journeysBanner.png',
			link1: 'https://childrenatrisk.cbss.org/the-journeys-app-supporting-safe-and-informed-pathways-for-each-child/',
			link2: ' https://www.youtube.com/playlist?list=PLSlqZEsR51bn4xqY25BvQXfmHOvH0nwe7'
		}
	],
	Admin: [
		{
			title: 'Practitioners.add',
			description: 'Admins.onboardingAddPractitionerDescription',
			image: '/images/onboardingImages/admin/add-practitioner.png'
		},
		{
			title: 'MasterAdmins.onboardingSetupAppContentTitle',
			description: 'MasterAdmins.onboardingSetupAppContentDescription',
			image: '/images/onboardingImages/admin/set-up-content.png'
		},
		{
			title: 'MasterAdmins.onboardingCreateTemplateTitle',
			description: 'MasterAdmins.onboardingCreateTemplateDescription',
			image: '/images/onboardingImages/admin/create-template.png'
		},
		// {
		// 	title: 'MasterAdmins.onboardingCreateCustomiedIDTitle',
		// 	description: 'MasterAdmins.onboardingCreateCustomiedIDDescription',
		// 	image: '/images/onboardingImages/admin/create-customized-id.png'
		// },
		{
			title: 'MasterAdmins.onboardingCreateCaseJourneyTitle',
			description: 'MasterAdmins.onboardingCreateCaseJourneyDescription',
			image: '/images/onboardingImages/admin/create-case-journey.png'
		},
		{
			title: 'General.onboardingLastStepTitle',
			description: 'General.onboardingLastStepDescriptionPartOne',
			additionalDescription: 'General.onboardingLastStepDescriptionPartTwo',
			image: '/images/onboardingImages/journeysBanner.png',
			link1: 'https://childrenatrisk.cbss.org/the-journeys-app-supporting-safe-and-informed-pathways-for-each-child/',
			link2: ' https://www.youtube.com/playlist?list=PLSlqZEsR51bn4xqY25BvQXfmHOvH0nwe7'
		}
	],
	Practitioner: [
		{
			title: 'MasterAdmins.onboardingCreateTemplateTitle',
			description: 'MasterAdmins.onboardingCreateTemplateDescription',
			image: '/images/onboardingImages/practitioner/create-template.png'
		},
		// {
		// 	title: 'MasterAdmins.onboardingCreateCustomiedIDTitle',
		// 	description: 'MasterAdmins.onboardingCreateCustomiedIDDescription',
		// 	image: '/images/onboardingImages/practitioner/create-customized-id.png'
		// },
		{
			title: 'MasterAdmins.onboardingCreateCaseJourneyTitle',
			description: 'MasterAdmins.onboardingCreateCaseJourneyDescription',
			image: '/images/onboardingImages/practitioner/create-case-journey.png'
		},
		{
			title: 'General.onboardingLastStepTitle',
			description: 'General.onboardingLastStepDescriptionPartOne',
			additionalDescription: 'General.onboardingLastStepDescriptionPartTwo',
			image: '/images/onboardingImages/journeysBanner.png',
			link1: 'https://childrenatrisk.cbss.org/the-journeys-app-supporting-safe-and-informed-pathways-for-each-child/',
			link2: ' https://www.youtube.com/playlist?list=PLSlqZEsR51bn4xqY25BvQXfmHOvH0nwe7'
		}
	]
}
