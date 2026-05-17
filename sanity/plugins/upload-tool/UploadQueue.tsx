'use client'

import type { UploadItem, UploadStatus } from './types'

interface Props {
  items: UploadItem[]
  onRetry: (id: string) => void
}

const STATUS_LABEL: Partial<Record<UploadStatus, string>> = {
  waiting: 'Waiting',
  done: '✓ Done',
  error: '✗ Error',
}

const STATUS_COLOR: Record<UploadStatus, string> = {
  waiting: '#555',
  uploading: '#888',
  done: '#4caf50',
  error: '#f44336',
}

function queueLabel(items: UploadItem[]): string {
  const uploading = items.filter(i => i.status === 'uploading').length
  const waiting = items.filter(i => i.status === 'waiting').length
  const errors = items.filter(i => i.status === 'error').length
  if (uploading > 0) return `${uploading} uploading`
  if (waiting > 0) return `${waiting} waiting`
  if (errors > 0) return `${errors} failed`
  return `${items.length} done`
}

export function UploadQueue({ items, onRetry }: Props) {
  if (items.length === 0) return null

  const lastDone = [...items].reverse().find(i => i.status === 'done' && i.exif)

  return (
    <div>
      <p style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
        Queue · {queueLabel(items)}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              background: '#1a1a1a',
              borderRadius: 6,
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              opacity: item.status === 'waiting' ? 0.5 : 1,
            }}
          >
            <img
              src={item.thumbnail}
              alt=""
              loading="lazy"
              width={36}
              height={36}
              style={{ objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, color: '#ccc', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.file.name}
              </p>
              <div style={{ height: 3, background: '#222', borderRadius: 2 }}>
                <div style={{
                  width: `${item.progress}%`,
                  height: '100%',
                  background: item.status === 'error' ? '#f44336' : '#e8ff00',
                  borderRadius: 2,
                  transition: 'width 0.2s',
                }} />
              </div>
            </div>
            <div style={{ fontSize: 11, color: STATUS_COLOR[item.status], flexShrink: 0 }}>
              {item.status === 'uploading' ? `${Math.round(item.progress)}%` : STATUS_LABEL[item.status]}
            </div>
            {item.status === 'error' && (
              <button
                onClick={() => onRetry(item.id)}
                style={{ fontSize: 11, color: '#e8ff00', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
              >
                Retry
              </button>
            )}
          </div>
        ))}
      </div>

      {lastDone?.exif && Object.keys(lastDone.exif).length > 0 && (
        <div style={{ marginTop: 10, padding: '10px 12px', background: '#1a1a1a', borderRadius: 6, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11, color: '#555' }}>
          {lastDone.exif.camera      && <span><span style={{ color: '#888' }}>Camera</span> · {lastDone.exif.camera}</span>}
          {lastDone.exif.lens        && <span><span style={{ color: '#888' }}>Lens</span> · {lastDone.exif.lens}</span>}
          {lastDone.exif.aperture    && <span><span style={{ color: '#888' }}>Aperture</span> · {lastDone.exif.aperture}</span>}
          {lastDone.exif.shutterSpeed && <span><span style={{ color: '#888' }}>Shutter</span> · {lastDone.exif.shutterSpeed}</span>}
          {lastDone.exif.iso         && <span><span style={{ color: '#888' }}>ISO</span> · {lastDone.exif.iso}</span>}
          {lastDone.exif.focalLength && <span><span style={{ color: '#888' }}>Focal</span> · {lastDone.exif.focalLength}</span>}
        </div>
      )}
    </div>
  )
}
