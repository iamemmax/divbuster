"use client"
import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/core'
import toast from 'react-hot-toast'
import { useFetchInsuranceDocument } from '../../../api/insurance/insurance-document/fetchInsuranceDocumentReport'
import { useDeleteInsuranceDocumentReport } from '../../../api/insurance/insurance-document/deleteInsuranceDocumentReport'
import InsuranceDocumentModal from './InsuranceDocumentModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { useQueryClient } from 'react-query'

const InsuranceDocumentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<any>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const { data: documentData, isLoading } = useFetchInsuranceDocument()
  const { mutate: deleteDocument, isLoading: isDeleting } = useDeleteInsuranceDocumentReport()
  const queryClient = useQueryClient()

  const checkScroll = React.useCallback(() => {
    if (tableScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableScrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  React.useEffect(() => {
    checkScroll()
    const container = tableScrollRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    if (tableScrollRef.current) {
      const scrollAmount = 300
      tableScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const documents = documentData?.data || []

  const handleEdit = (document: any) => {
    setEditingDocument(document)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (id: number) => {
    setDocumentToDelete(id)
    setIsDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (documentToDelete) {
      deleteDocument(documentToDelete, {
        onSuccess: () => {
          toast.success('Insurance document deleted successfully')
          queryClient.invalidateQueries(['insurance-document'])
          setIsDeleteConfirmOpen(false)
          setDocumentToDelete(null)
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to delete document')
          setIsDeleteConfirmOpen(false)
          setDocumentToDelete(null)
        }
      })
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false)
    setDocumentToDelete(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDocument(null)
  }

  const handleSuccess = () => {
    queryClient.invalidateQueries(['insurance-document'])
  }

  const handleDownload = (doc: any) => {
    try {
      const base64String = doc.insurance_report

      if (!base64String) {
        toast.error('No document available to download')
        return
      }

      // Create a link element
      const link = document.createElement('a')
      link.href = base64String

      // Determine file extension from base64 data
      let extension = 'pdf'
      if (base64String.includes('data:image/jpeg')) {
        extension = 'jpg'
      } else if (base64String.includes('data:image/png')) {
        extension = 'png'
      } else if (base64String.includes('data:application/pdf')) {
        extension = 'pdf'
      }

      link.download = `insurance-document-${doc.id}.${extension}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('Document downloaded successfully')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download document')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Insurance Documents
        </h2>
        <Button
          onClick={() => {
            setEditingDocument(null)
            setIsModalOpen(true)
          }}
          className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2"
        >
          + Create New Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No insurance documents found</p>
          <Button
            onClick={() => {
              setEditingDocument(null)
              setIsModalOpen(true)
            }}
            className="mt-4 bg-orange-500 text-white hover:bg-orange-600 px-4 py-2"
          >
            Create Your First Document
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Info Message */}
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Scroll left and right to view all columns on smaller screens
            </p>
          </div>

          <div ref={tableScrollRef} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
            <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Issuer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Policy Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Issued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {documents.map((document: any) => (
                <tr
                  key={document.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {document.issuer_name}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {document.policy_number}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(document.issued_on).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(document.start_date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(document.expires_on).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleDownload(document)}
                        className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                        title="Download document"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEdit(document)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        title="Edit document"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(document.id)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        title="Delete document"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>

          {/* Scroll Buttons */}
          {(canScrollLeft || canScrollRight) && (
            <div className="flex gap-2 justify-center pt-3">
              {canScrollLeft && (
                <button
                  onClick={() => scroll('left')}
                  className="p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                  aria-label="Scroll table left"
                >
                  <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={() => scroll('right')}
                  className="p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                  aria-label="Scroll table right"
                >
                  <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <InsuranceDocumentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingDocument={editingDocument}
        onSuccess={handleSuccess}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteConfirmOpen}
        title="Delete Insurance Document"
        message="Are you sure you want to delete this insurance document? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default InsuranceDocumentList

