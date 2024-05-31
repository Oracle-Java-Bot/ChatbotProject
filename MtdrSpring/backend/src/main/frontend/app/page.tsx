"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./page.module.css";
import r from "./responsive.module.css";
import Link from "next/link";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCentered = true;
  const trueCenter = true;
  const isFull = false;

  /* Localstorage API Simulation START */

  const team_1 = [
    {
      id: 1,
      team_id: 1,
      developer_id: 1,
      title: "Database Connection",
      description:
        "Create connection between app and database. Establish a secure connection between the app and the database.",
      priority: "Low",
      notes: "Configure connection parameters and error handlers",
      status: "pending",
    },
    {
      id: 2,
      team_id: 1,
      developer_id: 1,
      title: "User Authentication",
      description:
        "Implement user authentication functionality. Allow users to register, log in, and log out securely.",
      priority: "High",
      notes: "Use encryption for passwords and implement session management.",
      status: "in-progress",
    },
    {
      id: 3,
      team_id: 1,
      developer_id: 1,
      title: "Frontend Design",
      description:
        "Design user interface for the application. Create responsive layouts and intuitive user interactions.",
      priority: "Medium",
      notes: "Use modern UI frameworks and follow design best practices.",
      status: "completed",
    },
  ];

  const team_2 = [
    {
      id: 1,
      team_id: 2,
      developer_id: 3,
      title: "Database Connection Team 2",
      description:
        "Create connection between app and database. Establish a secure connection between the app and the database.",
      priority: "Low",
      notes: "Configure connection parameters and error handlers",
      status: "pending",
    },
    {
      id: 2,
      team_id: 2,
      developer_id: 3,
      title: "User Authentication Team 2",
      description:
        "Implement user authentication functionality. Allow users to register, log in, and log out securely.",
      priority: "High",
      notes: "Use encryption for passwords and implement session management.",
      status: "in-progress",
    },
    {
      id: 3,
      team_id: 2,
      developer_id: 3,
      title: "Frontend Design Team 2",
      description:
        "Design user interface for the application. Create responsive layouts and intuitive user interactions.",
      priority: "Medium",
      notes: "Use modern UI frameworks and follow design best practices.",
      status: "completed",
    },
    {
      id: 4,
      team_id: 2,
      developer_id: 3,
      title: "User Authentication Team 2 Fail",
      description:
        "Implement user authentication functionality. Allow users to register, log in, and log out securely.",
      priority: "High",
      notes: "Use encryption for passwords and implement session management.",
      status: "canceled",
    },
  ];

  const users = [
    {
      id: 1,
      name: "DevOnly",
      email: "dev@oracle.mx",
      password: "password1234",
      manager_id: 0,
      developer_id: 1,
    },
    {
      id: 2,
      name: "ManagerOnly",
      email: "manager@oracle.mx",
      password: "password1234",
      manager_id: 2,
      developer_id: 0,
    },
    {
      id: 3,
      name: "BothRoles",
      email: "both@oracle.mx",
      password: "password1234",
      manager_id: 1,
      developer_id: 2,
    },
  ];

  const user = [
    {
      id: 0,
      name: "",
      email: "",
      password: "",
      manager_id: 0,
      developer_id: 0,
    },
  ];

  const tempTask = [
    {
      id: 0,
      team_id: 0,
      developer_id: 0,
      title: "",
      description: "",
      priority: "Medium",
      notes: "",
      status: "pending",
    },
  ];

  const currentTask = 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Convert tasks and users arrays to strings
      const team1 = JSON.stringify(team_1);
      const team2 = JSON.stringify(team_2);
      const usersString = JSON.stringify(users);
      const userString = JSON.stringify(user);
      const taskString = JSON.stringify(currentTask);
      const tempTaskString = JSON.stringify(tempTask);

      // Store the strings in localStorage
      localStorage.setItem("team_1", team1);
      localStorage.setItem("team_2", team2);
      localStorage.setItem("users", usersString);
      localStorage.setItem("user", userString);
      localStorage.setItem("currentTask", taskString);
      localStorage.setItem("tempTask", tempTaskString);
    }
  }, []);

  /* Localstorage API Simulation END */

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

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainCont}>
          <img className={s.oracle_o} src="/oracle_o.webp" alt="Oracle O" />
          <div className={s.bold}>OracleBOT</div>
          <div>{"Let's boost productivity and manage your workload"}</div>

          <Link href={"/login"} className={s.btn}>
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
