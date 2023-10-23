import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

interface ProviderProps {
	children: ReactNode
}

interface Context {
	activeTab: string
	onActiveTabChange: (tab: string) => void
}

const TabsContext = createContext<Context>({
	activeTab: '',
	onActiveTabChange: () => null
})

export const TabsProvider = ({ children }: ProviderProps) => {
	const [activeTab, setActiveTab] = useState<string>('')

	const value = useMemo(() => {
		const onActiveTabChange = (tab: string) => {
			setActiveTab(tab)
		}

		return { activeTab, onActiveTabChange }
	}, [activeTab])

	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

export const useTabsProvider = () => {
	return useContext(TabsContext)
}
