import type { ColumnDef } from '@tanstack/react-table'

import { ServiceLocation } from 'api/models/service-locations/serviceLocation'

export const columns: Array<ColumnDef<ServiceLocation>> = [
	{ accessorKey: 'city', header: 'General.city' },
	{ accessorKey: 'phone', header: 'General.phoneNumber' },
	{ accessorKey: 'email', header: 'General.email' }
]
