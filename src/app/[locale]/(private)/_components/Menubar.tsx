"use client";

import { motion } from "framer-motion";
import { Menu, MenuProps } from "antd";
import { AiFillDashboard } from "react-icons/ai";
import { RiPassPendingFill } from "react-icons/ri";
import { useAppSelector } from "@/libraries/redux/hooks";
import { ThemeSupport } from "@configs";
import { FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

type MenuItem = Required<MenuProps>["items"][number];

export const Menubar = () => {
  const intl = useIntl();
  const router = useRouter();
  const path = usePathname();

  const [selectedKeys, setSelectedKeys] = useState<string[]>();

  const appState = useAppSelector((state) => state.app);

  const items: MenuItem[] = [
    {
      label: intl.formatMessage({ id: "dashboard" }),
      key: "dashboard",
      icon: <AiFillDashboard />,
    },
    {
      label: intl.formatMessage({ id: "samples" }),
      key: "samples",
      icon: <RiPassPendingFill />,
    },
    {
      label: intl.formatMessage({ id: "user" }),
      key: "user",
      icon: <FaUser />,
      disabled: true,
    },
  ];

  const handleSelect: MenuProps["onSelect"] = (e) => {
    setSelectedKeys(e.selectedKeys);
    switch (e.key) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "samples":
        router.push("/samples");
        break;
    }
  };

  const init = () => {
    if (path.includes("/dashboard")) {
      setSelectedKeys(["dashboard"]);
    } else if (path.includes("/samples")) {
      setSelectedKeys(["samples"]);
    }
  };

  useEffect(() => {
    init();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <motion.div className="private-component-menu-bar">
        <Menu
          theme={appState.theme === ThemeSupport.Dark ? "dark" : "light"}
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onSelect={(e) => handleSelect(e)}
        />
      </motion.div>
    </>
  );
};
