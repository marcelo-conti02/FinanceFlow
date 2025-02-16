import { useState } from "react"
import { UserDto } from "../../models/userDto";
import userService from "../../services/userService";

export default function RegisterUserModal(props: { setIsOpen: (isOpen: boolean) => void }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user: Partial<UserDto> = { name, age: Number(age) };
            await userService.createUser(user as UserDto);
            props.setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Register User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formUser">
                        <label>
                            Name:
                            <input className="formUserInput" type="text" name="name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} required />
                        </label>
                        <label>
                            Age:
                            <input className="formUserInput" type="number" name="age" autoComplete="off" value={age} onChange={(e) => setAge(e.target.value)} required />
                        </label>
                    </div>
                    <div className="formUserBtns">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => props.setIsOpen(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
