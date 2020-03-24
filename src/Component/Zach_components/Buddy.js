import React from "react"
import { render } from "@testing-library/react";

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      timeConnections: []
    }
  }

  state = {}

  loadBuddies() {
    fetch("http://stark.cse.buffalo.edu/hci/timeConnectionController.php", {
      method: "post",
      body: JSON.stringify({
        action: "getBuddies",
        user_id: this.state.userid
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.timeConnections) {
            this.setState({
              isLoaded: true,
              timeConnections: result.timeConnections
            });
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, connections } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="post">
          <ul>
            {timeConnections.map(connection => (
              <button className="buddies" key={connection.connection_id}>
                {connection.name} - {connection.connection_status}
              </button>
            ))}
          </ul>
        </div>
      );
    }
  }
}