import { Component } from "react";
import axios from "./axios";
// import Logo from "./logo";
import Presentational from "./presentational";
import Uploader from "./uploader";
import Profile from "./profile";
// import {Browser Router}
// import OtherProfile from

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        // console.log("App mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                // console.log("data", data);
                // console.log("data.success[0]", data.success[0]);
                if (data.success[0]) {
                    this.setState({
                        first: data.success[0].first_name,
                        last: data.success[0].last_name,
                        imageUrl: data.success[0].imageurl,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios GET/ user:", err);
            });
    }

    toggleUploader() {
        // console.log("toggleModal function is running!!!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateImgUrlApp(imageUrl) {
        console.log("Im running in App!!! and my argument is: ", imageUrl);
        this.setState({ imageUrl: imageUrl });
    }

    render() {
        return (
            // <BrowserRouter>
            <div>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    toggleUploader={() => this.toggleUploader()}
                />
                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    toggleUploader={() => this.toggleUploader()}
                />

                {/* <Route exact path="/" component={Profile}/> //this is only if you do not passs any props// */}
                {/* <Route exact path="/" render={() =>{
                            Profile....
                    }}> */}

                {/* <Route path='/user/:id' 
                    render={(props) => (
                    <OtherProfile
                    key={props.match.url}
                    match={props.match}
                    history={props.history}
                    />
                    )} 
                    /> */}

                {this.state.uploaderIsVisible && (
                    <Uploader
                        updateImgUrlApp={(imageUrl) =>
                            this.updateImgUrlApp(imageUrl)
                        }
                        toggleUploader={() => this.toggleUploader()}
                    />
                )}
            </div>
            // /* </BrowserRouter> */
        );
    }
}
