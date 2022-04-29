import { useState } from "react"

const AddTask = ({ onAdd }) => {
const [title, setTitle] = useState('')
const [place, setPlace] = useState('')
const [day, setDay] = useState('')
const [reminder, setReminder] = useState(false) // by default the set reminder is false

// the onsubmit method takes the event object
const onSubmit = (e) => {
  e.preventDefault()

  if (!title) {
    alert('Please enter a title')
    return
  }

  if (!place) {
    alert('Please enter a location')
    return
  }

  if (!day) {
    alert('Please enter day and time');
    return
  } 

  if (!reminder) {
    alert('please check reminder');
    return
  }
  

  onAdd({title, place, day, reminder})

  // clear the form
  setTitle('')
  setPlace('')
  setDay('')
  setReminder(false)
}

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className="form-control">
        <label>Task</label>
        <input type='text' placeholder='Add Task'  value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div className="form-control">
        <label>location</label> 
        <input type='text' placeholder='Add Location'  value ={place} onChange={(e) => setPlace(e.target.value)} /></div>
        <div className="form-control">
        <label>Day and Time</label>
        <input type='text' placeholder='Add Day/Time'  value ={day} onChange={(e) => setDay(e.target.value)} /></div>
        <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type='checkbox' checked={reminder} value = {reminder} onChange={(e) => setReminder(e.currentTarget.checked)} /> </div>

        <input type='submit' value='Save Tasks' className='btn btn-block'/>
    </form>
  )
}

export default AddTask