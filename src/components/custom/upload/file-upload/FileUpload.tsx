'use client'

import React, { InputHTMLAttributes } from 'react'
import { Inline } from '@/components/layout/inline'
import { Box } from '@/components/layout/box'
import { IconDeleteButton } from '../../button/icon-delete-button/IconDeleteButton'
import { useFileUpload, type FileInfo } from './useFileUpload'
import { FilePreview } from './FilePreview'
import { UploadLabel } from './UploadLabel'
import * as styles from './FileUpload.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	initialFile?: FileInfo
	disableDelete?: boolean
	onFileChange?: (fileUrl: string) => void
	onFileChangeFull?: (file: FileInfo | undefined) => void
}

export const FileUpload = ({ initialFile, disableDelete, onFileChange, onFileChangeFull, ...rest }: Props) => {
	const { file, fileInfo, fileUrl, isImage, isDocument, isLoading, fileInputRef, handleFileChange, handleDelete } = useFileUpload({
		initialFile,
		onFileChange,
		onFileChangeFull,
		onInputChange: rest.onChange,
		inputValue: rest.value
	})

	const hasFile = file || fileUrl || fileInfo?.url || (rest.value && rest.value !== '')
	const displayUrl = fileUrl || fileInfo?.url || ''
	const fileName = file?.name ?? fileInfo?.name ?? ''

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
			<UploadLabel inputId={rest.id} isLoading={isLoading} />
			{hasFile && (
				<div style={{ width: '242px', height: '300px' }}>
					<Box position="relative" style={{ width: '242px', height: '300px' }}>
						<Box className={styles.fileDeleteIconContainer}>
							{!disableDelete && <IconDeleteButton onDelete={handleDelete} />}
						</Box>
						<FilePreview
							displayUrl={displayUrl}
							fileName={fileName}
							fileType={file?.type}
							isImage={isImage}
							isDocument={isDocument}
						/>
					</Box>
				</div>
			)}
		</Inline>
	)
}
