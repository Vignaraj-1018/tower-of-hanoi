"use client"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function count({params: { count }}: {params: { count: number }}) {

    
    const [stack1, setStack1] = useState([1, 3, 4, 6]);
    const [stack2, setStack2] = useState([2, 5]);
    const [stack3, setStack3] = useState([7, 8, 9]);

    const [draggedItem, setDraggedItem] = useState(Number);
    const [draggedStack, setDraggedStack] = useState(String);
    
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

    const getWidthForDisc = (item:number) =>{
        return (item * 25) + 'px';
    }

    const getDragCondition = (key:number) =>{
        if (key == 0){
            return true;
        }
        else{
            return false;
        }
    }


    return (
        <div className="flex w-full h-full items-center sm:p-10 py-10 gap-10 flex-col">

            <div className="flex h-[40rem] sm:w-4/5 w-full flex-col items-center gap-5">

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-2xl font-semibold">Time:</div>
                    <div className="text-2xl font-semibold">01:00</div>
                    <div className="text-2xl font-semibold">Moves:</div>
                    <div className="text-2xl font-semibold">10</div>
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
                    <div className="flex h-1/6 w-full justify-center items-center text-2xl font-semibold">Number of Discs: {count}</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}