import axios from "./axios";
import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bioDraft: "",
            btnTxt: "",
            editModeIsOn: false,
        };
        console.log("props in BioEditor: ", props);
    }

    componentDidMount() {
        // console.log("grandchild just mounted");
        console.log("props in grandchild", this.props);
        if (this.props.bio) {
            this.setState({
                btnTxt: "edit",
            });
        } else {
            this.setState({
                btnTxt: "add",
            });
        }
    }

    updateBioinEditor() {
        console.log(this.state.bioDraft);
        axios.post("/bio", this.state.bioDraft).then((response) => {
            console.log("datafromupdateBioinEditor:", response);
            if (response.data.success) {
                this.setState({
                    bio: this.state.bioDraft,
                });
                this.props.updateBio(this.state.bioDraft);
            }
        });
    }

    handleChange(e) {
        this.setState(
            {
                bioDraft: e.target.value,
            },
            () => console.log("this state after setState:", this.state)
        );
    }

    toggleBioEditor() {
        this.setState({
            editModeIsOn: !this.state.editModeIsOn,
        });
    }

    render() {
        return (
            <>
                <h2>{this.props.bio}</h2>
                {!this.state.editModeIsOn && (
                    <button
                        onClick={() => this.toggleBioEditor()}
                        onChange={(e) => this.handleChange(e)}
                        className="regButton"
                    >
                        {this.state.btnTxt}
                    </button>
                )}

                {this.state.editModeIsOn && (
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    />
                )}

                {this.state.editModeIsOn && (
                    <button
                        className="regButton"
                        onChange={(e) => this.handleChange(e)}
                        onClick={(e) => this.updateBioinEditor(e)}
                    >
                        Save
                    </button>
                )}
            </>
        );
    }
}
