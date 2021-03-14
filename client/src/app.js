import { Component } from "react";
import axios from "./axios";
import Presentational from "./presentational";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            bio: "",
            id: "",
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                console.log("app", data);
                if (data.success[0]) {
                    this.setState({
                        first: data.success[0].first_name,
                        last: data.success[0].last_name,
                        imageUrl: data.success[0].imageurl,
                        bio: data.success[0].bio,
                        id: data.success[0].id,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios GET/ user:", err);
            });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateImgUrlApp(imageUrl) {
        console.log("Im running in App!!! and my argument is: ", imageUrl);
        this.setState({ imageUrl: imageUrl });
    }

    updateBio(bio) {
        console.log("Im updating Biooooo!!!!");
        this.setState({ bio: bio });
    }

    render() {
        return (
            <div>
                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    toggleUploader={() => this.toggleUploader()}
                />

                <Profile
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    toggleUploader={() => this.toggleUploader()}
                    bio={this.state.bio}
                    updateBio={() => this.updateBio()}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader
                        updateImgUrlApp={(imageUrl) =>
                            this.updateImgUrlApp(imageUrl)
                        }
                        toggleUploader={() => this.toggleUploader()}
                        updateBio={(bio) => this.updateBio(bio)}
                    />
                )}
            </div>
        );
    }
}
