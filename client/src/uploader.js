import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log("props in Uploader: ", props);
    }

    componentDidMount() {
        console.log("uploader mounted!");
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this state after setState:", this.state)
        );
    }

    updateImgUrl(url) {
        var formData = new FormData();
        formData.append("file", this.file);
        axios
            .post("/upload", formData)
            .then(function (response) {
                console.log("response");
                console.log("response from post req: ", response);
            })
            .catch(function (err) {
                console.log("error from post req", err);
            });
        this.props.updateImgUrl(url);
    }

    render() {
        return (
            <div>
                <div className="uploader-text">
                    <h1 onClick={() => this.toggleUploader()}>X</h1>
                    <h2>Want to change your image?</h2>
                    <form>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            type="file"
                            name="file"
                            accept="image/*"
                        />
                        <button
                            className="regButton"
                            onClick={(e) => this.updateImgUrl(e)}
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
