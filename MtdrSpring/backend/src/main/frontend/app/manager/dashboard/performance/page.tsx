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
import { format, subDays } from "date-fns";

import {
  VictoryPie,
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFull, setFull] = useState(true); /* Expands the body cont */
  const [isCentered, setCentered] = useState(false); /* Centers the body cont */
  const [isBottom, setBottom] = useState(true);
  const trueCenter = false;

  const [active, setActive] = useState(true);
  const [seeStandups, setSeeStandups] = useState(false);

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
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
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
            localStorage.setItem("standup", JSON.stringify(data)); //Poner en local storage

            const response2 = await axios.get(
              `https://team12.kenscourses.com/tasks/team/${teamID}`
            );
            const data2 = response2.data;

            // Set tasks data
            setTasks(data2);
            console.log("Data fetched:", data2);
          }
        }
      } catch (error) {
        console.error("Error fetching data", error);
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

  //Standup list
  const [standups, setStandups] = useState<
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
    if (typeof window !== "undefined") {
      localStorage.setItem("currentStandup", JSON.stringify(standup));
    }
  };

  const pendingCount = tasks.filter((s) => s.status === "pending").length;
  const completedCount = tasks.filter((s) => s.status === "completed").length;
  const canceledCount = tasks.filter((s) => s.status === "canceled").length;

  const rawData = [
    { x: "Pending", y: pendingCount },
    { x: "Completed", y: completedCount },
    { x: "Canceled", y: canceledCount },
  ];

  const pieData = rawData.filter((data) => data.y > 0);

  const colorScale = ["#F1C40F", "#66BB6A", "#E74C3C"];

  const taskPercentage = (completedCount / tasks.length) * 100;

  const getStandupsForLast7Days = (standups: any[]) => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      format(subDays(today, i), "yyyy-MM-dd")
    ).reverse();

    const filteredStandups = standups.filter(
      (standup: {
        time_standup: string | number | Date;
        developer: { team_id: any };
      }) => {
        const standupDate = format(
          new Date(standup.time_standup),
          "yyyy-MM-dd"
        );
        return (
          last7Days.includes(standupDate) &&
          standup.developer.team_id === user?.team_id
        );
      }
    );

    const standupsByDate = last7Days.map((date) => ({
      x: date,
      y: filteredStandups.filter(
        (standup: { time_standup: string | number | Date }) =>
          format(new Date(standup.time_standup), "yyyy-MM-dd") === date
      ).length,
    }));

    return standupsByDate;
  };

  const standupsData = getStandupsForLast7Days(standups);

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

      <div className={` ${s.selector}`}>
        <div
          className={
            !seeStandups
              ? ` ${s.selectorBtn} ${s.left} ${s.selected}`
              : ` ${s.selectorBtn} ${s.left}`
          }
          onClick={() => setSeeStandups(false)}
        >
          Performance
        </div>
        <div
          className={
            seeStandups
              ? ` ${s.selectorBtn} ${s.selected}`
              : ` ${s.selectorBtn} `
          }
          onClick={() => setSeeStandups(true)}
        >
          Standups
        </div>
      </div>

      <div
        /* Main Body */ className={
          isFull ? `${r.body} ${r.full}` : `${r.body} ${r.fit}`
        }
      >
        {seeStandups ? (
          <div className={s.mainBody}>
            <div className="flex justify-between">
              <div className={s.title}>StandUps</div>
            </div>
            {standups

              .filter(
                //Filtro para que solo aparezcan standups de hace menos de 48 horas
                (standup) => {
                  const completedAt = new Date(standup.time_standup);
                  return (
                    completedAt >= cutoff &&
                    standup.developer.team_id === user?.team_id
                  );
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
                        {new Date(standup.time_standup)
                          .toISOString()
                          .slice(0, 10)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className={s.mainBody}>
            <div className={s.pieCont}>
              <strong> {"Task Completion: " + taskPercentage + "%"}</strong>
              <div className={s.pie}>
                {" "}
                <VictoryPie
                  cornerRadius={15}
                  innerRadius={80}
                  data={pieData}
                  colorScale={colorScale}
                  labels={({ datum }) => datum.y}
                  labelRadius={100}
                  style={{
                    labels: { fill: "white", fontSize: 30, fontWeight: "bold" },
                  }}
                />
              </div>

              <div>
                {pieData.map((data, index) => (
                  <div className={s.labels} key={data.x}>
                    <div
                      className={s.dot}
                      style={{ backgroundColor: colorScale[index] }}
                    />
                    <strong className={s.label}>{data.x}:</strong> {data.y}
                  </div>
                ))}
              </div>
            </div>

            <div className={s.standupGraph}>
              <strong>Standups (Últimos 7 días)</strong>
              <VictoryChart>
                <VictoryAxis
                  tickFormat={(t) => format(new Date(t), "MM/dd")}
                  style={{
                    tickLabels: { angle: -45, fontSize: 17, padding: 20 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => x}
                  style={{
                    tickLabels: { fontSize: 17, padding: 5 },
                  }}
                />
                <VictoryArea
                  data={standupsData}
                  interpolation="basis"
                  style={{
                    data: { fill: "#E74C3C", opacity: 1 },
                    labels: { fontSize: 20 },
                  }}
                  labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel dy={20} />}
                />
              </VictoryChart>
            </div>
          </div>
        )}
      </div>

      <div
        /* Bottom Wrapper */
        className={isBottom ? `${r.wrapper} ${r.bottom}` : r.wrapper}
      >
        <Link href="/manager/dashboard">
          <button className={`${s.bottomBtn}  !bg-black`}>Dashboard</button>
        </Link>
      </div>
    </div>
  );
}
