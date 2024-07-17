"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Count({params: { count }}: {params: { count: number }}) {

    
    const [stack1, setStack1] = useState([1]);
    const [stack2, setStack2] = useState([2]);
    const [stack3, setStack3] = useState([3]);

    const [draggedItem, setDraggedItem] = useState(Number);
    const [draggedStack, setDraggedStack] = useState(String);

    const [moves, setMoves] = useState(0);
    
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    const [timer,setTimer]:any = useState();

    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [name, setName] = useState(String);
    const router = useRouter();

    useEffect(()=>{
        prepateBoard();
    },[]);

    const timerStart = () => {
        if (isRunning) return;
        setIsRunning(true);
        let timeoutId = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
        }, 10);
        setTimer(timeoutId);
    };

    const formatTime = (time:any) => {
        const seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
        const minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
        const hours = Math.floor(time / 3600000);
        return `${hours}:${minutes}:${seconds}`;
    };

    const prepateBoard = () => {
        // console.log("prepareBoard")
        let boardData:any = sessionStorage.getItem('boardData');
        if (boardData) {
            boardData = JSON.parse(boardData);
            // console.log(boardData);
            setStack1(boardData[0]);
            setStack2(boardData[1]);
            setStack3(boardData[2]);
        }
        else{
            router.push('/');
        }


    }
    
    const handleDragStart = (e:any) => {
        let id = e.target.id.split('-');
        setDraggedItem(parseInt(id[1]));
        setDraggedStack(id[0]);
    };

    const handleDragOver = (e:any) => {
        e.preventDefault();
    };

    const handleDrop = (e:any) => {
        e.preventDefault();

        if (checkDragAndDrop(e.target.id)){
            dragAndDrop(e.target.id);
            setMoves(moves + 1);
            timerStart();
        }
        else{
            toast.warning('Invalid Move!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }

    };

    const checkDragAndDrop = (dropStackId:string) =>{
        if(dropStackId.length>1){
            return false;
        }
        if (dropStackId == draggedStack){
            return false;
        }
        else if (dropStackId == '1' && stack1[0] < draggedItem){
            return false;
        }
        else if (dropStackId == '2' && stack2[0] < draggedItem){
            return false;
        }
        else if (dropStackId == '3' && stack3[0] < draggedItem){
            return false;
        }
        return true;
    }

    const dragAndDrop = (dropStackId:string) =>{
        if (dropStackId == '1'){
            let stack = [...stack1];
            stack.unshift(draggedItem);
            setStack1(stack);
        }
        else if (dropStackId == '2'){
            let stack = [...stack2];
            stack.unshift(draggedItem);
            setStack2(stack);
        }
        else if (dropStackId == '3'){
            let stack = [...stack3];
            stack.unshift(draggedItem);
            setStack3(stack);
        }

        if (draggedStack == '1'){
            setStack1([...stack1.slice(1, stack1.length)]);
        }
        else if (draggedStack == '2'){
            setStack2([...stack2.slice(1, stack2.length)]);
        }
        else if (draggedStack == '3'){
            setStack3([...stack3.slice(1, stack3.length)]);
        }
    }

    useEffect(()=>{
        if(isRunning){
            checkGameOverState();
        }
    },[stack1,stack2,stack3]);

    const checkGameOverState = () =>{
        // console.log("Checking game over");
        // console.log(stack1);
        // console.log(stack2);
        // console.log(stack3);
        if ((stack1.length == 0 && stack2.length == 0) || (stack1.length == 0 && stack3.length == 0) || (stack2.length == 0 && stack3.length == 0)){
            // console.log("Game over");
            clearInterval(timer);
            setGameOver(true);
            let score = 5000 - (moves * 5) - (time / 2000);
            setScore(score);
            toast.success('Success, You Won!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const getWidthForDisc = (item:number) =>{
        return (item * 10) + '%';
    }

    const getDragCondition = (key:number) =>{
        if (key == 0 && !gameOver){
            return true;
        }
        else{
            return false;
        }
    }

    const handleSubmit = () =>{
        // console.log(name, moves, time, score);
        let data = {
            name: name,
            moves: moves,
            duration: time,
            score: score,
            discs: count
        }
        axios.post("https://helper-api-vignu.el.r.appspot.com/toh/save", data)
            .then((response) => {
                // console.log(response);
                toast.success('Game Saved!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
                sessionStorage.removeItem('boardData');
                sessionStorage.setItem('name', name);
                router.push('/profile');
            })
           .catch((error) => {
                console.log(error);
           });
    }

    const handleClose = () =>{
        router.push('/');
    }


    return (
        <div className="flex w-full h-full items-center sm:p-10 py-10 gap-10 flex-col">

            <div className="flex h-[40rem] sm:w-4/5 w-full flex-col items-center gap-5">

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-2xl font-semibold">Time:</div>
                    <div className="text-2xl font-semibold">{formatTime(time)}</div>
                    <div className="text-2xl font-semibold">Moves:</div>
                    <div className="text-2xl font-semibold">{moves}</div>
                </div>

                <div className="flex flex-col sm:w-4/5 w-full sm:border-2 border-secondary rounded-lg h-full sm:p-10">
                    <div className="flex flex-row h-5/6 w-full gap-4">
                        <div id='1' className="flex h-full w-full bg-secondary rounded-xl p-4 flex-col justify-end items-center gap-1 select-none" onDragOver={handleDragOver} onDrop={handleDrop}>
                            {stack1.map((item, key)=>(
                                <div id={'1-'+item.toString()} key={key} className="flex h-8 justify-center text-xl font-semibold rounded-lg border-2 border-accent cursor-grab" draggable={getDragCondition(key)} onDragStart={handleDragStart} style={{width:getWidthForDisc(item)}}>{item}</div>
                            ))}
                        </div>
                        <div id='2' className="flex h-full w-full bg-secondary rounded-xl p-4 flex-col justify-end items-center gap-1 select-none" onDragOver={handleDragOver} onDrop={handleDrop}>
                            {stack2.map((item, key)=>(
                                <div id={'2-'+item.toString()} key={key} className="flex h-8 justify-center text-xl font-semibold rounded-lg border-2 border-accent cursor-grab" draggable={getDragCondition(key)} onDragStart={handleDragStart} style={{width:getWidthForDisc(item)}}>{item}</div>
                            ))}
                        </div>
                        <div id='3' className="flex h-full w-full bg-secondary rounded-xl p-4 flex-col justify-end items-center gap-1 select-none" onDragOver={handleDragOver} onDrop={handleDrop}>
                            {stack3.map((item, key)=>(
                                <div id={'3-'+item.toString()} key={key} className="flex h-8 justify-center text-xl font-semibold rounded-lg border-2 border-accent cursor-grab" draggable={getDragCondition(key)} onDragStart={handleDragStart} style={{width:getWidthForDisc(item)}}>{item}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex h-1/6 w-full justify-center items-center text-2xl font-semibold">Number of Disks: {count}</div>
                </div>
            </div>

            {gameOver && <div className="flex items-center justify-center fixed inset-0 z-30 w-full h-full bg-[#00000085]">
                <div className="flex flex-col h-1/2 w-2/3 bg-primary text-2xl font-semibold rounded-xl p-10">
                    <div className="flex w-full justify-end cursor-pointer" onClick={handleClose}>X</div>
                    <div className="flex flex-col items-center gap-10">
                        <div className="flex flex-col gap-5 items-center">
                            <p className="flex">Game Over!</p>
                            <p className="flex gap-2">Your Score: <span className="flex font-bold text-2xl">{score.toFixed(0)}</span></p>
                        </div>
                        <div className="flex flex-col items-center gap-10">
                            <p className="flex">Enter your name to save the score</p>
                            <input type="text" name="name" id="name" className="flex bg-none border-2 rounded-lg bg-secondary border-secondary p-2 text-center" placeholder="Enter you Name" onChange={(e)=>setName(e.target.value)}/>
                            <button type="submit" className="flex bg-accent rounded-lg p-2 hover:shadow-2xl text-white select-none" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>}
            <ToastContainer />
        </div>
    );
}