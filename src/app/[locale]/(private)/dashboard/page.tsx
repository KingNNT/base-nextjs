"use client";

import { motion } from "framer-motion";
import { useIntl } from "react-intl";

const DashboardPage = () => {
  const intl = useIntl();

  return (
    <>
      <motion.div className="private-dashboard">
        {intl.formatMessage({ id: "hello" })}
      </motion.div>
    </>
  );
};

export default DashboardPage;
