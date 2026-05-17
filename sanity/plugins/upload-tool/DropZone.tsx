'use client'

import { useRef, useState } from 'react'

interface Props {
  disabled: boolean
  onFiles: (files: File[]) => void
}

export function DropZone({ disabled, onFiles }: Props) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault()
    if (disabled) return
    dragCounterRef.current++
    if (dragCounterRef.current === 1) setDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) setDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    dragCounterRef.current = 0
    setDragging(false)
    if (disabled) return
    onFiles(Array.from(e.dataTransfer.files))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) onFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={e => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      style={{
        border: `2px dashed ${dragging ? '#e8ff00' : disabled ? '#222' : '#444'}`,
        borderRadius: 10,
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        background: dragging ? '#1a1a00' : '#0d0d0d',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 36, opacity: 0.5 }}>⬆</span>
      <span style={{ color: '#666', fontSize: 13 }}>
        Drop photos here, or{' '}
        <span style={{ color: disabled ? '#666' : '#e8ff00', textDecoration: 'underline' }}>
          browse files
        </span>
      </span>
      <span style={{ color: '#444', fontSize: 11 }}>
        {disabled ? 'Select a collection first' : 'JPG, PNG, WEBP · EXIF extracted automatically'}
      </span>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </div>
  )
}
