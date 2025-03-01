"use client";

import { useCreateSampleMutation } from "@/libraries/redux/features/sample/sampleApi";
import { ISample } from "@/types";
import { Form, Input, message, Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";

export interface ISectionModalCreateProps {
  isModalOpen: boolean;
  setIsModalOpenAction: Dispatch<SetStateAction<boolean>>;
}

export const SectionModalCreate: React.FC<ISectionModalCreateProps> = ({
  isModalOpen,
  setIsModalOpenAction,
}) => {
  const intl = useIntl();

  const [createSample, { isLoading }] = useCreateSampleMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const newData: Omit<ISample, "id"> = await form.validateFields();
    try {
      await createSample(newData);
      messageApi.success(
        intl.formatMessage({ id: "messages.type_created_successfully" }),
      );
      form.resetFields();
      setIsModalOpenAction(false);
    } catch {
      messageApi.error(
        intl.formatMessage({ id: "messages.failed_to_create_type" }),
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={intl.formatMessage({ id: "create_type" })}
        open={isModalOpen}
        okButtonProps={{ loading: isLoading }}
        onOk={() => handleSubmit()}
        cancelButtonProps={{ loading: isLoading }}
        onCancel={() => setIsModalOpenAction(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={`${intl.formatMessage({ id: "name" })}`}
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={`${intl.formatMessage({ id: "description" })}`}
            name="description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
