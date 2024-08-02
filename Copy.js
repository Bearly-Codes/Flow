import React, { useState, useEffect } from 'react';
import LeftPanel from './LPanel/LeftPanel';
import TopPanel from './TPanel/TopPanel';
import CenterPanel from './CPanel/CenterPanel';
import BottomPanel from './BPanel/BottomPanel';
import Todo from './Backend/Todo';

const App = () => {
    const [taskList, setTaskList] = React.useState([]);
    const [currentTask, setCurrentTask] = React.useState(null);

    const taskProps = {
        taskList,
        setTaskList,
        currentTask,
        setCurrentTask,
    };

    useEffect(() => {
        window.electron.loadTasks().then((tasks) => {
            setTaskList(tasks);
        })
    }, []);    
    
    // Save tasks on change

    useEffect(() => {
        window.electron.saveTasks(taskList);
    }, [taskList]);


    return (
        <div style={
            {
                backgroundColor: '#ffffff',
                width: '100vw', // Fill the entire viewport
                height: '100vh',
                position: 'absolute',
                display: 'flex',
                // Fill the entire viewport
            }}>
            <div style={{
                flexBasis: '20%',
            }}>
                <LeftPanel {...taskProps}/>
            </div>
            <div style={{
                flexBasis: '80%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <TopPanel />
                <CenterPanel {...taskProps} />
                <BottomPanel {...taskProps}/>
            </div>
        </div>
    );
};

export default App;