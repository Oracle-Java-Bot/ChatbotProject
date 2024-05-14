"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./login.module.css";
import r from "../responsive.module.css";
import Link from "next/link";

export default function Login() {
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
        <div className={s.title}> Credentials </div>
        <div className={s.cat}>Email:</div>
        <input className={s.input} type="text" />
        <div className={s.cat}> Password: </div>
        <input className={s.input} type="text" />
        <Link href="/login/team" className={s.btn}>
          Login
        </Link>
      </div>
    </div>
  );
}
