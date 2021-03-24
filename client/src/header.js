export default function Header() {
    return (
        <div>
            <div className="headerPart">
                <img className="logo" src="logo.jpeg" alt="logo"></img>
                <h1 className="headerTop">ISTANBUL CAT NETWORK</h1>
                <p className="headerBottom">
                    We are here for 125.000 stray cats in Istanbul
                </p>
                <div className="headerMenu">
                    <a className="headerMenuBox" href="/welcome">
                        Register
                    </a>
                    <a className="headerMenuBox" href="/login">
                        Log in
                    </a>
                    <a className="headerMenuBox" href="/">
                        Profile
                    </a>
                    <a className="headerMenuBox" href="/users">
                        Search
                    </a>
                    <a className="headerMenuBox" href="/friends">
                        Friends
                    </a>
                    <a className="headerMenuBox" href="/chat">
                        Chat
                    </a>
                    <a className="headerMenuBox" href="/logout">
                        Log out
                    </a>
                    <a className="headerMenuBox" href="/delete">
                        Delete Account
                    </a>
                </div>
            </div>
        </div>
    );
}
