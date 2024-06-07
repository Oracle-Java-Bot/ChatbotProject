"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";
import Link from "next/link";
import Team from "@/app/login/team/page";

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
    //password: string;
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
      developer: {
        id: number;
        name: string;
        email: string;
        team_id: number;
      };
      team: { id: number };
      //notes: string;
    }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasksString = localStorage.getItem(
        "team_id" + user?.team_id
      );
      setTasks(JSON.parse(storedTasksString || "[]"));
    }
  }, [user]);

  /* CREATE TASK */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tempTask, setTempTask] = useState<{
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    developer: { id: number; name: string; email: string; team_id: number };
    team: { id: number};
    //developer_id: number;
    //notes: string;
    
  }>();

  const addTask = () => {
    
    const newTask = {
      id: tasks.length + 1,
      title: title,
      description: description,
      priority: priority,
      status: "pending",
      developer: {  
        id: user?.id || 0, 
        name: user?.name || '', 
        email: user?.email || '', 
        team_id: user?.team_id || 0 
      },
      team: { id: user?.team_id || 0},
      //notes: notes,
    };

    setTempTask(newTask);

    setTitle("");
    setDescription("");
    setNotes("");
    setPriority("Medium");
  };

  useEffect(() => {
    localStorage.setItem("tempTask", JSON.stringify(tempTask));
    console.log(tempTask);
  }, [tempTask]);

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
        <div className={`${s.topTitle} font-bold`}>Create Task</div>{" "}
        <div className={"text-gray-600"}>#Team {user?.team_id}</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.createBody}>
          <div className={s.cat}>Name:</div>
          <input
            className={s.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <div className={s.cat}> Description: </div>
          <textarea
            className={`${s.input} `}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* 
          <div className={s.cat}> Notes: </div>
          <textarea
            className={s.input}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          */}
          <div>
            <div className={s.cat}> Select Priority: </div>
            <select
              className={s.input}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
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
            href={"/dev/dashboard/task/preview"}
            onClick={addTask}
            className={`${s.btn} ${s.custom} !bg-white !text-black`}
          >
            Preview Task
          </Link>
        </div>
      </div>
    </div>
  );
}
