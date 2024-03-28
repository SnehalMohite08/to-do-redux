// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}

//       <h1>This is my first React App</h1>
//     </div>
//   );
// }

// export default App;


import './App.css';
import React,{ useState} from 'react';


export default function App() {
  const [date, setDate] = useState("");
  const [task,setTask] = useState([]);
  const [taskList,setTaskList] = useState("");

  const addtask = () => {
    if(taskList.trim() !== ''){
       setTask([
         ...task,
         {
           description : taskList,
           date : date,
           completed:false
         }
       ]);
      setTaskList("");
      setDate("");
    }
  };

  const checkbox = (index) => {
    const newTask = [...task];
    newTask[index].completed = !newTask[index].completed;
    setTask(newTask);
  };

  const deletetask = (index) => {
    const newTask = [...task].filter((_,i) => i !== index);
    setTask(newTask);
  }

  const inputchange = (event) => {
    setTaskList(event.target.value);
  };

  const datechange = (event) => {
    setDate(event.target.value);
  };

  const istaskdue = (completiondate) => {
    const now = new Date();
    const duedate = new Date( completiondate);
    return duedate < now;
  };
  
  
  return (
    <div className='app'>
      <h1>To Do Application</h1>

      <div className='task'>
        <input
          type="text"
          value={task}
          onChange={inputchange}
          placeholder="Enter task"
          className="input"
          />
        <input
          type="date"
          value={date}
          placeholder="Enter completion date"
          onChange={datechange}
          className="input"
          />

        <button onClick={addtask} className="add-button">Add Task</button>
      </div>
      
      <ul className='task'>
        {task.map((task,index) => (
      <li key={index} style = {{border:istaskdue(task.completionDate)? '2px solid yellow' : 'none'}}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => checkbox(index)}
          />
        <span style={{textDecoration: task.completed ? 'line-through':'none'}}>{task.description}</span>
        {istaskdue(task.completionDate) && <span>Due day is passed</span>}
        <button onClick={() => deletetask}>Delete</button>
      </li>
        ))}
      </ul>
    </div>
  );
}



