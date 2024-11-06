"use client";

import { motion } from "framer-motion";
import { useIntl } from "react-intl";

const HomePage = () => {
  const intl = useIntl();

  return (
    <>
      <motion.div id="page__home">
        {intl.formatMessage({ id: "hello" })}
      </motion.div>
    </>
  );
};

export default HomePage;
