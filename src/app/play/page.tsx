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
        prepateBoard();
        router.push(`/play/${number}`);
    }

    const prepateBoard = () => {
        let stack1:any = [], stack2:any = [], stack3:any = [];

        const numbers = Array.from({ length: number }, (_, index) => index + 1);

        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        numbers.forEach((num, index) => {
            const arrayIndex = index % 3;
            switch (arrayIndex) {
            case 0:
                stack1.push(num);
                break;
            case 1:
                stack2.push(num);
                break;
            case 2:
                stack3.push(num);
                break;
            }
        });

        console.log(stack1, stack2, stack3);

        let data = [stack1, stack2, stack3]
        sessionStorage.setItem('boardData',JSON.stringify(data));

    }

    return (
        <div className="flex w-full h-full items-center p-10 gap-10 flex-col">

            <div className="flex text-3xl font-semibold">Hello!</div>

            <div className="flex flex-row gap-10">
                <p className="flex text-2xl font-semibold">Select the Number of Discs:</p>
                <input type="number" name="number" id="number" min={3} max={10} className="border-secondary border-2 rounded-lg bg-secondary p-1" placeholder="discs" onChange={(e)=>setNumber(parseInt(e.target.value))}/>
            </div>

            <div className="flex bg-accent hover:shadow-xl text-3xl font-semibold p-2 rounded-lg cursor-pointer" onClick={handleStart}>Start</div>
            
        </div>
    );
}