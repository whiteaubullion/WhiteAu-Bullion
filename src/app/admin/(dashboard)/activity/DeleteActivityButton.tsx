'use client'

import React, { useTransition } from 'react'
import { deleteActivityLogAction } from './actions'

export default function DeleteActivityButton({ id, type }: { id: string; type: 'customer' | 'admin' }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Are you sure you want to remove this login record?')) {
      return
    }

    startTransition(async () => {
      const res = await deleteActivityLogAction(id, type)
      if (res?.error) {
        alert(res.error)
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete record"
      style={{
        padding: '0.35rem 0.65rem',
        backgroundColor: 'rgba(239, 68, 68, 0.12)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '0.375rem',
        color: '#f87171',
        fontSize: '0.75rem',
        fontWeight: '600',
        cursor: isPending ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        opacity: isPending ? 0.6 : 1,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!isPending) e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.25)'
      }}
      onMouseLeave={(e) => {
        if (!isPending) e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)'
      }}
    >
      🗑️ {isPending ? 'Removing...' : 'Delete'}
    </button>
  )
}
