"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";
import Link from "next/link";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(false); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(true);
  const trueCenter = false;

  /* CURRENT USER */
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    password: string;
    developer_id: number;
    manager_id: string;
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
      developer_id: string;
      notes: string;
    }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasksString = localStorage.getItem(
        "team_" + user?.manager_id
      );
      setTasks(JSON.parse(storedTasksString || "[]"));
    }
  }, [user]);

  /* USER LIST */
  const [users, setUsers] = useState<
    {
      id: number;
      name: string;
      developer_id: string;
      manager_id: string;
    }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("users");
      setUsers(JSON.parse(storedUsers || "[]"));
    }
  }, [tasks]);

  /* CURRENT Task */
  const [currTask, setCurrTask] = useState("0");
  const [currentTask, setCurrentTask] = useState<{
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    developer_id: string;
    notes: string;
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
        <div className={`${s.topTitle} font-bold`}>Preview Task</div>{" "}
        <div className={"text-gray-600"}>#Team {user?.team_id}</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainBody}>
          <div className="flex justify-between">
            <div className={s.title}> {currentTask?.title}</div>
            <div className="flex">
              <div
                className={
                  currentTask?.status === "in-progress"
                    ? `${s.status} bg-yellow-500`
                    : `${s.status} bg-orange-500`
                }
              >
                {currentTask?.status}
              </div>
              <div
                className={
                  currentTask?.priority === "Low"
                    ? `${s.priority} ml-2 bg-green-400`
                    : currentTask?.priority === "Medium"
                    ? `${s.priority} ml-2 bg-yellow-400`
                    : `${s.priority} ml-2 bg-red-400`
                }
              >
                {currentTask?.priority}
              </div>
            </div>
          </div>
          <div className={`${s.fastFadeIn} !text-gray-60"`}>
            {"Assigned to: " +
              users.find((user) => user.id == Number(currentTask?.developer_id))
                ?.name}
          </div>
          <div className={`${s.fastFadeIn} !pt-3`}>
            {currentTask?.description}
          </div>
          <div className={`${s.fastFadeIn} !font-bold pt-3`}> Notes</div>
          <div className={s.fastFadeIn}> {currentTask?.notes}</div>
        </div>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <Link href="/manager/dashboard/" className={`${s.btn}  !bg-black`}>
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
