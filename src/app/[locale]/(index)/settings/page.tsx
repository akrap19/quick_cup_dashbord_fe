import { Box } from '@/components/layout/box'
import { getSettings } from 'api/services/settings'

import SettingsTabs from './settingsTabs'

async function SettingsPage() {
	const { data: settings } = await getSettings()

	return (
		<Box paddingTop={8} paddingX={10} width="100%">
			<Box style={{ maxWidth: '60rem' }}>
				<SettingsTabs settings={settings} />
			</Box>
		</Box>
	)
}

export default SettingsPage
