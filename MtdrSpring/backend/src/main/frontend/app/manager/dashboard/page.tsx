"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../responsive.module.css";
import s from "./dashboard.module.css";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(false); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(false);
  /* Only for when using the body container without wrappers */
  const trueCenter = false;
  /* Center Distributes evenly, when only one is rendered it moves it to the top */
  /* Hence why we need true center*/

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

      <div /* Top Wrapper */ className={r.wrapper}>
        <div>Welcome Oswaldo</div> <div>Team 2</div>
        <div>Manager </div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        mainBody
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        bottom
      </div>
    </div>
  );
}
