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
			image: '/images/onboardingImages/masterAdmin/set-up-content.png'
		}
	],
	Admin: [
		{
			title: 'MasterAdmins.addMasterAdmins',
			description: 'MasterAdmins.onboardingDescription',
			image: '/images/onboardingImages/masterAdmins/add-master-admin.png'
		},
		{
			title: 'MasterAdmins.addAndAssignBarnahus',
			description: 'MasterAdmins.addAndAssignBarnahusDescription',
			image: '/images/onboardingImages/masterAdmins/add-master-admin.png'
		}
	],
	Practitioner: [
		{
			title: 'MasterAdmins.addMasterAdmins',
			description: 'MasterAdmins.onboardingDescription',
			image: '/images/onboardingImages/masterAdmins/add-master-admin.png'
		},
		{
			title: 'MasterAdmins.addAndAssignBarnahus',
			description: 'MasterAdmins.addAndAssignBarnahusDescription',
			image: '/images/onboardingImages/masterAdmins/add-master-admin.png'
		}
	]
}
