import { Button, Form, FormProps, Input, message } from "antd";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const SERVICE_ID = "service_1ld4bjf";
const TEMPLATE_ID = "template_h98hbuo";
const PUBLIC_KEY = "mn8uBqSU57F5VEaMr";

type FieldType = {
  name?: string;
  email?: string;
  description?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    setLoading(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.description,
        },
        PUBLIC_KEY,
      );
      message.success("Mesajul a fost trimis cu succes!");
      form.resetFields();
    } catch (error) {
      message.error("A apărut o eroare. Încearcă din nou.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Nume" size="large" />
      </Form.Item>

      <Form.Item name="email" rules={[{ type: "email" }]}>
        <Input placeholder="Email" size="large" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea
          placeholder="Spune-mi cu ce informatii te pot ajuta"
          size="large"
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-32"
        >
          Trimite
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
