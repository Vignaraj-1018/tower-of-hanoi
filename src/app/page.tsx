"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Play() {
    const [number, setNumber] = useState(3);
    const router = useRouter();

    const handleStart = ()=>{
        // console.log('handleStart', number);
        if (number < 3 || number > 10){
            toast.error('Invalid number!', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
          });
          return;
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

        // console.log(stack1, stack2, stack3);

        let data = [stack1, stack2, stack3]
        sessionStorage.setItem('boardData',JSON.stringify(data));

    }

    return (
        <div className="flex w-full h-full items-center p-10 gap-10 flex-col overflow-auto">

            <div className="flex text-3xl font-semibold">Hello!</div>

            <div className="flex flex-row gap-10">
                <p className="flex text-2xl font-semibold">Select the Number of Disks to Start:</p>
                <input type="number" name="number" id="number" min={3} max={10} className="border-secondary border-2 rounded-lg bg-secondary p-1" placeholder="disks" onChange={(e)=>setNumber(parseInt(e.target.value))}/>
            </div>

            <div className="flex bg-accent hover:shadow-xl text-3xl font-semibold p-2 rounded-lg cursor-pointer select-none" onClick={handleStart}>Start</div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border-2 border-accent w-2/3">
              
              <p className="flex underline underline-offset-2 text-2xl font-semibold justify-center">Help</p>
              <details open>
                <summary className="font-semibold underline underline-offset-2">How to play?</summary>
                <div className="flex flex-col gap-2">
                  <p className="flex">The objective of the puzzle is to arrange all the disks on single container (on any of the 3 containers) in descending order, obeying the following rules:</p>
                  <p className="flex">1. Only one disk may be moved at a time</p>
                  <p className="flex">2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.</p>
                  <p className="flex">3. No disk may be placed on top of a disk that is smaller than it.</p>
                </div>
              </details>

              <details>
                <summary className="font-semibold underline underline-offset-2">How score is calculated?</summary>
                <div className="flex flex-col gap-2">
                  <p className="flex">The score is calculated based on the amount of moves and the time (in seconds) spent to finish the game, it can be deducted by the following formula:</p>
                  <p className="flex">5000 - (moves * 5) - (secs/2)</p>
                </div>
              </details>

              <details>
                <summary className="font-semibold underline underline-offset-2">Origin of the game</summary>
                <div className="flex flex-col gap-2">
                  <p className="flex">According to Wikipedia the puzzle was introduced to the West by French mathematician Édouard Lucas in 1883.</p>
                  <p className="flex">Numerous myths about the puzzle&apos;s ancient and mystical nature emerged almost immediately, including one about an Indian temple at Kashi Vishwanath containing a large room with three aged poles surrounded by 64 golden disks.</p>
                  <p className="flex">Acting on the command of an ancient prophecy, the Brahmin priests have been moving these disks according to Brahma&apos;s immutable rules since that time.</p>
                  <p className="flex">The puzzle is therefore also known as the Tower of Brahma. According to legend, when the last move of the puzzle is completed, the world will end.</p>
                </div>
              </details>

            </div>
            <ToastContainer />
        </div>
    );
}