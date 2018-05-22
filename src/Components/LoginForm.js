import React from "react";
import { Link } from "react-router-dom";
import { css, withStyles } from "../withStyles";
import Media from "react-media";

import { withFormik } from "formik";
import Yup from "yup";

import FlexContainer from "../Containers/FlexContainer";
import Button from "../Elements/Button";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";
import Input from "../Elements/Input";

let LoginForm = ({
  styles,
  handleChange, //Formiks handleChange
  handleSubmit, //Formiks handleSubmit that we use down below, can be used to show loading indicator and to check if email exists etc.
  values, // this is the "state" where all values are stored
  errors, //this is where all the errors are set, to call it use for example errors.email to get the email errors
  touched, //this gets set by handleBlur and is used to not show the error message until the user is finished writing and is moving on to another field
  handleBlur,
  isSubmitting,
  loginRequest,
  ...props
  // gets set by handleSubmit and returns a bool, can be used to disable buttons while submitting
}) => {
  return (
    <div {...css(styles, styles.loginForm)}>
      <FlexContainer>
        <Media query={{ minHeight: 400 }}>
          <Heading appearance="primary" size="2">
            Log in as presenter
          </Heading>
        </Media>
        <Media query={{ maxWidth: 480 }}>
          {matches => (
            <form onSubmit={handleSubmit}>
              <FlexContainer>
                <FlexContainer
                  align="start"
                  style={matches ? { width: "300px" } : { width: "400px" }}
                >
                  <label
                    style={{ marginBottom: "5px", color: "white" }}
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <Input
                    name="email"
                    appearance={
                      !touched.email && !errors.email
                        ? "primary"
                        : touched.email && !errors.email
                          ? "success"
                          : touched.email && errors.email
                            ? "danger"
                            : "primary"
                    }
                    icon={
                      !touched.email && !errors.email
                        ? "fas fa-envelope"
                        : touched.email && !errors.email
                          ? "fas fa-check"
                          : touched.email && errors.email
                            ? "fas fa-times"
                            : "fas fa-envelope"
                    }
                    iconPosition="right"
                    iconBackground={
                      !touched.email && !errors.email
                        ? "primary"
                        : touched.email && !errors.email
                          ? "success"
                          : touched.email && errors.email
                            ? "danger"
                            : "primary"
                    }
                    iconFillColor="white"
                    type="text"
                    placeholder="Email..."
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FlexContainer style={{ minHeight: "20px" }}>
                    {errors.email &&
                      touched.email && (
                        <Paragraph appearance="danger" size="sub">
                          {errors.email}
                        </Paragraph>
                      )}
                  </FlexContainer>
                  <label
                    htmlFor="password"
                    style={{
                      marginTop: "10px",
                      marginBottom: "5px",
                      color: "white"
                    }}
                  >
                    Password
                  </label>

                  <Input
                    name="password"
                    appearance={
                      !touched.password && !errors.password
                        ? "primary"
                        : touched.password && !errors.password
                          ? "success"
                          : touched.password && errors.password
                            ? "danger"
                            : "primary"
                    }
                    icon={
                      !touched.password && !errors.password
                        ? "fas fa-unlock"
                        : touched.password && !errors.password
                          ? "fas fa-check"
                          : touched.password && errors.password
                            ? "fas fa-times"
                            : "fas fa-unlock"
                    }
                    iconPosition="right"
                    iconBackground={
                      !touched.password && !errors.password
                        ? "primary"
                        : touched.password && !errors.password
                          ? "success"
                          : touched.password && errors.password
                            ? "danger"
                            : "primary"
                    }
                    iconFillColor="white"
                    type="password"
                    placeholder="Password..."
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FlexContainer style={{ minHeight: "20px" }}>
                    {errors.password &&
                      touched.password && (
                        <Paragraph appearance="danger" size="sub">
                          {errors.password}
                        </Paragraph>
                      )}
                  </FlexContainer>
                </FlexContainer>
                <Button
                  size={matches ? "small" : "medium"}
                  disabled={isSubmitting}
                >
                  Log In
                </Button>
              </FlexContainer>
            </form>
          )}
        </Media>
        <Media query={{ minHeight: 400 }}>
          <Paragraph appearance="white">
            Don't have an account? <Link to="signup">Sign up here!</Link>
          </Paragraph>
        </Media>
      </FlexContainer>
    </div>
  );
};

const formikForm = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    //Send a request to db and check if the email and password is correct
    props.loginRequest(values);
  }
})(LoginForm);

export default withStyles(({ themes, text, colors }) => {
  return {
    loginForm: {
      ":nth-child(1n) form input": {
        margin: "0px"
      }
    },
    primary: colors.primary,
    danger: colors.danger
  };
})(formikForm);
