import { Tabs } from './Tabs'

export default {
	title: 'UI/Navigation/Tabs',
	component: Tabs
}

export const Default = () => {
	return (
		<Tabs>
			<Tabs.Tab value="tab-1">Overview</Tabs.Tab>
			<Tabs.Tab value="tab-2">Requests</Tabs.Tab>
			<Tabs.Tab value="tab-3">Reports</Tabs.Tab>
			<Tabs.Tab value="tab-4">My Absences</Tabs.Tab>
			<Tabs.Panel value="tab-1">Panel 1</Tabs.Panel>
			<Tabs.Panel value="tab-2">Panel 2</Tabs.Panel>
			<Tabs.Panel value="tab-3">Panel 3</Tabs.Panel>
			<Tabs.Panel value="tab-4">Panel 4</Tabs.Panel>
		</Tabs>
	)
}
