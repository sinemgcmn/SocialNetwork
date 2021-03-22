import { Component } from "react";
import axios from "./axios";

export default class FriendButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnTxt: "Make Friend Request",
        };

        console.log("props in FriendButton: ", props);
    }

    componentDidMount() {
        console.log("this.props.id: ", this.props.id);
        axios
            .get("/api/user/" + this.props.id)
            .then(({ data }) => {
                console.log("data.success", data.success);
                if (data.success == []) {
                    this.setState({ btnTxt: "Make Friend Request" });
                }
                if (data.success[0].accepted == true) {
                    if (data.success[0].sender_id) {
                        this.setState({ btnTxt: "End Friendship" });
                        if (data.success[0].recipient_id) {
                            this.setState({ btnTxt: "End Friendship" });
                        }
                    }
                }
                if (data.success[0].accepted == false) {
                    console.log("friendsbug", data.success[0]);
                    if (
                        data.success[0].sender_id ==
                        data.success[0].loggedInUser
                    ) {
                        this.setState({ btnTxt: "Cancel Friend Request" });
                    }
                    if (
                        data.success[0].recipient_id ==
                        data.success[0].loggedInUser
                    ) {
                        this.setState({
                            btnTxt: "Accept Friend Request",
                        });
                    }
                }
            })
            .catch(function (err) {
                console.log("error from post req", err);
            });
    }

    sendRequestButton() {
        axios
            .post("/api/user/" + this.props.id, { btnTxt: this.state.btnTxt })
            .then(({ data }) => {
                console.log("sendButtonRequest:", data);
                this.setState({ btnTxt: data.success });
            })
            .catch(function (err) {
                console.log("error from post req", err);
            });
    }

    handleChange(e) {
        this.setState(
            {
                btnTxt: e.target.value,
            },
            () => console.log("this state after setState:", this.state)
        );
    }

    render() {
        return (
            <div>
                <button
                    onClick={() => this.sendRequestButton()}
                    onChange={(e) => this.handleChange(e)}
                    className="friendButtonOtherProfile"
                >
                    {this.state.btnTxt}
                </button>
            </div>
        );
    }
}
