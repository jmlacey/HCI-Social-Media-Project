import React from "react";
import "../../App.css";
import friend from "./friend.png";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: [],
      connectionstatus: "",

    };
  }

  componentDidMount() {
    this.loadFriends();
  }

  loadFriends() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          user_id: this.state.userid,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.connections) {
            this.setState({
              isLoaded: true,
              connections: result.connections,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  deleteFriend = (idForDelete) => {
    alert("delete friend called, deleting: " + idForDelete);
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "deleteConnections",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          connectionid: idForDelete,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert(
          "Deleted " +
            this.state.userid +
            " AKA " +
            idForDelete +
            " from your friends list! Hooray!"
        );
        this.setState({
          submitMessage: response.Status,
        });
      });
  };

  blockFriend = (idForBlocking) => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditConnections",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          connectionid: idForBlocking,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert("Blocked " + idForBlocking);
        this.setState({
          connectionstatus: "BLOCKED",
          submitMessage: response.Status,
        });
      });
  };

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
            {connections.map((connection) => (
              <div key={connection.connection_id} className="userlist">
                <img className="friendImg" alt="friendIcon" src={friend} />
                {"UserName: " + connection.name} -
                {"Status: " + connection.connection_status}
                {/* button for viewing profile */}
                <button
                  className="profileButton"
                  onClick={() => alert("not yet")}
                >
                  View
                </button>
                {/* button for deletion */}
                <button
                  className="profileButton"
                  onClick={() => this.deleteFriend(connection.connection_id)}
                >
                  Delete Friend
                </button>
                {/* button for blocking */}
                <button
                  className="profileButton"
                  onClick={() => this.blockFriend(connection.connection_id)}
                >
                  Block
                </button>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}
//{connection.name} - {connection.connection_status}
