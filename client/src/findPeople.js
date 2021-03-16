import { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setRecentUsers] = useState();
    // const [val, setVal] = useState();

    useEffect(function () {
        axios.get("/api/users/most-recent").then(({ data }) => {
            console.log("data", data);
            if (data.success) {
                setRecentUsers(data);
            }
        });
    }, []);

    // useEffect(
    //     function () {
    //         axios.get("api/users/" + val).then(({ data }) => {
    //             console.log("data", data);
    //         });
    //     },
    //     [val]
    // );

    return (
        <>
            <h1>Check out who just join!</h1>
            {users &&
                users.map(function (user) {
                    return (
                        <div key={user.id}>
                            {user.first_name}
                            {user.last_name}
                            <img src={user.imageurl} />
                        </div>
                    );
                })}

            <h1>Are you looking for someone in particular</h1>

            {/* <input
                defaultValue={val}
                onChange={({ target }) => {
                    setVal(target.value);
                }}
            /> */}
        </>
    );
}
