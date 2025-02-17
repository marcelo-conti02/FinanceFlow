import { useState } from "react"
import { TransactionDto } from "../../models/transactionDto"
import transactionService from "../../services/transactionService";

export default function RegisterTransactionModal(props: { setIsOpen: (isOpen: boolean) => void, userId: number, userAge: number}) {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(Number(type) == 0 && props.userAge < 18)
            alert("Users under 18 years old can only register expenses.");

        try {
            const transaction: Partial<TransactionDto> = { description, value: Number(value), type: Number(type), userId: props.userId };
            await transactionService.createTransaction(transaction as TransactionDto);
            props.setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Failed to create transaction:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Register Transaction</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formUser">
                        <label>
                            Type:
                            <select className="formUserInput" value={type} onChange={(e) => setType(e.target.value)} required>
                                <option value="0">Income</option>
                                <option value="1">Expense</option>
                            </select>
                        </label>
                        <label>
                            Value:
                            <input className="formUserInput" type="number" name="value" autoComplete="off" value={value} onChange={(e) => setValue(e.target.value)} required />
                        </label>
                        <label>
                            Description:
                            <input className="formUserInput" type="text" name="description" autoComplete="off" value={description} onChange={(e) => setDescription(e.target.value)} required />
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
