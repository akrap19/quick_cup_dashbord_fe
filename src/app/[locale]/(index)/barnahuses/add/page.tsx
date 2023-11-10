'use client'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Card } from '@/components/layout/card'

const AddBarnahusPage = () => {
	return (
		<Box padding={10}>
			<Card>
				<Card.Divider />
				<Button variant="secondary">Cancel</Button>
				<Button variant="primary">Save & add</Button>
			</Card>
		</Box>
	)
}

export default AddBarnahusPage
