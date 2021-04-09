// import React, { Component } from 'react';
// import './ARDiagramDrawArea.css';

// import ARHeapArea from './ARHeapArea';
// import ARStackArea from './ARStackArea';
// import ARStaticArea from './ARStaticArea';

// import DrawingIcons from '../components/DrawingIcons';
// import Droppable from '../components/DroppableFunction';
// import Toggalable from '../components/Toggalable'
// import Draggable from 'react-draggable'

// /* 
//     ARDiagramDrawArea has the:
//      - drawing icons (i.e. int, double etc.)
//      - stack section
//      - heap section
//      - static section (stat)

//     Receives props:
//      - stack: all info in the stack section
//      - heap: all info in the heap section
//      - stat: all info in the static section
//      - onStackChange: access to CodeDoodles onStackChange function
//      - onHeapChange: access to CodeDoodles onHeapChange function (not yet implemented)
//      - onStatChange: access to CodeDoodles onStatChange function (not yet implemented)
// */

// const DroppableStack = Droppable(ARStackArea);
// const DroppableHeap = Droppable(ARHeapArea);
// const DroppableStatic = Droppable(ARStaticArea);

// class ARDiagramDrawArea extends Component {

//   constructor(props) {
//     super(props);

//     this.handleHeapChange = this.handleHeapChange.bind(this);
//     this.handleStaticChange = this.handleStaticChange.bind(this);
//     this.generateCode = this.generateCode.bind(this);
//     this.displayExtraInfo = this.displayExtraInfo.bind(this);
//   }

//   handleHeapChange(heap) {
//     console.log(heap);
//   }

//   handleStaticChange(stat) {
//     this.props.onStaticChange(stat)
//   }

//   /* Helper function to reverse an array without destroying the original (array from arg) */
//   reverseArray(array) {
//     var temp = Array.from(array);
//     temp.reverse();
//     return temp;
//   }

//   /* handles dropping Anchors onto the draw area */
//   handleDrop(text, value) {
//     if(text !== 'anchor'){
//       alert('(in arDraw) only anchors can be dropped here...')
//     }
//   }

//   getStackArgs(stackframe) {

//     var args = '';

//     /* get args of this stackframe and format for display */
//     stackframe.args.forEach((arg, index) => {
//       if (index === 0) {
//         args += `${arg.name}`;
//       } else {
//         args += `, ${arg.name}`;
//       }
//     });

//     return args;
//   }

//   handleVariableType(value, type, name) {

//     var local = '';

//     /* If the variable has no value set... */
//     if (value === '???') {
//       local = `\t${type} ${name};\n`;
//     } else {
//       /* If the variable HAS a value set */
//       if (type === 'boolean') {
//         if (value === '1') {
//           local = `\t${type} ${name} = true;\n`;
//         } else {
//           local = `\t${type} ${name} = false;\n`;
//         }
//       } else if (type === 'char') {
//         local = `\t${type} ${name} = '${value}';\n`;
//       } else {
//         local = `\t${type} ${name} = ${value};\n`;
//       }
//     }
//     return local;
//   }

//   getClassVars(items) {

//     var class_vars = '';
//     var first = true;

//     items.forEach((item) => {
//       if (item.value != '???') {
//         if (first) {
//           class_vars += `${item.value}`;
//           first = false;
//         } else {
//           class_vars += `, ${item.value}`;
//         }
//       }
//     });

//     return class_vars;
//   }

//   getDefaultName(c, length) {
//     return String.fromCharCode(c.charCodeAt(0) + length);
//   }

//   getClassCode(type, value) {

//     var code = '';
//     var variable_types = '';
//     var variables = '';
//     var vars = [];
//     var def_vars = [];

//     code += `class ${type} {\n`;

//     value.forEach((item, index) => {
//       code += `\t\t${item.type} ${item.name};\n`;

//       var char = this.getDefaultName('a', index);

//       if (index === 0) {

//         variable_types += `${item.type}`;
//         variables += `${item.type} ${char}`;
//         vars.push(item.name);
//         def_vars.push(char);

//       } else {

//         variable_types += `, ${item.type}`;
//         variables += `, ${item.type} ${char}`;
//         vars.push(item.name);
//         def_vars.push(char);

