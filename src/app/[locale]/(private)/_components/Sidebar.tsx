"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Menubar } from "./Menubar";
import { useResponsive } from "@/app/hooks";
import { useIntl } from "react-intl";

const { Sider } = Layout;

export const Sidebar = () => {
  const intl = useIntl();

  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { isMobile } = useResponsive();

  return (
    <>
      <motion.div className="sidebar">
        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            title={`${intl.formatMessage({ id: "menu" })}`}
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
          >
            <Menubar />
          </Drawer>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className="min-h-content-screen"
          >
            <Menubar />
          </Sider>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            className=""
            icon={<MenuUnfoldOutlined />}
            onClick={() => setDrawerVisible(true)}
          />
        )}
      </motion.div>
    </>
  );
};
