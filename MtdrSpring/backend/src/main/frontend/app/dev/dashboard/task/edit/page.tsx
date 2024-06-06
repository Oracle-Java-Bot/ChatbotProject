"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";
import { userAgentFromString } from "next/server";
import axios from 'axios';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFull, setFull] = useState(false);
  const [isCentered, setCentered] = useState(false);
  const [isBottom, setBottom] = useState(true);
  const trueCenter = false;

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
      const parsedTasks = JSON.parse(storedTasksString || "[]");
      setTasks(parsedTasks);
      localStorage.setItem("team_" + user?.developer_id, JSON.stringify(parsedTasks));
    }
  }, [user?.developer_id]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");

  const [currentTask, setCurrentTask] = useState<{
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
  }>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCurrTask = localStorage.getItem("currentTask");
      if (storedCurrTask) {
        const parsedTask = JSON.parse(storedCurrTask);
        setCurrentTask(parsedTask);
        setTitle(parsedTask.title || "");
        setDescription(parsedTask.description || "");
        setNotes(parsedTask.notes || "");
        setPriority(parsedTask.priority || "");
        console.log("Current Task:", parsedTask);
      } else {
        console.log("No current task found in localStorage");
      }
    }
  }, []);
  
  const editTask = async () => {
    try {
      console.log("Editing task: ", currentTask);
      const response = await axios.put(`http://localhost:8080/tasks/${currentTask?.id}`, {
        title: title,
        description: description,
        priority: priority,
        status: currentTask?.status,
        created_at: currentTask?.created_at,
        completed_at: currentTask?.completed_at,
        team: {
          id: currentTask?.team.id,
          name: currentTask?.team.name,
        },
        developer: {
          id: currentTask?.developer.id,
          name: currentTask?.developer.name,
          email: currentTask?.developer.email,
          //password: currentTask?.developer.password,
          team_id: currentTask?.developer.team_id,
          role: currentTask?.developer.role,
        },
      });
  
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("Task updated successfully");
        window.location.href = "/dev/dashboard/task/updated";
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  return (
    <div
      className={
        isCentered
          ? trueCenter
            ? `${r.telegramHeight} ${r.trueCenter}`
            : `${r.telegramHeight} ${r.centered}`
          : `${r.telegramHeight} ${r.top}`
      }
    >
      <script src="https://telegram.org/js/telegram-web-app.js"></script>

      <div className={`${r.wrapper} ${s.titleFlex}`}>
        <div className={`${s.topTitle} font-bold`}>Edit Task</div>
        <div className={"text-gray-600"}>#Team {user?.team_id}</div>
      </div>

      <div
        className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.createBody}>
          <div className={s.cat}>Title:</div>
          <textarea
            className={s.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={currentTask?.title}
          />
          <div className={s.cat}> Description: </div>
          <textarea
            className={`${s.input}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={currentTask?.description}
          />
          {/* 
          <div className={s.cat}> Notes: </div>
          <textarea
            className={s.input}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={currentTask?.notes}
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
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <div className={`${s.doublebtn} !bg-black p-2`}>
          <img
            onClick={() => history.back()}
            src="/icons/back.png"
            className={`${s.backIcon} !ml-3 !mr-4`}
          />
          <button
            className={`${s.btn} ${s.custom} !bg-white !text-black`}
            onClick={editTask}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}