"use client"
import "./globals.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import axios from "axios";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const sendViewAnalytics=()=>{
    const url = "https://helper-api-vignu.el.r.appspot.com/my_website_analytics/website_view";
    const data ={
      "name":"Tower of Hanoi",
      "url":"https://tower-of-hanoi-vignu.vercel.app/"
    }
    axios.post(url,data)
    .then((resp:any)=>{
      // console.log(resp);
    })
    .catch((err:any)=>{
      console.log(err);
    });
  }

useEffect(()=>{
  const sessionData = sessionStorage.getItem("analyticsSent");
  if (sessionData){
    // console.log("old Session");
  }
  else{
    sendViewAnalytics();
    // console.log("new Session");
    sessionStorage.setItem("analyticsSent",JSON.stringify(true));
  }
},[]);
  
  return (
    <html lang="en">
      <body className="flex h-[100dvh] w-full flex-col justify-between bg-primary">
        <header>
          <Navbar/>
        </header>
        {children}
        <footer>
          <div className="flex flex-row h-8 bg-secondary text-black items-center justify-center">
              <p className="flex text-sm font-semibold gap-1">© Out of passion by, <a href="https://helper-api-vignu.el.r.appspot.com/redirect_links/redirect/6691475f7d0ad6b43299e5b9" target="_blank" className="flex">Vignaraj D</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
