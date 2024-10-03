import Chat from "./views/Chat/index.jsx";
import Auth from "./views/Auth/index.jsx";
import { useState } from "react";
import SSR from "./views/SSR/index.jsx";


const App = () => {
  console.log(sessionStorage.getItem("token"));
  const [isAuthed, setIsAuthed] = useState(false);

  return <>
    <SSR/>
    {/*{*/}
    {/*  isAuthed ? <Chat /> : <Auth setIsAuthed={setIsAuthed} />*/}
    {/*}*/}
  </>;
};

export default App;