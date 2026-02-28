"use client"
import Header from '@/app/(main)/components/shared/Header'
import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { publicUsersTranslations } from '@/app/(main)/translation/publicUsersTranslation'
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


/* ─── Avatar swatch colors ───────────────────────────────────────── */
const SWATCH_BG   = ["bg-[#1B2A3B]","bg-[#1B4332]","bg-[#2C1654]","bg-[#2D3142]","bg-[#3D1E0F]","bg-[#2E1A47]"]
const SWATCH_TEXT = ["text-[#48CAE4]","text-[#95D5B2]","text-[#C77DFF]","text-[#EF8354]","text-[#F4A261]","text-[#FFB3C6]"]

function hashId(id:number ) {
  const n = parseInt(String(id), 10)
  return isNaN(n) ? 0 : Math.abs(n)
}
function getInitials(u:publicUserProp ) {
  return ((u?.first_name || u.nickname || "")?.charAt(0) + (u?.last_name || "")?.charAt(0)).toUpperCase()
}

/* ─── Avatar with online pip ─────────────────────────────────────── */
function UserAvatar({ u }: { u: publicUserProp }) {
  const idx = hashId(u.id) % SWATCH_BG.length

  return (
    <div className="relative flex-shrink-0">
      <Avatar>
        {u.profile_picture ? (
          <AvatarImage
            src={String(u.profile_picture)}
            alt={`${u.first_name} ${u.last_name}`}
          />
        ) : (
          <AvatarFallback
            className={`
              ${SWATCH_BG[idx]} ${SWATCH_TEXT[idx]}
              font-semibold text-sm tracking-wider border border-white/10
            `}
          >
            {getInitials(u)}
          </AvatarFallback>
        )}
      </Avatar>

      {/* Online pip */}
      <span
        className={`
          absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2
          border-white dark:border-[#0E0E10]
          ${u.online
            ? "bg-green-400 shadow-[0_0_0_2px_rgba(74,222,128,0.25)]"
            : "bg-zinc-300 dark:bg-zinc-600"
          }
        `}
      />
    </div>
  )
}

/* ─── User Table Row ──────────────────────────────────────────────── */
function UserTableRow({ u }: { u: publicUserProp }) {
  const { language } = useLanguage()
  const t = publicUsersTranslations[language] || publicUsersTranslations.en
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [loadingDiverId, setLoadingDiverId] = useState<number | null>(null);
  const { mutate: handleAddNewBuddy } = useAddBuddy();
  const queryClient = useQueryClient()

  const handleAddBuddy = (suggested: publicUserProp) => {
    setLoadingDiverId(suggested.id);

    handleAddNewBuddy({
      invite_id: String(suggested?.invite_id),
      user_id: suggested?.id,
    }, {
      onSuccess: () => {
        setLoadingDiverId(null);
        queryClient.invalidateQueries({ queryKey: ["user-details"] });
        queryClient.invalidateQueries({ queryKey: ["public-user-around"] });
        toast.success(t.addBuddySuccess, { id: "addBuddySuccess" });
      },
      onError: (error) => {
        setLoadingDiverId(null);
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      }
    });
  };

  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        {/* Avatar + Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <UserAvatar u={u} />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {u.first_name} {u.last_name}
              </p>
              {u.nickname && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  @{u.nickname}
                </p>
              )}
            </div>
          </div>
        </td>

        {/* Email */}
        <td className="px-6 py-4 whitespace-nowrap">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {u.email}
          </p>
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`
              inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
              ${u.online
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
              }
            `}
          >
            <span
              className={`
                inline-block h-1.5 w-1.5 rounded-full
                ${u.online
                  ? "bg-green-400"
                  : "bg-gray-400"
                }
              `}
            />
            {u.online ? t.statusLive : t.statusAway}
          </span>
        </td>

        {/* Action */}
        <td className="px-6 py-4 whitespace-nowrap text-right">
          {loadingDiverId === u?.id ? (
            <SmallSpinner color='#F7931D' />
          ) : (
            <>
            {!u?.is_requested&& !u?.is_buddy&&<Button
              className={`
                px-3 py-1.5 text-xs font-semibold tracking-wider rounded-lg border
                transition-all duration-150
                bg-transparent border-amber-400/50 text-amber-500
                dark:border-amber-400/40 dark:text-amber-400 
                 hover:text-zinc-900 hover:border-amber-400
              `}
              onClick={() => handleAddBuddy(u)}
            >
              {t.addBuddy}
            </Button>}
            {u?.is_requested&& !u?.is_buddy&&<p
              className={`
                px-3 py-1.5 text-xs  tracking-wider rounded-lg border-none
                transition-all duration-150
                bg-transparent  text-orange-400
               
                
              `}
             
            >
              Pending Request
            </p>}
            
            </>
          )}
        </td>
      </tr>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || t.pleaseCheck
        }
      />
    </>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
const PublicUsers = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const { language } = useLanguage()
  const t = publicUsersTranslations[language] || publicUsersTranslations.en
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

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
      const scrollAmount = 300
      tableScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className=" bg-zinc-50 dark:bg-[#0E0E10] transition-colors duration-300">

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="w-full mx-auto">

        {/* ── Header ── */}
        <div style={{ animation: "fadeDown 0.4s ease both" }}>
          <Header title={t.pageTitle} subtitle="" />
        </div>

        <div className='px-4 sm:px-6 lg:px-[1.875rem]'>
          {/* ── Dive Event Calendar ── */}
         

          {/* ── Controls row ── */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 w-full mt-7 mb-8"
            style={{ animation: "fadeDown 0.4s 0.16s ease both" }}
          >
            <div className="w-full max-w-sm my-3">
              <DebouncedSearchInput
                placeholder={t.searchPlaceholder}
                onSearch={(value) => setGlobalFilter(value)}
                value={globalFilter}
              />
            </div>

            {/* Stats */}
            {!isLoading && !isError && (
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

            {/* ── Content states ── */}
            {isLoading ? (
              <div className="pt-12 flex justify-center items-center w-full">
                <Spinner color='#f7931d' />
              </div>
            ) : isError ? (
              <div className="py-20 text-center text-[13px] tracking-wide text-zinc-400 dark:text-zinc-600 w-full">
                {t.loadError}
              </div>
            ) : users.length === 0 ? (
              <div className="py-20 text-center text-[13px] tracking-wide text-zinc-400 dark:text-zinc-600 w-full">
                {t.noUsers}
              </div>
            ) : (
              <div className="w-full space-y-3">
                {/* Table */}
                <div ref={tableScrollRef} className="bg-white dark:bg-gray-800 max-h-[70vh] rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto overflow-y-auto scrollbar-hide">
                  <table className="w-full">
                    <thead className='sticky top-0 z-10'>
                      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map((u: any) => (
                        <UserTableRow key={u.id} u={u} />
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

            {/* ── Footer ──
            {!isLoading && !isError && users.length > 0 && (
              <div className="flex flex-wrap justify-between gap-2 mt-12 pt-5 border-t border-zinc-200 dark:border-zinc-900 w-full">
                <span className="text-[11px] tracking-wider text-zinc-400 dark:text-zinc-700">
                  {t.showing} {users.length} {t.profiles}
                </span>
                <span className="text-[11px] tracking-wider text-zinc-400 dark:text-zinc-700">
                  {t.updatedRealtime}
                </span>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicUsers