import { Text } from 'components/typography/text'

export const handleRequiredSign = (label: string) => {
	return (
		<>
			{label}
			<Text as="span" color="destructive.500" fontSize="small">
				<span style={{ color: 'red' }}>{'*'}</span>
			</Text>
		</>
	)
}
