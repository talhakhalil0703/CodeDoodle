import './App.css';
import CodeDoodle from './components/CodeDoodle'
import { useSelector, useDispatch } from 'react-redux'

// const counter = useSelector((state => state.counter)
//   const dispatch = useDispatch()
//   <h1>Counter: {counter} </h1>
//       <button onClick={( () => dispatch({type:"INCREMENT"}) )}>Click</button>

function App() {
  

  return (
    <CodeDoodle />
  );
}

export default App;
