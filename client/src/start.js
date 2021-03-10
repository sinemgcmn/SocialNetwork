import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./logo";
import App from "./app";
import Footer from "./footer";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    elem = <App />;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
ReactDOM.render(<Footer />, document.querySelector("footer"));
