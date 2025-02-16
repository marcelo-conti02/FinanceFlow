import { useState } from "react"
import "../../styles/App.css"
import SeeTransactionsModal from "../transactions/SeeTransactionsModal";
import RegisterTransactionModal from "../transactions/ResgisterTransactionModal";

export default function UserTableItem(props: { id: number, name: string, age: number }) {

    const [isOpenSeeTransactions, setIsOpenSeeTransactions] = useState(false);
    const [isOpenRegisterTransaction, setIsOpenRegisterTransaction] = useState(false);

    return (
        <>
            <div className="user">
                <h1>{props.name}</h1>
                <p>{props.age} years old</p>
                <div className="userTableItemBtns">
                    <button onClick={() => setIsOpenRegisterTransaction(true)}>Register transaction</button>
                    <button onClick={() => setIsOpenSeeTransactions(true)}>See transactions</button>
                </div>
            </div>
            {isOpenSeeTransactions && <SeeTransactionsModal setIsOpen={setIsOpenSeeTransactions} userName={props.name} userId={props.id}/>}
            {isOpenRegisterTransaction && <RegisterTransactionModal setIsOpen={setIsOpenRegisterTransaction} userId={props.id}/>}
        </>
    )
}
