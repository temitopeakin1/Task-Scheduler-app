import React from 'react';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from  'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  // const [tasks, setTasks] = useState([])


  const [tasks, setTasks] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

// useEffects is used to create side effects in React.
// This will fetch data on a component mount on the first render.
// useEffect(() => {     
//   const getTasks =  async () => {
//   const tasksFromServer = await fetchTasks()
//   setTasks(tasksFromServer);
// }
//     getTasks()
//       // Add dependency array, but it passes an empty array, so it will only run once.
//   }, [])

  useEffect(() => {
    // storing input tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
 

  // //Fetch tasks from the server
  // const fetchTasks = async () => {
  //   const res = await fetch('http://localhost:5000/tasks');
  //   // const res = await fetch('');
  //   const data = await res.json()

  //   return data
  //   }

 //Fetch a single tasks from the server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()

    return data
    }

//Add Task
// const addTask = async (task) => {
//   const res = await fetch('http://localhost:5000/tasks', 
//   {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(task),
//   })
// // get the data from the server
//   const data =  await res.json() 

//   setTasks([...tasks, data])

const addTask = (task) => {
  const id = Math.floor(Math.random() * 1000) + 1
  const newTask = { id, ...task}
  setTasks([...tasks, newTask]) // using the setTask method to get an array of tasks
} 

//Delete Task
// const deleteTask = async (id) => {
// const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//   method: 'DELETE'
// })
// res.status === 200
//   ? setTasks(tasks.filter((task) => task.id !== id))
//   : alert('Error Deleting Task')
  
// }

const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',// PUT is used to update the data
    // since we are sending the data to the server, we need to send it as a string
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json() 

  setTasks(tasks.map((task) =>
   task.id === id ? {...task, reminder:
     data.reminder } : task
     )
     ) 
}

// understand this part very well
 return (
   <Router>
    <div className="container">
    <Header
     onAdd={() => setShowAddTask(!showAddTask)} 
     showAdd={showAddTask} 
     /> 
   <Routes>
    <Route path='/' 
      element={
        <>
    {showAddTask && <AddTask onAdd={addTask} />}
    { tasks.length > 0 ? (
    <Tasks 
    tasks={tasks} 
    onDelete={deleteTask} 
    onToggle={toggleReminder} 
    /> 
    ) : ( 
      'No Task available'
    )}
    </>
      } 
      />
    <Route path='/about' element={<About />}/>
    </Routes>
   <Footer />
    </div>
    </Router>
  )
}   
 
export default App
  