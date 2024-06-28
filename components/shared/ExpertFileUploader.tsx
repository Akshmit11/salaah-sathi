'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'
import { File } from 'lucide-react'
import Image from 'next/image'

type ExpertFileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

const ExpertFileUploader = ({ imageUrl, onFieldChange, setFiles }: ExpertFileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center h-72 cursor-pointer flex-col overflow-hidden rounded-xl">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-fit flex-1 justify-center">
          <Image
            src={imageUrl}
            alt="expert-profile-photo"
            width={200}
            height={300}
            className="object-contain object-center"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col py-5">
          <File />
          <h3 className="mb-2 mt-2">Drag or upload portrait profile photo here (recommended 200 x 300 pixels)</h3>
          <p className="p-medium-12 mb-4">PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from device
          </Button>
        </div>
      )}
    </div>
  )
}

export default ExpertFileUploader