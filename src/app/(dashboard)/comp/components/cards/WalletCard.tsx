"use client";
import React, { useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import { Button, LinkButton } from "@/components/core";
import WalletIcon from "../../icons/WalletIcon";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";
import { Spinner } from "@/icons/core";
import { getWalletBalance } from "@/app/(dashboard)/dashboard/api/walletBalance";
import { useQuery } from "react-query";
import WithDrawalModal from "../withdrawal/WithdrawalModal";
import WithDrawalSuccessModal from "../withdrawal/WidrawalSuccessModal";
import AddFundModal from "../Funds/AddFund";
import { formatCurrency } from "@/utils";
import { removeCommas } from "@/utils/numbers";

interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
}
const WalletCard = ({ loadinUser, userData: users }: Prop) => {
  const [AddFund, setAddFund] = useState(false);
  const [showWithdrawalModal, setshowWithdrawalModal] = useState(false);
  const [showWithdrawalSuccessModal, setshowWithdrawalSuccessModal] =
    useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const { data: walletBalance, isLoading: loadingWallet } = useQuery({
    queryFn: () => getWalletBalance(String(users?.phone_number)),
    queryKey: ["fetch-wallet-balance", users?.phone_number],
    enabled: !!users?.phone_number,
  });

  {
    showWithdrawalModal && (
      <WithDrawalModal
        setshowWithdrawalModal={setshowWithdrawalModal}
        showWithdrawalModal={showWithdrawalModal}
        referralWalletBalance={walletBalance?.referral_balance}
        setshowWithdrawalSuccessModal={setshowWithdrawalSuccessModal}
        setWithdrawalAmount={setWithdrawalAmount}
      />
    );
  }

  {
    showWithdrawalSuccessModal && (
      <WithDrawalSuccessModal
        showWithdrawalSuccessModal={showWithdrawalSuccessModal}
        setshowWithdrawalSuccessModal={setshowWithdrawalSuccessModal}
        withdrawalAmount={withdrawalAmount}
        setshowWithdrawalModal={setshowWithdrawalModal}
      />
    );
  }

  {
    AddFund && (
      <AddFundModal
        heading="Add Fund"
        isAddFundModalOpen={AddFund}
        setAddFundModal={setAddFund}
        subsection="Fund wallet with any of the underlisted options"
      />
    );
  }
  // col-span-2 p-1 md:col-span-[1.5fr] 2xl:col-span-1
  return (
  
    <div className="bg-white rounded-10  max-xl:col-span-2 ">
      {loadingWallet || loadinUser ? (
        <div className="flex justify-center h-full items-center w-full py-6">
          <Spinner className="w-4  h-4 " color="#DB8C00" />
        </div>
      ) : (
        <div className="bg-[#31D0AA26] h-full justify-center grid grid-cols-[1fr_1.3fr] divide-x-[.0625rem] divide-[#099976] divide-opacity-70 shadow-sm rounded-10 max-xxscren:px-3  px-6 py-[.875rem] ">
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <button className="bg-[#31D0AA1F] shrink-0 rounded-full w-6 h-6 justify-center items-center flex">
                  <WalletIcon />
                </button>
                <p className="text-[#099976] text-xs font-semibold">
                  Wallet balance
                </p>
              </div>
            </div>

            <div className="">
              <h2 className="text-sm md:text-2xl  font-bold  py-3 text-[#099976]">
                {formatCurrency(
                  Number(removeCommas(String(walletBalance?.balance ?? 0)))
                ) ?? 0}
              </h2>
            </div>

            <div className="mt-3">
              <Button
                className="bg-[#fff] flex items-center justify-center gap-2 text-xs font-semibold text-[#099976] px-3 py-2 rounded-md"
                onClick={() => setAddFund(true)}
              >
                Top up
                <PlusIcon />
              </Button>
            </div>
          </div>
          <div className="pl-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <button className="bg-[#31D0AA1F] shrink-0 rounded-full w-6 h-6 justify-center items-center flex">
                  <WalletIcon />
                </button>
                <p className="text-[#099976] text-xs font-semibold">
                  Referral Wallet
                </p>
              </div>
            </div>

            <div className="">
              <h2 className="text-sm md:text-2xl font-bold text-[₦100,000] py-3 text-[#099976]">
                {formatCurrency(
                  Number(
                    removeCommas(String(walletBalance?.referral_balance ?? 0))
                  )
                ) ?? 0}
              </h2>
            </div>
            <div className="flex w-full items-center  mt-3 flex-wrap xl:flex-nowrap gap-2 2xl:gap-4">
              <Button
                className=" py-2 px-2 bg-white rounded-10 text-[#099976] font-semibold"
                onClick={() => setshowWithdrawalModal(true)}
              >
                Withdraw
              </Button>
              <LinkButton
                title="View Referral"
                href={"/dashboard/view-referrals"}
                className="py-2  bg-white [@media-screen:280px] max-xxscren:px-2   px-5 md:px-3 2xl:px-6  text-xs rounded-10 text-[#099976] font-semibold"
              >
                View 
              </LinkButton>
            </div>
          </div>
        </div>
      )}

      {showWithdrawalModal && (
        <WithDrawalModal
          setshowWithdrawalModal={setshowWithdrawalModal}
          showWithdrawalModal={showWithdrawalModal}
          referralWalletBalance={walletBalance?.referral_balance}
          setshowWithdrawalSuccessModal={setshowWithdrawalSuccessModal}
          setWithdrawalAmount={setWithdrawalAmount}
        />
      )}

      {showWithdrawalSuccessModal && (
        <WithDrawalSuccessModal
          showWithdrawalSuccessModal={showWithdrawalSuccessModal}
          setshowWithdrawalSuccessModal={setshowWithdrawalSuccessModal}
          withdrawalAmount={withdrawalAmount}
          setshowWithdrawalModal={setshowWithdrawalModal}
        />
      )}
      {AddFund && (
        <AddFundModal
          heading="Add Fund"
          isAddFundModalOpen={AddFund}
          setAddFundModal={setAddFund}
          subsection="Fund wallet with any of the underlisted options"
        />
      )}
    </div>
  );
};

export default WalletCard;
