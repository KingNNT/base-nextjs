"use client";

import { useUpdateSampleMutation } from "@/libraries/redux/features/sample/sampleApi";
import { ISample } from "@/types";
import { Form, Input, message, Modal } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useIntl } from "react-intl";

export interface ISectionModalEditProps {
  record: ISample | null;
  isModalOpen: boolean;
  setIsModalOpenAction: Dispatch<SetStateAction<boolean>>;
}

export const SectionModalEdit: React.FC<ISectionModalEditProps> = ({
  record,
  isModalOpen,
  setIsModalOpenAction,
}) => {
  const intl = useIntl();

  const [messageApi, contextHolder] = message.useMessage();
  const [updateType, { isLoading }] = useUpdateSampleMutation();
  const [form] = Form.useForm();

  const handleEditSubmit = async () => {
    if (!record) return;
    const updatedData: Omit<ISample, "id"> = await form.validateFields();
    await updateType({ id: record.id, ...updatedData });
    messageApi.success(
      intl.formatMessage({ id: "messages.updated_successfully" }),
    );
    setIsModalOpenAction(false);
  };

  useEffect(() => {
    if (!record) return;
    form.setFieldsValue({
      id: record.id,
      name: record.name,
    });
  }, [isModalOpen]);

  return (
    <>
      {contextHolder}
      <Modal
        title={intl.formatMessage({ id: "edit_sample" })}
        open={!!record && isModalOpen}
        okButtonProps={{ loading: isLoading }}
        onOk={handleEditSubmit}
        cancelButtonProps={{ loading: isLoading }}
        onCancel={() => setIsModalOpenAction(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={`${intl.formatMessage({ id: "name" })}`}
            name="name"
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  {
                    id: "errors.validation.required",
                  },
                  {
                    field: intl.formatMessage({ id: "name" }),
                  },
                ),
              },
            ]}
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
