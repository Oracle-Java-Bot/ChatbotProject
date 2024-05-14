"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./page.module.css";
import r from "./responsive.module.css";
import Link from "next/link";

export default function Home() {
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
        <div className={s.mainCont}>
          <img className={s.oracle_o} src="/oracle_o.webp" alt="Oracle O" />
          <div className={s.bold}>OracleBOT</div>
          <div>{"Let's boost productivity and manage your workload"}</div>

          <Link href={"/login"} className={s.btn}>
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
