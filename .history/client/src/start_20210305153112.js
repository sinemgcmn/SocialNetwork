import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;
if (location.pathname === "./welcome") {
    elem = <Welcome />;
} else {
    elem = <p> my main page of website</p>;
}

//this React can only render ONE component but the component like welcome
//can have many components so welcome will render registration as its child
ReactDOM.render(<Welcome />, document.querySelector("main")); /// it is res. for handling my react code to show users.
