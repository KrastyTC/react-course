import { useEffect } from 'react'
import { useToastStore } from '../stores/toastStore'
import './ToastHost.css'

export function ToastHost() {
  const notifications = useToastStore((s) => s.notifications)
  const removeNotification = useToastStore((s) => s.removeNotification)

  useEffect(() => {
    const timers = notifications
      .filter((t) => typeof t.timeout === 'number' && t.timeout > 0)
      .map((t) => window.setTimeout(() => removeNotification(t.id), t.timeout))

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [notifications, removeNotification])

  return (
    <div className="toast-host" aria-live="polite" aria-relevant="additions removals">
      {notifications.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <div className="toast-message">{t.message}</div>
          <button
            type="button"
            className="toast-close"
            onClick={() => removeNotification(t.id)}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}


