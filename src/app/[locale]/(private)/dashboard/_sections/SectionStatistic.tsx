import { motion } from "framer-motion";
import React from "react";
import { useIntl } from "react-intl";

export interface ISectionStatisticProps {}

export const SectionStatistic: React.FC<ISectionStatisticProps> = () => {
  const intl = useIntl();

  return (
    <>
      <motion.section>{intl.formatMessage({ id: "hello" })}</motion.section>
    </>
  );
};
