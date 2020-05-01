import React from "react";
import "../../App.css";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      connectionID: "",
      idForDelete: "",
      typingMessage: "",
      submitMessage: "",

      userid: props.userid,
      connections: [],
    };
  }
  userNameToID() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "POST",
        body: JSON.stringify({
          action: "getUsers",
          username: this.state.userName,
        }),
      }
    )
      .then((response) => response.json())
      .then(
        (response) => {
          if(response.users === undefined){
  
          }
          else {
            console.log(response.users);
          this.setState({
            connectionID:
              response.users.length > 0 ? response.users[0].user_id : "",
          });
        }
          if (this.state.connectionID !== "") {
            this.addFriend();
          } else {
            alert("Not a valid user! Please Enter a valid username!");
          }
        },
        (error) => {
          alert("error!");
        }
      );
  }

  addFriend() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/connectioncontroller.php",
      {
        method: "POST",
        body: JSON.stringify({
          action: "addOrEditConnections",
          user_id: sessionStorage.getItem("user"), //always me
          userid: this.state.connectionID,
          session_token: sessionStorage.getItem("token"),
          connectuserid: sessionStorage.getItem("user"),
          connectionstatus: "pending",
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        alert(
          "Sent " +
            this.state.userName +
            " an invitation! Hooray!"
        );
        this.setState({
          submitMessage: response.Status,
        });
      });
  }

  addFriendButton = (event) => {
    event.preventDefault();
    this.userNameToID();
  };

  changeInputState = (event) => {
    this.setState({ userName: event.target.value });

    if (event.target.value === "") {
      this.setState({ typingMessage: "" });
    } else {
      this.setState({
        typingMessage: "Add " + event.target.value + " to your friends list!",
      });
    }
  };
  render() {
    return (
      <div className="centeredCol">
        <form onSubmit={this.addFriendButton}>
          <h1>{this.state.typingMessage}</h1>
          <input
            type="text"
            placeholder="Enter a name to add here!"
            onChange={this.changeInputState}
          />
          <input type="submit" value="Add Friend!" />
        </form>
      </div>
    );
  }
}
