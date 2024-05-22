"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import r from "../../responsive.module.css";
import s from "./dashboard.module.css";
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
    email: string;
    team_id: number;
    role: string;
  }>();

  /* TASK LIST */
  const [tasks, setTasks] = useState<
    {
      id: number;
      title: string;
      priority: string;
      status: string;
      developer: {
        id: number;
        email: string;
        team_id: number;
        role: string;
      };
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://159.54.139.184/tasks/team/1");
        const data = response.data;

        // Set user data
        setUser({
          id: data[0].developer.id,
          email: data[0].developer.email,
          team_id: data[0].developer.team_id,
          role: data[0].developer.role,
        });

        // Set tasks data
        setTasks(data);
        console.log("Data fetched:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /* CURRENT TASK */
  const updateTask = (task: {
    id: number;
    title: string;
    priority: string;
    status: string;
    developer: {
      id: number;
      email: string;
      team_id: number;
      role: string;
    };
  }) => {
    localStorage.setItem("currentTask", JSON.stringify(task));
  };

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
        <div className={`${s.topTitle} font-bold`}>
          Welcome {JSON.parse(localStorage.getItem("user") ?? "{}").name ?? ""}!
        </div>{" "}
        <div className={` text-gray-600 `}>
          #Team {JSON.parse(localStorage.getItem("user") ?? "{}").team_id ?? ""}
        </div>
      </div>
      <div className={s.sFont}>Role: {JSON.parse(localStorage.getItem("user") ?? "{}").role ?? ""}</div>

      <div className="flex justify-center gap-4 mt-4">
        <Link href="dashboard/task/create" className={`${s.btn}  !bg-red-500 `}>
          Create Task
        </Link>

        <Link href="" className={`${s.btn}   !bg-black hidden`}>
          --- WIP ---
        </Link>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainBody}>
          <div className="flex justify-between">
            <div className={s.title}> Tasks</div>
            <Link href="dashboard/tasks" className={`${s.view} text-gray-600`}>
              View all
            </Link>
          </div>

          {tasks.map((task) => (
            <div key={task.id}>
              <div className={s.task}>
                <div>{task.title}</div>
                <div className={s.rightOpt}>
                  <div
                    className={
                      task.priority === "Low"
                        ? `${s.priorityIndicator} bg-green-500`
                        : task.priority === "Medium"
                        ? `${s.priorityIndicator}  bg-yellow-500 `
                        : `${s.priorityIndicator} bg-red-500`
                    }
                  />
                  <Link
                    onClick={() => updateTask(task)}
                    href="dashboard/task/edit"
                  >
                    <img className={s.icon} src="/icons/edit.png" />
                  </Link>
                  <Link
                    onClick={() => updateTask(task)}
                    href="dashboard/task/details"
                  >
                    <img className={s.icon} src="/icons/open.png" />
                  </Link>
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