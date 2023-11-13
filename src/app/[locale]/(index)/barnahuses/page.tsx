'use client'
import { ListLayoutWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'
import { useEffect } from 'react'
import { useNavbarItemsStore } from 'store/NavbarStore'

const BarnahusesPage = () => {
	const { setNavbarItems } = useNavbarItemsStore()

	useEffect(() => {
		setNavbarItems({ title: 'General.barnahus', useUserDropdown: true })
	}, [])

	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="Barnahuses.noListDataDescription"
		// 	buttonLabel="Barnahuses.add"
		// 	buttonLink={ROUTES.ADD_BARNAHUS}
		// />
		<ListLayoutWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListLayoutWrapper>
	)
}

export default BarnahusesPage
