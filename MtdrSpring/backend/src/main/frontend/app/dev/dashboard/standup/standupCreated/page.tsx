"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../standup.module.css";
import Lottie from "lottie-react";
import CheckAnimation from "../../../../../public/animations/check.json";
import Link from "next/link";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(true); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(false);
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
        <div className={`${s.topTitle} font-bold`}>Standup</div>{" "}
        <div className={"text-gray-600"}>#Team {user?.team_id}</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={`${s.createdBody} `}>
          <Lottie
            className={s.animation}
            animationData={CheckAnimation}
            loop={false}
          />

          <div className={`${s.title} ${s.fadeIn}`}> {"Check-in Completed!"}</div>

          <div className={`${s.fadeIn} "pt-3"`}>
            {"Standup successfully created! Let's get to work."}
          </div>
        </div>
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <Link href="/dev/dashboard/" className={`${s.btn}  !bg-black`}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
