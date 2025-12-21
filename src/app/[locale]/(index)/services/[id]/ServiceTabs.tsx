'use client'

import { Tabs } from '@/components/navigation/tabs/Tabs'

import { ServiceDetails } from './ServiceDetails'
import { ServiceLocationsList } from './ServiceLocationsList'
import { useTranslations } from 'next-intl'
import { ServiceLocation } from 'api/models/service-locations/serviceLocation'
import { Service } from 'api/models/services/service'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { ROUTES } from 'parameters'
import { EditButton } from '@/components/custom/button/edit-button'

interface Props {
	service: Service
	serviceLocations?: ServiceLocation[]
	serviceLocationsPagination?: any
	isInitialListEmpty: boolean
}
export const ServiceTabs = ({ service, serviceLocations, serviceLocationsPagination, isInitialListEmpty }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: service?.name,
		backLabel: 'Services.back',
		actionButton: <EditButton buttonLabel="Services.edit" buttonLink={ROUTES.EDIT_SERVICES + service?.id} />
	})

	return (
		<Tabs size="large">
			<Tabs.Tab value="serviceLocations" defaultTab>
				{t('ServiceLocations.title')}
			</Tabs.Tab>
			<Tabs.Tab value="serviceDetails">{t('General.details')}</Tabs.Tab>
			<Tabs.Panel value="serviceLocations">
				<ServiceLocationsList
					service={service}
					serviceLocations={serviceLocations || []}
					serviceLocationsPagination={serviceLocationsPagination}
					isInitialListEmpty={isInitialListEmpty}
				/>
			</Tabs.Panel>
			<Tabs.Panel value="serviceDetails">
				<ServiceDetails service={service} />
			</Tabs.Panel>
		</Tabs>
	)
}
