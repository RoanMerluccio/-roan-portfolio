export interface Collection {
  _id: string
  title: string
}

export interface ExifFields {
  camera?: string
  lens?: string
  aperture?: string
  shutterSpeed?: string
  iso?: number
  focalLength?: string
  dateTaken?: string
}

export type UploadStatus = 'waiting' | 'uploading' | 'done' | 'error'

export interface UploadItem {
  id: string
  file: File
  status: UploadStatus
  progress: number
  thumbnail: string
  exif?: ExifFields
  error?: string
}
