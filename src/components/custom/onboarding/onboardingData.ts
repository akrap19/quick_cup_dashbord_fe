import { OnboardingData } from './Onboarding'

interface onboardingDataByRole {
	[key: string]: OnboardingData[]
}

export const onboardingData: onboardingDataByRole = {
	SuperAdmin: [
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
	MasterAdmin: [
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
