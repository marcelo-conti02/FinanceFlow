import { TransactionType } from "../../enums/transactionType"
import "../../styles/App.css"

export default function Transaction(props: { description: string, value: number, type: number }) {


    return (
        <>
            <div className="user">
                <h1>{props.type === 0 ? TransactionType.Income : TransactionType.Expense}</h1>
                <p>Value: {props.value}</p>
                <p>Description: {props.description}</p>
            </div>
        </>
    )
}
