import { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setRecentUsers] = useState();
    const [recent, setRecent] = useState();
    const [searchTerm, setVal] = useState();

    useEffect(function () {
        axios.get("/api/users/most-recent").then(({ data }) => {
            // console.log("dataformostrecent", data);
            setRecentUsers(data.success);
        });
    }, []);

    useEffect(
        function () {
            axios.get("/api/users/" + searchTerm).then(({ data }) => {
                // console.log("searchTerm", searchTerm);
                // console.log("dataforresult", data);
                setRecent(data.success);
            });
        },
        [searchTerm]
    );

    return (
        <>
            <div className="searchRecent">
                <h1>Check out who just join!</h1>
                {users &&
                    users.map(function (user) {
                        return (
                            <div key={user.id}>
                                <div>
                                    {user.first_name}
                                    {user.last_name}
                                </div>
                                <img src={user.imageurl} />
                            </div>
                        );
                    })}
            </div>
            <div className="searchResult">
                <h1>Are you looking for someone in particular</h1>
                <input
                    defaultValue={searchTerm}
                    onChange={({ target }) => {
                        setVal(target.value);
                    }}
                />
                {recent &&
                    recent.map(function (user) {
                        return (
                            <div key={user.id}>
                                <div>
                                    {user.first_name}
                                    {user.last_name}
                                </div>
                                <img src={user.imageurl} />
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
