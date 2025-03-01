"use client";

import { motion } from "framer-motion";
import React from "react";
import { useIntl } from "react-intl";

export interface ISectionIntroductionProps {}

export const SectionIntroduction: React.FC<ISectionIntroductionProps> = () => {
  const intl = useIntl();

  return (
    <>
      <motion.section className="section-hello">
        <motion.span>{intl.formatMessage({ id: "hello" })}</motion.span>
      </motion.section>
    </>
  );
};
