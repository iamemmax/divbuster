"use client"
import Header from '@/app/(main)/components/shared/Header'
import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

import { publicUserProp, useFetchPulicUsers } from '../../api/public-users/fetchPublicUsers'
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput'
import { Avatar, AvatarImage, AvatarFallback, Button, ErrorModal } from '@/components/core'
import { SmallSpinner, Spinner } from '@/icons/core'
import { useAddBuddy } from '../../api/buddy/addBuddy'
import { useQueryClient } from 'react-query'
import { formatAxiosErrorMessage } from '@/utils'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useErrorModalState } from '@/hooks'
import { publicUsersTranslations } from '@/app/(main)/translation/publicUserTranslation'

const SWATCH_BG   = ["bg-[#1B2A3B]","bg-[#1B4332]","bg-[#2C1654]","bg-[#2D3142]","bg-[#3D1E0F]","bg-[#2E1A47]"]
const SWATCH_TEXT = ["text-[#48CAE4]","text-[#95D5B2]","text-[#C77DFF]","text-[#EF8354]","text-[#F4A261]","text-[#FFB3C6]"]

function hashId(id: number) {
  const n = parseInt(String(id), 10)
  return isNaN(n) ? 0 : Math.abs(n)
}
function getInitials(u: publicUserProp) {
  return ((u?.first_name || u.nickname || "")?.charAt(0) + (u?.last_name || "")?.charAt(0)).toUpperCase()
}

