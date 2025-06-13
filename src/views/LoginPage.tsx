'use client';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Footer from '../components/Footer/Footer';
import { login } from '../store/authSlice';
import './LoginPage.scss';
import CommonInput from '../components/CommonInput/CommonInput';

interface FormValues {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

export default function LoginPage() {
  const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
    email: Yup.string().required('Username or email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(
        8,
        'Password must be at least 8 characters with 1 capital letter, 1 number, and 1 symbol'
      )
      .matches(
        /[A-Z]/,
        'Password must be at least 8 characters with 1 capital letter, 1 number, and 1 symbol'
      )
      .matches(
        /\d/,
        'Password must be at least 8 characters with 1 capital letter, 1 number, and 1 symbol'
      )
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must be at least 8 characters with 1 capital letter, 1 number, and 1 symbol'
      ),
    keepSignedIn: Yup.boolean().default(false),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      keepSignedIn: false,
    },
    validationSchema,
    onSubmit: values => {
      dispatch(login({ email: values.email }));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/countries');
      }, 1500);
    },
  });

  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container fluid className="login-container">
      <Row className="login-row">
        <Col lg={6} className="login-left-col">
          <div className="login-form-wrapper">
            <h2 className="login-title">Sign In</h2>
            <p className="login-subtitle">
              New user?{' '}
              <a href="#" className="signup-link">
                Create an account
              </a>
            </p>

            {showAlert && (
              <Alert variant="success" className="login-alert">
                Login successful! Redirecting...
              </Alert>
            )}

            <Form onSubmit={formik.handleSubmit}>
              <CommonInput
                type="text"
                name="email"
                placeholder="Username or email"
                value={formik?.values?.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
                error={formik.errors.email}
              />

              <CommonInput
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
                error={formik.errors.password}
              />

              <Form.Group className="checkbox-group">
                <Form.Check
                  type="checkbox"
                  name="keepSignedIn"
                  label="Keep me signed in"
                  checked={formik.values.keepSignedIn}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="submit-btn"
                variant="dark"
                size="lg"
              >
                Sign In
              </Button>
            </Form>

            <div className="divider-text">
              <small>Or Sign In With</small>
            </div>

            <Footer copyRight={false} />
          </div>
        </Col>

        <Col lg={6} className="login-right-col">
          <div className="image-wrapper">
            <img src="/login.png" alt="Login" className="login-image" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
