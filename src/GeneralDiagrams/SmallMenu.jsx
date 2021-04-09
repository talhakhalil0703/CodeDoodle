import React from 'react';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

// should make this more robust later, rn specific to variable.js

export default function SmallMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [input, setInput] = React.useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = (str) => {
        setAnchorEl(null)
        if(props.arrowConnectionPointsOpen === true){
          props.toggleArrowConnectionPoints();
        }       
    };

    const convert = (newType) => {
      props.convertTo(newType, input);

      handleClose();
    }
  
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <SettingsIcon fontSize='small'/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={() => handleClose('delete')}>Delete Variable</MenuItem> */}
          <MenuItem onClick={() => convert('pointer')}>Make Pointer </MenuItem>
          <MenuItem onClick={() => props.toggleArrowConnectionPoints()}>Show Pointer </MenuItem>
          <MenuItem>
            Enter arrow target ID
            <input 
              style={{background:"lightGray"}} 
              autoComplete="off" 
              value={input} 
              onInput={e => setInput(e.target.value)}
            />
          </MenuItem>
          {/* <MenuItem onClick={() => handleClose('reference')}>Make Reference</MenuItem>
          <MenuItem onClick={() => handleClose('connection')}>Delete Connection</MenuItem> */}
        </Menu>
      </div>
    );
  }