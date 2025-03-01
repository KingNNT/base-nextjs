"use client";

import { motion } from "framer-motion";
import { SectionFormSignIn } from "./_sections";
import { Logo } from "@/components/Logo";

const SignInPage = () => {
  return (
    <>
      <motion.div className="public-sign-in-page">
        <motion.div className="wrapper">
          <Logo />
          <SectionFormSignIn />
        </motion.div>
      </motion.div>
    </>
  );
};

export default SignInPage;
