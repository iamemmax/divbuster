"use client"

import { useState } from "react"

import Image from "next/image"
import { Button } from "@/components/core"
import { Delete } from "@/app/(dashboard)/comp/icons"

export default function ProfilePicture() {
  const [profilePic, setProfilePic] = useState("/placeholder.svg?height=200&width=200")

  const handleDelete = () => {
    setProfilePic("")
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Profile Picture</h2>

      <div className="relative w-40 h-40 rounded-full overflow-hidden bg-muted">
        {profilePic ? (
          <Image src={profilePic || "/placeholder.svg"} alt="Profile picture" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>

      {profilePic && (
        <Button className="gap-2 px-4 py-3" onClick={handleDelete}>
          <Delete className="h-4 w-4" />
          <p className="font-medium">Remove</p>
        </Button>
      )}

      {!profilePic && (
        <Button onClick={() => setProfilePic("/placeholder.svg?height=200&width=200")} className="mt-2">
          Restore Profile Picture
        </Button>
      )}
    </div>
  )
}

