import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            step: 1,
            // step: 2,
            // step: 3,
        };
    }

    handleClick() {
        axios
            .post("/reset", this.state)
            .then(({ data }) => {
                console.log("data:", data);
                if (data.success === true) {
                    location.replace("/reset");
                } else if (data.success === false) {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST/ registration:", err);
            });
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this state after setState:", this.state)
        );
    }
    render() {
        return (
            <div>
                <h1 className="headerTop">C.A.T.P.S.T.E.R</h1>
                <p className="headerBottom">
                    We Always Celebrate Caturday in Berlin
                </p>
                {this.state.error && (
                    <h2 className="errorMsg">
                        Sorry, something went wrong.Please check your
                        information!
                    </h2>
                )}
                {this.state.step == 1 && (
                    <div className="userForm">
                        <input
                            className="regInputs"
                            name="email"
                            placeholder="email"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            className="regButton"
                            onClick={() => this.handleClick()}
                        >
                            Reset Password
                        </button>
                    </div>
                )}
                {this.state.step == 2 && (
                    <div className="userForm">
                        <input
                            className="regInputs"
                            name="code"
                            placeholder="security code"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            className="regInputs"
                            name="new passsword"
                            placeholder="new passsword"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            className="regButton"
                            onClick={() => this.handleClick()}
                        >
                            Submit
                        </button>
                    </div>
                )}
                {this.state.step == 3 && (
                    <Link className="loginMsg" to="/login">
                        You can now log in with your new password!
                    </Link>
                )}
            </div>
        );
    }
}
