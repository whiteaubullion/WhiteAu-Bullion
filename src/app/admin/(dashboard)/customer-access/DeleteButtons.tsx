'use client'

import React, { useTransition } from 'react'
import { deleteCustomerLeadAction, deleteActivityLogAction } from '../activity/actions'

export function DeleteLeadButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this customer lead and all their access records?')) {
      return
    }

    startTransition(async () => {
      const res = await deleteCustomerLeadAction(id)
      if (res?.error) {
        alert(res.error)
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete customer"
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

export function DeleteAccessLogButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Are you sure you want to remove this access event?')) {
      return
    }

    startTransition(async () => {
      const res = await deleteActivityLogAction(id, 'customer')
      if (res?.error) {
        alert(res.error)
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete event"
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
