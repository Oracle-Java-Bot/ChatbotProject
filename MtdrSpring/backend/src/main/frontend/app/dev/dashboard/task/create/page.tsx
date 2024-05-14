"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(false); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(true);
  const trueCenter = false;

  const task = {
    id: 1,
    dev: "Oswaldo",
    title: "Database Connection",
    description:
      "Create connection between app and database. Estable a secure connection between the app and the database.",

    priority: "Low",
    notes: "Configure connection parameters and error handlers",
  };

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

      <div /* Top Wrapper */ className={`${r.wrapper} ${s.titleFlex}`}>
        <div className={`${s.topTitle} font-bold`}>Create Task</div>{" "}
        <div className={"text-gray-600"}>#Team 2</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.createBody}>
          <div className={s.cat}>Name:</div>
          <input className={s.input} type="text" />
          <div className={s.cat}> Description: </div>
          <input className={s.input} type="text" />
          <div className={s.cat}> Notes: </div>
          <input className={s.input} type="text" />
          <div>
            <div className={s.cat}> Select Priority: </div>
            <select className={s.input}>
              <option>Low</option>
              <option selected>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <div className={`${s.doublebtn} !bg-black p-2`}>
          <img src="/icons/back.png" className={`${s.backIcon} !ml-3 !mr-4`} />

          <button className={`${s.btn} ${s.custom} !bg-white !text-black`}>
            Preview Task
          </button>
        </div>
      </div>
    </div>
  );
}
