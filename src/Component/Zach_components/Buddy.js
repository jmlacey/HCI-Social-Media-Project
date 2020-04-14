import React from "react"

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: []
    }
  }

  state = {}

  componentDidMount() {
    this.loadBuddies();
  }

  loadBuddies() {
    fetch("http://stark.cse.buffalo.edu/cse410/reactioneers/connectioncontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getConnections"
        // action: "getUserArtifacts",    Will implement once profile is working
        // artifacttype: "sleepTime",
        // artifacttype: "wakeTime",
        // artifacttype: "timeZone",
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.connections) {
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
        <ul className="buddyList">
            {connections.map(connection => (
              <button key={connection.connection_id} className="buddyButtons">
                {connection.name} - {connection.connection_status}
              </button>
            ))}
        </ul>
      );
    }
  }
}