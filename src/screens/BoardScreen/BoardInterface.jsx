import { useState} from 'react'
import { Grid } from '@mui/material'
import BoardTab from './BoardTab';
import AddTaskModal from './AddTaskModal';

const tabs ={ todos: 'Todos', isProgress: 'In Progress', completed: 'Completed' }


const BoardInterface = () => {
    const [addTaskTo, setAddTaskTo]= useState('')
    return(
        <>
        {!!addTaskTo  && (<AddTaskModal tabName={tabs[addTaskTo]} onClose={() => setAddTaskTo("")} />
        )}
        <Grid container px={4} mt={2} spacing={2}>
            {Object.keys(tabs).map(tab => (
            <BoardTab 
            key = {tab} 
            name={tabs[tab]} 
            addTask={() => setAddTaskTo(tab)} 
            />
            ))}
        </Grid>
        </>
    );
};

export default BoardInterface;