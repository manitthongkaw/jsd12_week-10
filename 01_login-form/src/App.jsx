import { useState } from "react";
import "./App.css";

export default function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  function validateEmail(value) {
    if (value === "") {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email address";
    }
    return "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailCheck = validateEmail(email);
    emailCheck ? setEmailError(true) : setEmailError(false);
    password.length < 8 ? setPasswordError(true) : setPasswordError(false)

    if (!emailCheck && password.length >= 8) {
      setIsLoggedIn(true);
      localStorage.setItem("userEmail", email);
    };
  };
  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setIsLoggedIn(false);
    localStorage.removeItem("userEmail");
}

  return (
    <section className="flex justify-center items-center h-dvh p-10 bg-slate-50">
      {!isLoggedIn
      ? <form className="flex flex-col gap-5 w-100 p-5 rounded-2xl bg-white shadow-2xl/10">
          <h1 className="text-2xl text-slate-500">Sign in</h1>
          <hr className="border-slate-200" />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmail} placeholder="account@email.com" maxLength="40" required
              className={`leading-10 text-slate-700 px-5 border ${emailError ? 'border-red-200 hover:border-red-300 focus:border-red-500' : 'border-slate-100 hover:border-slate-200 focus:border-sky-400'} outline-none rounded-lg transition-all`} />
            <label className="text-xs text-red-900 px-5" htmlFor="email">{emailError && "Please enter your email address!"}</label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePassword} placeholder="••••••••" minLength="8" maxLength="40" required
              className={`leading-10 text-slate-700 px-5 border ${passwordError ? 'border-red-200 hover:border-red-300 focus:border-red-500' : 'border-slate-100 hover:border-slate-200 focus:border-sky-400'} outline-none rounded-lg transition-all`} />
            <label className="text-xs text-red-900 px-5" htmlFor="password">{passwordError && "Please enter be at least 8 characters!"}</label>
          </div>
          <button type="submit" onClick={handleSubmit}
            className="w-full leading-10 text-white px-5 rounded-lg bg-sky-500 hover:bg-sky-600 transition-all">Submit</button>
        </form>
      : <div className="flex flex-col gap-5 w-100 text-center p-5 rounded-2xl bg-white shadow-2xl/10">
          <h1 className="text-2xl text-slate-500">Account Details</h1>
          <hr className="border-slate-200" />
          <p className="text-slate-700">Welcome, {localStorage.getItem("userEmail")}</p>
          <button type="submit" onClick={handleLogout}
            className="w-full leading-10 text-white px-5 rounded-lg bg-red-500 hover:bg-red-600 transition-all">Logout</button>
        </div>
      }
    </section>
  );
};