//       }

//     });

//     code += `\tpublic:\n\t\t${type} ();\n\t\t${type} (${variable_types});\n};\n\n`;

//     code += `${type}::${type} () {\n`;

//     vars.forEach(v => {
//       code += `\t${v};\n`;
//     });

//     code += `}\n\n${type}::${type} (${variables}) {\n`

//     def_vars.forEach((v, index) => {
//       if (vars[index] === v) {
//         code += `\tthis.${vars[index]} = ${v};\n`;
//       } else {
//         code += `\t${vars[index]} = ${v};\n`;
//       }
//     });

//     code += `}\n\n`;

//     return code;
//   }

//   getStack(stack) {

//     var code = '';

//     /* 
//         To handle variables calling functions that take arguments args_list will keep 
//         track of arguments that all functions take, so if you have:
    
//             - void foo(a, b) {},
//             - int bar(c, d),
   
//         args_list will have:
    
//             - args_list['foo'] =  'a, b'
//             - args_list['bar'] = 'c, d'
//     */
//     var args_list = [];

//     /* Iterate through each stack frame */
//     stack.forEach((stackframe, index) => {

//       var local = '';
//       var classes = '';
//       var ret = '';
//       var args = this.getStackArgs(stackframe);

//       /* add arguments to args_list to display by appropriate variable */
//       args_list[stackframe.name] = args;

//       var temp = stackframe.name.split(' ');

//       var type = temp[0];
//       var name = temp[1];

//       const primitives = ['int', 'double', 'boolean', 'float', 'char'];

//       /* Iterate through each local variable */
//       stackframe.local.forEach(loc => {

//         if (!primitives.includes(loc.type)) {

//           var class_vars = this.getClassVars(loc.value);
//           classes += this.getClassCode(loc.type, loc.value);

//           if (class_vars !== '') {
//             local += `\t${loc.type} ${loc.name} (${class_vars});\n`;
//           } else {
//             local += `\t${loc.type} ${loc.name};\n`;
//           }
//         } else {

//           /* If loc.return has been set... */
//           if (loc.return !== '') {

//             /* If loc.return is set to return, this is variable being returned in this function */
//             if (loc.return === 'return') {
//               ret = `\treturn ${loc.name};\n`;
//             } else {
//               /* If its set to anything else, it is getting its value from a function call */

//               /* Get args for this function call */
//               var vars = args_list[loc.return];
//               local += `\t${loc.type} ${loc.name} = ${loc.return}(${vars});\n`;
//             }
//           } else {
//             /* If loc.return has NOT been set... */
//             local += this.handleVariableType(loc.value, loc.type, loc.name);
//           }
//         }
//       });

//       /* If the return statement hasnt been set, set it to return 0 */
//       if (ret === '') {
//         ret = `\treturn 0;\n`;
//       }

//       code += classes;

//       /* format function header */
//       var func = `${type} ${name}(${args}) {\n`;
//       code += func;


//       code += local;

//       /* If the return type isnt void append return statemtn... */
//       if (type !== 'void') {
//         code += ret;
//       }

//       if (index !== (stack.length - 1)) {
//         code += `}\n\n`;
//       } else {
//         code += `}`;
//       }
//     });

//     return code;
//   }

//   getHeap(heap) {

//     var code = '';
//     console.log('doing something with heap...');
//     return code;
//   }

//   getStatic(stat) {

//     var code = '';
//     console.log('doing something with static...');
//     return code;
//   }

//   /*  
//       Generates the code that represents the drawn diagram
   
//       Current concerns: 
//           - AR diagrams are 'dumb', as they were taught they can't entirely represent the 
//               code they may have originally come from on their own
          
//           - To make AR to Code meaningful (with what sorts of things I think would make it 
//               meaningful to follow) will have to break away a bit from how we were taught to 
//               make AR diagrams, which is my overall concern
   
//           - Number of things that can't be reconstructed from an AR diagram without breaking 
//               from how we were taught to make AR diagrams.
   
//           - Some examples of things I think would make AR to Code more meaningful that AR 
//               diagrams can't illustrate on their own, without these it would, I think, be 
//               just one big main function. Right now as I'm seeing it these are all totally
//               solvable if we break from how we were taught to draw AR diagrams.
   
