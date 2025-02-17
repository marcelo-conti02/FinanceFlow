import { useEffect, useState } from "react";
import CheckUserTotal from "./CheckUserTotal";
import { UserDto } from "../../models/userDto";
import userService from "../../services/userService";
import transactionService from "../../services/transactionService";

export default function TotalTable(props: { setIsOpen: (isOpen: boolean) => void }) {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        // blocks scrolling on the main page
        document.body.style.overflow = "hidden";


        async function fetchData() {
            const usersData = await userService.getUsers();
            setUsers(usersData);

            var totalIncome = 0;
            var totalExpense = 0;

            // get total income and total expense of all users
            for (const user of usersData) {
                const transactions = await transactionService.getTransactionsByUserId(Number(user.id));
                totalIncome += transactions.filter(t => t.type === 0).reduce((sum, t) => sum + t.value, 0);
                totalExpense += transactions.filter(t => t.type === 1).reduce((sum, t) => sum + t.value, 0);
            }

            setTotalIncome(totalIncome);
            setTotalExpense(totalExpense);
            setBalance(totalIncome - totalExpense);
        }

        fetchData();

        return () => {
            // revert scrolling block
            document.body.style.overflow = "auto";
        };
    }, []);

    const setUsersView = () => {
        // if the user has no transactions
        if (users.length === 0) return <p>No users found.</p>;

        return users.map((user) => (
            <CheckUserTotal key={user.id} userId={Number(user.id)} userName={user.name} />
        ))
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Totals</h2>
                <div className="table">{setUsersView()}</div>
                <div className="totals">
                <h3>All users totals:</h3>
                <p>Total Income: {totalIncome}</p>
                <p>Total Expense: {totalExpense}</p>
                <p>Total Balance: {balance}</p>
                </div>
                <button className="closeButton" type="button" onClick={() => props.setIsOpen(false)}>Close</button>
            </div>
        </div>
    );
}
