import React from "react";
import { css, withStyles } from "../withStyles";

import FlexContainer from "../Containers/FlexContainer";
import Modal from "./Modal";
import Button from "../Elements/Button";
import Icon from "../Elements/Icon";
import Loader from "../Elements/Loader";

class Wizard extends React.Component {
  constructor({ styles, handleSubmit = null, ...props }) {
    super(props);
    this.state = {
      currentPage: 0
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nextPage(e) {
    e.preventDefault();
    this.state.currentPage < this.props.children.length - 1
      ? this.setState({ currentPage: this.state.currentPage + 1 })
      : this.setState({ currentPage: 0 });
  }

  previousPage(e) {
    e.preventDefault();
    this.state.currentPage > 0
      ? this.setState({ currentPage: this.state.currentPage - 1 })
      : this.setState({ currentPage: 0 });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.props.handleSubmit(data);
  }

  render() {
    return (
      <div {...css(this.props.styles.wizard)} {...this.props}>
        <form onSubmit={this.handleSubmit}>
          <Modal withOverlay>
            <FlexContainer
              align="end"
              style={{
                width: "100%",
                position: "absolute",
                top: "12px",
                right: "12px"
              }}
            >
              <Icon
                icon="fas fa-times"
                fillColor="white"
                style={{
                  borderRadius: "2px",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                {...css(this.props.styles.closeModal)}
              />
            </FlexContainer>
            {this.props.children.map((child, i) => (
              <li
                key={i}
                style={{
                  display: i === this.state.currentPage ? "flex" : "none"
                }}
              >
                {child}
              </li>
            ))}
            <FlexContainer
              direction="row"
              justify={this.state.currentPage === 0 ? "end" : "between"}
              style={{ width: "100%" }}
            >
              {this.state.currentPage > 0 ? (
                <Button
                  onClick={this.previousPage}
                  appearance="secondary"
                  style={{
                    marginBottom: "0px"
                  }}
                >
                  BACK
                </Button>
              ) : (
                ""
              )}
              <Button
                onClick={
                  this.state.currentPage === this.props.children.length - 1
                    ? ""
                    : this.nextPage
                }
                appearance="secondary"
                style={{
                  marginBottom: "0px"
                }}
              >
                {this.props.isLoading ? (
                  <Loader size="small" {...css(this.props.styles.spinner)} />
                ) : this.state.currentPage ===
                this.props.children.length - 1 ? (
                  `SUBMIT - ${this.state.currentPage + 1} / ${
                    this.props.children.length
                  }`
                ) : (
                  `NEXT - ${this.state.currentPage + 1} / ${
                    this.props.children.length
                  }`
                )}
              </Button>
            </FlexContainer>
          </Modal>
        </form>
      </div>
    );
  }
}

export default withStyles(({ colors, themes }) => {
  return {
    wizard: {
      ":nth-child(1) a > span": {
        backgroundColor: colors.carbon,
        ":hover": {
          backgroundColor: colors.nightsky
        }
      }
    },
    closeModal: themes.danger
  };
})(Wizard);
