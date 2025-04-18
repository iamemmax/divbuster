import OpticalLogo from "@/app/icons/Logo";
import { LinkButton } from "@/components/core";
import React from "react";

const Footer = () => {
  const footerNav = [
    {
      name: "Trading",
      url: "#",
    },
    {
      name: "Investment",
      url: "#",
    },
    {
      name: "Onlending",
      url: "#",
    },
    {
      name: "Consultation",
      url: "#",
    },
  ];
  const footerLinks = [
    {
      name: "FAQs",
      url: "#",
    },
    {
      name: "Contact",
      url: "#",
    },
    {
      name: "Terms & Privacy",
      url: "#",
    },
  ];
  return (
    <div className="py-[4.5rem] px-4">
      <div className="grid grid-cols-2 gap-[1.75rem] xl:gap-[2.375rem] 2xl:gap-[4.375rem]  sm:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-[1.3fr_1fr_1fr_1fr] 2xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="max-xxscren:col-span-2">
          <LinkButton
            className="text-white bg-transparent font-verdana font-bold text-lg p-0 gap-2"
            href="/"
          >
            <OpticalLogo /> Opticraft Trading
          </LinkButton>
          <p className="font-outfit text-sm mt-3 max-w-[80%] text-white text-opacity-70">
            Building wealth takes more than just a savings account. its about
            taking control of your future with strategic trading investments.
          </p>
        </div>
        <div className="">
          <nav>
            <p className="text-white font-outfit font-semibold text-sm uppercase">
              Features
            </p>
            <ul className="flex  mt-4 flex-col gap-3">
              {footerNav?.map((nav, idx: number) => (
                <li key={idx}>
                  <a
                    className="text-white font-outfit font-normal text-sm"
                    href="#"
                  >
                    {nav?.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="">
          <nav>
            <p className="text-white font-outfit font-semibold text-sm uppercase">
              QUICK LINKS
            </p>
            <ul className="flex  mt-4 flex-col gap-3">
              {footerLinks?.map((nav, idx: number) => (
                <li key={idx}>
                  <a
                    className="text-white font-outfit font-normal text-sm"
                    href="#"
                  >
                    {nav?.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="">
          <p className="text-white font-outfit font-semibold text-sm uppercase">
            CONTACT US
          </p>
          <p className="font-outfit text-sm mt-4 text-white text-opacity-80 max-w-[300px]">
            Send us a message or call us 70-3234-7071 You can also send us an
            email at Opticraftrade@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
