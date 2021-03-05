import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        //method 1 - binding
        //method 2 = arrow function
    }

    handleChange(e) {
        console.log("change is running");
        console.log("e.target.value:", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
                // first: e.target.value, // first refers the first input
                //set state is async
            },
            () => console.log("this state:", this.state)
        );
    }
    // console.log("this state:", this.state);
    // so be careful that
    //this console.log can be run before this.state statement done.

    handleClick() {
        console.log("clicked");
        // axios
        //     .post("/registration", this.state)
        //     .then(({ data }) => {
        //         if ("everthing went well") {
        //             //redirect
        //             location.replace("/blabla");
        //         } else {
        //             //render an error message
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("err in axios POST/ registration:", err);
        //     });
        //we need talk to server at this point
        //because user will press the submit button
        //and we need to send the data that we get from the user to the server
    }

    render() {
        return (
            <div>
                <h1>Registration</h1>
                {this.state.error && <p>something went wrong</p>}
                <input
                    name="first"
                    placeholder="first"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.handleClick()}>Submit</button>
            </div>
        );
    }
}
