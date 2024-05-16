"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./login.module.css";
import r from "../responsive.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsersString = localStorage.getItem("users");
      setUsers(JSON.parse(storedUsersString || "[]"));
    }
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (
        (user as { developer_id: number }).developer_id != null &&
        (user as { developer_id: number }).developer_id != 0 &&
        (user as { manager_id: number }).manager_id != null &&
        (user as { manager_id: number }).manager_id != 0
      ) {
        router.push("/login/team");
      } else if (
        (user as { developer_id: number }).developer_id != null &&
        (user as { developer_id: number }).developer_id != 0
      ) {
        router.push("/dev/dashboard");
      } else if (
        (user as { manager_id: number }).manager_id != null &&
        (user as { manager_id: number }).manager_id != 0
      ) {
        router.push("/manager/dashboard");
      }
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      /* Main Container */
      className={`${r.telegramHeight} ${r.trueCenter}`}
    >
      <script src="https://telegram.org/js/telegram-web-app.js"></script>

      <div
        /* Main Body */
        className={`${r.body} ${r.fit}`}
      >
        <div className={s.title}> Credentials </div>
        <div className={s.cat}>Email:</div>
        <input
          className={s.input}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={s.cat}> Password: </div>
        <input
          className={s.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={s.btn} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
