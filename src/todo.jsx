const Todo = ({tasks}) =>{
    const {title} = tasks
    return (
        <>
        <div>
            <p>{title}</p>
        </div>
        </>
    )
}
export default Todo