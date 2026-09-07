"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Item={label:string; count?:number};
export function GooeyNav({items,value,onChange,className}:{items:Item[];value:number;onChange:(value:number)=>void;className?:string}){
 return <div className={cn("inline-flex rounded-full bg-zinc-100 p-1 dark:bg-zinc-900",className)}>{items.map((item,i)=><button key={item.label} onClick={()=>onChange(i)} className="relative rounded-full px-4 py-2 text-xs font-semibold text-zinc-500 outline-none transition-colors dark:text-zinc-400">{i===value&&<motion.span layoutId="rare-nav-active" className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white"/>}<span className={cn("relative z-10",i===value&&"text-white dark:text-zinc-950")}>{item.label}{item.count!==undefined&&<span className="ml-1.5 opacity-50">{item.count}</span>}</span></button>)}</div>
}
