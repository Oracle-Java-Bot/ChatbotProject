"use client";
import { useEffect, useState } from "react";
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
    name: string;
    developer_id: number;
    manager_id: number;
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
      priority: string;
      status: string;
      developer_id: number;
      manager_id: number;
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

  /* CURRENT TASK */
  const updateTask = (updatedTask: number) => {
    localStorage.setItem("currentTask", JSON.stringify(updatedTask));
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
        <div className={`${s.topTitle} font-bold`}>Welcome {user?.name}!</div>{" "}
        <div className={` text-gray-600 `}>#Team {user?.manager_id}</div>
      </div>
      <div className={s.sFont}>Manager</div>

      <div className="flex justify-center gap-4 mt-4">
        <Link href="" className={`${s.btn}   !bg-black `}>
          Performance Review
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

          {tasks.map(
            (task: {
              id: number;
              title: string;
              priority: string;
              status: string;
            }) => (
              <div key={task.id}>
                <div className={s.task}>
                  <div>{task.title}</div>
                  <div className={s.rightOpt}>
                    <div
                      className={
                        task.status === "in-progress"
                          ? `${s.status} bg-yellow-500`
                          : task.status === "pending"
                          ? `${s.status} bg-orange-500`
                          : task.status === "completed"
                          ? `${s.status} bg-green-500`
                          : `${s.status} bg-red-500`
                      }
                    >
                      {task.status}
                    </div>

                    <Link
                      onClick={() => updateTask(task.id)}
                      href="dashboard/task/details"
                    >
                      <img className={s.icon} src="/icons/open.png" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      ></div>
    </div>
  );
}
