import { useEffect, useState } from 'react'

import { StatusCard } from '../components/StatusCard'
import type { BackendStatus } from '../types/api'
import { fetchBackendHealth } from '../utils/api'

export function WelcomeSection() {
  const [backendStatus, setBackendStatus] =
    useState<BackendStatus>('checking')

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 5000)
    let active = true

    fetchBackendHealth(controller.signal)
      .then((health) => {
        if (active) {
          setBackendStatus(health.status === 'ok' ? 'online' : 'offline')
        }
      })
      .catch(() => {
        if (active) {
          setBackendStatus('offline')
        }
      })
      .finally(() => window.clearTimeout(timeout))

    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  return (
    <main className="app-shell">
      <section className="welcome" aria-labelledby="welcome-heading">
        <p className="brand-mark">
          A<span>/</span>SCEND
        </p>
        <p className="eyebrow">Development environment</p>
        <h1 id="welcome-heading">The foundation is ready.</h1>
        <p className="intro">
          React, TypeScript and the Python 3.14 backend are isolated and ready
          for the Ascend Trade Commercial website build.
        </p>
        <div className="status-grid" aria-live="polite">
          <StatusCard label="Frontend" status="ready" />
          <StatusCard label="Backend API" status={backendStatus} />
        </div>
      </section>
    </main>
  )
}

