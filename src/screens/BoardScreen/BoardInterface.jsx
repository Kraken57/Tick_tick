import { useState} from 'react'
import { Grid } from '@mui/material'
import BoardTab from './BoardTab';
import AddTaskModal from './AddTaskModal';

const statusMap ={ todos: 'Todos', isProgress: 'In Progress', completed: 'Completed' }


const BoardInterface = () => {
    const [addTaskTo, setAddTaskTo]= useState('')
    return(
        <>
        {!!addTaskTo  && (<AddTaskModal tabName={statusMap[addTaskTo]} onClose={() => setAddTaskTo("")} />
        )}
        <Grid container px={4} mt={2} spacing={2}>
            {Object.keys(statusMap).map((status) => (
            <BoardTab 
            key = {status} 
            name={statusMap[status]} 
            addTask={() => setAddTaskTo(status)} 
            />
            ))}
        </Grid>
        </>
    );
};

export default BoardInterface;