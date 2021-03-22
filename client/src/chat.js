import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted...");
        console.log("elemRef.current", elemRef.current);
    }, []);

    const keyCheck = (e) => {
        //only really care about the value, when i press unter
        console.log("e.target.value:", e.target.value);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value:", e.target.value);
            socket.emit("my amazing chat messages");
            e.target.value = "";
        }
    };
    return (
        <>
            <h1>Chat Room</h1>
            <div className="chat-container">
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
            </div>
            <textarea onKeyDown={keyCheck}></textarea>
        </>
    );
}
