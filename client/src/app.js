import { Component } from "react";
import axios from "./axios";
import Logo from "./logo";
import Presentational from "./presentational";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user", this.state)
            .then(({ data }) => {
                // console.log("mountdata:", data);
                if (data.success) {
                    this.setState(data.success[0]);
                    // console.log("data.success:", data.success[0]);
                }
            })
            .catch((err) => {
                console.log("err in axios GET/ user:", err);
            });
    }

    toggleUploader() {
        console.log("toggleModal function is running!!!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInApp(arg) {
        console.log("Im running in App!!! and my argument is: ", arg);
    }

    render() {
        return (
            <div>
                <Logo />
                <Presentational
                    first={this.state.first_name}
                    last={this.state.last_name}
                    imageUrl={this.state.imageurl}
                />

                <h2 onClick={() => this.toggleUploader()}>
                    Click here!! Changing uploaderIsVisible state with a
                    method!!
                </h2>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        methodInApp={this.methodInApp}
                        // methodInApp={(arg) => this.methodInApp(arg)}
                        toggleModal={() => this.toggleModal()}
                    />
                )}
            </div>
        );
    }
}
