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
import r from "../../../responsive.module.css";
import s from "./performance.module.css";
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

  const [userName, setUserName] = useState("");
  const [userTeamId, setUserTeamId] = useState("");
  const [userRole, setUserRole] = useState("");

  //Cosas para el filtro de standups 24horas
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Hace 24 horas


  useEffect(() => {
    const fetchData = async() => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user");
          if(storedUser){
            const user = JSON.parse(storedUser);
            const teamID = user.team_id;

            const response = await axios.get(
              `https://team12.kenscourses.com/standups/team/${teamID}` //Endpoint
            );
            const data = response.data;

            //Cosas para el front de parte del usuario
            setUser(user);
            setUserName(user.name || "");
            setUserTeamId(user.team_id?.toString() || "");
            setUserRole(user.role || "");

            setStandups(data); //Poner la data del endpoint en formato standup
            console.log("Data standup fetch"); //log
            localStorage.setItem("standup", JSON.stringify(data));//Poner en local storage
          }
        }
      }catch(error){
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  //Standup list
  const [standups, setStandups] = useState <
    {
      id: number;
      progress: string;
      plans: string;
      challenge: string;
      support: string;
      time_standup: string;
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

  //Current tasks
  const checkStanup = (standup: {
    id: number;
    progress: string;
    plans: string;
    challenge: string;
    support: string;
    developer: {
      id: number;
      name: string;
      email: string;
      team_id: number;
      role: string;
    };
    time_standup: string;
  }) => {
    if (typeof window !== "undefined"){
      localStorage.setItem("currentStandup", JSON.stringify(standup));
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
        <div className={`${s.topTitle} font-bold`}>Performance Review</div>
        <div className={` text-gray-600 `}>#Team {user?.team_id}</div>
      </div>
      <div className={s.sFont}>Role: {userRole}</div>

      <div className="flex justify-center gap-4 mt-4">
        <Link href="/manager/dashboard" className={`${s.btn}  !bg-red-500 `}>
          TASKS
        </Link>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        <div className={s.mainBody}>
          <div className="flex justify-between">
              <div className={s.title}>StandUps</div>
          </div>
          {standups

            .filter(//Filtro para que solo aparezcan standups de hace menos de 48 horas
              (standup) =>{
                const completedAt = new Date(standup.time_standup);
                return completedAt >= cutoff;
              }
                
            )

            .map((standup) => (
              <div key={standup.id}>
                <div className={s.standup}>
                  <div>
                    <div>Developer : {standup.developer.name}</div>
                    <div>Previous Work : {standup.progress}</div>
                    <div>Todays work : {standup.plans}</div>
                    <div>Blockers : {standup.challenge}</div>
                    <div>Notes : {standup.support}</div>
                    <div className={s.created}>
                      Created:{" "}
                      {new Date(standup.time_standup).toISOString().slice(0, 10)}
                    </div>
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
