"use client";

import { motion } from "framer-motion";
import { SectionStatistic } from "./_sections/SectionStatistic";

const DashboardPage = () => {
  return (
    <>
      <motion.div className="private-dashboard">
        <SectionStatistic />
      </motion.div>
    </>
  );
};

export default DashboardPage;
