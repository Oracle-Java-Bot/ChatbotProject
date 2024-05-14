"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../responsive.module.css";
import s from "./tasks.module.css";
import Link from "next/link";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(false); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(true);
  const trueCenter = false;

  const tasks = [
    {
      id: 1,
      dev: "Oswaldo",
      title: "Database Connection",
      description:
        "Create connection between app and database. Establish a secure connection between the app and the database.",
      priority: "Low",
      notes: "Configure connection parameters and error handlers",
    },
    {
      id: 2,
      dev: "Oswaldo",
      title: "User Authentication",
      description:
        "Implement user authentication functionality. Allow users to register, log in, and log out securely.",
      priority: "High",
      notes: "Use encryption for passwords and implement session management.",
    },
    {
      id: 3,
      dev: "Oswaldo",
      title: "Frontend Design",
      description:
        "Design user interface for the application. Create responsive layouts and intuitive user interactions.",
      priority: "Medium",
      notes: "Use modern UI frameworks and follow design best practices.",
    },
    // Add more tasks assigned to Oswaldo as needed
  ];

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
        <div className={`${s.topTitle} font-bold`}>Welcome Oswaldo!</div>{" "}
        <div className={` text-gray-600 `}>#Team 2</div>
      </div>
      <div className={s.sFont}>Developer</div>

      <div className={` ${s.sFont} flex justify-center gap-4 mt-4`}>
        <Link href="">Active</Link> ⎜<Link href="">History</Link>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainBody}>
          {tasks.map((task) => (
            <div key={task.id}>
              <div className={s.task}>
                <div>{task.title}</div>
                <div className={s.rightOpt}>
                  <div
                    className={
                      task.priority == "Low"
                        ? `${s.priorityIndicator} bg-green-500`
                        : task.priority == "Medium"
                        ? `${s.priorityIndicator}  bg-yellow-500 `
                        : `${s.priorityIndicator} bg-red-500`
                    }
                  />
                  <img className={s.icon} src="/icons/edit.png" />
                  <img className={s.icon} src="/icons/open.png" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      ></div>
    </div>
  );
}
