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
  ...props
}) => {
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
            <form onSubmit={handleSubmit}>
              <FlexContainer direction="row" justify="center">
                <Avatar
                  size="xl"
                  image="https://avatars1.githubusercontent.com/u/24225542?s=460&v=4"
                  style={{ margin: "24px" }}
                />
                <FlexContainer justify="center">
                  <Input
                    type="file"
                    name="picture"
                    value={values.picture}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "200px" }}
                  />
                  <Button appearance="secondary">Change Picture</Button>
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
                    placeholder="ManChildMan"
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
                    placeholder="Man@child.com"
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
                    name="newpassword"
                    type="password"
                    value={values.newpassword}
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
                      <Paragraph size="sub">{errors.newpassword}</Paragraph>
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
      newpassword: "",
      picture: ""
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
      .min(6, "Password must be 6 characters or longer"),
    newpassword: Yup.string()
      .trim("Your password should'nt include leading or trailing whitespace")
      .strict(false)
      .min(6, "Password must be 6 characters or longer")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    //TODO: send a request to db and check if the email already exists
    setTimeout(() => {
      if (values.email === "test@test.com") {
        setErrors({ email: "That email is already registered" });
      } else {
        console.log(values);
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
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
