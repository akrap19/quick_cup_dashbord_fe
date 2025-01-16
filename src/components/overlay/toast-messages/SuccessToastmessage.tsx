'use client'

import { toast } from 'react-toastify'

export const SuccessToast = (successMessage: string) => {
	toast.success(successMessage, {
		position: 'bottom-right',
		theme: 'colored',
		autoClose: 1000
	})
}