//               On their own, how can AR diagrams: 
//               - Know if you are in a loop?
//               - Know if a variable is calling a function. I think this is probably the biggest
//                    concern. Without this the AR to Code conversion would essentially be limited 
//                    to just one large function. This is because, while AR diagrams indicate 
//                    that a function call happens, they do not really have any hard indication of 
//                    what is calling that function, you could infer based on argument values 
//                    matching another functions local variables, but I personally think this is  
//                    not exactly one of the best possible solutions.
                   
//                    Further function related problems:
//                       - What variable it returns?
//                       - What type is the return variable?
//                       - What arguments were actually passed to it from caller?
   
//                       i.e. you have:
   
//                           int foo(e, f) {
//                               ...
//                           }
   
//                           int main() {
//                               int a = 0;
//                               int b = 0;
//                               int c = foo(a, b);
//                           }
   
//                   - How about if just numbers were passed to the function?
                          
//                       i.e. you have:
   
//                           int foo(e, f) {
//                               ...
//                           }
   
//                           int main() {
//                               int c = foo(10, 20);
//                           }
//   */
//   generateCode() {
//     const { stack, heap, stat } = this.props;

//     var code = '';

//     /* Need a deep copy of stack to show code in proper order while preserving stack */
//     var temp_stack = this.reverseArray(stack);

//     /* gets all stack information */
//     code += this.getStack(temp_stack);

//     /* not implemented rn */
//     code += this.getHeap(heap);

//     /* not implemented rn */
//     code += this.getStatic(stat);

//     this.props.generateCode(code);
//   }

//   displayExtraInfo() {
//     this.props.toggleDrawInfo();
//   }

//   render() {
//     const { stack, heap, stat, classes } = this.props;
//     const { stackOpen, heapOpen, staticOpen, drawInfoOpen, arrowConnectionPointsOpen, onClassesChange } = this.props;
//     return (
//       <div id="drawArea" >

//         <div className='diagram-panel-header'>
//           <Toggalable toggle={drawInfoOpen} alt={null}>
//             <button className='btn' onClick={this.generateCode}>Generate Code</button>
//           </Toggalable>

//           <Toggalable toggle={!drawInfoOpen} alt={null}>
//             <button className='btn' onClick={this.displayExtraInfo}>Fill in Extra Information</button>
//           </Toggalable>
//         </div>

//         <div className='drawing-panel'>
//           <DrawingIcons
//             spawnAnchor={this.props.spawnAnchor}
//             classList={classes}
//             onClassListChange={onClassesChange}
//             showButton={true}
//           />
//           <div className='drawing-area'>

//             <Toggalable toggle={heapOpen} alt={null}>
//               <div className="drawSection" id="heapArea">
//                 <DroppableHeap
//                   heap={heap}
//                   classes={classes}
//                   handleDrop={this.handleHeapChange}
//                   drawInfoOpen={drawInfoOpen}
//                   arrowConnectionPointsOpen={arrowConnectionPointsOpen}
//                   toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
//                 />
//               </div>
//             </Toggalable>

//             <Toggalable toggle={stackOpen} alt={null}>
//               <div className="drawSection" id="stackArea">
                
//                 <DroppableStack
//                   value={stack}
//                   classes={classes}
//                   drawInfoOpen={drawInfoOpen}
//                   arrowConnectionPointsOpen={arrowConnectionPointsOpen}
//                   toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
//                 />
//                 {console.log("ARdiagramDrawArea Stack")}
//               </div>
//             </Toggalable>

//             <Toggalable toggle={staticOpen} alt={null}>
//               <div className="drawSection" id="staticArea">
//                 <DroppableStatic
//                   stat={stat}
//                   handleDrop={this.handleStaticChange}
//                   drawInfoOpen={drawInfoOpen}
//                   arrowConnectionPointsOpen={arrowConnectionPointsOpen}
//                   toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
//                 />
//               </div>
//             </Toggalable>

//           </div>
//         </div>
//         {/* <Draggable defaultPosition={{x:220,y:220}}>
//               <span>
//                 <div >
//                     Wordup
//                 </div>
//               </span>
//           </Draggable> */}
//       </div>
//     );
//   }
// }

