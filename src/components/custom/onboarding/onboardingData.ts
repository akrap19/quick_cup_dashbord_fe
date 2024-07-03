import { OnboardingData } from './Onboarding'

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
			title: 'MasterAdmins.onboardingCreateCustomiedIDTitle',
			description: 'MasterAdmins.onboardingCreateCustomiedIDDescription',
			image: '/images/onboardingImages/masterAdmin/create-customized-id.png'
		}
	],
	Admin: [
		{
			title: 'Practitioners.add',
			description: 'Admins.onboardingAddPractitionerDescription',
			image: '/images/onboardingImages/masterAdmin/add-practitioner.png'
		},
		{
			title: 'MasterAdmins.onboardingSetupAppContentTitle',
			description: 'MasterAdmins.onboardingSetupAppContentDescription',
			image: '/images/onboardingImages/masterAdmin/set-up-content.png'
		},
		{
			title: 'MasterAdmins.onboardingCreateCustomiedIDTitle',
			description: 'MasterAdmins.onboardingCreateCustomiedIDDescription',
			image: '/images/onboardingImages/masterAdmin/create-customized-id.png'
		}
	],
	Practitioner: [
		{
			title: 'MasterAdmins.onboardingCreateCustomiedIDTitle',
			description: 'MasterAdmins.onboardingCreateCustomiedIDDescription',
			image: '/images/onboardingImages/masterAdmin/create-customized-id.png'
		}
	]
}
