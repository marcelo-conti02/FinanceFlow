import { useEffect, useState } from "react"
import { UserDto } from "../../models/userDto"
import userService from "../../services/userService";
import UserTableItem from "./UserTableItem";
import "../../styles/App.css"

export default function UserTable() {
    const [users, setUsers] = useState<UserDto[]>([]);

    useEffect(() => {
        userService.getUsers().then(setUsers);
    }, []);

    const listUsers = () => {
        return users.map((user) => (
            <UserTableItem key={user.id} name={user.name} age={user.age} />
        ))
    };

    return (
        <>
            <div className="header">
                <h1>Finance Flow</h1>
                <div className="buttons">
                    <button className="button">Register user</button>
                    <button className="button">Check total</button>
                </div>
            </div>
            <div className="body">
                <div className="userTable">
                    {listUsers()}
                </div>
            </div>
        </>
    )
}