"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";
import Lottie from "lottie-react";
import CheckAnimation from "../../../../../public/animations/check.json";
import Link from "next/link";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(true); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(false);
  const trueCenter = false;

  /* CURRENT USER */
  const [user, setUser] = useState<{
    id: number;
    name: string;
    //developer_id: number;
    //manager_id: string;
    team_id: number;
    role: string;
  }>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("user");
      setUser(JSON.parse(storedUserString || "[]"));
    }
  }, []);

  /* TASK LIST */
  const [tasks, setTasks] = useState<
    {
      id: number;
      title: string;
      description: string;
      priority: string;
      status: string;
      created_at: string;
      team: {
        id: number;
        name: string;
      };
      developer: {
        id: number;
        name: string;
        email: string;
      };
    }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasksString = localStorage.getItem(
        "team_" + user?.team_id
      );
      setTasks(JSON.parse(storedTasksString || "[]"));
    }
  }, [user]);

  /* CURRENT Task */
  const [currTask, setCurrTask] = useState("0");
  const [currentTask, setCurrentTask] = useState<{
    id: number;
      title: string;
      description: string;
      priority: string;
      status: string;
      created_at: string;
      team: {
        id: number;
        name: string;
      };
      developer: {
        id: number;
        name: string;
        email: string;
      };
  }>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCurrTask = localStorage.getItem("currentTask");
      setCurrTask(JSON.parse(storedCurrTask || "0"));

      setCurrentTask(
        tasks.find((task) => task.id == Number.parseInt(currTask))
      );
    }
  }, [tasks, currentTask]);
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
        <div className={`${s.topTitle} font-bold`}>Task updated</div>{" "}
        <div className={"text-gray-600"}>#Team {user?.team_id}</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={`${s.createdBody} `}>
          <Lottie
            className={s.animation}
            animationData={CheckAnimation}
            loop={false}
          />

          <div className={`${s.title} ${s.fadeIn}`}> {currentTask?.title}</div>

          <div className={`${s.fadeIn} "pt-3"`}>
            {"Task successfully updated! Let's keep going!"}
          </div>
        </div>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <Link href="/dev/dashboard" className={`${s.btn}  !bg-black`}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
