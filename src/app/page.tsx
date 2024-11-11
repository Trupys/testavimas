"use client"

import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import {
  Copyright,
  Instagram,
  Send,
} from "lucide-react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const CountdownTimer: React.FC = () => {
  // Set your target date here (Year, Month (0-11), Day, Hour, Minute)
  const TARGET_DATE = new Date('2025-01-01T00:00:00Z').getTime();
  
  // Initialize state as null to handle SSR
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  function calculateTimeLeft(): TimeLeft {
    const now: number = Date.now();
    const difference: number = TARGET_DATE - now;
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Initial calculation
    const initial = calculateTimeLeft();
    setTimeLeft(initial);
    // Set up interval
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  // Handle SSR
  if (!mounted || !timeLeft) {
    return null; // Or a loading state
  }

  if (!mounted || !timeLeft) {
    return null; // Or a loading state
  }

  const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-black text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
  return (
    <main className="flex flex-col md:gap-20 lg:gap-28 md:flex-row md:items-center min-h-[calc(100vh-3.5rem)] min-w-[375px] px-4 md:px-8">
      <section className="hidden md:flex md:flex-col justify-center gap-4 md:gap-10 items-center md:w-12 py-4 md:py-0">
        <h2 className="md:-rotate-90 tracking-widest text-sm md:text-base whitespace-nowrap">
          Socials
        </h2>
        <Separator
          orientation="vertical"
          className="hidden md:block h-20 bg-black"
        />
        <Link href="">
          <Instagram className="transition-all hover:scale-125" />
        </Link>
        <Link href="">
          <Send className="transition-all hover:scale-125" />
        </Link>
      </section>

      <section className="flex-1 h-full w-full flex flex-col items-center justify-center">
        <div className="h-full flex flex-col flex-1 items-center md:items-start justify-center gap-10 w-full max-w-2xl">
          <div className="flex flex-col gap-3 text-center md:text-left w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Coming Soon
            </h1>
          </div>

          <div className="flex gap-4 w-full justify-center">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </section>

      <section className="flex md:hidden justify-center gap-4 items-center w-full py-4">
        <h2 className="tracking-widest text-sm md:text-base">
          Socials
        </h2>
        <Link href="">
          <Instagram className="transition-all hover:scale-125" />
        </Link>
        <Link href="">
          <Send className="transition-all hover:scale-125" />
        </Link>
      </section>

      <section className="flex md:flex-col justify-center gap-4 items-center md:w-12 py-4 md:py-0">
        <h2 className="md:-rotate-90 tracking-widest w-auto md:w-80 flex justify-center items-center gap-4 whitespace-nowrap">
          <Copyright size={16} /> 2025 Vhija
        </h2>
      </section>
    </main>
  );
};

export default CountdownTimer;