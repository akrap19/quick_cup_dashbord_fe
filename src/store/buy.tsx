import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from 'api/models/products/product'

type BuyStore = {
	selectedItems: Product[]
	addItem: (item: Product) => void
	removeItem: (itemId: string) => void
	clearItems: () => void
	getItemsCount: () => number
}

export const useBuyStore = create<BuyStore>()(
	persist(
		(set, get) => ({
			selectedItems: [],
			addItem: item => {
				const { selectedItems } = get()
				const exists = selectedItems.some(selectedItem => selectedItem.id === item.id)
				if (!exists) {
					set({ selectedItems: [...selectedItems, item] })
				}
			},
			removeItem: itemId => {
				const { selectedItems } = get()
				set({ selectedItems: selectedItems.filter(item => item.id !== itemId) })
			},
			clearItems: () => set({ selectedItems: [] }),
			getItemsCount: () => {
				const { selectedItems } = get()
				return selectedItems.length
			}
		}),
		{
			name: 'buy-store'
		}
	)
)
