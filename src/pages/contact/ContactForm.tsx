import { Button, Form, FormProps, Input } from "antd";

type FieldType = {
  name?: string;
  email?: string;
  decription?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ContactForm = () => {
  return (
    <Form
      name="basic"
      // wrapperCol={{ span: 18 }}
      // style={{ width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Nume" />
      </Form.Item>

      <Form.Item name="email" rules={[{ type: "email" }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea placeholder="Spune-mi cu ce informatii te pot ajuta" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Trimite
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
