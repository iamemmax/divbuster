import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { Button } from "@/components/core";
import VisaCardIcon from "@/app/icons/(dashboard)/card/VisaCardIcon";
import AppleCardIcon from "@/app/icons/(dashboard)/card/AppleCardIcon";
import MastercardIcon from "@/app/icons/(dashboard)/card/MatercardIcon";
import PaypalIcon from "@/app/icons/(dashboard)/card/PaypalIcon";
import StripeCardIcon from "@/app/icons/(dashboard)/card/StripeCardIcon";
import AddNewCardForm from "./modals/AddCard";
import ViewCardDetails from "./modals/ViewCardDetails";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";

interface prop {
  user: User | null;
}
 export interface cardProp {
    id: number;
    name: string;
    holder: string;
    number: string;
    expiry: string;
    balance: string;
    cvv:string;
    gateway: string;
}
export   const getGatewayDisplay = (gateway: string) => {
    switch (gateway) {
      case "visa":
        return <VisaCardIcon width={30} height={30}/>;
      case "master":
        return <MastercardIcon width={30} height={30}/>;
      case "stripe":
        return <StripeCardIcon width={30} height={30} />;
      case "paypal":
        return <PaypalIcon width={30} height={30}/>;
      case "applepay":
        return <AppleCardIcon width={30} height={30}/>;
      default:
        return <span className="text-gray-500">{gateway}</span>;
    }
  };
