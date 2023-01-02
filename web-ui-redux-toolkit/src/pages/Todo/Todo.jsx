import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Todo.scss';

import { addTodosAsync, getTodosAsync, deleteTodosAsync, completeTodosAsync } from '../../app/todoSlice';

const Todo = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    console.log(todos);

    const [taskName, setTaskName] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        dispatch(addTodosAsync({ name: taskName, isCompleted: false }));
        setTaskName('');
    };

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    const handleDeleteTask = (e, id) => {
        e.preventDefault();
        dispatch(deleteTodosAsync(id));
    };

    const handleCompletedTask = async (e, todo) => {
        e.preventDefault();
        // console.log(todo.id);
        dispatch(completeTodosAsync({ id: todo.id, name: todo.name, isCompleted: true }));
    };

    return (
        <section
            className='vh-100 gradient-custom'
            style={{ backgroundColor: '#eee' }}
        >
            <div className='container py-5 h-100'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col col-lg-9 col-xl-7'>
                        <div className='card rounded-3'>
                            <div className='card-body p-4'>
                                <h4 className='text-center my-3 pb-3'>To Do App</h4>
                                <form className='row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2'>
                                    <div className='col-12'>
                                        <div className='form-outline'>
                                            <input
                                                type='text'
                                                id='form1'
                                                placeholder=' '
                                                className='form-control'
                                                value={taskName}
                                                onChange={(e) => setTaskName(e.target.value)}
                                            />
                                            <label
                                                className='form-label'
                                                htmlFor='form1'
                                            >
                                                Enter a task here
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary'
                                            onClick={handleAddTask}
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <div className='col-12'>
                                        <button
                                            type='submit'
                                            className='btn btn-warning'
                                        >
                                            Get tasks
                                        </button>
                                    </div>
                                </form>
                                <table className='table mb-4'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>No.</th>
                                            <th scope='col'>Todo item</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todos &&
                                            todos.map((todo) => (
                                                <tr key={todo.id}>
                                                    <th scope='row'>{todo.id}</th>
                                                    <td>{todo.name}</td>

                                                    <td>
                                                        <button
                                                            type='submit'
                                                            className='btn btn-danger'
                                                            onClick={(e) => handleDeleteTask(e, todo.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Todo;
