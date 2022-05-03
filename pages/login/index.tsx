import { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Spin,
  Image,
  Input,
  message,
} from "antd";
import Head from "next/head";
import { showError } from "../../Utils/Helpers/AntdHelper";
import useWindowSize from "../../Utils/Helpers/ReactHelper";
import { FetcherPost } from "../../Utils/Fetcher";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import { ReplaceNavigateTo } from "../../Utils/Helpers/Routing";

// type LoginProps = {
//   session: any;
// };

function Login() {
  const [loading, setLoading] = useState(false);
  const { isMobile } = useWindowSize();
  const [form] = Form.useForm();

  const styleContent = {
    maxWidth: isMobile ? "90%" : "400px",
    zIndex: 2,
    minWidth: isMobile ? "80%" : "300px",
  };

  // console.log(session);

  const doLogin = async (username: string, password: string) => {
    // console.log(username, password);
    try {
      setLoading(true);
      const data = await FetcherPost(
        undefined,
        "/api/login",
        {
          username,
          password,
        },
      );
      // @ts-ignore
      if (data.status === 200) {
        message
          .success("Sign complete. Taking you to your dashboard!", 1)
          .then(() => ReplaceNavigateTo("/dashboard"));
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      showError("error", "something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <Spin tip="Memuat..." size="large" spinning={loading}>
        <Row
          align="middle"
          justify="center"
          className={
            isMobile ? "mh-page withbg-jon-mobile" : "mh-page withbg-jon"
          }
          style={{ minHeight: "100vh" }}
        >
          <div style={styleContent}>
            <Row justify="center">
              <Image
                src="/Images/logo.jpg"
                height="120px"
                alt="c3budiman Logo"
                preview={false}
              />
            </Row>

            <div style={{ height: "20px" }} />

            <Form form={form}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "username cant be empty!",
                  },
                ]}
              >
                <Input
                  prefix={(
                    <Image
                      preview={false}
                      src="/Icon/Login/mail.svg"
                      alt="mail"
                    />
                  )}
                  type="text"
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "0" }}
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={(
                    <Image
                      preview={false}
                      src="/Icon/Login/key.svg"
                      alt="pass"
                    />
                  )}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <div style={{ height: "20px" }} />

              <Form.Item
                name="remember"
                valuePropName="checked"
                initialValue
              >
                <Row gutter={[20, 0]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Button
                      onClick={() => {
                        form.validateFields().then((values) => {
                          // console.log(values);
                          doLogin(values.username, values.password);
                        });
                      }}
                      style={{
                        background: "#33539E",
                        borderColor: "#33539E",
                        borderRadius: "20px",
                      }}
                      type="primary"
                      htmlType="submit"
                      block
                      className="colorWhite"
                    >
                      Log in
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Row>
      </Spin>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context, false, true);
  return checkSessions;
}

export default Login;
