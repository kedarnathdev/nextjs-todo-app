"use client";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
export function AnimatedCounter({value,className}:{value:number;className?:string}){
 const spring=useSpring(value,{stiffness:180,damping:24}); const text=useTransform(spring,v=>Math.round(v).toLocaleString("en-IN"));
 useEffect(()=>spring.set(value),[value,spring]);
 return <motion.span className={className}>{text}</motion.span>
}
