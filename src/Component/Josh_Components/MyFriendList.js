import React from "react";
import "../../App.css";
import friend from "./friend.png";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: [],
      idForDelete: "",
    };
  }

  componentDidMount() {
    this.loadFriends();
    this.deleteFriend(this.state.idForDelete);
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

  deleteFriend(idForDelete) {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "deleteConnections",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          connectionid: this.state.idForDelete,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert(
          "Deleted " +
            this.state.user_id +
            " AKA " +
            this.state.idForDelete +
            " from your friends list! Hooray!"
        );
        this.setState({
          submitMessage: response.Status,
        });
      });
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
            {connections.map((connection) => (
              <div key={connection.connection_id} className="userlist">
                <img className="friendImg" alt="friendIcon" src={friend} />
                {"UserName: " + connection.name} -{connection.connection_status}
                {/* button for deletion */}
                <form className="profileButton">
                  <input type="submit" value={connection.connection_id}></input>
                </form>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}
//{connection.name} - {connection.connection_status}
