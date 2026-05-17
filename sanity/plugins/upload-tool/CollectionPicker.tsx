'use client'

import { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import type { Collection } from './types'

interface Props {
  selected: string | null
  onSelect: (id: string) => void
}

export function CollectionPicker({ selected, onSelect }: Props) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    client
      .fetch<Collection[]>('*[_type == "collection"]{_id, title} | order(title asc)')
      .then(setCollections)
  }, [client])

  if (collections.length === 0) {
    return <p style={{ color: '#666', fontSize: 13 }}>No collections found.</p>
  }

  return (
    <div>
      <p style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
        Upload to collection
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {collections.map(c => (
          <button
            key={c._id}
            onClick={() => onSelect(c._id)}
            style={{
              padding: '5px 14px',
              borderRadius: 20,
              border: `1px solid ${selected === c._id ? '#e8ff00' : '#333'}`,
              background: selected === c._id ? '#1a1a00' : '#1a1a1a',
              color: selected === c._id ? '#e8ff00' : '#666',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {c.title}
          </button>
        ))}
      </div>
    </div>
  )
}
