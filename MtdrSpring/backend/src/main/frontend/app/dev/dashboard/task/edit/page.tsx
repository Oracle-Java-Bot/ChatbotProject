"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";
import { userAgentFromString } from "next/server";
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
    developer_id: string;
    manager_id: string;
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
        "team_" + user?.developer_id
      );
      setTasks(JSON.parse(storedTasksString || "[]"));
    }
  }, [user]);

  /* EDIT TASK */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");

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
  }, [tasks]);

  useEffect(() => {
    setTitle(currentTask?.title || "");
    setDescription(currentTask?.description || "");
    setNotes(currentTask?.notes || "");
    setPriority(currentTask?.priority || "");
  }, [currentTask]);

  /* EDIT TASK */
  const editTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === Number.parseInt(currTask)) {
          return {
            ...task,
            title: title,
            description: description,
            notes: notes,
            priority: priority,
          };
        }
        return task;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("team_" + user?.developer_id, JSON.stringify(tasks));
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
        <div className={`${s.topTitle} font-bold`}>Edit Task</div>{" "}
        <div className={"text-gray-600"}>#Team {user?.developer_id}</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.createBody}>
          <div className={s.cat}>Title:</div>
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
          <div className={s.cat}> Notes: </div>
          <textarea
            className={s.input}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div>
            <div className={s.cat}> Select Priority: </div>
            <select
              className={s.input}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
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
            className={`${s.btn} ${s.custom} !bg-white !text-black`}
            href={"/dev/dashboard/task/updated"}
          >
            <button onClick={() => editTask()}>Save Changes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
