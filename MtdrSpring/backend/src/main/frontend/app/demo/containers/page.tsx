"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./containers.module.css";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  /* The following will be used to change the layout dynamically*/
  /* On a page per page status, or depending on the isExpanded state*/
  const [isFull, setFull] = useState(false); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [trueCenter, setTrueCentered] = useState(false); /* Centers Everything */

  const [isBottom, setBottom] =
    useState(false); /* Pushes the bottom cont to the bottom*/
  /* True Center Only for when using the body container without wrappers */
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
            ? `${s.telegramHeight} ${s.trueCenter}`
            : `${s.telegramHeight} ${s.centered}`
          : `${s.telegramHeight} ${s.top}`
      }
    >
      <script src="https://telegram.org/js/telegram-web-app.js"></script>

      <div /* Top Wrapper */ className={s.wrapper}>
        <div className={s.topLine}>
          <div>Welcome Oswaldo</div> <div>Team 2</div>
        </div>
        <div>Developer </div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${s.body} ${s.full}` : `${s.body} ${s.fit}`
        }
      >
        <button className={s.btn} onClick={() => setFull(!isFull)}>
          toggleFull
        </button>
        <button className={s.btn} onClick={() => setCentered(!isCentered)}>
          toggleCentered
        </button>
        <button className={s.btn} onClick={() => setTrueCentered(!trueCenter)}>
          toggleTrueCenter
        </button>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${s.wrapper} ${s.bottom}` : s.wrapper}
      >
        <button className={s.btn} onClick={() => setBottom(!isBottom)}>
          toggleBottom
        </button>
      </div>
    </div>
  );
}
