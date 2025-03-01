"use client";

import { motion } from "framer-motion";
import { SelectLocale } from "../../_components";

export const Header = () => {
  return (
    <>
      <motion.div className="private-component-header">
        <SelectLocale />
      </motion.div>
    </>
  );
};
