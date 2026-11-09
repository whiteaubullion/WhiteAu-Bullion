'use client'

import React, { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteComplaintAction, updateComplaintStatusAction } from './actions'

interface ComplaintRowActionsProps {
  id: string
  name: string
  currentStatus: string
}

export function ComplaintRowActions({ id, name, currentStatus }: ComplaintRowActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [isDeleted, setIsDeleted] = useState(false)
  const [status, setStatus] = useState(currentStatus)
  const router = useRouter()

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    startTransition(async () => {
      const res = await updateComplaintStatusAction(id, newStatus)
      if (res?.error) {
        setStatus(currentStatus)
        alert(res.error)
      } else {
        router.refresh()
      }
    })
  }

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete the complaint filed by "${name}"?`)) {
      return
    }

    setIsDeleted(true)

    startTransition(async () => {
      const res = await deleteComplaintAction(id)
      if (res?.error) {
        setIsDeleted(false)
        alert(res.error)
      } else {
        router.refresh()
      }
    })
  }

  if (isDeleted) {
    return (
      <span style={{ 
        color: '#94a3b8', 
        fontSize: '0.8rem', 
        fontStyle: 'italic',
        backgroundColor: 'rgba(51, 65, 85, 0.4)',
        padding: '0.25rem 0.6rem',
        borderRadius: '0.375rem'
      }}>
        ✓ Deleted
      </span>
    )
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value)}
        style={{
          padding: '0.35rem 0.6rem',
          borderRadius: '0.375rem',
          backgroundColor: status === 'resolved' 
            ? 'rgba(16, 185, 129, 0.15)' 
            : status === 'investigating' 
              ? 'rgba(56, 189, 248, 0.15)' 
              : 'rgba(234, 179, 8, 0.15)',
          color: status === 'resolved' 
            ? '#10b981' 
            : status === 'investigating' 
              ? '#38bdf8' 
              : '#eab308',
          border: status === 'resolved' 
            ? '1px solid rgba(16, 185, 129, 0.35)' 
            : status === 'investigating' 
              ? '1px solid rgba(56, 189, 248, 0.35)' 
              : '1px solid rgba(234, 179, 8, 0.35)',
          fontSize: '0.78rem',
          fontWeight: 600,
          outline: 'none',
          cursor: isPending ? 'not-allowed' : 'pointer'
        }}
      >
        <option value="pending" style={{ backgroundColor: '#1e293b', color: '#eab308' }}>Pending</option>
        <option value="investigating" style={{ backgroundColor: '#1e293b', color: '#38bdf8' }}>Investigating</option>
        <option value="resolved" style={{ backgroundColor: '#1e293b', color: '#10b981' }}>Resolved</option>
      </select>

      <button
        onClick={handleDelete}
        disabled={isPending}
        title="Delete complaint"
        style={{
          padding: '0.35rem 0.65rem',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '0.375rem',
          color: '#f87171',
          fontSize: '0.78rem',
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
    </div>
  )
}
