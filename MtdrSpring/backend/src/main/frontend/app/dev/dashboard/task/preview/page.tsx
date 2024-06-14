"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";
import Link from "next/link";
import axios from "axios";

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
      const storedTasksString = localStorage.getItem("team_" + user?.team_id);
      setTasks(JSON.parse(storedTasksString || "[]"));
    }
  }, [user]);

  /* TEMP TASK */
  const [tempTask, setTempTask] = useState<{
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
      const storedTempTask = localStorage.getItem("tempTask");
      setTempTask(JSON.parse(storedTempTask || ""));
    }
  }, [user]);

  const addTask = async () => {
    if (tempTask) {
      try {
        //ONCE WE REDEPLOY WE CAN USE TEAM12.KENSCOURSES.COM
        const response = await axios.post(
          "https://team12.kenscourses.com/tasks",
          {
            ...tempTask,
            team: {
              id: user?.team_id,
            },
            developer: {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              password: user?.password,
              team_id: user?.team_id,
              role: user?.role,
            },
          }
        );
        if (response.status === 201) {
          setTasks((prevTasks) => [...prevTasks, tempTask]);
          localStorage.removeItem("tempTask");
        } else {
          console.error("Failed to create task");
        }
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("team_" + user?.team_id, JSON.stringify(tasks));
  }, [tasks]);

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
            <div className={s.title}> {tempTask?.title}</div>
            <div
              className={
                tempTask?.priority === "low"
                  ? `${s.priority} ml-2 bg-green-400`
                  : tempTask?.priority === "medium"
                  ? `${s.priority} ml-2 bg-yellow-400`
                  : `${s.priority} ml-2 bg-red-400`
              }
            >
              {tempTask?.priority}
            </div>
          </div>
          <div className={`${s.fastFadeIn} !text-gray-60"`}>
            {tempTask?.developer.id == user?.id ? user?.name : ""}
          </div>
          <div className={`${s.fastFadeIn} !font-bold pt-3`}>Description: </div>
          <div className={`${s.fastFadeIn} !pt-3`}>{tempTask?.description}</div>
          {/*<div className={`${s.fastFadeIn} !font-bold pt-3`}> Notes</div>
          <div className={s.fastFadeIn}> {tempTask?.notes}</div>*/}
        </div>
      </div>
      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <div className={`${s.doublebtn} !bg-black p-2`}>
          <img
            onClick={() => history.back()}
            src="/icons/back.png"
            className={`${s.backIcon} !ml-3 !mr-4`}
          />

          <Link
            onClick={addTask}
            href="/dev/dashboard/task/created"
            className={`${s.btn}  !bg-red-500`}
          >
            Create Task
          </Link>
        </div>
      </div>
    </div>

    /*

      <div
         Bottom Wrapper 
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <div className={`${s.doublebtn} !bg-black p-2`}>
          <img
            onClick={() => history.back()}
            src="/icons/back.png"
            className={`${s.backIcon} !ml-3 !mr-4`}
          />

          <Link
            href={"/dev/dashboard/task/preview"}
            onClick={addTask}
            className={`${s.btn} ${s.custom} !bg-white !text-black`}
          >
            Preview Task
          </Link>
        </div>
      </div>

*/
  );
}
