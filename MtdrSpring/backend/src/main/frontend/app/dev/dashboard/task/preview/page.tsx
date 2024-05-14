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
        <div className={`${s.topTitle} font-bold`}>Preview Task</div>{" "}
        <div className={"text-gray-600"}>#Team 2</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainBody}>
          <div className="flex justify-between">
            <div className={s.title}> {task.title}</div>
            <div className={`${s.priority} bg-green-400`}>{task.priority}</div>
          </div>
          <div className={`${s.fastFadeIn} !text-gray-60"`}> {task.dev}</div>
          <div className={`${s.fastFadeIn} !pt-3`}> {task.description}</div>
          <div className={`${s.fastFadeIn} !font-bold pt-3`}> Notes</div>
          <div className={s.fastFadeIn}> {task.notes}</div>
        </div>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <button className={`${s.btn}  !bg-red-500`}> Create Task</button>
      </div>
    </div>
  );
}
