import { useState } from "react"
import { UserDto } from "../../models/userDto";
import userService from "../../services/userService";

export default function RegisterUserModal(props: { setIsOpen: (isOpen: boolean) => void }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        // prevents page refresh
        e.preventDefault();
        try {
            // uses Partial to register without an Id
            const user: Partial<UserDto> = { name, age: Number(age)};
            await userService.createUser(user as UserDto);
            props.setIsOpen(false);
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>
                <label>
                    Age:
                    <input type="number" name="age" autoComplete="off" value={age} onChange={(e) => setAge(e.target.value)} required/>
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => props.setIsOpen(false)}>Close</button>
            </form>
        </div>
    )
}