function UserAvatar({ u }: { u: publicUserProp }) {
  const idx = hashId(u.id) % SWATCH_BG.length
  return (
    <div className="relative flex-shrink-0">
      <Avatar>
        {u.profile_picture ? (
          <AvatarImage src={String(u.profile_picture)} alt={`${u.first_name} ${u.last_name}`} />
        ) : (
          <AvatarFallback className={`${SWATCH_BG[idx]} ${SWATCH_TEXT[idx]} font-semibold text-sm tracking-wider border border-white/10`}>
            {getInitials(u)}
          </AvatarFallback>
        )}
      </Avatar>
      <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#0E0E10] ${
        u.online ? "bg-green-400 shadow-[0_0_0_2px_rgba(74,222,128,0.25)]" : "bg-zinc-300 dark:bg-zinc-600"
      }`} />
    </div>
  )
}

function UserTableRow({ u }: { u: publicUserProp }) {
  const { language } = useLanguage()
  const t = publicUsersTranslations[language] || publicUsersTranslations.en
  const { isErrorModalOpen, setErrorModalState, openErrorModalWithMessage, errorModalMessage } = useErrorModalState()
  const [loadingDiverId, setLoadingDiverId] = useState<number | null>(null)
  const { mutate: handleAddNewBuddy } = useAddBuddy()
  const queryClient = useQueryClient()

  const handleAddBuddy = (suggested: publicUserProp) => {
    setLoadingDiverId(suggested.id)
    handleAddNewBuddy({ invite_id: String(suggested?.invite_id), user_id: suggested?.id }, {
      onSuccess: () => {
        setLoadingDiverId(null)
        queryClient.invalidateQueries({ queryKey: ["user-details"] })
        queryClient.invalidateQueries({ queryKey: ["public-user-around"] })
        toast.success(t.addBuddySuccess, { id: "addBuddySuccess" })
      },
      onError: (error) => {
        setLoadingDiverId(null)
        const errorMessage = formatAxiosErrorMessage(error as AxiosError)
        openErrorModalWithMessage(String(errorMessage))
      }
    })
  }

  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <UserAvatar u={u} />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{u.first_name} {u.last_name}</p>
              {u.nickname && <p className="text-xs text-gray-500 dark:text-gray-400">@{u.nickname}</p>}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <p className="text-sm text-gray-700 dark:text-gray-300">{u.email}</p>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            u.online ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
          }`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${u.online ? "bg-green-400" : "bg-gray-400"}`} />
            {u.online ? t.statusLive : t.statusAway}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          {loadingDiverId === u?.id ? (
            <SmallSpinner color='#F7931D' />
          ) : (
            <>
              {!u?.is_requested && !u?.is_buddy && (
                <Button
                  className="px-3 py-1.5 text-xs font-semibold tracking-wider rounded-lg border transition-all duration-150 bg-transparent border-amber-400/50 text-amber-500 dark:border-amber-400/40 dark:text-amber-400 hover:text-zinc-900 hover:border-amber-400"
                  onClick={() => handleAddBuddy(u)}
                >
                  {t.addBuddy}
                </Button>
              )}
              {u?.is_requested && !u?.is_buddy && (
                <p className="px-3 py-1.5 text-xs tracking-wider rounded-lg border-none bg-transparent text-orange-400">
                  {t.pendingRequest}
                </p>
              )}
            </>
          )}
        </td>
      </tr>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || t.pleaseCheck}
      />
    </>
  )
}

const PublicUsers = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const { language } = useLanguage()
  const t = publicUsersTranslations[language] || publicUsersTranslations.en
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // only fetch when user has typed something
  const { data, isLoading, isError } = useFetchPulicUsers(globalFilter)
  const users: publicUserProp[] = data ?? []
  const onlineCount = users.filter((u) => u.online).length

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
      tableScrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="bg-zinc-50 dark:bg-[#0E0E10] transition-colors duration-300">
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="w-full mx-auto">
        <div style={{ animation: "fadeDown 0.4s ease both" }}>
          <Header title={t.pageTitle} subtitle="" />
        </div>

        <div className='px-4 sm:px-6 lg:px-[1.875rem]'>
          <div className="flex flex-wrap items-center justify-between gap-3 w-full mt-7 mb-8" style={{ animation: "fadeDown 0.4s 0.16s ease both" }}>

            {/* Search */}
            <div className="w-full max-w-sm my-3">
              <DebouncedSearchInput
                placeholder={t.searchPlaceholder}
                onSearch={(value) => setGlobalFilter(value)}
                value={globalFilter}
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">
                {t.searchHint}
              </p>
            </div>

            {/* Stats */}
            {!isLoading && !isError && globalFilter && users.length > 0 && (
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[12px] tracking-wider text-zinc-400 dark:text-zinc-500">
                  {users.length} {t.members}
                </span>
                <span className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" />
                <span className="flex items-center gap-1.5 text-[12px] text-green-500 tracking-wider">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_0_2px_rgba(74,222,128,0.2)]" />
                  {onlineCount} {t.online}
                </span>
              </div>
            )}

            {/* Content states */}
            <div className="w-full">
              {/* No search yet — prompt */}
              {!globalFilter && (
                <div className="py-20 text-center w-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F7931D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t.emptyState}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mx-auto">{t.emptyStateSubtitle}</p>
                </div>
              )}

              {/* Loading */}
              {globalFilter && isLoading && (
                <div className="pt-12 flex justify-center items-center w-full">
                  <Spinner color='#f7931d' />
                </div>
              )}

              {/* Error */}
              {globalFilter && isError && (
                <div className="py-20 text-center text-[13px] tracking-wide text-zinc-400 dark:text-zinc-600 w-full">
                  {t.loadError}
                </div>
              )}

              {/* No results */}
              {globalFilter && !isLoading && !isError && users.length === 0 && (
                <div className="py-20 text-center text-[13px] tracking-wide text-zinc-400 dark:text-zinc-600 w-full">
                  {t.noUsers}
                </div>
              )}

              {/* Table */}
              {globalFilter && !isLoading && !isError && users.length > 0 && (
                <div className="space-y-3">
                  <div ref={tableScrollRef} className="bg-white dark:bg-gray-800 max-h-[70vh] rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto overflow-y-auto scrollbar-hide">
                    <table className="w-full">
                      <thead className='sticky top-0 z-10'>
                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.name}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.email}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.status}</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.action}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((u: any) => (
                          <UserTableRow key={u.id} u={u} />
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {(canScrollLeft || canScrollRight) && (
                    <div className="flex gap-2 justify-center pt-3">
                      {canScrollLeft && (
                        <button onClick={() => scroll('left')} className="p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm" aria-label="Scroll table left">
                          <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                        </button>
                      )}
                      {canScrollRight && (
                        <button onClick={() => scroll('right')} className="p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm" aria-label="Scroll table right">
                          <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicUsers