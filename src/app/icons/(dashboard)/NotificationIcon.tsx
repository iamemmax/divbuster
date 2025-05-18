import * as React from "react";
import { SVGProps } from "react";

interface NotificationIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const NotificationIcon = ({ className, ...props }: NotificationIconProps) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M7.5 15H12.5M15 6.66667C15 5.34058 14.4732 4.07883 13.5355 3.14124C12.5979 2.20365 11.3261 1.67667 10 1.67667C8.67392 1.67667 7.40215 2.20365 6.46447 3.14124C5.52678 4.07883 5 5.34058 5 6.66667C5 9.16917 4.36083 10.8975 3.5725 12.0342C2.89167 13.0092 2.55083 13.4975 2.56917 13.7458C2.58917 14.0225 2.6775 14.1658 2.8475 14.2833C3.03583 14.4167 3.54167 14.4167 4.55333 14.4167H15.4467C16.4583 14.4167 16.9642 14.4167 17.1525 14.2833C17.3225 14.1658 17.4108 14.0225 17.4308 13.7458C17.4492 13.4975 17.1083 13.0092 16.4275 12.0342C15.6392 10.8975 15 9.16917 15 6.66667Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="dark:stroke-white"
    />
  </svg>
);

export default NotificationIcon;
