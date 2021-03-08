import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Header from "./header";
import Footer from "./footer";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>my main page of website</p>;
}

ReactDOM.render(elem, document.querySelector("main"));
ReactDOM.render(<Header />, document.querySelector("header"));
ReactDOM.render(<Footer />, document.querySelector("footer"));
