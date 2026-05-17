'use client'

import { useRef, useState } from 'react'
import { useClient } from 'sanity'
import exifr from 'exifr'
import { CollectionPicker } from './CollectionPicker'
import { DropZone } from './DropZone'
import { UploadQueue } from './UploadQueue'
import { filterImageFiles, parseExifFields } from './utils'
import type { UploadItem } from './types'

const CONCURRENCY = 3

export function UploadTool() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null)
  const [items, setItems] = useState<UploadItem[]>([])

  const queueRef = useRef<UploadItem[]>([])
  const activeCountRef = useRef(0)
  const collectionIdRef = useRef<string | null>(null)

  function updateItem(id: string, patch: Partial<UploadItem>) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i))
  }

  async function uploadFile(item: UploadItem) {
    const collectionId = collectionIdRef.current!
    updateItem(item.id, { status: 'uploading', progress: 0 })

    try {
      const rawExif = await exifr.parse(item.file).catch(() => ({}))
      const exif = parseExifFields(rawExif ?? {})
      updateItem(item.id, { exif })

      // Use observable API to get real-time upload progress
      const asset = await new Promise<{ _id: string }>((resolve, reject) => {
        const subscription = client.observable.assets.upload('image', item.file).subscribe({
          next(event) {
            if (event.type === 'progress') {
              updateItem(item.id, { progress: event.percent ?? 0 })
            }
            if (event.type === 'response') {
              subscription.unsubscribe()
              resolve(event.body.document as { _id: string })
            }
          },
          error: reject,
        })
      })

      await client.create({
        _type: 'photo',
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt: item.file.name.replace(/\.[^/.]+$/, ''),
        collection: { _type: 'reference', _ref: collectionId },
        ...exif,
      })

      updateItem(item.id, { status: 'done', progress: 100 })
    } catch (err) {
      updateItem(item.id, {
        status: 'error',
        error: err instanceof Error ? err.message : 'Upload failed',
      })
    }
  }

  function startNext() {
    while (activeCountRef.current < CONCURRENCY && queueRef.current.length > 0) {
      const item = queueRef.current.shift()!
      activeCountRef.current++
      uploadFile(item).finally(() => {
        activeCountRef.current--
        startNext()
      })
    }
  }

  function handleFiles(files: File[]) {
    const imageFiles = filterImageFiles(files)
    if (imageFiles.length === 0) return

    const newItems: UploadItem[] = imageFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      status: 'waiting' as const,
      progress: 0,
      thumbnail: URL.createObjectURL(file),
    }))

    queueRef.current.push(...newItems)
    setItems(prev => [...prev, ...newItems])
    startNext()
  }

  function handleSelectCollection(id: string) {
    setSelectedCollectionId(id)
    collectionIdRef.current = id
  }

  function handleRetry(id: string) {
    const item = items.find(i => i.id === id)
    if (!item) return
    const retryItem = { ...item, status: 'waiting' as const, progress: 0, error: undefined }
    setItems(prev => prev.map(i => i.id === id ? retryItem : i))
    queueRef.current.unshift(retryItem)
    startNext()
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>Upload Photos</h1>

      <CollectionPicker selected={selectedCollectionId} onSelect={handleSelectCollection} />

      <DropZone disabled={selectedCollectionId === null} onFiles={handleFiles} />

      <UploadQueue items={items} onRetry={handleRetry} />
    </div>
  )
}
