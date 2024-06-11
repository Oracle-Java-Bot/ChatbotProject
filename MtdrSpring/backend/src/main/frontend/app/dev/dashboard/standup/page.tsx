"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../responsive.module.css";
import s from "./standup.module.css";
import { userAgentFromString } from "next/server";
import axios from "axios";
import Link from "next/link";

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

  const [tempStandup, setTempStandup] = useState<{
    id: number;
      progress: string;
      plans: string;
      challenge: string;
      support: string;
      time_standup: string;
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




  const addStandup = async () => {
    if (tempStandup) {
      try {
        const response = await axios.post("https://team12.kenscourses.com/standups", {
        ...tempStandup,
        team: {
        id: user?.team_id
        },
        developer: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          password: user?.password,
          team_id: user?.team_id,
          role: user?.role
        }
      });
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
        <div className={`${s.topTitle} font-bold`}>Daily Standup</div>
        <div className={"text-gray-600"}>#Team {user?.team_id}</div>
      </div>

      <div className={isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`}>
        <div className={s.createBody}>
          <div className={`${s.cat} ${s.separator}`}>
            Answer simple questions in order to keep track of your progress and
            daily activity.
          </div>

          <div className={s.cat}> What did I do yesterday?: </div>
          <textarea
            /* Progress */
            className={s.input}
            value={""}
            onChange={(e) => {}}
            placeholder={"Progress made"}
          />

          <div className={s.cat}> What do I plan on doing today?: </div>
          <textarea
            /* Plans */
            className={s.input}
            value={""}
            onChange={(e) => {}}
            placeholder={"Today's plans"}
          />

          <div className={s.cat}> Blockers: </div>
          <textarea
            /* Challenge */
            className={s.input}
            value={""}
            onChange={(e) => {}}
            placeholder={"Write here the things stopping you from progressing."}
          />

          <div className={s.cat}> Additional notes: </div>
          <textarea
            /* Challenge */
            className={s.input}
            value={""}
            onChange={(e) => {}}
            placeholder={"Write here the things that you would like to share with your manager."}
          />
        </div>
      </div>

      <div className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}>
        <div className={`${s.doublebtn} !bg-black p-2`}>
          <img
            onClick={() => history.back()}
            src="/icons/back.png"
            className={`${s.backIcon} !ml-3 !mr-4`}
          />

          <Link
            onClick={addStandup}
            href={"/dev/dashboard/"}
            className={`${s.btn} ${s.custom} !bg-red-500 !text-WHITE`}
          >
            Check-In
          </Link>
        </div>
      </div>
    </div>
  );
}
