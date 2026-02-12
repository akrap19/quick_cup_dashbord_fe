import { useRef, useState } from 'react'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'
import { deleteMedia, media } from 'api/services/common'
import { useTranslations } from 'next-intl'
import { isDocumentFile, getInitialImageState } from './fileTypeUtils'

export type FileInfo = {
	id?: string
	name?: string
	url?: string
}

type UseFileUploadProps = {
	initialFile?: FileInfo
	onFileChange?: (fileUrl: string) => void
	onFileChangeFull?: (file: FileInfo | undefined) => void
	onInputChange?: (value: any) => void
	inputValue?: any
}

export const useFileUpload = ({
	initialFile,
	onFileChange,
	onFileChangeFull,
	onInputChange,
	inputValue
}: UseFileUploadProps) => {
	const [file, setFile] = useState<File>()
	const [fileInfo, setFileInfo] = useState<FileInfo | undefined>(initialFile)
	const [fileUrl, setFileUrl] = useState<string>(initialFile?.url || '')
	const [isImage, setIsImage] = useState<boolean>(getInitialImageState(initialFile?.url))
	const [isDocument, setIsDocument] = useState<boolean>(
		initialFile?.url ? !getInitialImageState(initialFile?.url) : false
	)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const t = useTranslations()

	const handleInputValue = (value: any) => {
		if (onInputChange) {
			onInputChange(value)
		}
	}

	const handleRemovingFile = () => {
		handleInputValue('')
		setFile(undefined)
		setFileInfo(undefined)
		setFileUrl('')
		setIsImage(false)
		setIsDocument(false)
		if (onFileChange) {
			onFileChange('')
		}
		if (onFileChangeFull) {
			onFileChangeFull(undefined)
		}
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleFileChange = async (event: any) => {
		const selectedFile = event.target.files[0]
		if (!selectedFile) return

		const maxSize = 10 * 1024 * 1024 // 10 MB in bytes
		if (selectedFile.size > maxSize) {
			ErrorToast(t('General.fileUploadError'))
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
			return
		}

		setIsLoading(true)
		try {
			const urlObject = URL.createObjectURL(selectedFile)
			const fileIsImage = selectedFile.type.startsWith('image/')
			const fileIsDocument = isDocumentFile(selectedFile.name, selectedFile.type)
			const mediaType = fileIsImage ? 'Image' : 'File'
			const result = await media(mediaType, selectedFile)

			if (result?.message === 'OK') {
				handleInputValue(result.data.mediaId)
				setFile(selectedFile)
				setFileUrl(urlObject)
				setIsImage(fileIsImage)
				setIsDocument(fileIsDocument)
				const newFileInfo = { id: result.data.mediaId, name: selectedFile.name, url: urlObject }
				setFileInfo(newFileInfo)
				if (onFileChange) {
					onFileChange(urlObject)
				}
				if (onFileChangeFull) {
					onFileChangeFull(newFileInfo)
				}
			}
		} finally {
			setIsLoading(false)
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleDelete = async () => {
		if (inputValue && inputValue.toString() !== initialFile?.id) {
			const result = await deleteMedia(inputValue.toString())

			if (result?.message === 'OK') {
				handleRemovingFile()
			}
		} else if (initialFile) {
			handleRemovingFile()
		}
	}

	return {
		file,
		fileInfo,
		fileUrl,
		isImage,
		isDocument,
		isLoading,
		fileInputRef,
		handleFileChange,
		handleDelete
	}
}

