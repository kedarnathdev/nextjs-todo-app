"use client";
import { motion } from "motion/react";
export function StepPlayer({steps,value}:{steps:number;value:number}){
 const progress=steps?((value)/steps)*100:0;
 return <div className="flex items-center gap-2"><div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"><motion.div className="h-full rounded-full bg-zinc-950 dark:bg-white" animate={{width:`${progress}%`}} transition={{type:"spring",stiffness:160,damping:24}}/></div><span className="text-[11px] font-semibold text-zinc-400">{value}/{steps}</span></div>
}
