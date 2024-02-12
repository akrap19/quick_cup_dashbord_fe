import Link from 'next/link'
import * as React from 'react'

import { Box } from '@/components/layout/box'

import * as styles from './Table.css'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ ...props }, ref) => (
	<div className={styles.tableWrapper}>
		<table ref={ref} className={styles.table} {...props} />
	</div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ ...props }, ref) => <thead ref={ref} className={styles.tableHeader} {...props} />
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ ...props }, ref) => <tbody ref={ref} className={styles.tableBody} {...props} />
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ ...props }, ref) => <tfoot ref={ref} className={styles.tableFooter} {...props} />
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	({ ...props }, ref) => <tr ref={ref} className={styles.tableRow} {...props} />
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
	({ ...props }, ref) => <th ref={ref} className={styles.tableHead} {...props} />
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
	({ ...props }, ref) => <td ref={ref} className={styles.tableCell} {...props} />
)
TableCell.displayName = 'TableCell'

const TableCellWithLink = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement> & { href: string }
>(({ href, ...props }, ref) => (
	<td ref={ref} className={styles.tableCellWithLink} {...props}>
		<Link href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
			<Box paddingY={4} paddingX={6}>
				{props.children}
			</Box>
		</Link>
	</td>
))
TableCellWithLink.displayName = 'TableCellWithLink'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
	({ ...props }, ref) => <caption ref={ref} className={styles.tableCaption} {...props} />
)
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCellWithLink, TableCaption }
