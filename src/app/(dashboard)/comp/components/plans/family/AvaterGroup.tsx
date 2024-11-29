// import React from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

// type AvatarGroupProps = {
//   avatars: { src: string; alt: string }[];
// };

// const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
//   const maxDisplay = 5;
//   const remainingCount = avatars.length - maxDisplay;

//   return (
//     <div className="flex -space-x-2">
//       {avatars.slice(0, maxDisplay).map((avatar, index) => (
//         <Avatar
//           key={index}
//           className="w-6 h-6 border-2 border-white rounded-full"
//         >
//           <AvatarImage
//             src={avatar.src}
//             alt={avatar.alt}
//             className="rounded-full"
//           />
//           <AvatarFallback className="rounded-full bg-gray-500 text-white">
//             {avatar.alt.charAt(0)}
//           </AvatarFallback>
//         </Avatar>
//       ))}
//       {remainingCount > 0 && (
//         <div className="w-6 h-6 border-2 border-white rounded-full bg-gray-500 text-white flex items-center justify-center text-xxs">
//           +{remainingCount}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvatarGroup;

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type AvatarGroupProps = {
  avatars: { src: string; alt: string }[];
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
  const maxDisplay = 5;
  const remainingCount = avatars.length - maxDisplay;

  return (
    <div className="flex -space-x-2">
      {avatars.slice(0, maxDisplay).map((avatar, index) => (
        <Avatar
          key={index}
          className="w-6 h-6 border-2 border-white rounded-full"
        >
          <AvatarImage
            src={avatar.src || undefined}
            alt={avatar.alt}
            className="rounded-full"
          />
          <AvatarFallback className="rounded-full bg-gray-500 text-white">
            {avatar.alt.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div className="w-6 h-6 border-2 border-white rounded-full bg-gray-500 text-white flex items-center justify-center text-xxs">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
