"use client";

import { motion } from "framer-motion";
import { SectionIntroduction } from "./_sections";

const HomePage = () => {
  return (
    <>
      <motion.div className="public-home">
        <SectionIntroduction />
      </motion.div>
    </>
  );
};

export default HomePage;
