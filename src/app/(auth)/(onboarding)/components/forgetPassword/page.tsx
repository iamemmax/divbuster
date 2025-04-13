"use client"
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import {motion} from "framer-motion"
import ForgetPassword from "../../components/forgetPassword/ForgerPassword";



export interface resetprop {
  email: string;
  otp: string;

}


const ForgetPasswordPage = () => {
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
        <ForgetPassword  
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
         {/* <UserBvnDetails   
         onNext={() => setStep(3)}
         onPrev={() => setStep(1)}
         /> */}
        </motion.div>
      )}
      
      {step === 3 && (
        <motion.div
        animate="animate"
        className="h-full"
        exit="exit"
        initial="initial"
        key="step6"
        transition={{ duration: 0.4 }}
        variants={pageVariants}
        >
        
     
      
      3
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgetPasswordPage;
