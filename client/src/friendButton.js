import { Component } from "react";
import axios from "./axios";

export default class FriendButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnTxt: "",
        };

        console.log("props in FriendButton: ", props);
    }

    componentDidMount() {
        // console.log("this.props.id: ", this.props.id);
        axios.get("/api/user/" + this.props.id).then(({ data }) => {
            console.log("data.success", data.success);

            if (data.success == []) {
                this.setState({ btnTxt: "Make Friend Request" });
            } else if (data.success == true) {
                this.setState({ btnTxt: "End Friendship" });
            } else if (data.success == false) {
                this.setState({ btnTxt: "Cancel Friend Request" });
            }
        });
    }

    render() {
        return (
            <div>
                <button className="regButton">{this.state.btnTxt}</button>
            </div>
        );
    }
}
