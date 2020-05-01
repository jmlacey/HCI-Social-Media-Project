import React from "react";
import "../../App.css";
import friend from "./friend.png";
//import friend button to use in render functions
import NewFriendButton from "./NewFriendButton.js";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: [],
      pendingConnections: [],
      blockedConnections: [],
      viewProfileActivated: "",

      //components of a connections profile
      username: "",
      firstname: "",
      lastname: "",
      file: null,

      //for profile picture
      profilePicURL: "",

      //for sleep points
      profilePoints: "",

      timeZone: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadFriends();
    this.loadPending();
    this.loadBlocked();
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }

  loadFriends() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          userid: this.state.userid,
          connectionstatus: "Active",
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

  loadBlocked() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          userid: this.state.userid,
          //only show pending users
          connectionstatus: "BLOCKED",
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.connections) {
            this.setState({
              isLoaded: true,
              blockedConnections: result.connections,
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

  loadPending() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          userid: this.state.userid,
          //only show pending users
          connectionstatus: "pending",
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.connections) {
            this.setState({
              isLoaded: true,
              pendingConnections: result.connections,
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
        alert("Deleted friend from your friends list! Hooray!");
        this.setState({
          submitMessage: response.Status,
        });
      });
  };

  blockFriend = (name, connectionid, connectuserid) => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditConnections",
          user_id: sessionStorage.getItem("user"),
          userid: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          connectionstatus: "BLOCKED",
          //need to pass these values in or else the connection gets overwritten.
          connectuserid: connectuserid,
          connectionid: connectionid,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert("Blocked friend from friend list");
        this.setState({
          submitMessage: response.Status,
        });
      });
  };
  acceptInvitation = (name, connectionid, connectuserid) => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditConnections",
          user_id: sessionStorage.getItem("user"),
          userid: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          connectionstatus: "Active",
          //need to pass these values in or else the connection gets overwritten.
          connectuserid: connectuserid,
          connectionid: connectionid,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert("Added " + name);
        this.setState({
          submitMessage: response.Status,
        });
        fetch(
          "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
          {
            method: "post",
            body: JSON.stringify({
              action: "addOrEditConnections",
              user_id: sessionStorage.getItem("user"),
              userid: connectuserid,
              session_token: sessionStorage.getItem("token"),
              connectionstatus: "Active",
              //need to pass these values in or else the connection gets overwritten.
              connectuserid: sessionStorage.getItem("user"),
            }),
          }
        )
          .then((response) => response.json())
          .then((response) => {
            alert("added users to both accounts");
            this.setState({
              submitMessage: response.Status,
            });
          });
      });
  };

  //get user by their userid
  viewProfile(userid) {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "POST",
        body: JSON.stringify({
          action: "getCompleteUsers",
          userid: userid,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //for profile pic
        let profilePicURL = "";
        response.users[0]["user_artifacts"].forEach(function (artifact1) {
          if (artifact1.artifact_type === "ProfilePic") {
            profilePicURL = artifact1.artifact_url;
          }
        });
        let timeZonePref = "";
        response.users[0]["user_prefs"].forEach(function (pref1) {
          if (pref1.pref_name === "TimeZone") {
            timeZonePref = pref1.pref_value;
          }
        });
        this.setState({
          viewProfileActivated: "true",
          firstname: response.users[0].first_name,
          lastname: response.users[0].last_name,
          username: response.users[0].username,
          profilePicURL: profilePicURL,
          profilePoints: response.users[0].status,
          timeZone: timeZonePref,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.viewProfileActivated !== "true"
          ? this.renderNotActivated()
          : this.openProfileRender()}
      </div>
    );
  }

  renderNotActivated() {
    const {
      error,
      isLoaded,
      connections,
      pendingConnections,
      blockedConnections,
    } = this.state;
    if (error) {
      return (
        <div>
          {" "}
          <NewFriendButton />
          Error: {error.message}{" "}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <body>
          <div>
            {" "}
            <NewFriendButton />
            You do not have any friends yet. Send a friend invitation above!{" "}
          </div>
          <div className="split right">
            {/* <div className="centered"> */}
            <h1>Friends:</h1>
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
                      onClick={() =>
                        this.viewProfile(connection.connect_user_id)
                      }
                    >
                      View
                    </button>
                    {/* button for deletion */}
                    <button
                      className="profileButton"
                      onClick={() =>
                        this.deleteFriend(connection.connection_id)
                      }
                    >
                      Delete Friend
                    </button>
                    {/* button for blocking */}
                    <button
                      className="profileButton"
                      onClick={() =>
                        this.blockFriend(
                          connection.name,
                          connection.connection_id,
                          connection.connect_user_id
                        )
                      }
                    >
                      Block
                    </button>
                  </div>
                ))}
                {blockedConnections.map((connection) => (
                  <div key={connection.connection_id} className="userlist">
                    <img className="friendImg" alt="friendIcon" src={friend} />
                    {"UserName: " + connection.name} -
                    {"Status: " + connection.connection_status}
                    {/* button for completely ignoring this fool */}
                    <button
                      className="profileButton"
                      onClick={() =>
                        this.deleteFriend(connection.connection_id)
                      }
                    >
                      Hide
                    </button>
                  </div>
                ))}
              </ul>
            </div>
            {/* </div> */}
          </div>

          <div className="split left">
            {/* <div className="centered"></div> */}
            <h1>Pending Invitations:</h1>
            <ul>
              {pendingConnections.map((connection) => (
                <div key={connection.connection_id} className="userlist">
                  <img className="friendImg" alt="friendIcon" src={friend} />
                  {"UserName: " + connection.name} -
                  {"Status: " + connection.connection_status}
                  {/* button for viewing profile */}
                  <button
                    className="profileButton"
                    onClick={() => this.viewProfile(connection.connect_user_id)}
                  >
                    View
                  </button>
                  {/* button for accept */}
                  <button
                    className="profileButton"
                    onClick={() =>
                      this.acceptInvitation(
                        connection.name,
                        connection.connection_id,
                        connection.connect_user_id
                      )
                    }
                  >
                    Accept
                  </button>
                  {/* button for ignore */}
                  <button
                    className="profileButton"
                    onClick={() => this.deleteFriend(connection.connection_id)}
                  >
                    Ignore
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </body>
      );
    } else {
      return (
        <div>
          <NewFriendButton />
          <body>
            <div className="split right">
              {/* <div className="centered"> */}
              <h1>Friends:</h1>
              <div className="post">
                <ul>
                  {connections.map((connection) => (
                    <div key={connection.connection_id} className="userlist">
                      <img
                        className="friendImg"
                        alt="friendIcon"
                        src={friend}
                      />
                      {"UserName: " + connection.name} -
                      {"Status: " + connection.connection_status}
                      {/* button for viewing profile */}
                      <button
                        className="profileButton"
                        onClick={() =>
                          this.viewProfile(connection.connect_user_id)
                        }
                      >
                        View
                      </button>
                      {/* button for deletion */}
                      <button
                        className="profileButton"
                        onClick={() =>
                          this.deleteFriend(connection.connection_id)
                        }
                      >
                        Delete Friend
                      </button>
                      {/* button for blocking */}
                      <button
                        className="profileButton"
                        onClick={() =>
                          this.blockFriend(
                            connection.name,
                            connection.connection_id,
                            connection.connect_user_id
                          )
                        }
                      >
                        Block
                      </button>
                    </div>
                  ))}
                  {blockedConnections.map((connection) => (
                    <div key={connection.connection_id} className="userlist">
                      <img
                        className="friendImg"
                        alt="friendIcon"
                        src={friend}
                      />
                      {"UserName: " + connection.name} -
                      {"Status: " + connection.connection_status}
                      {/* button for completely ignoring this fool */}
                      <button
                        className="profileButton"
                        onClick={() =>
                          this.deleteFriend(connection.connection_id)
                        }
                      >
                        Hide
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
              {/* </div> */}
            </div>

            <div className="split left">
              {/* <div className="centered"></div> */}
              <h1>Pending Invitations:</h1>
              <ul>
                {pendingConnections.map((connection) => (
                  <div key={connection.connection_id} className="userlist">
                    <img className="friendImg" alt="friendIcon" src={friend} />
                    {"UserName: " + connection.name} -
                    {"Status: " + connection.connection_status}
                    {/* button for viewing profile */}
                    <button
                      className="profileButton"
                      onClick={() =>
                        this.viewProfile(connection.connect_user_id)
                      }
                    >
                      View
                    </button>
                    {/* button for accept */}
                    <button
                      className="profileButton"
                      onClick={() =>
                        this.acceptInvitation(
                          connection.name,
                          connection.connection_id,
                          connection.connect_user_id
                        )
                      }
                    >
                      Accept
                    </button>
                    {/* button for ignore */}
                    <button
                      className="profileButton"
                      onClick={() =>
                        this.deleteFriend(connection.connection_id)
                      }
                    >
                      Ignore
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </body>
        </div>
      );
    }
  }

  openProfileRender() {
    alert("viewing profile");
    return (
      <div>
        <div className="profilePicture img">
          {/* This displays the default Alan profile Pic */}
          <img img src={this.state.profilePicURL} />
        </div>
        <div className="viewProfileText">
          <p>Username: {this.state.username} </p>

          <p>First Name: {this.state.firstname} </p>

          <p>Last Name: {this.state.lastname} </p>

          <p>Time Zone: {this.state.timeZone} </p>
          <p>Sleepy Score: {this.state.profilePoints} </p>
          <p>(The higher the sleepy score, the better.)</p>
        </div>
        <button
          className="profileButton leftCol1"
          onClick={() => this.setState({ viewProfileActivated: "false" })}
        >
          Exit
        </button>
      </div>
    );
  }
}
