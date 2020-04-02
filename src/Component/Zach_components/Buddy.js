import React from "react"
//import { render } from "@testing-library/react";

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: []
    }
  }

  state = {}

  componentDidMount(){
    this.loadBuddies();
  }

  loadBuddies() {
    fetch("http://stark.cse.buffalo.edu/hci/connectioncontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getConnections"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.Connections) {
            this.setState({
              isLoaded: true,
              connections: result.connections
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
              <button className="availableBuddies" key={connection.connection_id}>
                {connection.name} - {connection.connection_status}
              </button>
            ))}
          </ul>
        </div>
      );
    }
  }
}