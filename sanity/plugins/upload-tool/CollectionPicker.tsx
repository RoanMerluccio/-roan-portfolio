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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    client
      .fetch<Collection[]>('*[_type == "collection"]{_id, title} | order(title asc)')
      .then(data => { setCollections(data); setLoading(false) })
      .catch(err => { setError(err instanceof Error ? err.message : 'Failed to load collections'); setLoading(false) })
  }, []) // intentionally empty — fetch once on mount

  if (loading) {
    return <p style={{ color: '#555', fontSize: 13 }}>Loading collections…</p>
  }

  if (error) {
    return <p style={{ color: '#f44336', fontSize: 13 }}>Error: {error}</p>
  }

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
