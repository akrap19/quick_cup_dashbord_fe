import { create } from 'zustand'

import { getObjectLength } from '../utils'

type TableStore = {
	checkedItems: {}
	checkedItemsLength?: number
	setCheckedItems: (checkedItems?: {}) => void
	clearCheckedItems: () => void
	getCheckedItemsLength: () => void
}

export const useTableStore = create<TableStore>((set, get) => ({
	checkedItems: {},
	checkedItemsLength: 0,
	setCheckedItems: checkedItems => set(() => ({ checkedItems })),
	clearCheckedItems: () => set(() => ({ checkedItems: {} })),
	getCheckedItemsLength: () => {
		const { checkedItems } = get()

		set(() => ({ checkedItemsLength: checkedItems ? getObjectLength(checkedItems) : 0 }))
	}
}))

useTableStore.subscribe(state => {
	if (state.checkedItems !== undefined && getObjectLength(state.checkedItems) !== state.checkedItemsLength) {
		state.getCheckedItemsLength()
	}
})
