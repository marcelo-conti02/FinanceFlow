import { useEffect, useState } from "react";
import CheckUserTotal from "./CheckUserTotal";
import { UserDto } from "../../models/userDto";
import userService from "../../services/userService";

export default function TotalTable(props: { setIsOpen: (isOpen: boolean) => void}) {
    const [users, setUsers] = useState<UserDto[]>([]);

    useEffect(() => {
        // blocks scrolling on the main page
        document.body.style.overflow = "hidden";
        
        userService.getUsers().then(setUsers);

        return () => {
            // revert scrolling block
            document.body.style.overflow = "auto";
        };
    }, []);

    const setUsersView = () => {
        // if the user has no transactions
        if (users.length === 0) return <p>No users found.</p>;

        return users.map((user) => (
            <CheckUserTotal  key={user.id} userId={Number(user.id)} userName={user.name}/>
        ))
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div>{setUsersView()}</div>
                <button className="closeButton" type="button" onClick={() => props.setIsOpen(false)}>Close</button>
            </div>
        </div>
    );
}
