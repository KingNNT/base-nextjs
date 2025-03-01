"use client";

import { motion } from "framer-motion";
import dayjs from "dayjs";
import { APP_CONFIG } from "@configs";

export const Footer = () => {
  return (
    <>
      <motion.div className="private-components-footer">
        © {dayjs().format("YYYY")} - {APP_CONFIG.WEB_NAME}
      </motion.div>
    </>
  );
};
