import React from "react";

import { withFormik } from "formik";
import Yup from "yup";

import FlexContainer from "../Containers/FlexContainer";
import Paragraph from "../Elements/Paragraph";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import Loader from "../Elements/Loader";

class AddMember extends React.Component {
  constructor(
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    isSubmitting,
    props
  ) {
    super(props);
  }

  render() {
    const {
      handleChange,
      handleSubmit,
      values,
      errors,
      touched,
      handleBlur,
      isSubmitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Paragraph style={{ marginTop: "20px" }}>Add new member</Paragraph>
        <FlexContainer direction="row">
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
            style={{ marginLeft: 0 }}
          />
          <Button style={{ marginLeft: "20px" }}>
            {isSubmitting ? <Loader /> : "ADD"}
          </Button>
        </FlexContainer>
        <FlexContainer align="start" style={{ minHeight: "20px" }}>
          {errors.email &&
            touched.email && (
              <Paragraph appearance="danger" size="sub">
                {errors.email}
              </Paragraph>
            )}
        </FlexContainer>
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues(props) {
    return {
      email: "",
      workspaceId: props.data._id
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required")
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    setSubmitting(true);

    props.handleAddMemberSubmit(values);
    resetForm();
    setSubmitting(false);
  }
})(AddMember);
