import { toast } from 'react-toastify'

export const ErrorToast = (errorMessage: string) => {
	toast?.error(errorMessage, {
		position: 'bottom-right',
		theme: 'colored',
		autoClose: 1000
	})
}
