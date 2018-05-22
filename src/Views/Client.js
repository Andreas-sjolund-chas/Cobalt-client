import React from "react";
import { Redirect } from "react-router-dom";
import { css, withStyles } from "../withStyles";

import { handleResponse } from "../redux/utils/utils";

import Button from "../Elements/Button";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";
import Loader from "../Elements/Loader";
import FlexContainer from "../Containers/FlexContainer";
import VoteSlider from "../Components/VoteSlider";

import balloon from "../assets/balloon.svg";

import io from "socket.io-client";
const withSocket = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: {
          status: {
            hasStarted: false
          }
        },
        fireRedirect: false,
        windowSize: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        isLoading: true,
        doesNotExist: undefined
      };

      const {
        match: {
          params: { sessionId }
        }
      } = this.props;

      this.handleClick = this.handleClick.bind(this);
      this.handleLike = this.handleLike.bind(this);
      this.preventBounce = this.preventBounce.bind(this);

      this.sessionId = sessionId;
      this.socket = io(process.env.REACT_APP_API_BASE_URL);
    }

    componentWillMount() {
      fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/session/${this.sessionId}`
      )
        .then(handleResponse)
        .then(res => {
          this.setState({
            data: {
              status: {
                ...this.state.data.status,
                hasEnded: res.presentation.hasEnded
              }
            },
            doesNotExist: false,
            isLoading: false
          });
        })
        .catch(err => {
          this.setState({
            doesNotExist: true,
            isLoading: false
          });
        });

      this.updateWindowSize();
      this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    componentDidMount() {
      this.socket.on("connect", () => {
        this.socket.emit("joinSession", this.sessionId);
      });

      //  Bounces
      // NOTE: This will break any other type of scrolling for touch devices if not configured properly
      // TODO: Check client type (navigator.userAgent somehow, if mobile and IOS safari -> do this)
      window.addEventListener("touchmove", this.preventBounce);

      window.addEventListener("resize", this.updateWindowSize);

      this.listenForEvents();
    }

    preventBounce(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    updateWindowSize() {
      this.setState({
        ...this.state,
        windowSize: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    }

    listenForEvents() {
      this.socket.on("updateClient", data => {
        this.setState({
          data: data
        });
      });
    }

    handleLike = () => {
      this.socket.emit("attendeeLike", {
        session: this.sessionId,
        payload: {
          type: "like"
        }
      });
    };

    handleVote = value =>
      this.socket.emit("attendeePayload", {
        session: this.sessionId,
        payload: {
          engagement: value
        }
      });

    handleClick = () => {
      this.setState({ fireRedirect: true });
    };

    render() {
      if (this.state.isLoading) {
        return <Loader />;
      }

      if (this.state.fireRedirect || this.state.doesNotExist) {
        return <Redirect to={"/"} />;
      }

      return (
        <WrappedComponent
          handleVote={this.handleVote}
          handleClick={this.handleClick}
          handleLike={this.handleLike}
          data={this.state.data}
          windowSize={this.state.windowSize}
          {...this.props}
        />
      );
    }
  };
};

const Client = ({
  data,
  handleVote,
  handleClick,
  windowSize,
  styles,
  ...props
}) => {
  if (data.status.hasEnded) {
    return (
      <div {...css(styles.message)}>
        <FlexContainer flex="1" align="center" justify="center">
          <Heading size="2">The session has ended</Heading>
          <Paragraph>Thank you for participating</Paragraph>
          <Button onClick={handleClick} appearance="secondary">
            LEAVE SESSION
          </Button>
        </FlexContainer>
      </div>
    );
  }

  if (!data.status.hasStarted) {
    return (
      <div {...css(styles.message)}>
        <FlexContainer flex="1" align="center" justify="center">
          <Heading size="2" style={{ textAlign: "center" }}>
            Waiting for host to start session
          </Heading>
          <div {...css(styles.spinner)}>
            <Loader fillColor="nightsky" />
          </div>
        </FlexContainer>
      </div>
    );
  }

  if (data.status.isPaused && !data.status.hasEnded) {
    return (
      <div {...css(styles.message)}>
        <FlexContainer flex="1" align="center" justify="center">
          <Heading size="2" style={{ textAlign: "center" }}>
            This session is currently paused
          </Heading>
          <Paragraph>Wait for the host to resume the session</Paragraph>
        </FlexContainer>
      </div>
    );
  }

  return (
    <div
      {...css(styles.client)}
      style={{
        height: windowSize.width < 420 ? "0px" : "100%",
        position: windowSize.width < 420 ? "fixed" : ""
      }}
    >
      <span {...css(styles.likeButton)} onClick={props.handleLike}>
        {" "}
        <img src={balloon} width="48px" />
      </span>
      <FlexContainer
        justify="center"
        align="center"
        style={{ height: windowSize.width < 420 ? "" : "100vh" }}
      >
        <FlexContainer>
          {windowSize.width > 420 ? (
            <div>
              <Heading appearance="primary" size="2">
                {data.presentation.name}
              </Heading>
              <Heading appearance="primary" size="3">
                {data.presentation.description}
              </Heading>
              <Paragraph appearance="white">{data.status.time}</Paragraph>
            </div>
          ) : (
            ""
          )}
          <FlexContainer align="start" style={{ position: "relative" }}>
            <Paragraph
              appearance="danger"
              style={{
                position: "absolute",
                zIndex: "10",
                top: "5px",
                right: "10px"
              }}
            >
              {data.engagementDescription.up}
            </Paragraph>
            <VoteSlider handleVote={handleVote} />
            <Paragraph
              appearance="success"
              style={{
                marginTop: "12px",
                marginBottom: "0px",
                position: "absolute",
                zIndex: "10",
                bottom: "5px",
                right: "10px"
              }}
            >
              {data.engagementDescription.down}
            </Paragraph>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
};

const ClientWithSocket = withSocket(Client);

export default withStyles(({ themes, colors, shadow }) => {
  return {
    client: {
      backgroundColor: colors.nightsky,
      touchAction: "none"
    },
    waitingForHost: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      backgroundColor: colors.nightsky,
      animation: "fade 0.5s ease",
      willChange: "transform, opacity"
    },
    message: {
      display: "flex",
      padding: "0px 20px",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      height: "100vh",
      backgroundColor: colors.sand,
      animation: "fade 0.5s ease",
      willChange: "transform, opacity"
    },
    likeButton: {
      display: "block",
      padding: "10px",
      borderRadius: "50%",
      backgroundColor: colors.carbon,
      color: "white",
      position: "absolute",
      zIndex: "999",
      left: "25px",
      top: "25px",
      cursor: "pointer",
      overflow: "hidden",
      boxShadow: shadow.shadow,
      transition: "transform 0.3s ease",
      ":hover": {
        transform: "scale(1.05)"
      },
      ":nth-child(1n) img": {
        animation: "sway 3s ease infinite"
      }
    },
    spinner: {
      ":nth-child(1n) span": {
        fontSize: "70px"
      }
    }
  };
})(ClientWithSocket);
