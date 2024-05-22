"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsersString = localStorage.getItem("users");
      setUsers(JSON.parse(storedUsersString || "[]"));
    }
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (user: { id: any; name: any; email: any; password: any; team_id: any; role: any; }) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User logged in:", user);
      if (user.role === "manager" && user.team_id !== null && user.team_id !== 0) {
        router.push("/manager/dashboard");
      } else if (user.role === "developer" && user.team_id !== null && user.team_id !== 0) {
        router.push("/dev/dashboard");
      } else {
        router.push("/login/team");
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
