import React from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

import Loader from "../Elements/Loader";

const withSocket = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      const {
        match: {
          params: { sessionId }
        }
      } = this.props;

      this.state = {
        isLoading: true,
        likes: [],
        data: {
          sessionId: null,
          presentation: {
            name: "No presentation name?",
            description: "No description?"
          },
          status: {
            hasStarted: false,
            hasEnded: false,
            isPaused: false,
            time: 0
          },
          engagement: {
            average: 0,
            positive: 50,
            negative: 50
          },
          impressions: 0,
          likes: 0,
          attendees: 0
        }
      };
      this.counter = 0;
      this.sessionId = sessionId;
      this.socket = io(process.env.REACT_APP_API_BASE_URL);
      this.startSession = this.startSession.bind(this);
      this.stopSession = this.stopSession.bind(this);
      this.pauseSession = this.pauseSession.bind(this);
      this.requestSave = this.requestSave.bind(this);
      this.switchData = this.switchData.bind(this);
      this.handleBalloonDelete = this.handleBalloonDelete.bind(this);
      this.listenForEvents = this.listenForEvents.bind(this);
    }

    componentDidMount() {
      this.socket.on("connect", socket => {
        fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/session/${
            this.sessionId
          }/${this.socket.id}`,
          {
            credentials: "include"
          }
        )
          .then(res => res.json())
          .then(res => {
            if (res.success) {
              this.socket.emit("joinSession", this.sessionId);
            } else {
              this.setState({
                shouldRedirect: true,
                isLoading: false
              });
            }

            this.listenForEvents();
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              shouldRedirect: true
            });
          });
      });
    }

    listenForEvents() {
      this.socket.on("updateHost", data => {
        this.setState({
          isLoading: false,
          data: data
        });
      });

      this.socket.on("sendLike", data => {
        this.setState(
          {
            likes: [
              {
                startPos: `${this.setRandomStartPosition()}%`,
                key: this.counter
              },
              ...this.state.likes
            ]
          },
          () => {
            this.counter++;
          }
        );
      });
    }

    setRandomStartPosition() {
      return Math.floor(Math.random() * 100);
    }

    sessionTimer() {
      setInterval(() => {
        if (!this.state.data.status.isPaused) {
          this.setState({
            data: {
              ...this.state.data,
              status: {
                ...this.state.data.status,
                time: (this.state.data.status.time += 1)
              }
            }
          });
        }
      }, 1000);
    }

    updateSession() {
      this.socket.emit("presenterPayload", {
        session: this.sessionId,
        payload: this.state.data
      });
    }

    startSession() {
      this.setState(
        {
          data: {
            ...this.state.data,
            status: {
              ...this.state.data.status,
              hasStarted: true
            }
          }
        },
        this.updateSession
      );
      this.sessionTimer();
    }

    stopSession() {
      this.setState(
        {
          data: {
            ...this.state.data,
            status: {
              ...this.state.data.status,
              hasEnded: true
            }
          }
        },
        this.updateSession
      );
    }

    pauseSession() {
      this.setState(
        {
          data: {
            ...this.state.data,
            status: {
              ...this.state.data.status,
              isPaused: !this.state.data.status.isPaused
            }
          }
        },
        this.updateSession
      );
    }

    getPercentageFromAvg(avg) {
      return Math.round((avg + 5) / 10 * 100);
    }

    requestSave(time) {
      this.socket.emit("presenterRequestsSave", {
        sessionId: this.state.data.sessionId,
        timeStamp: time,
        currentTime: Date.now(),
        likes: this.state.likes.length,
        attendees: this.state.data.attendees,
        value: this.state.data.engagement,
        impressions: this.state.data.impressions
      });
    }

    handleBalloonDelete(id) {
      this.setState({
        likes: this.state.likes.filter(like => like.key !== id)
      });
    }

    switchData() {
      this.setState(
        {
          data: {
            ...this.state.data,
            status: {
              ...this.state.data.status,
              isAverage: !this.state.data.status.isAverage
            }
          }
        },
        this.updateSession
      );
    }

    render() {
      if (this.state.isLoading) return <Loader fillColor="dawn" size="large" />;

      if (this.state.shouldRedirect) return <Redirect to="/" />;

      return (
        <WrappedComponent
          startSession={this.startSession}
          stopSession={this.stopSession}
          pauseSession={this.pauseSession}
          updateSession={this.updateSession}
          getPercentageFromAvg={this.getPercentageFromAvg}
          switchData={this.switchData}
          requestSave={this.requestSave}
          handleBalloonDelete={this.handleBalloonDelete}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
};

export default withSocket;
