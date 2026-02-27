'use client'

import { useEffect } from 'react'
import { Button } from '@/components/core'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Error caught by error boundary
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          The application encountered an unexpected error.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-6 overflow-auto max-h-40">
          <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
            {error.message}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => reset()}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/login'}
            className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
          >
            Go to login
          </Button>
        </div>
      </div>
    </div>
  )
}