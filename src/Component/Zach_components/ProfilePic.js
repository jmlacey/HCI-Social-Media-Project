import React, { Component } from "react";

export default class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            profileId: "",
            profilePicURL: ""
        };
    }
    componentDidMount() {
        //Make a fetch call that grabs the three states and fills in the text boxes.

        fetch(
            "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
            {
                method: "post",
                body: JSON.stringify({
                    action: "getCompleteUsers",
                    userid: sessionStorage.getItem("user"),
                }),
            }
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                        // try and make the form component uncontrolled, which plays havoc with react

                    });
                },
                (error) => {
                    alert("error!");
                }
            );
    }

    uploadPicture = () => {
        //Make a fetch call that grabs the three states and fills in the text boxes.

        fetch(
            "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
            {
                method: "post",
                body: JSON.stringify({
                    action: "getCompleteUsers",
                    userid: sessionStorage.getItem("user"),
                }),
            }
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                        // try and make the form component uncontrolled, which plays havoc with react

                    });
                },
                (error) => {
                    alert("error!");
                }
            );
    }

    uploadedPic = React.useRef(null);

    uploadPicHandler = event => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = this.uploadedPic;
            current.file = file;
            reader.onload = event => {
                current.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.UploadPicure}>
                    <input type="file" onChange={this.uploadPicHandler} mulitple="false" />
                    <img ref={this.uploadedPic}></img>
                </form>
            </div>
        );
    }




}