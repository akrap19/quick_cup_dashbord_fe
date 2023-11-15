import { Button } from '../button'
import { useTranslations } from 'next-intl'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/overlay/popover'
import { Text } from '@/components/typography/text'
import { InfoIcon } from '@/components/icons/info-icon'

interface Props {
	infoText: string
}

export const InputInfo = ({ infoText }: Props) => {
	const t = useTranslations()

	return (
		<Popover>
			<PopoverTrigger>
				<Button variant="adaptive" size="auto">
					<InfoIcon color="neutral.900" />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Text textTransform="none" fontSize="small">
					{t(infoText)}
				</Text>
			</PopoverContent>
		</Popover>
	)
}
