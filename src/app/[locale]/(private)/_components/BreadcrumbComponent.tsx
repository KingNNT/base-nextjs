"use client";

import { kebabToTitleCase } from "@/helpers";
import { Breadcrumb } from "antd";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const BreadcrumbComponent = () => {
  const path = usePathname();

  const [ele, setEle] = useState<string[]>([]);

  const init = () => {
    if (path) {
      const arrBreadCumb = path.split(/\//).slice(2);
      const r = arrBreadCumb.map((i) => kebabToTitleCase(i));
      setEle(r);
    }
  };

  useEffect(() => {
    init();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [path]);

  return (
    <>
      <motion.div className="private-components-breadcrumb-component">
        {ele.length && <Breadcrumb items={ele.map((i) => ({ title: i }))} />}
      </motion.div>
    </>
  );
};
