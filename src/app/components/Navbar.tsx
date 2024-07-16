"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

function Navbar() {
    const router = useRouter();
    return (
        <div className="flex p-4 justify-between shadow-lg z-50 relative">
            <p className="flex text-4xl font-bold cursor-pointer select-none" onClick={()=>(router.push('/'))}>
                Tower of Hanoi
            </p>
            {/* <img src="profile-icon.svg" alt="Profile" className="flex h-10 w-10 cursor-pointer" onClick={()=>(router.push('/profile'))}/> */}
            <Image src={'profile-icon.svg'} alt="Profile" width={40} height={40} onClick={()=>(router.push('/profile'))} className="cursor-pointer"/>
        </div>
    );
}

export default Navbar;