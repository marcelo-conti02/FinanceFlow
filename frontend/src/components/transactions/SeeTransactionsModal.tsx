import { useEffect, useState } from "react";
import transactionService from "../../services/transactionService";
import { TransactionDto } from "../../models/transactionDto";
import Transaction from "./Transaction";

export default function SeeTransactionsModal(props: { setIsOpen: (isOpen: boolean) => void, userName: string, userId: number}) {
    const [transactions, setTransactions] = useState<TransactionDto[]>([]);

    useEffect(() => {
        // blocks scrolling on the main page
        document.body.style.overflow = "hidden";

        transactionService.getTransactionsByUserId(props.userId).then(setTransactions);

        return () => {
            // revert scrolling block
            document.body.style.overflow = "auto";
        };
    }, []);

    const listTransactions = () => {
        // if the user has no transactions
        if (transactions.length === 0) return <p>No transactions found.</p>;

        return transactions.map((transaction) => (
            <Transaction key={transaction.id} description={transaction.description} value={transaction.value} type={transaction.type}/>
        ))
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{props.userName}'s transactions</h2>
                <div className="table">{listTransactions()}</div>
                <button className="closeButton" type="button" onClick={() => props.setIsOpen(false)}>Close</button>
            </div>
        </div>
    );
}
