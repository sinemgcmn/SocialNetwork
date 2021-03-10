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

    methodInUploader() {
        // console.log('running method in uploader');
        this.props.methodInApp("whoaaaa");
    }

    render() {
        return (
            <div>
                <h2 className="uploader-text">
                    This is my uploader component!
                </h2>

                <h2 onClick={() => this.methodInUploader()}>
                    Click here to run method in uploader!
                </h2>
            </div>
        );
    }
}
