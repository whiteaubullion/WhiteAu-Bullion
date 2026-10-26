'use client'

import React, { useTransition } from 'react'
import { deleteReviewAction } from './actions'

export function DeleteReviewButton({ id, reviewName }: { id: string; reviewName?: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const confirmMsg = reviewName 
      ? `Are you sure you want to remove the review by "${reviewName}" from the website?`
      : 'Are you sure you want to remove this review from the website?'

    if (!confirm(confirmMsg)) {
      return
    }

    startTransition(async () => {
      const res = await deleteReviewAction(id)
      if (res?.error) {
        alert(res.error)
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete this review"
      style={{
        padding: '0.4rem 0.8rem',
        backgroundColor: 'rgba(239, 68, 68, 0.12)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '0.375rem',
        color: '#f87171',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: isPending ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
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
