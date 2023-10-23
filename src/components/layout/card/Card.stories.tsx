import { Card } from './Card'
import { Button } from '../../inputs/button'
import { Checkbox } from '../../inputs/checkbox'
// import { FormControl } from '../../inputs/form-control'
// import { PatternInput } from '../../inputs/pattern-input'
import { RadioGroup } from '../../inputs/radio-group'
// import { Select } from '../../inputs/select'
// import { TextInput } from '../../inputs/text-input'
import { Text } from '../../typography/text'
import { Box } from '../box'
import { Stack } from '../stack'

export default {
	title: 'UI/Layout/Card',
	component: Card
}

export const Basic = () => {
	return (
		<Card>
			{/* <FormControl> */}
			{/*	<FormControl.Label>Name of the holiday</FormControl.Label> */}
			{/*	<TextInput placeholder="Holiday name here" /> */}
			{/* </FormControl> */}
			{/* <FormControl> */}
			{/*	<FormControl.Label>Date</FormControl.Label> */}
			{/*	<PatternInput format="##/##/####" placeholder="Enter date" /> */}
			{/* </FormControl> */}
			{/* <FormControl> */}
			{/*	<FormControl.Label>Office</FormControl.Label> */}
			{/*	<Select options={[{ value: 'Cinnamon', label: 'Cinnamon' }]} /> */}
			{/* </FormControl> */}
			<Checkbox label="Same every year" />
			<Box display="flex" gap={3} alignItems="flex-start">
				<Button variant="ghost">Cancel</Button>
				<Button disabled variant="primary">
					Save
				</Button>
			</Box>
		</Card>
	)
}

export const WithTitle = () => {
	return (
		<Card title="Holidays">
			{/* <FormControl> */}
			{/*	<FormControl.Label>Name of the holiday</FormControl.Label> */}
			{/*	<TextInput placeholder="Holiday name here" /> */}
			{/* </FormControl> */}
			{/* <FormControl> */}
			{/*	<FormControl.Label>Date</FormControl.Label> */}
			{/*	<PatternInput format="##/##/####" placeholder="Enter date" /> */}
			{/* </FormControl> */}
			{/* <FormControl> */}
			{/*	<FormControl.Label>Office</FormControl.Label> */}
			{/*	<Select options={[{ value: 'Cinnamon', label: 'Cinnamon' }]} /> */}
			{/* </FormControl> */}
			<Checkbox label="Same every year" />
			<Box display="flex" gap={3} alignItems="flex-start">
				<Button variant="ghost">Cancel</Button>
				<Button disabled variant="primary">
					Save
				</Button>
			</Box>
		</Card>
	)
}

export const WithTitleAndDivider = () => {
	return (
		<Card title="Holidays">
			<Card.Divider />
			<Card.Body>
				{/* <FormControl> */}
				{/*	<FormControl.Label>Name of the holiday</FormControl.Label> */}
				{/*	<TextInput placeholder="Holiday name here" /> */}
				{/* </FormControl> */}
				{/* <FormControl> */}
				{/*	<FormControl.Label>Date</FormControl.Label> */}
				{/*	<PatternInput format="##/##/####" placeholder="Enter date" /> */}
				{/* </FormControl> */}
				{/* <FormControl> */}
				{/*	<FormControl.Label>Office</FormControl.Label> */}
				{/*	<Select options={[{ value: 'Cinnamon', label: 'Cinnamon' }]} /> */}
				{/* </FormControl> */}
				<Checkbox label="Same every year" />
				<Box display="flex" gap={3} alignItems="flex-start">
					<Button variant="ghost">Cancel</Button>
					<Button disabled variant="primary">
						Save
					</Button>
				</Box>
			</Card.Body>
		</Card>
	)
}

export const WithDrawer = () => {
	return (
		<Card title="Employment Details">
			<Card.Drawer>
				<Stack gap={4}>
					<Card title="Employment Period">
						<Card.Divider />
						<Card.Body>
							<RadioGroup
								name="radio"
								value="A"
								onChange={() => null}
								options={[
									{ label: 'Myself', value: 'A' },
									{ label: 'Other employee', value: 'B' }
								]}
							/>
						</Card.Body>
					</Card>
				</Stack>
			</Card.Drawer>
		</Card>
	)
}

export const WithExtras = () => {
	return (
		<Card title="Holidays">
			<Card.Extra>
				<Button variant="ghost" size="small">
					Add Holiday
				</Button>
			</Card.Extra>
			<Card.Divider />
			<Card.Body>
				<Text color="neutral.400">No holidays added yet.</Text>
			</Card.Body>
		</Card>
	)
}

export const Nested = () => {
	return (
		<Card>
			{/* <FormControl> */}
			{/*	<FormControl.Label>Department name</FormControl.Label> */}
			{/*	<TextInput /> */}
			{/* </FormControl> */}
			{/* <FormControl> */}
			{/*	<FormControl.Label>Head of department</FormControl.Label> */}
			{/*	<TextInput /> */}
			{/* </FormControl> */}
			{/* <Card title="Teams"> */}
			{/*	<Card.Divider /> */}
			{/*	<Card.Body> */}
			{/*		<FormControl> */}
			{/*			<FormControl.Label>Department name</FormControl.Label> */}
			{/*			<TextInput /> */}
			{/*		</FormControl> */}
			{/*		<FormControl> */}
			{/*			<FormControl.Label>Head of department</FormControl.Label> */}
			{/*			<TextInput /> */}
			{/*		</FormControl> */}
			{/*		<Checkbox label="Head of department is also Team Lead" /> */}
			{/*	</Card.Body> */}
			{/* </Card> */}
			<div>
				<Button variant="ghost" size="small">
					Add team
				</Button>
			</div>
			<Box display="flex" alignItems="flex-start" gap={3}>
				<Button variant="ghost">Cancel</Button>
				<Button variant="primary">Save</Button>
			</Box>
		</Card>
	)
}
