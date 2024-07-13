"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function play() {
    const [number, setNumber] = useState(3);
    const router = useRouter();

    const handleStart = ()=>{
        console.log('handleStart', number);
        if (number < 3 || number > 10){
            alert('Invalid number');
        }
        router.push(`/play/${number}`);
    }
    return (
        <div className="flex w-full h-full items-center p-10 gap-10 flex-col">

            <div className="flex text-3xl font-semibold">Hello!</div>

            <div className="flex flex-row gap-10">
                <p className="flex text-2xl font-semibold">Select the Number of Discs:</p>
                <input type="number" name="number" id="number" min={3} max={10} className="border-secondary border-2 rounded-lg bg-transparent p-1" onChange={(e)=>setNumber(parseInt(e.target.value))}/>
            </div>

            <div className="flex bg-accent hover:shadow-xl text-3xl font-semibold p-2 rounded-lg cursor-pointer" onClick={handleStart}>Start</div>
            
        </div>
    );
}