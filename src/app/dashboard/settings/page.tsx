"use client"
import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/core'
import { motion, AnimatePresence } from 'framer-motion'
import Notification from '../(dashboard)/components/settings/Notification'
import Peference from '../(dashboard)/components/settings/Peference'
import AccountSecurity from '../(dashboard)/components/settings/AccountSecurity'

const SettingsPage = () => {
    const tabArray = [
        "Notification", "Preferences", "Account Security"
    ]

    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    }

    return (
        <div className=''>
            
            <Tabs defaultValue="Notification" className="w-full ">
                <TabsList className="w-full justify-start  bg-[#090E2980]/50 md:pt-5 md:px-8 ">
                    {tabArray.map((tab) => (
                        <TabsTrigger 
                            key={tab} 
                            value={tab}
                            className="data-[state=active]:border-b-[2px] max-sm:px-3 data-[state=active]:border-[#5879FD] rounded-none text-sm md:text-base font-outfit font-medium text-white data-[state=active]:bg-transparent"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <AnimatePresence mode="wait">
                    <TabsContent value="Notification">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={contentVariants}
                            transition={{ duration: 0.3 }}
                            className="mt-6 space-y-4"
                        >
                           <Notification/>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="Preferences">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={contentVariants}
                            transition={{ duration: 0.3 }}
                            className="mt-6 space-y-4"
                        >
                           <Peference/>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="Account Security">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={contentVariants}
                            transition={{ duration: 0.3 }}
                            className="mt-6 space-y-4"
                        >
                           <AccountSecurity/>
                        </motion.div>
                    </TabsContent>
                </AnimatePresence>
            </Tabs>
        </div>
    )
}

export default SettingsPage
