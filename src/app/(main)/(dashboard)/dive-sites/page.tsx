"use client"
import React, { useEffect, useState } from "react"
import Header from "../../components/shared/Header"
import RecentDiveSites from "./components/RecentDiveSites"
import { useFetchDiveSites } from "../api/div-sites/fetchdivesites"
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser"
import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput"
import { diveSiteTranslations } from "../../translation/diveSitesTranslation"
import { useLanguage } from "@/hooks/useLanguage"
import { DiveSiteSkeleton } from "@/components/core"

interface TabItem {
  id: string
  label: string
  href: string
}



const DiveSites = () => {
  const [activeTab, setActiveTab] = useState<string>("recentDiveSites")
  // const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const { data: user, isLoading: _userLoading } = useUser()
  const [search, setSearch] = useState("")
 const {language}= useLanguage()

  const t = diveSiteTranslations[language] || diveSiteTranslations.en

  const apiParams = {
    lang: language,
    favorite: activeTab === "favouriteDiveSite" ? "yes" : "",
    search,
    paginate: "yes",
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    error,
  } = useFetchDiveSites(apiParams)

  const tabs: TabItem[] = [
    { id: "recentDiveSites", label: t.recent, href: "?tab=recentDiveSites" },
    { id: "favouriteDiveSite", label: t.favourite, href: "?tab=favouriteDiveSite" },
    // { id: "divesitesNearYou", label: t.discover, href: "?tab=divesitesNearYou" },
  ]

  useEffect(() => {
    const updateFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const tabFromURL = urlParams.get("tab")
      if (tabFromURL && tabs.some((tab) => tab.id === tabFromURL)) {
        setActiveTab(tabFromURL)
      }
    }
    updateFromURL()
    window.addEventListener("popstate", updateFromURL)
    return () => window.removeEventListener("popstate", updateFromURL)
  }, [tabs])

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault()
    const url = new URL(window.location.href)
    url.searchParams.set("tab", tabId)
    window.history.pushState({}, "", url.toString())
    setActiveTab(tabId)
    if (tabId === "favouriteDiveSite" || activeTab === "favouriteDiveSite") {
      setTimeout(() => {
        refetch()
      }, 100)
    }
  }

  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const renderTabContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <DiveSiteSkeleton key={idx} />
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-red-500 dark:text-red-400 text-center py-8">
          {t.error}
        </div>
      )
    }

    switch (activeTab) {
      case "recentDiveSites":
        return (
          <RecentDiveSites
            data={data}
            loading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            search={search}
            user={user}
          />
        )
      case "favouriteDiveSite":
        return (
          <RecentDiveSites
            data={data}
            loading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            search={search}
            user={user}
          />
        )
      case "divesitesNearYou":
        return <div className="text-center py-8">{t.comingSoon}</div>
      default:
        return <div className="text-center py-8">{t.notFound}</div>
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 max-h-screen">
      {/* Language Selector */}
  
      <Header title={t.header} subtitle="" />

      {/* Mobile Sidebar Toggle */}
      {/* <div className="lg:hidden p-4">
        <Button
          onClick={toggleSidebar}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {t.button}
        </Button>
      </div> */}

      <div className="max-h-[88vh] overflow-y-auto p-2 md:p-6">
        {/* <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] 2xl:grid-cols-[3fr_1fr] gap-[1.3125rem] relative"> */}
        <div className="grid grid-cols-1 gap-[1.3125rem] relative">
          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="flex justify-between xl:items-center gap-6 max-xl:flex-col px-4 xl:px-6">
            <nav className="flex overflow-x-auto border-b mt-5 border-gray-200 dark:border-gray-700 scrollbar-hide bg-white dark:bg-gray-800 w-full xl:w-auto" role="tablist">
              {tabs?.map((tab) => (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => handleTabClick(e, tab.id)}
                  className={`shrink-0 whitespace-nowrap px-6 py-3 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  {tab.label}
                </a>
              ))}
            </nav>
              <div className="w-full xl:max-w-md pt-3 xl:shrink-0">
                <DebouncedSearchInput
                  placeholder={t.searchPlaceholder}
                  onSearch={(value) => setSearch(value)}
                  debounceTime={300}
                  value={search}
                  inputClassName="h-[3.5rem] rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

            </div>

            {/* Content */}
            <main className="w-full p-3 md:p-6 bg-white dark:bg-gray-800" role="main">
              
              {renderTabContent()}
            </main>
          </div>

          {/* Sidebar */}
          {/* <div
            className={`w-full h-full lg:sticky lg:top-6 lg:self-start ${
              sidebarOpen ? "block" : "hidden lg:block"
            } ${sidebarOpen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4" : ""}`}
          >
            {sidebarOpen && (
              <div className="lg:hidden flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold">{t.filters}</h3>
                <Button
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 lg:p-0">
              <DiveSitesSidebar />
            </div>

            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 bg-black/50 -z-10" onClick={toggleSidebar} />
            )}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default DiveSites
