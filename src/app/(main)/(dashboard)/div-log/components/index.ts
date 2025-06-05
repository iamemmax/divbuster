export const diveLogData = [
  {
    diver: {
      name: "Bart Bright",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    post: {
      visibility: "Public",
      timestamp: "Thursday, June 08, 2024",
      time: "02:12 PM",
      status: "Approved"
    },
    dive: {
      number: 17,
      type: "Single-Gas Dive",
      title: "Dive 17: Single-Gas Dive",
      editable: true
    },
    location: {
      site: "Bari Reef",
      rank: "23/70",
      city: "Bonaire",
      region: "Caribbean Netherlands",
      coordinates: {
        latitude: 12.166502,
        longitude: -68.287672
      },
      tags: ["Ocean", "Reef", "Shore"],
      flag: "🇳🇱",
      backgroundImage: "/images/dashboard/profile-Location.png"
    },
    stats: {
      maxDepth: { metric: "18m", imperial: "60ft", icon: "🌊" },
      bottomTime: { duration: "2h 05m", icon: "⏱️" },
      pressureUsed: { metric: "180 Bar", imperial: "2100 psi", icon: "🔒" }
    },
    social: {
      photos: {
        count: 45,
            thumbnails: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=80&h=80&fit=crop"],

        displayText: "+45"
      },
      engagement: {
        likeable: true,
        text: "Like this dive",
        actions: {
          like: { icon: "👍", enabled: true, color: "#FFD700" },
          comment: { icon: "💬", enabled: true, color: "#FF9800" },
          share: { icon: "📤", enabled: true, color: "#2196F3" }
        }
      }
    },
    technical: {
      gasType: "single",
      certification: "approved",
      visibility: "public"
    }
  },
  {
    diver: {
      name: "Sara Deep",
      profileImage: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop&crop=face",
    },
    post: {
      visibility: "Private",
      timestamp: "Saturday, May 25, 2024",
      time: "11:45 AM",
      status: "Pending"
    },
    dive: {
      number: 22,
      type: "Night Dive",
      title: "Dive 22: Coral Moonlight",
      editable: false
    },
    location: {
      site: "Blue Hole",
      rank: "5/70",
      city: "Belize",
      region: "Caribbean",
      coordinates: {
        latitude: 17.315,
        longitude: -87.534
      },
      tags: ["Cave", "Night", "Adventure"],
      flag: "🇧🇿",
        backgroundImage: "/images/dashboard/map2.png"
    },
    stats: {
      maxDepth: { metric: "30m", imperial: "98ft", icon: "🌊" },
      bottomTime: { duration: "1h 40m", icon: "⏱️" },
      pressureUsed: { metric: "200 Bar", imperial: "2900 psi", icon: "🔒" }
    },
    social: {
      photos: {
        count: 28,
        thumbnails: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=80&h=80&fit=crop"],
        displayText: "+28"
      },
      engagement: {
        likeable: true,
        text: "Loved this night dive",
        actions: {
          like: { icon: "❤️", enabled: true, color: "#E91E63" },
          comment: { icon: "💬", enabled: true, color: "#9C27B0" },
          share: { icon: "📤", enabled: true, color: "#03A9F4" }
        }
      }
    },
    technical: {
      gasType: "nitrox",
      certification: "in-review",
      visibility: "private"
    }
  },
  {
    diver: {
      name: "Marco Tide",
      profileImage: "/images/dashboard/profile-Location.png",
    },
    post: {
      visibility: "Public",
      timestamp: "Monday, April 15, 2024",
      time: "03:30 PM",
      status: "Approved"
    },
    dive: {
      number: 33,
      type: "Wreck Dive",
      title: "Dive 33: Ghost Ship",
      editable: true
    },
    location: {
      site: "USS Kittiwake",
      rank: "12/70",
      city: "Grand Cayman",
      region: "Cayman Islands",
      coordinates: {
        latitude: 19.354,
        longitude: -81.382
      },
      tags: ["Wreck", "Photography", "Marine Life"],
      flag: "🇰🇾",
     backgroundImage: "/images/dashboard/map3.png"
    },
    stats: {
      maxDepth: { metric: "24m", imperial: "78ft", icon: "⚓" },
      bottomTime: { duration: "1h 15m", icon: "⏱️" },
      pressureUsed: { metric: "160 Bar", imperial: "2300 psi", icon: "🔒" }
    },
    social: {
      photos: {
        count: 60,
              thumbnails: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=80&h=80&fit=crop"],

        displayText: "+60"
      },
      engagement: {
        likeable: true,
        text: "Shipwreck explored!",
        actions: {
          like: { icon: "⚓", enabled: true, color: "#3F51B5" },
          comment: { icon: "💬", enabled: true, color: "#009688" },
          share: { icon: "📤", enabled: true, color: "#8BC34A" }
        }
      }
    },
    technical: {
      gasType: "single",
      certification: "approved",
      visibility: "public"
    }
  },

];
