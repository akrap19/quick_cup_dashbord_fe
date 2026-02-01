'use client'

import { useTranslations } from 'next-intl'
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { UploadIcon } from '@/components/icons/upload-icon'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'
import { tokens } from '@/style/theme.css'
import { deleteMedia, media } from 'api/services/common'

import * as styles from './FileUpload.css'
import { IconDeleteButton } from '../../button/icon-delete-button/IconDeleteButton'

type FileInfo = {
	id?: string
	name?: string
	url?: string
}

type Props = InputHTMLAttributes<HTMLInputElement> & {
	initialFile?: FileInfo
	disableDelete?: boolean
	onFileChange?: (fileUrl: string) => void
	onFileChangeFull?: (file: FileInfo | undefined) => void
}

export const FileUpload = ({ initialFile, disableDelete, onFileChange, onFileChangeFull, ...rest }: Props) => {
	const [file, setFile] = useState<File>()
	const [fileInfo, setFileInfo] = useState<FileInfo | undefined>(initialFile)
	const [fileUrl, setFileUrl] = useState<string>(initialFile?.url || '')

	// Initialize image/document state from initialFile if available
	const getInitialImageState = () => {
		if (initialFile?.url) {
			const urlLower = initialFile.url.toLowerCase()
			const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
			return imageExtensions.some(ext => urlLower.includes(ext)) || urlLower.startsWith('blob:')
		}
		return false
	}

	const [isImage, setIsImage] = useState<boolean>(getInitialImageState())
	const [isDocument, setIsDocument] = useState<boolean>(initialFile?.url ? !getInitialImageState() : false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const lastProcessedUrlRef = useRef<string | undefined>(initialFile?.url)
	const t = useTranslations()
	console.log('matijaaaa initialFile', isImage)
	console.log('matijaaaa initialFile', isDocument)

	const isDocumentFile = (fileName?: string, mimeType?: string): boolean => {
		if (!fileName && !mimeType) return false

		const name = (fileName || '').toLowerCase()
		const mime = (mimeType || '').toLowerCase()

		// Check MIME type
		if (
			mime.includes('pdf') ||
			mime.includes('document') ||
			mime.includes('msword') ||
			mime.includes('wordprocessingml')
		)
			return true

		// Check file extension
		const documentExtensions = [
			'.pdf',
			'.doc',
			'.docx',
			'.ai',
			'.psd',
			'.eps',
			'.indd',
			'.sketch',
			'.fig',
			'.xd',
			'.psb'
		]
		return documentExtensions.some(ext => name.endsWith(ext))
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

		const urlObject = URL.createObjectURL(selectedFile)
		// Determine media type based on file type
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

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleDelete = async () => {
		if (rest && rest.value) {
			if (rest.value.toString() !== initialFile?.id) {
				const result = await deleteMedia(rest.value.toString())

				if (result?.message === 'OK') {
					handleRemovingFile()
				}
			} else if (rest.value.toString() === initialFile?.id) {
				handleRemovingFile()
			}
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

	const handleInputValue = (value: any) => {
		if (rest.onChange) {
			rest.onChange(value)
		}
	}

	useEffect(() => {
		// If we have initialFile with URL, use it (this takes priority)
		if (initialFile?.url) {
			// Only update if URL actually changed to avoid unnecessary re-renders
			if (lastProcessedUrlRef.current !== initialFile.url) {
				setFileInfo(initialFile)
				setFileUrl(initialFile.url)
				lastProcessedUrlRef.current = initialFile.url
				const urlLower = initialFile.url.toLowerCase()
				const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
				const isImageFile = imageExtensions.some(ext => urlLower.includes(ext)) || urlLower.startsWith('blob:')
				setIsImage(isImageFile)
				// If not an image, default to document/iframe display (works for PDFs and other files)
				setIsDocument(!isImageFile)
			}
		} else if (rest.value && !initialFile?.url) {
			// If we have a fileId but no initialFile URL, construct URL from fileId
			const fileId = rest.value.toString()
			if (fileId && fileId !== '') {
				const constructedUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/media/${fileId}`
				if (lastProcessedUrlRef.current !== constructedUrl) {
					setFileInfo({ id: fileId, url: constructedUrl })
					setFileUrl(constructedUrl)
					lastProcessedUrlRef.current = constructedUrl
					// Try to determine file type from URL
					const urlLower = constructedUrl.toLowerCase()
					const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
					const isImageFile = imageExtensions.some(ext => urlLower.includes(ext))
					setIsImage(isImageFile)
					// If we can't determine type, default to document so it shows in iframe
					setIsDocument(!isImageFile)
				}
			}
		}
		// Also update fileInfo state if initialFile changes (even if URL is the same, other properties might have changed)
		if (initialFile && fileInfo?.id !== initialFile.id) {
			setFileInfo(initialFile)
		}
	}, [initialFile, rest.value])

	return (
		<Inline gap={6}>
			<input
				id={rest.id}
				name={rest.id}
				type="file"
				accept=".PDF,.pdf,.ai,.psd,.eps,.svg,.indd,.sketch,.fig,.xd,.psb,.tiff,.tif,.doc,.docx,image/*"
				multiple={false}
				onChange={handleFileChange}
				className={styles.fileInput}
				ref={fileInputRef}
			/>
			<label htmlFor={rest.id} className={styles.fileUploadLabel}>
				<Box padding={2}>
					<UploadIcon size="xlarge" />
				</Box>
				{t('General.uploadFile')}
				<br />
				{t('General.fileUploadInstructions')}
			</label>
			{(file || fileUrl || fileInfo?.url || initialFile?.url || (rest.value && rest.value !== '')) && (
				<div style={{ width: '242px', height: '300px' }}>
					<Box position="relative" style={{ width: '242px', height: '300px' }}>
						<Box className={styles.fileDeleteIconContainer}>
							{!disableDelete && <IconDeleteButton onDelete={handleDelete} />}
						</Box>
						{(() => {
							// Determine the actual URL to use
							const displayUrl = fileUrl || fileInfo?.url || initialFile?.url || ''
							// Determine if it's an image
							const urlToCheck = displayUrl.toLowerCase()
							const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
							const isImageFile =
								imageExtensions.some(ext => urlToCheck.includes(ext)) || urlToCheck.startsWith('blob:')

							if (isImageFile && displayUrl) {
								return (
									<Image
										src={displayUrl}
										width={242}
										height={300}
										alt={file?.name ?? fileInfo?.name ?? initialFile?.name ?? 'Design template'}
										style={{ objectFit: 'contain', borderRadius: '8px' }}
									/>
								)
							} else if (displayUrl) {
								return (
									// Show in iframe if we have a URL (for documents or unknown types)
									// This handles cases where file type can't be determined
									<Box
										style={{
											width: '242px',
											height: '300px',
											borderRadius: '8px',
											overflow: 'hidden',
											border: tokens.borders.border.thin,
											borderColor: tokens.borders.color['neutral.300']
										}}>
										<iframe
											src={displayUrl}
											style={{
												width: '100%',
												height: '100%',
												border: 'none',
												borderRadius: '8px'
											}}
											title={file?.name ?? fileInfo?.name ?? initialFile?.name ?? 'Document'}
										/>
									</Box>
								)
							} else {
								return (
									<Box
										style={{
											width: '242px',
											height: '300px',
											borderRadius: '8px',
											backgroundColor: tokens.colors['neutral.150'],
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											padding: tokens.spacing[4],
											border: tokens.borders.border.thin,
											borderColor: tokens.borders.color['neutral.300']
										}}>
										<Box style={{ textAlign: 'center' }}>
											<Box paddingBottom={2}>
												<UploadIcon size="large" />
											</Box>
											<Box
												style={{
													fontSize: tokens.typography.size.xsmall,
													color: tokens.colors['neutral.800'],
													wordBreak: 'break-word'
												}}>
												{file?.name ?? fileInfo?.name ?? initialFile?.name ?? 'Design template'}
											</Box>
										</Box>
									</Box>
								)
							}
						})()}
					</Box>
				</div>
			)}
		</Inline>
	)
}
