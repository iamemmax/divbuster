"use client"
import Header from '@/app/(main)/components/shared/Header'
import React, { useState, useEffect } from 'react'
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

/* ─── User Card ──────────────────────────────────────────────────── */
function UserCard({ u, index }: { u: any; index: number }) {
  const { language } = useLanguage()
  const t = publicUsersTranslations[language] || publicUsersTranslations.en
     const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
      } = useErrorModalState();
  const [hovered, setHovered] = useState(false)
    const [loadingDiverId, setLoadingDiverId] = useState<number | null>(null);
    const [removedDivers, setRemovedDivers] = useState<Set<number>>(new Set());
  const { mutate: handleAddNewBuddy } = useAddBuddy();
  const queryClient = useQueryClient()
   const handleAddBuddy = (suggested: publicUserProp) => {
    setLoadingDiverId(suggested.id);
    
    handleAddNewBuddy({
      invite_id: String(suggested?.invite_id),
      user_id: suggested?.id,
    }, {
      onSuccess: () => {
        setRemovedDivers(prev => new Set(prev).add(suggested.id));
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
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group flex flex-col gap-4 rounded-2xl p-5 border cursor-default
        transition-all duration-200 ease-out
        bg-white dark:bg-[#161618]
        border-zinc-200 dark:border-zinc-800
        shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)]
        hover:-translate-y-1
        hover:border-amber-400/40 dark:hover:border-amber-400/25
        hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)]
        hover:bg-white dark:hover:bg-zinc-900
      `}
      style={{ animationDelay: `${index * 55}ms`, animation: "cardIn 0.4s ease both" }}
    >
      {/* Row 1 — Avatar + status */}
      <div className="flex items-center justify-between">
        <UserAvatar u={u} />

        <span
          className={`
            flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase
            ${u.online
              ? "text-green-500"
              : "text-zinc-400 dark:text-zinc-600"
            }
          `}
        >
          <span
            className={`
              inline-block h-1.5 w-1.5 rounded-full
              ${u.online
                ? "bg-green-400 shadow-[0_0_0_2px_rgba(74,222,128,0.2)]"
                : "bg-zinc-300 dark:bg-zinc-600"
              }
            `}
          />
          {u.online ? t.statusLive : t.statusAway}
        </span>
      </div>

      {/* Row 2 — Name + email */}
      <div>
        <p className="text-[15px] font-semibold leading-tight mb-1 text-zinc-900 dark:text-zinc-100">
          {u.first_name} {u.last_name}
          {u.nickname && (
            <span className="text-[12px] font-normal ml-1.5 text-black/80 dark:text-zinc-500">
              @{u.nickname}
            </span>
          )}
        </p>
        <p className="text-[12px] truncate text-black dark:text-zinc-500">
          {u.email}
        </p>
      </div>

      {/* Row 3 — CTA */}

       {/* Add button or loading spinner */}
                    {loadingDiverId === u?.id ? (
                      <SmallSpinner color='#F7931D' />
                    ) : (
      <div className="flex items-center justify-end pt-3 mt-auto border-t border-zinc-100 dark:border-zinc-800">
        <Button
          className={`
            px-3.5 py-1.5 text-xs font-semibold tracking-wider rounded-lg border
            transition-all duration-150
            bg-transparent border-amber-400/50 text-amber-500
            dark:border-amber-400/40 dark:text-amber-400
            hover:bg-amber-400 hover:text-zinc-900 hover:border-amber-400
          `}
          onClick={()=>handleAddBuddy(u)}
        >
          {t.addBuddy}
        </Button>
      </div>)}
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || t.pleaseCheck
        }
      />
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
const PublicUsers = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const { language } = useLanguage()
  const t = publicUsersTranslations[language] || publicUsersTranslations.en

  const { data, isLoading, isError } = useFetchPulicUsers(globalFilter)
  const users: publicUserProp[] = data ?? []
  const onlineCount = users.filter((u) => u.online).length


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0E0E10] transition-colors duration-300">

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="w-full mx-auto ">

        {/* ── Header ── */}
        <div style={{ animation: "fadeDown 0.4s ease both" }}>
          <Header title={t.pageTitle} subtitle="" />
        </div>
<div className='px-4 sm:px-6 lg:px-[1.875rem] '>
        {/* ── Controls row ── */}
        <div
          className="flex flex-wrap items-center justify-between gap-3  w-fullmt-7 mb-8 "
          style={{ animation: "fadeDown 0.4s 0.08s ease both" }}
        >
          <div className="w-full max-w-sm my-3">
            <DebouncedSearchInput
              placeholder={t.searchPlaceholder}
              onSearch={(value) => setGlobalFilter(value)}
              value={globalFilter}
            />
          </div>
          <div className="max-h-[80vh] w-full overflow-y-auto">
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
          <div className="pt-12 flex justify-center items-center">
            <Spinner color='#f7931d' />
          </div>
        ) : isError ? (
            <div className="py-20 text-center text-[13px] tracking-wide text-zinc-400 dark:text-zinc-600">
              {t.loadError}
            </div>
        ) : users.length === 0 ? (
          <div className="py-20 text-center text-[13px] tracking-wide text-zinc-400 dark:text-zinc-600">
            {t.noUsers}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {users.map((u: any, i: number) => (
              <UserCard key={u.id} u={u} index={i} />
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        {!isLoading && !isError && users.length > 0 && (
          <div className="flex flex-wrap justify-between gap-2 mt-12 pt-5 border-t border-zinc-200 dark:border-zinc-900">
              <span className="text-[11px] tracking-wider text-zinc-400 dark:text-zinc-700">
                {t.showing} {users.length} {t.profiles}
              </span>
              <span className="text-[11px] tracking-wider text-zinc-400 dark:text-zinc-700">
                {t.updatedRealtime}
              </span>
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