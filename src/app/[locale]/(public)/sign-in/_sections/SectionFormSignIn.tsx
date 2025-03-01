"use client";

import { Button, Form, FormProps, Input, message } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLogin } from "./hooks";

export type TField = {
  email: string;
  password: string;
};

export const SectionFormSignIn = () => {
  const intl = useIntl();
  const router = useRouter();
  const { response: resLogin, error: errLogin, login } = useLogin();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<TField>["onFinish"] = async (values) => {
    const email = values.email;
    const password = values.password;

    login(email, password);
  };

  useEffect(() => {
    if (!resLogin) {
      return;
    }
    router.push("/dashboard");
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [resLogin]);

  useEffect(() => {
    if (!errLogin) {
      return;
    }
    messageApi.error(errLogin);
  }, [errLogin]);

  return (
    <>
      {contextHolder}
      <motion.section className="public-sign-in-sections-section-form-sign-in">
        <motion.div className="wrapper-container">
          <Form
            className="form-sign-in"
            name="sign-in"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<TField>
              label={intl.formatMessage({ id: "email" })}
              name="email"
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({ id: "errors.validation.required" }, { field: `${intl.formatMessage({ id: "email" })}` })}`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<TField>
              label={intl.formatMessage({ id: "password" })}
              name="password"
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({ id: "errors.validation.required" }, { field: `${intl.formatMessage({ id: "password" })}` })}`,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={null} className="form-item__btn">
              <Button type="primary" htmlType="submit">
                {intl.formatMessage({ id: "submit" })}
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </motion.section>
    </>
  );
};
