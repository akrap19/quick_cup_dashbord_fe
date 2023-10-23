import React from 'react'

import { Columns } from './Columns'

export default {
	title: 'UI/Layout/Columns',
	component: Columns
}

export const Default = () => {
	return (
		<div style={{ backgroundColor: 'lightblue', textAlign: 'center' }}>
			<Columns gap={6}>
				<Columns.Item columns={2}>2</Columns.Item>
				<Columns.Item columns={2}>2</Columns.Item>
				<Columns.Item columns={2}>2</Columns.Item>
				<Columns.Item columns={2}>2</Columns.Item>
				<Columns.Item columns={2}>2</Columns.Item>
				<Columns.Item columns={2}>2</Columns.Item>
				<Columns.Item columns={10}>10</Columns.Item>
				<Columns.Item columns={2}>2</Columns.Item>
				<Columns.Item columns={12}>12</Columns.Item>
				<Columns.Item columns={6}>6</Columns.Item>
				<Columns.Item columns={6}>6</Columns.Item>
			</Columns>
		</div>
	)
}

export const Responsive = () => {
	return (
		<div style={{ backgroundColor: 'lightblue', textAlign: 'center' }}>
			<Columns gap={{ mobile: 3, tablet: 4, desktop: 5 }}>
				<Columns.Item columns={{ mobile: 12, tablet: 4, desktop: 2 }}>2</Columns.Item>
				<Columns.Item columns={{ mobile: 12, tablet: 4, desktop: 2 }}>2</Columns.Item>
				<Columns.Item columns={{ mobile: 12, tablet: 4, desktop: 2 }}>2</Columns.Item>
				<Columns.Item columns={{ mobile: 12, tablet: 4, desktop: 2 }}>2</Columns.Item>
				<Columns.Item columns={{ mobile: 12, tablet: 4, desktop: 2 }}>2</Columns.Item>
				<Columns.Item columns={{ mobile: 12, tablet: 4, desktop: 2 }}>2</Columns.Item>
				<Columns.Item columns={{ mobile: 12, tablet: 10 }}>10</Columns.Item>
				<Columns.Item columns={{ mobile: 12, tablet: 2 }}>2</Columns.Item>
				<Columns.Item columns={12}>12</Columns.Item>
				<Columns.Item columns={6}>6</Columns.Item>
				<Columns.Item columns={6}>6</Columns.Item>
			</Columns>
		</div>
	)
}
