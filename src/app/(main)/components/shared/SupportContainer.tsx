"use client";

import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import Moonicon from '@/app/icons/(dashboard)/Moonicon';
import SettingsIcon from '@/app/icons/(dashboard)/SettingsIcon';
import { Switch } from '@/components/core';
import { useLanguage } from '@/hooks/useLanguage';
import { useActivePath } from '@/utils/navigation';
import { cn } from '@/utils/classNames';
import Link from 'next/link';
import React from 'react';
import { useDarkMode } from '@/contexts/darkMode';


interface prop {
  user: User | null;
}

const translations = {
  en: {
    support: "SUPPORT",
    settings: "Settings",
    darkMode: "Dark mode",
    loggedInAs: "Logged in as",
    on: "on",
    version: "Version",
  },
  es: {
    support: "SOPORTE",
    settings: "Configuración",
    darkMode: "Modo oscuro",
    loggedInAs: "Conectado como",
    on: "en",
    version: "Versión",
  },
  fr: {
    support: "ASSISTANCE",
    settings: "Paramètres",
    darkMode: "Mode sombre",
    loggedInAs: "Connecté en tant que",
    on: "le",
    version: "Version",
  },
  nl: {
    support: "ONDERSTEUNING",
    settings: "Instellingen",
    darkMode: "Donkere modus",
    loggedInAs: "Ingelogd als",
    on: "op",
    version: "Versie",
  },
};

const SupportContainer = ({ user }: prop) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {language}= useLanguage()
  const isActive = useActivePath();
  const t = translations[language] || translations.en;

  return (
    <div>
      <h2 className="font-archivo font-medium text-[17px] text-[#BDBDBD] ">
        {t.support}
      </h2>

      <div className="flex flex-col gap-4 mt-3">
        <Link href="/settings" className={cn(
          "flex items-center gap-4 py-2 px-3 transition-all duration-200",
          isActive("/settings") && "bg-[#F7931D]/10 text-[#F7931D] border-l-[4px] border-[#F7931D] rounded-[.25rem]"
        )}>
          <SettingsIcon className={cn(
            isActive("/settings") ? "text-[#F7931D]" : "text-[#4F4F4F] dark:text-white"
          )} />
          <p className={cn(
            "font-archivo font-medium text-sm",
            isActive("/settings") ? "text-[#F7931D]" : "text-[#4F4F4F] dark:text-white"
          )}>
            {t.settings}
          </p>
        </Link>
        <div className="flex items-center gap-4">
          <Moonicon />
          <p className="font-archivo font-medium text-[#4F4F4F] text-sm dark:text-white">
            {t.darkMode}
          </p>
          <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </div>

      <div className="mt-10 dark:text-white">
        <p className="font-archivo font-medium text-[#4F4F4F] text-sm dark:text-white">
          {t.loggedInAs} {user?.first_name}{" "}
          {user?.last_login && `${t.on} ${user?.last_login}`}
        </p>
        <p className="font-archivo font-medium text-[#4F4F4F] text-sm dark:text-white">
          {t.version} 1.0.0.0
        </p>
      </div>
    </div>
  );
};

export default SupportContainer;
