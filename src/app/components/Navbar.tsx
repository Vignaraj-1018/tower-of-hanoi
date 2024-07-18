"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import profile_img from "../../../public/profile-icon.svg";

function Navbar() {
    const router = useRouter();
    return (
        <div className="flex p-4 justify-between shadow-lg z-50 relative select-none">
            <p className="flex text-4xl font-bold cursor-pointer" onClick={()=>(router.push('/'))}>
                Tower of Hanoi
            </p>
            <div className="flex flex-row gap-3 cursor-pointer items-center hover:underline underline-offset-2 hover:text-accent" onClick={()=>(router.push('/profile'))} >
                <p className="sm:flex hidden text-2xl font-semibold ">Profile</p>
                <Image src={profile_img} alt="Profile" width={40} height={40}/>
            </div>
        </div>
    );
}

export default Navbar;