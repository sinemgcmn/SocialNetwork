import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
                <h1 className="mostRecentHeadline">Check out who just join!</h1>
                <div className="mostRecent">
                    {users &&
                        users.map(function (user) {
                            return (
                                <div key={user.id}>
                                    <div className="mostRecentNames">
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <div className="mostRecentImg">
                                        <Link to={`/user/${user.id}`}>
                                            <img src={user.imageurl} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="searchResult">
                <input
                    className="searchUser"
                    defaultValue={searchTerm}
                    onChange={({ target }) => {
                        setVal(target.value);
                    }}
                />
                <h1 className="mostRecentHeadline">Find People</h1>
                <div className="mostSearch">
                    {recent &&
                        recent.map(function (user) {
                            return (
                                <div key={user.id}>
                                    <div className="mostRecentNames">
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <div className="mostRecentImg">
                                        <Link to={`/user/${user.id}`}>
                                            <img src={user.imageurl} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
