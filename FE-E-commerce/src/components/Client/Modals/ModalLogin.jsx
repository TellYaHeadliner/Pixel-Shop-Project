import PropTypes from "prop-types";
import { Modal, Form, Button, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from "antd"; // Import message for notifications
import "dotenv/config"

const ModalLogin = ({ show, onClose }) => {
  const [key, setKey] = useState("Đăng nhập");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const verifyCaptcha = (value) => {
    if (value) {
      setCaptchaVerified(true);
      message.success("Captcha đã được xác minh thành công!");
    } else {
      setCaptchaVerified(false);
      message.error("Captcha chưa được xác minh!");
    }
  };
  console.log("Captcha: " + JSON.stringify(captchaVerified));
  console.log("Captcha Site Key:", import.meta.env.VITE_RECAPTCHA_SITE_KEY_CLIENT);
  if (!import.meta.env.VITE_RECAPTCHA_SITE_KEY_CLIENT) {
    console.error("VITE_RECAPTCHA_SITE_KEY_CLIENT is not defined!");
  }
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      className="modal-dialog-centered w-100"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {key === "Đăng nhập" ? "Đăng nhập" : "Đăng ký"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 gap-2 d-flex flex-row"
        >
          <Tab eventKey="Đăng nhập" title="Đăng nhập">
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control type="email" placeholder="Tên/ Email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              {/* Add ReCAPTCHA here */}
              <Form.Group className="mb-3">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY_CLIENT}
                  onChange={verifyCaptcha}
                />
              </Form.Group>
              <Button type="button" disabled={!captchaVerified}>
                Đăng nhập
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="Đăng ký" title="Đăng ký">
            <Form>
              <Form.Group className="mb-3" controlId="sex">
                <Form.Label>Giới tính</Form.Label>
                {["checkbox"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Anh"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Chị"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                  </div>
                ))}
              </Form.Group>
              <div className="row mb-3">
                <div className="col-lg-6">
                  <Form.Group controlId="userName">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6">
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <Form.Group controlId="repeatPassword">
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-4">
                  <Form.Group controlId="day">
                    <Form.Label>Ngày</Form.Label>
                    <Form.Control type="number" min="1" max="31" />
                  </Form.Group>
                </div>
                <div className="col-lg-4">
                  <Form.Group controlId="month">
                    <Form.Label>Tháng</Form.Label>
                    <Form.Control type="number" min="1" max="12" />
                  </Form.Group>
                </div>
                <div className="col-lg-4">
                  <Form.Group controlId="year">
                    <Form.Label>Năm</Form.Label>
                    <Form.Control
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6">
                  <Form.Group controlId="thanhPhoTinh">
                    <Form.Label>Thành phố/Tỉnh</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <Form.Group controlId="diaChi">
                    <Form.Label>Địa chỉ cụ thể</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button type="submit">Đăng ký</Button>
              </div>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

ModalLogin.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLogin;