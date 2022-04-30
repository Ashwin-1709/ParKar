import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function ServiceList({ddlist,checkListHandler}) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    
  };
  

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {ddlist.map((value,idx) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem
            key={value}
            disablePadding

          >
            {checkListHandler(checked)}
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense >
              <ListItemIcon disablePadding>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  
                  inputProps={{ 'aria-labelledby': labelId }}
                  disablePadding
                />
              </ListItemIcon>
              
              <ListItemText id={labelId} primary={`${ddlist[idx].serviceName}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}