// export default ARDiagramDrawArea;

import React from 'react';
import './ARDiagramDrawArea.css';

import ARHeapArea from './ARHeapArea';
import { useDispatch } from "react-redux";
import { addVarHeap } from "../components/codeDoodle/heapSlice";

import ARStackArea from './ARStackArea';
import { addStackFrame } from "../components/codeDoodle/stackSlice";


import ARStaticArea from './ARStaticArea';
import { addVarStatic } from "../components/codeDoodle/staticSlice";

import DrawingIcons from '../components/DrawingIcons';
import Droppable from '../components/DroppableFunction';
import Toggalable from '../components/Toggalable'

const DroppableStack = Droppable(ARStackArea);
const DroppableHeap = Droppable(ARHeapArea);
const DroppableStatic = Droppable(ARStaticArea);

const ARDiagramDrawArea = (props) => {

  const dispatch = useDispatch();

  const handleHeapChange = (heap, text) => {

    if (text === 'stack') {
      alert('stack frames cant be dropped here...')
    } else {
      dispatch(addVarHeap({ text }));
    }
  }

  const handleStackChange = (stack, text) => {
    console.log(text);
    if (text !== 'stack') {
      alert('only stack frames can be dropped here...')
    } else {
      dispatch(addStackFrame({ text }));
    }
  }

  const handleStaticChange = (stat, text) => {
    if (text === 'stack') {
      alert('stack frames cant be dropped here...')
    } else {
      dispatch(addVarStatic({ text }));
    }
  }

  /* Helper function to reverse an array without destroying the original (array from arg) */
  const reverseArray = (array) => {
    var temp = Array.from(array);
    temp.reverse();
    return temp;
  }

  const getStackArgs = (stackframe) => {

    var args = '';

    /* get args of this stackframe and format for display */
    stackframe.args.forEach((arg, index) => {
      if (index === 0) {
        args += `${arg.name}`;
      } else {
        args += `, ${arg.name}`;
      }
    });

    return args;
  }

  const handleVariableType = (value, type, name) => {

    var local = '';

    /* If the variable has no value set... */
    if (value === '???') {
      local = `\t${type} ${name};\n`;
    } else {
      /* If the variable HAS a value set */
      if (type === 'boolean') {
        if (value === '1') {
          local = `\t${type} ${name} = true;\n`;
        } else {
          local = `\t${type} ${name} = false;\n`;
        }
      } else if (type === 'char') {
        local = `\t${type} ${name} = '${value}';\n`;
      } else {
        local = `\t${type} ${name} = ${value};\n`;
      }
    }
    return local;
  }

  const getClassVars = (items) => {

    var class_vars = '';
    var first = true;

    items.forEach((item) => {
      if (item.value != '???') {
        if (first) {
          class_vars += `${item.value}`;
          first = false;
        } else {
          class_vars += `, ${item.value}`;
        }
      }
    });

    return class_vars;
  }

  const getDefaultName = (c, length) => {
    return String.fromCharCode(c.charCodeAt(0) + length);
  }

  const getClassCode = (type, value) => {

    var code = '';
    var variable_types = '';
    var variables = '';
    var vars = [];
    var def_vars = [];

    code += `class${ type} {\n`;

    value.forEach((item, index) => {
      code += `\t\t${item.type} ${item.name};\n`;

      var char = getDefaultName('a', index);

      if (index === 0) {

        variable_types += `${item.type}`;
        variables += `${item.type} ${char}`;
        vars.push(item.name);
        def_vars.push(char);

      } else {

        variable_types += `, ${item.type}`;
        variables += `, ${item.type} ${char}`;
        vars.push(item.name);
        def_vars.push(char);

      }

    });

    code += `\tpublic:\n\t\t${type} ();\n\t\t${type} (${variable_types});\n};\n\n`;

    code += `${type}::${type} () {\n`;

    vars.forEach(v => {
      code += `\t${v};\n`;
    });

    code += `}\n\n${type}::${type} (${variables}) {\n`

    def_vars.forEach((v, index) => {
      if (vars[index] === v) {
        code += `\tthis.${vars[index]} = ${v};\n`;
      } else {
        code += `\t${vars[index]} = ${v};\n`;
      }
    });

    code += `}\n\n`;

    return code;
  }

  const getStack = (stack) => {

    var code = '';

    /* 
        To handle variables calling functions that take arguments args_list will keep 
        track of arguments that all functions take, so if you have:
    
            - void foo(a, b) {},
            - int bar(c, d),
   
        args_list will have:
    
            - args_list['foo'] =  'a, b'
            - args_list['bar'] = 'c, d'
    */
    var args_list = [];

    /* Iterate through each stack frame */
    stack.forEach((stackframe, index) => {

      var local = '';
      var classes = '';
      var ret = '';
      var args = getStackArgs(stackframe);

      /* add arguments to args_list to display by appropriate variable */
      args_list[stackframe.name] = args;

      var temp = stackframe.name.split(' ');

      var type = temp[0];
      var name = temp[1];

      const primitives = ['int', 'double', 'boolean', 'float', 'char', 'pointer', 'array'];

      /* Iterate through each local variable */
      stackframe.local.forEach(loc => {

        if (!primitives.includes(loc.type)) {

          var class_vars = getClassVars(loc.value);
          classes += getClassCode(loc.type, loc.value);

          if (class_vars !== '') {
            local += `\t${loc.type} ${loc.name} (${class_vars});\n`;
          } else {
            local += `\t${loc.type} ${loc.name};\n`;
          }
        } else {

          if(loc.type === 'array') {

            var array_contents = '';

            loc.value.forEach((item, index) => {
              if(index === 0) {
                array_contents += `${item.value}`;
              } else {
                array_contents += `, ${item.value}`;
              }
            })

            local += `\t${loc.type} ${loc.name} = [${array_contents}];\n`;

          } else if(loc.type !== 'pointer') {

            if(loc.arrows.length) {
              loc.arrows.forEach(arrow => {
                var start = arrow.start.split('-');
                var end = arrow.end.split('-');

                if(start !== "") {
                  local += `\t${loc.type} *${start[1]} = ${end[1]};\n`
                }
              })
            }

            /* If loc.return has been set... */
            if (loc.return !== '') {

              /* If loc.return is set to return, this is variable being returned in this function */
              if (loc.return === 'return') {
                ret = `\treturn ${loc.name};\n`;
              } else {
                /* If its set to anything else, it is getting its value from a function call */

                /* Get args for this function call */
                var vars = args_list[loc.return];
                local += `\t${loc.type} ${loc.name} = ${loc.return}(${vars});\n`;
              }
            } else {
              /* If loc.return has NOT been set... */
              local += handleVariableType(loc.value, loc.type, loc.name);
            }
          }
        }
      });

      code += classes;

      /* format function header */
      var func = `${type} ${name}(${args}) {\n`;
      code += func;


      code += local;

      /* If the return type isnt void append return statemtn... */
      if (type !== 'void') {
        code += ret;
      }

      if (index !== (stack.length - 1)) {
        code += `}\n\n`;
      } 
    });

    return code;
  }

  const getHeap = (heap) => {

    var code = '';

    console.log(heap);
  
    heap.forEach(item => {
      if(item) {
        if(item.arrows.length) {
          item.arrows.forEach(arrow => {
            var start = arrow.start.split('-');
            var end = arrow.end.split('-');
    
            if(start !== "") {
              code += `\t${item.type} *${start[1]} = ${end[1]};\n`
            }
          })
        }
      }
    })

    return code;
  }

  const getStatic = (stat) => {

    console.log('static.......')
    console.log(stat);
    var code = '';
    
    stat.forEach(variable => {
      console.log(variable);
      if(variable) {
        if(variable.value === '???') {
          code += `static ${variable.type} ${variable.name};\n`;
        } else if(variable.type === 'array') {

            var array_contents = '';

            variable.value.forEach((item, index) => {
              if(index === 0) {
                array_contents += `${item.value}`;
              } else {
                array_contents += `, ${item.value}`;
              }
            })
            code += `static ${variable.type} ${variable.name} = [${array_contents}];\n`;
        } else {
          code += `static ${variable.type} ${variable.name} = ${variable.value};\n`;
        }
      }
    }) 

    return code;
  }

  /*  
      Generates the code that represents the drawn diagram
   
      Current concerns: 
          - AR diagrams are 'dumb', as they were taught they can't entirely represent the 
              code they may have originally come from on their own
          
          - To make AR to Code meaningful (with what sorts of things I think would make it 
              meaningful to follow) will have to break away a bit from how we were taught to 
              make AR diagrams, which is my overall concern
   
          - Number of things that can't be reconstructed from an AR diagram without breaking 
              from how we were taught to make AR diagrams.
   
          - Some examples of things I think would make AR to Code more meaningful that AR 
              diagrams can't illustrate on their own, without these it would, I think, be 
              just one big main function. Right now as I'm seeing it these are all totally
              solvable if we break from how we were taught to draw AR diagrams.
   
              On their own, how can AR diagrams: 
              - Know if you are in a loop?
              - Know if a variable is calling a function. I think this is probably the biggest
                   concern. Without this the AR to Code conversion would essentially be limited 
                   to just one large function. This is because, while AR diagrams indicate 
                   that a function call happens, they do not really have any hard indication of 
                   what is calling that function, you could infer based on argument values 
                   matching another functions local variables, but I personally think this is  
                   not exactly one of the best possible solutions.
                   
                   Further function related problems:
                      - What variable it returns?
                      - What type is the return variable?
                      - What arguments were actually passed to it from caller?
   
                      i.e. you have:
   
                          int foo(e, f) {
                              ...
                          }
   
                          int main() {
                              int a = 0;
                              int b = 0;
                              int c = foo(a, b);
                          }
   
                  - How about if just numbers were passed to the function?
                          
                      i.e. you have:
   
                          int foo(e, f) {
                              ...
                          }
   
                          int main() {
                              int c = foo(10, 20);
                          }
  */
  const generateCode = () => {

    const { stack, heap, stat } = props;

    var code = '';

    /* Need a deep copy of stack to show code in proper order while preserving stack */
    var temp_stack = reverseArray(stack);
    var temp_static = reverseArray(stat);
    var temp_heap = reverseArray(heap);

    /* not implemented rn */
    code += getStatic(temp_static);

    /* gets all stack information */
    code += getStack(temp_stack);

    /* not implemented rn */
    code += getHeap(temp_heap);

    code += `\treturn 0\n}`;

    props.generateCode(code);
  }

  const displayExtraInfo = () => {
    props.toggleDrawInfo();
  }
    const { stack, heap, stat, classes } = props;
    const { stackOpen, heapOpen, staticOpen, drawInfoOpen, arrowConnectionPointsOpen, onClassesChange } = props;
    return (
      <div id="drawArea" >

        <div className='diagram-panel-header'>
          <Toggalable toggle={drawInfoOpen} alt={null}>
            <button className='btn' onClick={generateCode}>Generate Code</button>
          </Toggalable>

          <Toggalable toggle={!drawInfoOpen} alt={null}>
            <button className='btn' onClick={displayExtraInfo}>Fill in Extra Information</button>
          </Toggalable>
        </div>

        <div className='drawing-panel'>
          <DrawingIcons
            spawnAnchor={props.spawnAnchor}
            classList={classes}
            onClassListChange={onClassesChange}
            showButton={true}
          />
          <div className='drawing-area'>

            <Toggalable toggle={heapOpen} alt={null}>
              <div className="drawSection" id="heapArea">
                <DroppableHeap
                  heap={heap}
                  classes={classes}
                  handleDrop={handleHeapChange}
                  drawInfoOpen={drawInfoOpen}
                />
              </div>
            </Toggalable>

            <Toggalable toggle={stackOpen} alt={null}>
              <div className="drawSection" id="stackArea">
                
                <DroppableStack
                  value={stack}
                  classes={classes}
                  handleDrop={handleStackChange}
                  drawInfoOpen={drawInfoOpen}
                />
              </div>
            </Toggalable>

            <Toggalable toggle={staticOpen} alt={null}>
              <div className="drawSection" id="staticArea">
                <DroppableStatic
                  stat={stat}
                  handleDrop={handleStaticChange}
                  drawInfoOpen={drawInfoOpen}
                />
              </div>
            </Toggalable>

          </div>
        </div>
      </div>
    );
  }

export default ARDiagramDrawArea;