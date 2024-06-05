"use client";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import r from "../../../responsive.module.css";
import s from "./tasks.module.css";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(false); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(true);
  const trueCenter = false;

  const [active, setActive] = useState(true);

  /* CURRENT USER */
  const [user, setUser] = useState<{
    id: number;
    email: string;
    name: string;
    team_id: number;
    role: string;
  }>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("user");
      setUser(JSON.parse(storedUserString || "[]"));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            const teamID = user.team_id;

            const response = await axios.get(
              `https://team12.kenscourses.com/tasks/team/${teamID}`
            );
            const data = response.data;

            // Set tasks data
            setTasks(data);
            console.log("Data fetched:", data);

            // Save tasks data to local storage
            localStorage.setItem("tasks", JSON.stringify(data));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  /* TASK LIST */
  const [tasks, setTasks] = useState<
    {
      id: number;
      title: string;
      priority: string;
      status: string;
      developer: {
        id: number;
        name: string;
        email: string;
        team_id: number;
        role: string;
      };
      created_at: string;
      updated_at: string;
    }[]
  >([]);

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
        <div className={`${s.topTitle} font-bold`}>Welcome {user?.name}!</div>
        <div className={` text-gray-600 `}>#Team {user?.team_id}</div>
      </div>
      <div className={s.sFont}>Role {user?.role}</div>

      <div className={` ${s.selector}`}>
        <div
          className={
            active
              ? ` ${s.selectorBtn} ${s.left} ${s.selected}`
              : ` ${s.selectorBtn} ${s.left}`
          }
          onClick={() => setActive(true)}
        >
          Active
        </div>
        <div
          className={
            !active ? ` ${s.selectorBtn} ${s.selected}` : ` ${s.selectorBtn} `
          }
          onClick={() => setActive(false)}
        >
          History
        </div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainBody}>
          {active // Render tasks that are not cancelled or completed when active is true
            ? tasks
                .filter((task: { status: string }) => task.status === "pending")
                .map(
                  (task: {
                    id: number;
                    title: string;
                    priority: string;
                    status: string;
                    developer: {
                      name: string;
                      email: string;
                    };
                  }) => (
                    <div key={task.id}>
                      <div className={s.task}>
                        <div>
                          <div>{task.title}</div>
                          <div className="text-gray-500 text-sm mt-1">
                            {task?.developer?.name}
                          </div>
                        </div>
                        <div className={s.rightOpt}>
                          <div
                            className={
                              task.priority === "low"
                                ? `${s.status} bg-green-500`
                                : task.priority === "medium"
                                ? `${s.status} bg-yellow-500`
                                : `${s.status} bg-red-500`
                            }
                          >
                            {task.priority}
                          </div>

                          <div
                            className={
                              task.status === "in-progress"
                                ? `${s.status} bg-yellow-500 ml-2`
                                : `${s.status} bg-orange-500 ml-2`
                            }
                          >
                            {task.status}
                          </div>

                          <Link
                            onClick={() => updateTask(task.id)}
                            href="/manager/dashboard/task/details"
                          >
                            <img className={s.icon} src="/icons/open.png" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )
            : // Render tasks that are cancelled or completed when active is false
              tasks
                .filter((task: { status: string }) => task.status !== "pending")
                .map(
                  (task: {
                    id: number;
                    title: string;
                    priority: string;
                    status: string;
                    developer: {
                      name: string;
                      email: string;
                    };
                  }) => (
                    <div key={task.id}>
                      <div className={s.task}>
                        <div>
                          <div>{task.title}</div>
                          <div className="text-gray-500 text-sm mt-1">
                            {task.developer.name}
                          </div>
                        </div>
                        <div className={s.rightOpt}>
                          <div
                            className={
                              task.priority === "low"
                                ? `${s.status} bg-green-500`
                                : task.priority === "medium"
                                ? `${s.status} bg-yellow-500`
                                : `${s.status} bg-red-500`
                            }
                          >
                            {task.priority}
                          </div>
                          <div
                            className={
                              task.status === "completed"
                                ? `${s.status} bg-green-500`
                                : `${s.status} bg-red-500`
                            }
                          >
                            {task.status}
                          </div>
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
      >
        <Link href="/manager/dashboard" className={`${s.bottomBtn}  !bg-black`}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
