import React from "react";
import { css, withStyles } from "../withStyles";
import { Link } from "react-router-dom";
import Media from "react-media";

import { withFormik } from "formik";
import Yup from "yup";

import FlexContainer from "../Containers/FlexContainer";
import Button from "../Elements/Button";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";
import Input from "../Elements/Input";
import Textarea from "../Elements/Textarea";

let ContactForm = ({
  styles,
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  isSubmitting,
  contactRequest,
  ...props
}) => {
  return (
    <div {...css(styles, styles.ContactForm)}>
      <FlexContainer>
        <Media query={{ minHeight: 400 }}>
          <Heading size="2" appearance="primary">
            Contact
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
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Input
                    name="name"
                    appearance={
                      !touched.name && !errors.name
                        ? "primary"
                        : touched.name && !errors.name
                          ? "success"
                          : touched.name && errors.name
                            ? "danger"
                            : "primary"
                    }
                    icon={
                      !touched.name && !errors.name
                        ? "fas fa-user"
                        : touched.name && !errors.name
                          ? "fas fa-check"
                          : touched.name && errors.name
                            ? "fas fa-times"
                            : "fas fa-user"
                    }
                    iconPosition="right"
                    iconBackground={
                      !touched.name && !errors.name
                        ? "primary"
                        : touched.name && !errors.name
                          ? "success"
                          : touched.name && errors.name
                            ? "danger"
                            : "primary"
                    }
                    iconFillColor="white"
                    type="text"
                    placeholder="Name..."
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FlexContainer style={{ minHeight: "20px" }}>
                    {errors.name &&
                      touched.name && (
                        <Paragraph appearance="danger" size="sub">
                          {errors.name}
                        </Paragraph>
                      )}
                  </FlexContainer>
                  <label
                    style={
                      matches
                        ? {
                            marginBottom: "5px",
                            marginTop: "0px",
                            color: "white"
                          }
                        : {
                            marginTop: "10px",
                            marginBottom: "5px",
                            color: "white"
                          }
                    }
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
                    style={
                      matches
                        ? {
                            marginBottom: "5px",
                            marginTop: "0px",
                            color: "white"
                          }
                        : {
                            marginTop: "10px",
                            marginBottom: "5px",
                            color: "white"
                          }
                    }
                    htmlFor="message"
                  >
                    Message
                  </label>

                  <Textarea
                    name="message"
                    appearance={
                      !touched.message && !errors.message
                        ? "primary"
                        : touched.message && !errors.message
                          ? "success"
                          : touched.message && errors.message
                            ? "danger"
                            : "primary"
                    }
                    icon={
                      !touched.message && !errors.message
                        ? "fas fa-edit"
                        : touched.message && !errors.message
                          ? "fas fa-check"
                          : touched.message && errors.message
                            ? "fas fa-times"
                            : "fas fa-edit"
                    }
                    iconPosition="right"
                    iconBackground={
                      !touched.message && !errors.message
                        ? "primary"
                        : touched.message && !errors.message
                          ? "success"
                          : touched.message && errors.message
                            ? "danger"
                            : "primary"
                    }
                    iconFillColor="white"
                    placeholder="Message..."
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FlexContainer style={{ minHeight: "20px" }}>
                    {errors.message &&
                      touched.message && (
                        <Paragraph appearance="danger" size="sub">
                          {errors.message}
                        </Paragraph>
                      )}
                  </FlexContainer>
                </FlexContainer>
                <Button
                  size={matches ? "small" : "medium"}
                  disabled={isSubmitting}
                >
                  Send
                </Button>
              </FlexContainer>
            </form>
          )}
        </Media>
      </FlexContainer>
    </div>
  );
};

const handleErrorResponse = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const sendMessage = (values) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(values)
    })
      .then(handleErrorResponse)
      .then(resolve)
      .catch(reject)
  });
}

const formikForm = withFormik({
  mapPropsToValues() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .trim("Your name should'nt include leading or trailing whitespace")
      .strict(false)
      .min(2, "Must be longer than 2 characters")
      .max(40, "Seems you got a pretty long name there")
      .required("Name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    message: Yup.string()
      .strict(false)
      .required("Message is required")
  }),

  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    sendMessage(values)
      .then(() => {
        resetForm();
        setSubmitting(false);
      })
      .catch((error) => {
        // TODO: Implement setErrors(...)
        setSubmitting(false);
      })
  }
})(ContactForm);

export default withStyles(({ themes, text, colors }) => {
  return {
    ContactForm: {
      ":nth-child(1n) form input": {
        margin: "0",
        borderRadius: "4px 0px 0px 4px"
      },
      ":nth-child(1n) label": {
        marginTop: "20px",
        marginBottom: "5px"
      }
    },
    primary: colors.primary,
    danger: colors.danger,
    success: colors.success
  };
})(formikForm);
