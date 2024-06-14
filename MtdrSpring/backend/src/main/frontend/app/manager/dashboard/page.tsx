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
  const [isBottom, setBottom] = useState(false);
  const trueCenter = false;

  /* CURRENT USER */
  const [user, setUser] = useState<{
    id: number;
    email: string;
    name: string;
    team_id: number;
    role: string;
  }>();

  const [userName, setUserName] = useState("");
  const [userTeamId, setUserTeamId] = useState("");
  const [userRole, setUserRole] = useState("");

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

            // Set user data from localStorage
            setUser(user);
            setUserName(user.name || "");
            setUserTeamId(user.team_id?.toString() || "");
            setUserRole(user.role || "");
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
      description: string;
      priority: string;
      status: string;
      developer_id: string;
      completed_at: string;
      created_at: string;
      updated_at: string;
      notes: string;
      developer: {
        id: number;
        email: string;
        team_id: number;
        role: string;
        name: string;
      };
      team: {
        id: number;
        name: string;
      };
    }[]
  >([]);

  /* CURRENT TASK */
  const updateTask = (task: {
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
  }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentTask", JSON.stringify(task));
    }
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
        <div className={`${s.topTitle} font-bold`}>Welcome {userName}!</div>{" "}
        <div className={` text-gray-600 `}>#Team {userTeamId}</div>
      </div>
      <div className={s.sFont}>
        Role:{" "}
        {userRole
          ? `${userRole.charAt(0).toUpperCase()}${userRole.slice(1)}`
          : ""}
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className="flex justify-center gap-4 mt-2">
          <Link
            href="dashboard/performance"
            className={`${s.btn}  !bg-red-500 `}
          >
            Performance Review
          </Link>
        </div>
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
                <div>
                  <div>{task.title}</div>
                  <div className={s.taskDev}>{task.developer.name}</div>

                  <div className={s.created}>
                    {"Created at: "}
                    {new Date(task.created_at).toISOString().slice(0, 10)}
                  </div>
                </div>
                <div className={s.rightOpt}>
                  <div
                    className={
                      task.priority === "low"
                        ? `${s.priorityIndicator} bg-green-500`
                        : task.priority === "medium"
                        ? `${s.priorityIndicator}  bg-yellow-500 `
                        : `${s.priorityIndicator} bg-red-500`
                    }
                  />
                  <div
                    className={
                      task.status === "completed"
                        ? `${s.priorityIndicator} bg-green-500 ml-1`
                        : task.status === "pending"
                        ? `${s.priorityIndicator}  bg-yellow-500 ml-1 `
                        : `${s.priorityIndicator} bg-red-500 ml-1`
                    }
                  />

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
