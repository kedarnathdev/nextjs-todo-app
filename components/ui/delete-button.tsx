"use client";
import { AnimatePresence,motion } from "motion/react";
import { useState } from "react";
export function DeleteButton({onConfirm}:{onConfirm:()=>void}){
 const [open,setOpen]=useState(false);
 return <motion.div animate={{width:open?112:40}} className="relative h-10 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"><button type="button" onClick={()=>setOpen(v=>!v)} className="absolute left-0 top-0 z-10 grid h-10 w-10 place-items-center rounded-full text-zinc-500 hover:text-red-500" aria-label="Delete">{open?"×":"⌫"}</button><AnimatePresence>{open&&<motion.div initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:12}} className="absolute right-1 top-1 flex gap-1"><button type="button" onClick={()=>{onConfirm();setOpen(false)}} className="grid h-8 w-8 place-items-center rounded-full bg-red-500 text-white" aria-label="Confirm delete">✓</button><button type="button" onClick={()=>setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-white text-zinc-500 dark:bg-zinc-800" aria-label="Cancel">×</button></motion.div>}</AnimatePresence></motion.div>
}
