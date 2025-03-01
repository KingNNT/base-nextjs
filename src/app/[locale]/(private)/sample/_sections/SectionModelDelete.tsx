"use client";

import { motion } from "framer-motion";
import { useDeleteSampleMutation } from "@/libraries/redux/features/sample/sampleApi";
import { ISample } from "@/types";
import { message, Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";

export interface ISectionModalDeleteProps {
  record: ISample | null;
  isModalOpen: boolean;
  setIsModalOpenAction: Dispatch<SetStateAction<boolean>>;
}

export const SectionModalDelete: React.FC<ISectionModalDeleteProps> = ({
  record,
  isModalOpen,
  setIsModalOpenAction,
}) => {
  const intl = useIntl();
  const [deleteSample, { isLoading }] = useDeleteSampleMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    if (!record) return;
    try {
      await deleteSample(record.id);
      messageApi.success(
        intl.formatMessage({ id: "messages.deleted_succesfully" }),
      );
      setIsModalOpenAction(false);
    } catch {
      messageApi.error(intl.formatMessage({ id: "messages.failed_to_delete" }));
    }
  };

  return (
    <>
      {contextHolder}
      {record && (
        <Modal
          title={intl.formatMessage({ id: "delete_sample" })}
          open={isModalOpen}
          okButtonProps={{ loading: isLoading }}
          onOk={() => handleSubmit()}
          cancelButtonProps={{ loading: isLoading }}
          onCancel={() => setIsModalOpenAction(false)}
        >
          <motion.p>
            {intl.formatMessage({ id: "do_you_really_want_to_delete" })}{" "}
            <motion.span className="font-bold">{record.name}</motion.span>?{" "}
            {intl.formatMessage({ id: "this_action_cannot_be_undone" })}
          </motion.p>
        </Modal>
      )}
    </>
  );
};
