import { useEffect, useState } from "react";

const Auth = ({ setIsAuthed }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setIsAuthed(!!sessionStorage.getItem("token"));
  }, []);

  return <>
    <form className={"flex items-center justify-center h-screen"} onSubmit={e => {
      e.preventDefault();
      if (token === "eden") {
        sessionStorage.setItem("token", token);
        setIsAuthed(true);
      } else {
        alert("Invalid token");
      }
    }}>
      <input placeholder={"please enter the secret code and press the enter key to continue ..."} className={"text-blue-600 border px-4 w-[40%] h-12 rounded-lg placeholder:text-sm placeholder:text-gray-400"} type="text" value={token} onChange={(e) => {
        setToken(e.target.value);
      }} />
    </form>
  </>;
};

export default Auth;