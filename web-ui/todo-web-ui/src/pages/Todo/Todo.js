import { useState, useEffect } from 'react'
import './Todo.scss'
import { getTodoApi, addTodoApi } from '../../services/todoService'
function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [taskName, setTaskName] = useState('')

    useEffect(() => {
        const getAllTasks = async () => {
            setTodoList(await getTodoApi());
        }
        getAllTasks()
    }, [])

    const handleAddTask = async (e) => {
        e.preventDefault();
        await addTodoApi({
            name: taskName,
            isCompleted: false,
        })
        const todoList = await getTodoApi();
        setTodoList(todoList);
        setTaskName('')
    }

    console.log(todoList);

    // const handleDeleteTask = async (id) => {
    //     await deleteTodoApi(id)
    // }

    console.log(taskName)
    return (
        <section className="vh-100 gradient-custom" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card rounded-3">
                            <div className="card-body p-4">
                                <h4 className="text-center my-3 pb-3">To Do App</h4>
                                <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                    <div className="col-12">
                                        <div className="form-outline">
                                            <input type="text" id="form1" className="form-control" value={taskName} onChange={(e) => { setTaskName(e.target.value) }} />
                                            <label className="form-label" htmlFor="form1">Enter a task here</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary" onClick={handleAddTask}>Save</button>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-warning">Get tasks</button>
                                    </div>
                                </form>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Todo item</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todoList && todoList.length > 0 && todoList.map(item => {
                                            return (<tr key={item.id}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>{!item.isCompleted ? 'In progress' : 'Finished'}</td>
                                                <td>
                                                    <button type="submit" className="btn btn-danger">Delete</button>
                                                    <button type="submit" className="btn btn-success ms-1">Finished</button>
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Todo;