import { SVGProps } from 'react';

// TypeScript interface for CylinderIcon props
interface CylinderIconProps extends SVGProps<SVGSVGElement> {
  volume: string;
}

// Custom Cylinder SVG Component with TypeScript
export const CylinderIcon: React.FC<CylinderIconProps> = ({ volume, ...props }) => (
  <svg
    width={29}
    height={60}
    viewBox="0 0 29 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5745 0L19.0854 0.131675C24.2689 0.42136 28.4013 4.30139 28.5854 9.38844C28.7696 14.4053 28.6663 19.4353 28.6708 24.4609C28.6708 33.6342 28.6708 42.8091 28.6708 51.9854C28.6708 58.038 26.6854 60 20.5856 60C16.04 60 11.4944 60 6.94872 60C2.54233 59.9737 0.0224587 57.5157 0.0134752 53.1968C-0.00449174 39.0695 -0.00449174 24.9422 0.0134752 10.8149C0.0134752 4.47696 3.99765 0.364301 10.4523 0.144843M4.41089 20.2385V23.7498H24.3991V20.2385H4.41089Z"
      fill="white"
    />
    <text x="14.5" y="45" textAnchor="middle" fill="#052D86" fontSize="8" fontWeight="bold">
      {volume}
    </text>
  </svg>
);