const CardManagement = ({ user }: prop) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isOpenCardModal, setIsOpenCardModal] = useState(false)
  const [isOpenCardDeatilsModal, setIsOpenDetailsCardModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState<cardProp>()

  const cards = [
    {
      id: 1,
      name: "DiveBusters.",
      holder: "EMMANUEL AYODEJI",
      number: "1234 1234 1234 1234",
      expiry: "06/24",
      balance: "$1,240.40",
      gateway: "master",
      cvv:"234"
    },
    {
      id: 2,
      name: "DiveBusters.",
      holder: "EMMANUEL AYODEJI",
      number: "1234 1234 1234 5678",
      expiry: "06/25",
      balance: "$2,850.75",
      gateway: "visa",
      cvv:"234"
    },
    {
      id: 4,
      name: "DiveBusters.",
      holder: "EMMANUEL AYODEJI",
      number: "1234 1234 1234 5678",
      expiry: "06/25",
      balance: "$2,850.75",
      gateway: "paypal",
      cvv:"234"
    },
  ];

  const deposits = [
    {
      id: 1,
      type: "visa",
      ending: "6098",
      expiry: "06/2027",
      amount: "+$300.00",
    },
    {
      id: 2,
      type: "master",
      ending: "5678",
      expiry: "06/2028",
      amount: "+$150.00",
    },
    {
      id: 3,
      type: "visa",
      ending: "1234",
      expiry: "06/2026",
      amount: "+$200.00",
    },
  ];


  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToCard = (index: number) => {
    setCurrentCard(index);
  };

  return (
    <div className="w-full">
    <div className="py-8 max-w-7xl">
      <div className="">
        {/* Header */}
        <div className="pb-3 max-w-xs">
          <h2 className="font-archivo text-black font-medium text-xl">
            <span className="text-[#71717A]">Hello, {user?.first_name}</span>{" "}
            Let’s help you manage your Cards.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 mt-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors bg-white">
                <RefreshCw className="size-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors" onClick={()=>setIsOpenCardModal(true)}>
                Add New Card
              </button>
            </div>

            {/* Recent Deposits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center border-b justify-between mb-6 p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Deposits
                </h2>
                <Button className="text-gray-400 bg-transparent p-0">
                  <ThreeDot className="size-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {deposits.map((deposit) => (
                  <div
                    key={deposit.id}
                    className="flex items-center border-b  p-2 justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        
                      >
                       {getGatewayDisplay(deposit?.type)}
                      </div>
                      <div>
                        <div className="font-medium text-[#101828] font-archivo text-sm">
                          Ending in {deposit.ending}
                        </div>
                        <div className="text-sm text-[#667085] font-archivo">
                          Expiry {deposit.expiry}
                        </div>
                      </div>
                    </div>
                    <div className="text-[#039855] font-archivo text-sm">
                      {deposit.amount}
                    </div>
                  </div>
                ))}
              </div>

              <button className="text-orange-500 hover:text-orange-600 font-medium mt-6 text-base">
                Show more
              </button>
            </div>
          </div>

          {/* Right Column - Your Cards Section */}
          <div>
            <div className="flex items-center  max-w-[34.25rem] justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Your cards
              </h2>
              <button className="text-gray-400 hover:text-gray-600">
                <ThreeDot className="size-5" />
              </button>
            </div>

            {/* Card Container with Dark Background */}
            <div className="bg-[#132346] rounded-[.75rem] max-w-[34.25rem] p-6 relative overflow-hidden">
              {/* Card Carousel */}
              <div className="relative">
                <div className="flex gap-4 items-center w-full overflow-x-hidden mb-4">
                  {cards?.map((card, idx) => (
                    <div
                      key={idx}
                      className={`bg-gradient-to-br flex flex-col justify-between from-white/55 to-white/0 rounded-2xl p-6 text-white h-48 relative shadow-xl transition-all duration-300 shrink-0 ${
                        idx === currentCard
                          ? "w-80 opacity-100"
                          : "w-40 opacity-60"
                      }`}
                      style={{
                        transform: `translateX(-${currentCard * 160}px)`,
                      }}
                      onClick={() =>{
                         goToCard(idx)
                        setIsOpenDetailsCardModal(true)
                        setSelectedCard(card)
                        }
                        }
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h3
                          className={`font-medium ${idx === currentCard ? "text-lg" : "text-sm"}`}
                        >
                          {card?.name}
                        </h3>
                        {idx === currentCard && (
                          <svg
                            width="22"
                            height="27"
                            viewBox="0 0 22 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.9392 2.07715C18.9866 5.60902 20.0645 9.61543 20.0645 13.6937C20.0645 17.7719 18.9866 21.7784 16.9392 25.3102M11.8072 4.63279C13.4042 7.38765 14.2449 10.5126 14.2449 13.6937C14.2449 16.8747 13.4042 19.9997 11.8072 22.7546M6.9085 6.97933C8.06323 8.9925 8.67115 11.2762 8.67115 13.6008C8.67115 15.9254 8.06323 18.209 6.9085 20.2222M2.00977 9.51174C2.84197 10.7661 3.28317 12.2151 3.28317 13.6937C3.28317 15.1723 2.84197 16.6212 2.00977 17.8756"
                              stroke="white"
                              strokeWidth="2.79928"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="">
                        <div
                          className={` transition-opacity flex items-center gap-8 duration-300 ${idx === currentCard ? "opacity-100" : "opacity-60"}`}
                        >
                          <div className="text-xs text-gray-300 mb-1 text-nowrap     tracking-wider">
                            {card?.holder}
                          </div>
                         {idx === currentCard && <div className="text-sm text-gray-300">
                            {card?.expiry}
                          </div>}
                        </div>

                        <div
                          className={`flex items-end justify-between transition-opacity duration-300`}
                        >
                          <div className="text-lg font-mono tracking-wider overflow-hidden whitespace-nowrap">
                            {card?.number}
                          </div>
                         {idx === currentCard && <div
                            className={`flex items-end gap-1 ${idx === currentCard ? "opacity-100" : "opacity-0"}`}
                          >
                            {getGatewayDisplay(card?.gateway)}
                          </div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                {currentCard > 0 && (
                  <button
                    onClick={prevCard}
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                  >
                    <ChevronLeft className="size-4 text-white" />
                  </button>
                )}

                {currentCard < cards.length - 1 && (
                  <button
                    onClick={nextCard}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                  >
                    <ChevronRight className="size-4 text-white" />
                  </button>
                )}
              </div>

              {/* This Month Section */}
              <div className="mb-3">
                <div className="flex justify-between items-center w-full ">
                <div className="text-sm text-white font-archivo ">This month</div>
                <div className="text-sm font-archivo text-[#D0D5DDD0] font-bold">
                  {cards[currentCard].balance}
                </div>

                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2 ">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              {/* Carousel Indicators */}
            <div className="flex gap-2 justify-start">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCard(index)}
                    className={`size-2 rounded-full transition-colors ${
                      index === currentCard
                        ? "bg-white"
                        : "bg-orange-400"
                    }`}
                  />
                ))}
                {/* <div className="w-2 h-2 rounded-full bg-gray-600"></div> */}
              </div>
            </div>

            {/* Manage Cards Button */}
           <div className="flex items-center justify-end max-w-[34.25rem]">
             <button className="px-4 mt-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors bg-white">
              Manage cards
            </button>
           </div>
          </div>
        </div>
      </div>

      </div>
      {
        isOpenCardModal && <AddNewCardForm
        isOpen={isOpenCardModal}
        setIsOpenCardModal={setIsOpenCardModal}
        />
      }
      {
        isOpenCardDeatilsModal && <ViewCardDetails
        isOpen={isOpenCardDeatilsModal}
        setIsOpenCardModal={setIsOpenDetailsCardModal}
        selectedCard={selectedCard}
        />
      }
      
    </div>
  );
};

export default CardManagement;
