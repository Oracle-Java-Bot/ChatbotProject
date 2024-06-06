"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import r from "../../../../responsive.module.css";
import s from "../task.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/navigation";
import { time } from "console";
import axios from "axios";
import Link from "next/link";


export default function Home() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(false); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(true);
  const trueCenter = false;

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
        "team_" + user?.team_id
      );
      setTasks(JSON.parse(storedTasksString || "[]"));
    }
  }, [user]);

  /* CURRENT Task */
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
    if (typeof window !== "undefined") {
      const storedTaskString = localStorage.getItem("currentTask");
      if (storedTaskString) {
        const storedTask = JSON.parse(storedTaskString);
        setCurrentTask(storedTask);
      }
    }
  }, []);

  useEffect(() => {
    const webApp = (window as any)?.Telegram.WebApp;
    if (webApp) {
      setIsExpanded(webApp.isExpanded);
      webApp.expand();
    }
  }, []);

  /* COMPLETE TASK */
  const completeTask = async () => {
    try {
      console.log("Completing task:", currentTask?.id);
      const response = await axios.patch(`http://localhost:8080/tasks/${currentTask?.id}/complete`);
      if (response.status === 200) {
        console.log('Task completed successfully');
        // Remove the completed task from localStorage
        localStorage.removeItem('currentTask');
      } else {
        console.error('Failed to complete task');
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (activeIndex === 0) {
      completeTask();
      setTimeout(() => {
        router.push("/dev/dashboard/task/completed");
      }, 500);
    }
  }, [activeIndex]);

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
        <div className={`${s.topTitle} font-bold`}>Task Details</div>
        <div className={"text-gray-600"}>#Team {user?.team_id}</div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainBody}>
          <div className="flex justify-between">
            <div className={s.title}> {currentTask?.title}</div>
            <div
              className={
                currentTask?.priority === "low"
                  ? `${s.priority} ml-2 bg-green-400`
                  : currentTask?.priority === "medium"
                  ? `${s.priority} ml-2 bg-yellow-400`
                  : `${s.priority} ml-2 bg-red-400`
              }
            >
              {currentTask?.priority}
            </div>
          </div>
          <div className={`${s.fastFadeIn} !text-gray-60"`}>
            {currentTask?.developer.email}
          </div>
          <div className={`${s.fastFadeIn} !font-bold pt-4`}>
            Description
          </div>
          <div className={`${s.fastFadeIn} !pt-3`}>
            {currentTask?.description}
          </div>
          <div className={`${s.fastFadeIn} !font-bold pt-4`}>
            Date
          </div>
          <div className={`${s.fastFadeIn} !text-gray-60`}>
            Created at: {currentTask?.created_at ? new Date(currentTask.created_at).toISOString().slice(0, 10) : ''}
          </div>
          <div className={`${s.fastFadeIn} !text-gray-60`}>
            Updated at: {currentTask?.created_at ? new Date(currentTask.created_at).toISOString().slice(0, 10) : ''}
          </div>
          <div className={s.fastFadeIn}> {currentTask?.notes}</div>
        </div>
      </div>

      <div
  className={`${isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper} ${s.marginBottom}`}
>
  <Link href="/dev/dashboard" className={`${s.btn}  !bg-black`}>
    Dashboard
  </Link>
</div>

<div className={s.sliderCont}>
  <div className={s.float}>
    <Swiper
      onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
      className={s.slider}
      spaceBetween={-100}
      slidesPerView={1}
      initialSlide={2}
    >
      <SwiperSlide className={s.completedCont}>
        <div className={`${s.completedSlide}  !bg-black`} />
      </SwiperSlide>
      <SwiperSlide>
        <div className={`${s.initialSlide} !bg-red-500`}>{">>"}</div>
      </SwiperSlide>
    </Swiper>
  </div>

  <button className={`${s.btn}  ${s.sliderBtn}  !bg-black`}>
    Slide To Complete
  </button>
</div>

    </div>
  );
}
