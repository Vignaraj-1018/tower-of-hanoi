"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {

    const [name, setName] = useState(String);
    const [userData, setUserData]:any[] = useState();

    const getUserData = (_name:any) =>{
        if (!_name){
            return;
        }

        setUserData(null)

        axios.get("https://api.vignaraj.in/toh/all/"+_name)
            .then((resp:any)=>{
                // console.log(resp.data);
                setUserData(resp.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    const handleSubmit = () => {
        // console.log('Name:', name);
        getUserData(name);
    }

    useEffect(()=>{
        let name = sessionStorage.getItem('name');
        if (name){
            setName(name);
            getUserData(name);
        }
    },[]);

    const formatTime = (time:any) => {
        const seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
        const minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
        const hours = Math.floor(time / 3600000);
        return `${hours}:${minutes}:${seconds}`;
    };

    
    return (
        <div className="flex w-full h-full items-center sm:p-10 py-10 px-5 gap-10 flex-col">
            
            <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-row gap-2 items-center">
                    <p className="flex text-2xl font-semibold">Enter your name: </p>
                    <input type="text" name="name" id="name" className="flex bg-none border-2 rounded-lg bg-secondary border-secondary p-2 text-center" placeholder="Enter you Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <button type="submit" className="flex bg-accent rounded-lg p-2 hover:shadow-2xl text-white select-none w-32 justify-center text-xl font-semibold" onClick={handleSubmit}>Fetch</button>
            </div>

            <div className="flex flex-col gap-5 items-center">
                <p className="flex text-3xl font-semibold underline underline-offset-2 select-none">Your History</p>
                <table>
                    <thead className="select-none">
                        <tr className="border-2 border-accent bg-accent text-white">
                            <th className="border-2 border-accent p-2 w-32">Duration</th>
                            <th className="border-2 border-accent p-2 w-32">Disks</th>
                            <th className="border-2 border-accent p-2 w-32">Moves</th>
                            <th className="border-2 border-accent p-2 w-32">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData?.map((item:any,key:number)=>(
                            <tr key={key}>
                                <td className="border-2 border-accent p-2 w-32">{formatTime(item.duration)}</td>
                                <td className="border-2 border-accent p-2 w-32">{item.discs}</td>
                                <td className="border-2 border-accent p-2 w-32">{item.moves}</td>
                                <td className="border-2 border-accent p-2 w-32">{item.score}</td>
                            </tr>
                        ))}
                        {!userData && name &&
                            <tr>
                                <td className="border-2 border-accent p-2 text-center text-2xl font-semibold" colSpan={4}>Loading...</td>
                            </tr>
                        }
                        {!name &&
                            <tr>
                                <td className="border-2 border-accent p-2 text-center text-2xl font-semibold" colSpan={4}>Enter your name to get History</td>
                            </tr>
                        }
                        {userData?.length == 0 && 
                            <tr>
                                <td className="border-2 border-accent p-2 text-center text-2xl font-semibold" colSpan={4}>
                                    No Existing Data...
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                
                <p className="flex text-xl font-semibold">
                    <a href="/" className="text-accent hover:underline underline-offset-2 select-none">Click Here to Play</a>
                </p>
            </div>

        </div>
    );
}