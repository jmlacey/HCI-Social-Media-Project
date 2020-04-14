import React from "react";
import "../../App.css";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      connectionID: "",
      typingMessage: "",
      submitMessage: "",

      userid: props.userid,
      connections: [],
    };
  }

  componentDidMount() {
    //this.addFriend();
  }

  userNameToID = (event) => {
alert("this is a test");
alert("to pass the test, all of the 3 alerts must go off >:) I hope you survive.");
    fetch("http://stark.cse.buffalo.edu/hci/userController.php", {
      method: "POST",
      body: JSON.stringify({
        action: "getUsers",
        username: event.target.value,
      }),
    })
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({
            connectionID: response.Users[0],
          });
        },
        (error) => {
          alert("error!");
        }
      );
  };

  addFriend() {
    fetch("http://stark.cse.buffalo.edu/hci/connectioncontroller.php", {
      method: "POST",
      body: JSON.stringify({
        action: "addOrEditConnections",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        connectuserid: this.state.connectionID,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          submitMessage: response.Status,
        });
      });
  }

  addFriendButton = (event) => {
    this.userNameToID();

    this.addFriend();

    event.preventDefault();
    alert("Added " + this.state.userName + " to your friends list! Hooray!");
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
      <form onSubmit={this.addFriendButton}>
        <h1>{this.state.typingMessage}</h1>
        <input
          type="text"
          placeholder="Enter a name to add here!"
          onChange={this.changeInputState}
        />
        <input type="submit" className="element_link" value="Add Friend!" />
      </form>
    );
  }
}
