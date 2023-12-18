import { useTranslations } from 'next-intl'

import { InfoIcon } from '@/components/icons/info-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/overlay/popover'
import { Text } from '@/components/typography/text'

interface Props {
	infoText: string
}

export const InputInfo = ({ infoText }: Props) => {
	const t = useTranslations()

	return (
		<Popover>
			<PopoverTrigger>
				<InfoIcon color="neutral.900" />
			</PopoverTrigger>
			<PopoverContent>
				<Text textTransform="none" fontSize="small">
					{t(infoText)}
				</Text>
			</PopoverContent>
		</Popover>
	)
}
