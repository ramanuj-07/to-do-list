import { useState } from 'react'
import styled from 'styled-components'

function App() {


  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});


  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;
    const newTask = {
      id: tasks.length + 1,
      text: taskInput,
      completed: false

    }
    setTasks([...tasks, newTask]);
    setTaskInput('');             // clears the input field after adding the task.
  }
  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  const handleEditTask = (task) => {
    setIsEditing(true);
    setTaskInput(task.text);
    setCurrentTask(task);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? { ...task, text: taskInput } : task
    );
    setTasks(updatedTasks);
    setTaskInput('');
    setIsEditing(false);
    setCurrentTask({});
  };


  return (

    <Container>
      <Title>To-Do List</Title>
      <TaskContainer>
        <InputContainer onSubmit={isEditing ? handleUpdateTask : handleAddTask} >
          <input type="text"
            placeholder="Enter Task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)} />
          <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
        </InputContainer>
      </TaskContainer>
      <IncompleteTaskContainer>
        {tasks.map((task) => (
          <TaskItem key={task.id} completed={task.completed} >
            <TaskText onClick={() => handleToggleComplete(task.id)} completed={task.completed} >
              {task.text}
            </TaskText>
            <ButtonContainer>
              <EditBtn onClick={() => handleEditTask(task)}>Edit</EditBtn>
              <RemoveBtn onClick={() => handleRemoveTask(task.id)} >
                Remove
              </RemoveBtn>
            </ButtonContainer>

          </TaskItem>
        ))}
      </IncompleteTaskContainer>
    </Container>
  )
}

export default App

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ completed }) => (completed ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${({ completed }) => (completed ? '#c3e6cb' : '#f5c6cb')};
  border-radius: 4px;
`;

const TaskText = styled.span`
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  cursor: pointer;
`;


const RemoveBtn = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;


const InputContainer = styled.form`
  padding: 20px 30px;
  display: flex;
  width: 100%;

  input {
    padding: 10px 30px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  button {
    cursor: pointer;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    margin-left: 10px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;


const EditBtn = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #ffc107;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top:100px;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const TaskContainer = styled.div`
  display: flex;
  justify-content:center;
  margin-bottom: 20px;
  align-items:center;
  width:100%;


`
const IncompleteTaskContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;

`