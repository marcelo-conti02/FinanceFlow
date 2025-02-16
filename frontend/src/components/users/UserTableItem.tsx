import { useState } from "react"
import "../../styles/App.css"
import SeeTransactionsModal from "../transactions/SeeTransactionsModal";

export default function UserTableItem(props: { id: number, name: string, age: number }) {

    const [isOpenSeeTransactions, setIsOpenSeeTransactions] = useState(false);

    return (
        <>
            <div className="user">
                <h1>{props.name}</h1>
                <p>{props.age} years old</p>
                <div className="userTableItemBtns">
                    <button>Register transaction</button>
                    <button onClick={() => setIsOpenSeeTransactions(true)}>See transactions</button>
                </div>
            </div>
            {isOpenSeeTransactions && <SeeTransactionsModal setIsOpen={setIsOpenSeeTransactions} userName={props.name} userId={props.id}/>}
        </>
    )
}
