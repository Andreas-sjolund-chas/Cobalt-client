import React from "react";
import { css, withStyles } from "../withStyles";
import { withFormik } from "formik";
import Yup from "yup";

import FlexContainer from "../Containers/FlexContainer";
import Button from "../Elements/Button";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";
import Input from "../Elements/Input";
import Avatar from "../Elements/Avatar";
import Card from "../Elements/Card";

const Profile = ({
  styles,
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  handleBlur,
  isSubmitting,
  updateRequest,
  handleAvatarChange,
  user,
  ...props
}) => {
  const handleUploadFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    handleAvatarChange(file);
  };
  return (
    <div {...css(styles, styles.profile)}>
      <FlexContainer
        justify="center"
        align="center"
        style={{ width: "100%", flexWrap: "wrap" }}
      >
        <Card
          style={{
            height: "240px",
            width: "480px",
            marginTop: "12px"
          }}
        >
          <FlexContainer justify="center" style={{ height: "100%" }}>
            <form>
              <FlexContainer direction="row" justify="center">
                <Avatar
                  size="xl"
                  image={user.user.avatar}
                  style={{ margin: "24px" }}
                />
                <FlexContainer justify="center">
                  <Input
                    type="file"
                    name="file"
                    onChange={handleUploadFile}
                    style={{ width: "200px" }}
                  />
                </FlexContainer>
              </FlexContainer>
            </form>
          </FlexContainer>
        </Card>
        <form onSubmit={handleSubmit}>
          <FlexContainer
            style={{
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-evenly"
            }}
          >
            <Card
              style={{
                height: "240px",
                width: "480px",
                marginTop: "12px"
              }}
            >
              <FlexContainer
                justify="center"
                style={{ height: "100%", alignItems: "initial" }}
              >
                <FlexContainer
                  direction="row"
                  style={{ marginBottom: "10px", marginRight: "24px" }}
                >
                  <Heading size="3" align="center" justify="center">
                    Name
                  </Heading>
                  <Input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={user.user.name}
                  />
                </FlexContainer>
                <FlexContainer
                  style={{ minHeight: "20px", marginRight: "24px" }}
                >
                  {errors.name &&
                    touched.name && (
                      <Paragraph size="sub">{errors.name}</Paragraph>
                    )}
                </FlexContainer>

                <FlexContainer
                  direction="row"
                  style={{ marginBottom: "10px", marginRight: "24px" }}
                >
                  <Heading size="3" align="center" justify="center">
                    Email
                  </Heading>
                  <Input
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={user.user.email}
                  />
                </FlexContainer>
                <FlexContainer
                  style={{ minHeight: "20px", marginRight: "24px" }}
                >
                  {errors.email &&
                    touched.email && (
                      <Paragraph size="sub">{errors.email}</Paragraph>
                    )}
                </FlexContainer>
              </FlexContainer>
            </Card>

            <Card
              style={{
                height: "240px",
                width: "480px",
                marginTop: "12px"
              }}
            >
              <FlexContainer
                justify="center"
                style={{ height: "100%", alignItems: "initial" }}
              >
                <FlexContainer direction="row" style={{ marginRight: "24px" }}>
                  <Heading size="3" align="center" justify="center">
                    New Password
                  </Heading>
                  <Input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="New Password"
                  />
                </FlexContainer>
                <FlexContainer
                  style={{ minHeight: "20px", marginRight: "24px" }}
                >
                  {errors.password &&
                    touched.password && (
                      <Paragraph size="sub">{errors.password}</Paragraph>
                    )}
                </FlexContainer>
              </FlexContainer>
            </Card>
            <FlexContainer justify="center" style={{ width: "100%" }}>
              <Button disabled={isSubmitting} appearance="secondary">
                Save
              </Button>
            </FlexContainer>
          </FlexContainer>
        </form>
      </FlexContainer>
    </div>
  );
};

const formikForm = withFormik({
  mapPropsToValues() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .trim("Your name should'nt include leading or trailing whitespace")
      .strict(false)
      .min(2, "Must be longer than 2 characters")
      .max(40, "Seems you got a pretty long name there"),
    email: Yup.string().email("Email is not valid"),
    password: Yup.string()
      .trim("Your password should'nt include leading or trailing whitespace")
      .strict(false)
      .min(6, "Password must be 6 characters or longer")
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (values.name == "") {
      delete values.name;
    }

    if (values.email == "") {
      delete values.email;
    }

    if (values.password == "") {
      delete values.password;
    }
    props.updateRequest(values);
  }
})(Profile);

export default withStyles(({ themes, text, colors }) => {
  return {
    profile: {
      width: "100%",
      ":nth-child(1n) form input": {
        margin: "0"
      },
      ":nth-child(1n) h3": {
        margin: "0",
        paddingRight: "14px"
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
