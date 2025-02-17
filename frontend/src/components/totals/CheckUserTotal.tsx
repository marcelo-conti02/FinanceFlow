import { useEffect, useState } from "react";
import transactionService from "../../services/transactionService";


export default function CheckUserTotal(props: { userId: number, userName: string }) {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setUserData();
    }, []);

    async function setUserData() {
        const userTransactions = await transactionService.getTransactionsByUserId(props.userId);
        const incomes = userTransactions.filter((t) => t.type === 0);
        const expenses = userTransactions.filter((t) => t.type === 1);

        const totalIncome = incomes.reduce((sum, t) => sum + t.value, 0);
        const totalExpense = expenses.reduce((sum, t) => sum + t.value, 0);
        const balance = totalIncome - totalExpense;

        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
        setBalance(balance);
    }

    return (
        <div className="user">
            <h2>{props.userName}</h2>
            <p>Total income: {totalIncome}</p>
            <p>Total expense: {totalExpense}</p>
            <p>Balance: {balance}</p>
        </div>
    );
}