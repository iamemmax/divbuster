"use client"
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import {motion} from "framer-motion"
import UserSignupDetails from "../../components/signup/UserSignupDetails";
import UserBvnDetails from "../../components/signup/UserBvnDetails";
import UserOtpVerification from "../../components/signup/UserOtpVerification";
import FacialVerification from "../../components/signup/FacialVerification";
import CreateWidthralPin from "../../components/signup/CreateWidthrawalPin";
import CreatePasswordDetails from "../../components/signup/CreatePassword";
import OnboardingSuccessPage from "../../components/shared/OnboardingSuccessPagr";





export interface resetprop {
  email: string;
  otp: string;

}

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  // const [email, setEmail] = useState("");
 

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <motion.div
        animate="animate"
        className="h-full"
          exit="exit"
          initial="initial"
          key="step1"
          transition={{ duration: 0.4 }}
          variants={pageVariants}
        >
        <UserSignupDetails  
            onNext={() => setStep(2)}/>
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          animate="animate"
           className="h-full"
          exit="exit"
          initial="initial"
          key="step2"
          transition={{ duration: 0.4 }}
          variants={pageVariants}
        >
         <UserBvnDetails   
         onNext={() => setStep(3)}
         onPrev={() => setStep(1)}
         />
        </motion.div>
      )}
      {step === 3 && (
        <motion.div
          animate="animate"
           className="h-full"
          exit="exit"
          initial="initial"
          key="step3"
          transition={{ duration: 0.4 }}
          variants={pageVariants}
        >
          <UserOtpVerification
           onNext={() => setStep(4)}
           onPrev={() => setStep(2)}
          />
        </motion.div>
      )}
      {step === 4 && (
        <motion.div
          animate="animate"
           className="h-full"
          exit="exit"
          initial="initial"
          key="step4"
          transition={{ duration: 0.4 }}
          variants={pageVariants}
        >
          <FacialVerification
           onNext={() => setStep(5)}
           onPrev={() => setStep(3)}
          />
        </motion.div>
      )}
      {step === 5 && (
        <motion.div
        animate="animate"
        className="h-full"
        exit="exit"
        initial="initial"
        key="step5"
        transition={{ duration: 0.4 }}
        variants={pageVariants}
        >
          
        <CreateWidthralPin
         onNext={() => setStep(6)}
         onPrev={() => setStep(4)}
        />
        </motion.div>
      )}
      {step === 6 && (
        <motion.div
        animate="animate"
        className="h-full"
        exit="exit"
        initial="initial"
        key="step6"
        transition={{ duration: 0.4 }}
        variants={pageVariants}
        >
        
      <CreatePasswordDetails
       onNext={() => setStep(7)}
       onPrev={() => setStep(5)}
      />
          
        </motion.div>
      )}
      {step === 7 && (
        <motion.div
        animate="animate"
        className="h-full"
        exit="exit"
        initial="initial"
        key="step6"
        transition={{ duration: 0.4 }}
        variants={pageVariants}
        >
        
      <OnboardingSuccessPage
      title="You are welcome to Opticraft"
      subTitle="Login to unleash your financial trading possibilities."
      
      />
  
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgetPassword;
