// client/src/components/navbar/CountdownTimer.jsx
import { useEffect, useState } from "react";

const ELECTION_END = new Date("2026-05-19T18:00:00"); // adjust to your actual end date

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = ELECTION_END - new Date();
      if (diff <= 0) {
        setEnded(true);
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  if (ended) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium">
        Voting closed
      </div>
    );
  }

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {pad(timeLeft.d)}d : {pad(timeLeft.h)}h : {pad(timeLeft.m)}m : {pad(timeLeft.s)}s
    </div>
  );
};

export default CountdownTimer;