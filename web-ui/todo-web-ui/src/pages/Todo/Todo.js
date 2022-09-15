import { useState, useEffect, useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-modal';

import './Todo.scss'
import AuthForm from '../../components/AuthForm'
import { getTodoApi, addTodoApi, deleteTodoApi, updateTodoApi } from '../../services/todoService'

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [taskName, setTaskName] = useState('');
    const searchList = todoList.filter(item => item.name.toLowerCase().indexOf(taskName.toLowerCase()) !== -1);
    const inputRef = useRef()


    //Add Task
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (taskName !== '') {
            await addTodoApi({
                name: taskName,
                isCompleted: false,
            })
            setTodoList(await getTodoApi());
            setTaskName('')
            toast.success(`'${taskName}' was added successfully !`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            inputRef.current.focus();
        } else {
            toast.error('Task name cannot be empty !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }

    //Get All Task
    useEffect(() => {
        const getAllTasks = async () => {
            setTodoList(await getTodoApi());
            inputRef.current.focus();
        }
        getAllTasks()
    }, [])

    //Finish Task
    const handleFinishTask = async (itemId, itemTaskName, isCompleted) => {
        if (!isCompleted) {
            await updateTodoApi(itemId, {
                id: itemId,
                name: itemTaskName,
                isCompleted: true
            })
            setTodoList(await getTodoApi())
            toast.success(`'${itemTaskName}' was finished !`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }

    //Delete Task
    const handleDeleteTask = async (id, name) => {
        await deleteTodoApi(id)
        setTodoList(await getTodoApi());
        toast.success(`'${name}' was deleted succesfully !`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    //Search Task By Name
    const handleSearchTaskByName = async (e) => {
        e.preventDefault();
        if (taskName !== '') {
            setTodoList(searchList);
            setTaskName('')
        } else {
            setTodoList(await getTodoApi())
        }
    }


    //custom modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px',
            minWidth: '300px',
            maxHeight: '700px',
            width: '30%',
            backgroundColor: '#FFFFFF',
            borderRadius: '25px',
        },
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    const [typeForm, setTypeForm] = useState('');

    function openModal(type) {
        setIsOpen(true);
        setTypeForm(type);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <section className="vh-100 gradient-custom" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="auth-action">
                    <button className="btn btn-primary" onClick={() => openModal('login')}>Log in</button>
                    <button className="btn btn-success" onClick={() => openModal('signup')}>Sign up</button>
                </div>
                <Modal
                    height={typeForm === 'signup' ? '80%' : '60%'}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    {typeForm === 'signup' ? <AuthForm type='signup' /> : <AuthForm type='login' />}
                </Modal>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card rounded-3">
                            <div className="card-body p-4">
                                <h4 className="text-center my-3 pb-3">To Do App</h4>
                                <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                    <div className="col-12">
                                        <div className="form-outline">
                                            <input ref={inputRef} type="text" id="form1" placeholder=" " className="form-control" value={taskName} onChange={(e) => { setTaskName(e.target.value) }} />
                                            <label className="form-label" htmlFor="form1">Enter a task here</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary" onClick={handleAddTask}>Save</button>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-warning" onClick={handleSearchTaskByName}>Get tasks</button>
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
                                        {todoList && todoList.length > 0 && todoList.map(item =>
                                        // taskId.current = item.id
                                        (<tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{!item.isCompleted ? 'In progress' : 'Finished'}</td>
                                            <td>
                                                <button type="submit" className="btn btn-danger" onClick={() => handleDeleteTask(item.id, item.name)}>Delete</button>
                                                <button type="submit" className="btn btn-success ms-1" style={item.isCompleted ? { display: 'none' } : {}} onClick={() => handleFinishTask(item.id, item.name, item.isCompleted)}>Finished</button>
                                            </td>
                                        </tr>)
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Todo;