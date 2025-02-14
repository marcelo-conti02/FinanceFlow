import "../../styles/App.css"

export default function UserTableItem(props: { name: string, age: number }) {
    return (
        <div className="user">
            <h1>{props.name}</h1>
            <p>{props.age} years old</p>
            <button>Register transaction</button>
        </div>
    )
}
