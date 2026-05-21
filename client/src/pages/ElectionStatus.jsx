// client/src/pages/ElectionStatus.jsx

import { useEffect, useState } from "react";
import axios from "axios";

const ELECTION_END = new Date("2026-05-19T18:00:00");

const ElectionStatus = () => {
  const [totalVotes, setTotalVotes] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/votes/stats"
        );
        setTotalVotes(data.totalVotes);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

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

  const pad = (n) => String(n).padStart(2, "0");

  const cards = [
    {
      label: "Election Status",
      value: ended ? "Closed" : "Live",
      color: ended ? "text-red-600" : "text-green-600",
      dot: ended ? "bg-red-500" : "bg-green-500",
      icon: "🗳️",
    },
    {
      label: "Total Votes",
      value:
        totalVotes === null
          ? "Loading..."
          : totalVotes.toLocaleString(),
      color: "text-blue-700",
      dot: "bg-blue-500",
      icon: "✅",
    },
    {
      label: "Time Remaining",
      value: ended
        ? "Voting ended"
        : `${pad(timeLeft.d)}d : ${pad(timeLeft.h)}h : ${pad(timeLeft.m)}m : ${pad(timeLeft.s)}s`,
      color: "text-purple-700",
      dot: "bg-purple-500",
      icon: "⏳",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          Live Election Tracking
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Election Status Dashboard
        </h1>

        <p className="text-gray-500">
          India General Election 2026 · Uttar Pradesh
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-2xl ${card.dot} bg-opacity-10 flex items-center justify-center text-xl`}>
                {card.icon}
              </div>

              <div className={`w-2.5 h-2.5 rounded-full ${card.dot} animate-pulse`} />
            </div>

            <p className="text-sm text-gray-500 mb-2">
              {card.label}
            </p>

            <p className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Election Timeline
          </h2>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live updates
          </div>
        </div>

        <div className="space-y-4">
          {[
            ["Nominations closed", "1 May 2026", true],
            ["Campaign period ended", "9 May 2026", true],
            ["Voting started", "10 May 2026", true],
            ["Voting ends", "19 May 2026", ended],
            ["Results declared", "20 May 2026", true],
          ].map(([label, date, done], i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-2xl px-4 py-4 transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    done ? "bg-green-100" : "bg-gray-200"
                  }`}
                >
                  {done ? "✓" : "•"}
                </div>

                <div>
                  <p className={`font-medium ${done ? "text-gray-900" : "text-gray-400"}`}>
                    {label}
                  </p>

                  <p className="text-xs text-gray-400">
                    {done ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                {date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectionStatus;