import Task from './Task'  


const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
    {tasks.map((task) => (
        <Task key={task.id}  
        task={task} 
        onDelete={onDelete} 
        onToggle={onToggle}/>   // this is called a list because we used mapping to loop through the tasks array
  ))} 
    </>
  )
}
 
export default Tasks 
 