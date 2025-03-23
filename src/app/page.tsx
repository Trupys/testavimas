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
  const TARGET_DATE = new Date('2025-05-01T22:00:00Z').getTime();
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

    const initial = calculateTimeLeft();
    setTimeLeft(initial);
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted || !timeLeft) {
    return null;
  }

  const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-black text-white rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-bold">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs md:text-sm mt-2">{label}</span>
    </div>
  );

  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Desktop social sidebar */}
      <section className="hidden md:flex h-full fixed left-0 flex-col justify-center gap-10 items-center w-12 py-4">
        <h2 className="-rotate-90 tracking-widest text-base whitespace-nowrap">
          Socials
        </h2>
        <Separator
          orientation="vertical"
          className="h-20 bg-black"
        />
        <Link href="">
          <Instagram className="transition-all hover:scale-125" />
        </Link>
        <Link href="">
          <Send className="transition-all hover:scale-125" />
        </Link>
      </section>

      {/* Main content */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-12">
        <div className="flex flex-col gap-10 w-full max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Under development
          </h1>

          <div className="flex gap-2 md:gap-4 w-full justify-center">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </section>

      {/* Mobile social footer */}
      <section className="md:hidden flex justify-center gap-4 items-center py-4 -translate-y-40">
        <h2 className="tracking-widest text-sm">
          Socials
        </h2>
        <Link href="">
          <Instagram className="transition-all hover:scale-125" />
        </Link>
        <Link href="">
          <Send className="transition-all hover:scale-125" />
        </Link>
      </section>

      {/* Copyright section */}
      <section className="flex justify-center items-center py-4 -translate-y-40 md:fixed md:-right-7 md:top-1/2 md:-rotate-90 md:-translate-y-1/2">
        <h2 className="tracking-widest text-sm flex items-center gap-2 md:items-center">
          <Copyright size={16} className="md:rotate-90" /> 2025 Vhija
        </h2>
      </section>
    </main>
  );
};

export default CountdownTimer;