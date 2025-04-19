import React from "react";
import { motion } from "framer-motion";
import { Button, LinkButton } from "@/components/core";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const FaqSection = () => {
  const faqData = [
    {
      question: "What is Opticraft?",
      answer:
        "Opticraft is a smart trading investment platform that provides real-time trading signals, portfolio management, and secure transactions to help traders maximize their profits.",
    },
    {
      question: "How does Opticraft work?",
      answer:
        "Opticraft uses advanced algorithms and machine learning to analyze market data and provide traders with real-time trading signals. Traders can then use these signals to make informed decisions and maximize their profits.",
    },
    {
      question: "Is Opticraft safe to use?",
      answer:
        "Yes, Opticraft is safe to use. We use advanced security measures to protect your personal and financial information.",
    },
    {
      question: "What types of investments does Opticraft offer?",
      answer:
        "Opticraft offers a variety of investment options, including stocks, bonds, mutual funds, and ETFs.",
    },
    {
      question: "How do I get started with Opticraft?",
      answer:
        "To get started with Opticraft, simply create an account and start using our platform. You can then begin making trades and managing your portfolio.",
    },
  ];

  return (
    <section className="flex items-center py-[4.5rem] w-full text-white px-4 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 w-full">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-3 3xl:max-w-[95%]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-x-3"
          >
            <p className="font-verdana text-xl mb-2">FAQs</p>
            <div>
              <svg
                width="81"
                height="2"
                viewBox="0 0 81 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_123)">
                  <g transform="matrix(0.0405 0 0 0.0005 40.5 2)">
                    <foreignObject
                      x="-1000"
                      y="-1000"
                      width="2000"
                      height="2000"
                    >
                      <div
                        style={{
                          background:
                            "conic-gradient(from 90deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,1) 200.4deg, rgba(255,255,255,0) 360deg)",
                          height: "100%",
                          width: "100%",
                          opacity: 0.8,
                        }}
                      />
                    </foreignObject>
                  </g>
                </g>
                <path d="M0 1.5H81V0.5H0V1.5Z" fill="white" opacity="0.2" />
                <defs>
                  <clipPath id="clip0_123">
                    <path d="M0 1.5H81V0.5H0V1.5Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[2rem] max-xxscren:text-[1.5rem] lg:text-[2.5rem] 3xl:text-[3.5rem] font-verdana font-bold text-white text-opacity-30 leading-tight"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="leading-relaxed font-outfit text-sm 2xl:text-xl md:max-w-[90%]"
          >
            Do you want to see more question?, navigate to our FAQs page and if
            you have more questions, reach out to our sales team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5"
          >
            <div className="flex gap-4 mt-6">
              <LinkButton href={"#"} className="flex items-center gap-2 bg-white text-[#0A0B20] max-sm:text-xxs hover:bg-gray-200 transition-colors max-xxscren:px-2 px-4 py-2 rounded-10 font-bold">
                Contact Sales
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#2B3AA6" />
                  <path
                    d="M15.975 16.5C14.9333 16.5 13.9042 16.273 12.8875 15.819C11.8708 15.365 10.9458 14.7212 10.1125 13.8875C9.27917 13.0538 8.6355 12.1288 8.1815 11.1125C7.7275 10.0962 7.50033 9.067 7.5 8.025C7.5 7.875 7.55 7.75 7.65 7.65C7.75 7.55 7.875 7.5 8.025 7.5H10.05C10.1667 7.5 10.2708 7.53967 10.3625 7.619C10.4542 7.69833 10.5083 7.792 10.525 7.9L10.85 9.65C10.8667 9.78333 10.8625 9.89583 10.8375 9.9875C10.8125 10.0792 10.7667 10.1583 10.7 10.225L9.4875 11.45C9.65417 11.7583 9.852 12.0562 10.081 12.3435C10.31 12.6308 10.5622 12.908 10.8375 13.175C11.0958 13.4333 11.3667 13.673 11.65 13.894C11.9333 14.115 12.2333 14.317 12.55 14.5L13.725 13.325C13.8 13.25 13.898 13.1938 14.019 13.1565C14.14 13.1192 14.2587 13.1087 14.375 13.125L16.1 13.475C16.2167 13.5083 16.3125 13.5688 16.3875 13.6565C16.4625 13.7442 16.5 13.842 16.5 13.95V15.975C16.5 16.125 16.45 16.25 16.35 16.35C16.25 16.45 16.125 16.5 15.975 16.5ZM9.0125 10.5L9.8375 9.675L9.625 8.5H8.5125C8.55417 8.84167 8.6125 9.17917 8.6875 9.5125C8.7625 9.84583 8.87083 10.175 9.0125 10.5ZM13.4875 14.975C13.8125 15.1167 14.1438 15.2292 14.4815 15.3125C14.8192 15.3958 15.1587 15.45 15.5 15.475V14.375L14.325 14.1375L13.4875 14.975Z"
                    fill="white"
                  />
                </svg>
              </LinkButton>
              <LinkButton href={"#"}
                className="flex items-center  max-sm:text-xxs gap-2 bg-transparent text-whit border-white border-opacity-50 hover:bg-gray-200 transition-colors  max-xxscren:px-2 px-4 py-2 rounded-10 font-bold"
                variant={"outlined"}>
              
                See More Questions
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="12" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.735 8.73516C12.8053 8.66493 12.9006 8.62549 13 8.62549C13.0994 8.62549 13.1947 8.66493 13.265 8.73516L16.265 11.7352C16.3352 11.8055 16.3747 11.9008 16.3747 12.0002C16.3747 12.0995 16.3352 12.1948 16.265 12.2652L13.265 15.2652C13.2307 15.302 13.1893 15.3316 13.1433 15.352C13.0973 15.3725 13.0476 15.3836 12.9973 15.3845C12.9469 15.3853 12.8969 15.3761 12.8502 15.3572C12.8035 15.3384 12.7611 15.3103 12.7255 15.2747C12.6899 15.2391 12.6618 15.1967 12.6429 15.15C12.6241 15.1033 12.6148 15.0532 12.6157 15.0029C12.6166 14.9525 12.6276 14.9029 12.6481 14.8569C12.6686 14.8109 12.6982 14.7695 12.735 14.7352L15.095 12.3752H8C7.90054 12.3752 7.80516 12.3356 7.73483 12.2653C7.66451 12.195 7.625 12.0996 7.625 12.0002C7.625 11.9007 7.66451 11.8053 7.73483 11.735C7.80516 11.6647 7.90054 11.6252 8 11.6252H15.095L12.735 9.26516C12.6648 9.19485 12.6253 9.09953 12.6253 9.00016C12.6253 8.90078 12.6648 8.80547 12.735 8.73516Z" fill="#2B3AA6"/>
</svg>

              </LinkButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side with Accordion */}
        <div className="mt-5">
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqData?.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-white bg-opacity-10 rounded-lg overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex items-center justify-between w-full px-4 md:px-6 py-4 text-left">
                    <span className="font-medium text-sm md:text-base">
                      {faq.question}
                    </span>
                    <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-3 md:px-6 pb-4  mt-1 text-xs md:text-sm text-white text-opacity-80">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
