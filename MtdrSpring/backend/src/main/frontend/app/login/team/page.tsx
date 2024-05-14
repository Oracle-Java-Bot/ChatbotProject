"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import s from "../login.module.css";

import r from "../../responsive.module.css";
import Link from "next/link";

export default function Team() {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCentered = true;
  const trueCenter = true;
  const isFull = false;

  useEffect(() => {
    const webApp = (window as any).Telegram.WebApp;
    if (webApp) {
      setIsExpanded(webApp.isExpanded);
      webApp.expand();
    }
  }, []);

  return (
    <div
      /* Main Container */
      className={
        isCentered
          ? trueCenter
            ? `${r.telegramHeight} ${r.trueCenter}`
            : `${r.telegramHeight} ${r.centered}`
          : `${r.telegramHeight} ${r.top}`
      }
    >
      <script src="https://telegram.org/js/telegram-web-app.js"></script>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.title}> Welcome Oswaldo! </div>
        <div className={`${s.animation} "text-black"`}>
          Select a team to access dashboard
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="" className={`${s.btn} ${s.teamBtn} !bg-red-500 `}>
            Team1
          </Link>
          <Link href="" className={`${s.btn} ${s.teamBtn}  !bg-red-500`}>
            Team2
          </Link>
        </div>
        <Link href="" className={`${s.btn} ${s.teamBtn} bg-black`}>
          Access
        </Link>
      </div>
    </div>
  );
}
