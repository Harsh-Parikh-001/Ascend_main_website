import type { BackendStatus } from '../types/api'

interface StatusCardProps {
  label: string
  status: BackendStatus | 'ready'
}

const statusCopy = {
  checking: 'Checking connection…',
  online: 'Running on localhost',
  offline: 'Not reachable—start the backend',
  ready: 'Development server is running',
} as const

export function StatusCard({ label, status }: StatusCardProps) {
  const dotStatus = status === 'ready' ? 'online' : status

  return (
    <div className="status-card">
      <span
        className={`status-dot status-dot--${dotStatus}`}
        aria-hidden="true"
      />
      <span>
        <span className="status-label">{label}</span>
        <span className="status-detail">{statusCopy[status]}</span>
      </span>
    </div>
  )
}

