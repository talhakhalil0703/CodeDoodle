import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// let city = "Madrid";

// const lakeList = [
//   {id: "1", name: "Echo", Trailhead: "Echo"},
//   {id: "2", name: "Jame", Trailhead: "jaja"},
//   {id: "4", name: "Ra", Trailhead: "ra"}
// ];

// function ListLakes({lakes}){
//   return(
//     <ul> 
//       {lakes.map(lake =>
//         <div key={lake.id}>
//           <h1>{lake.name}</h1>
//           <p>trailhead is {lake.Trailhead}</p>
//         </div>  
//       )}
//     </ul>
//   )
// }

// function Conditional(props){
//   if(props.season === "summer"){
//     return (
//       <div>
//         <h1>Visit in summer!</h1>
//         {(props.weekend === "true") ? <h1>This weekend</h1>:<h1>Next weekend</h1>}
//       </div>
//     )
//   }

//   return(
//     <div>
//       <h1>Visit in winter</h1>
//       {(props.weekend === "true") ? <h1>This weekend</h1>:<h1>Next weekend</h1>}
//     </div>
//   )
// }

// function Hello(props) {
//   console.log(Object.keys(props));
//   return <h1>Welcome to React!</h1>
// }

// function MultiCompNoDiv(props){
//   return(
//     <React.Fragment>
//       <ListLakes lakes={lakeList} />
//       <Conditional />
//     </React.Fragment>
//   )
// }

// function StateHook() {
//   const [status, setStatus] = useState("Open");
//   const [year, setYear] = useState(2000);

//   return(
//     <div>
//       <h1>Status: {status}</h1>
//       <button onClick={() => setStatus("Closed") }>
//         Close
//       </button>

//       <h1>Year: {year}</h1>
//       <button onClick={() => setYear(year + 1)}>
//         Increment year
//       </button>
      
//       <br />
//       <br />
//       <br />

//       <UseEffectHook /> 
//     </div>
//   )
// }

// function UseEffectHook() {
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     alert(`checked: ${checked.toString()}`);
//   });

//   return (
//     <React.Fragment>
//       <input 
//       type="checkbox" 
//       value={checked}
//       onChange={() =>
//         setChecked(checked => !checked)}
//       />

//       {checked ? "checked" : "not checked"}
//     </React.Fragment>
//   )
// }

// function UseEffectDependancyArray() {
//   const [val, setVal] = useState("");
//   const [val2, setVal2] = useState("");

//   useEffect(() => {
//     console.log(`field 1: ${val}`)
//   }, [val]);

//   useEffect(() => {
//     console.log(`field 2: ${val2}`)
//   }, [val2]);

//   useEffect(() => {
//     console.log(`SOMETHING CHANGED`)
//   }, [val2,val]);

//   return (
//     <React.Fragment>
//       <label>
//         Favourite Phrase:
//         <input 
//         value={val} 
//         onChange={e => setVal(e.target.value)}
//         />
//       </label>

//       <br />

//       <label>
//         Second Favourite Phrase:
//         <input 
//         value={val2} 
//         onChange={e => setVal2(e.target.value)}
//         />
//       </label>
//     </React.Fragment>
//   )
// }

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
