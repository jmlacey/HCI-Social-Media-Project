import React from "react";
import "../../App.css";

export default class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: [],
    };
  }

  componentDidMount() {
    this.addFriend();
  }

  addFriend() {
    fetch("http://stark.cse.buffalo.edu/hci/connectioncontroller.php", {
      method: "POST",
      body: JSON.stringify({
        action: "addOrEditConnections",
        userid: "id",
        connectuserid: "id",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  }

  render() {
    return (
      <button className="element_link" onClick={(e) => this.addFriend}>
        Add Friend
      </button>
    );
  }
}
