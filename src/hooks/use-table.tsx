import { useEffect } from 'react'

import { useTableStore } from '@/store/table'

export const useTable = (checkeditems: any) => {
	const { setCheckedItems } = useTableStore()

	useEffect(() => {
		setCheckedItems(checkeditems)

		return () => {
			setCheckedItems(undefined)
		}
	}, [checkeditems, setCheckedItems])
}
