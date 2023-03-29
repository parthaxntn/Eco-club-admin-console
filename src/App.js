import React, { useContext, useState } from "react";
import MemberPage from "./pages/memberPage";
import EventPage from "./pages/eventPage";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import axios from "axios";
import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import useCookies from "react-cookie/cjs/useCookies";
import { MdEventNote, MdGroups } from "react-icons/md";
import {GrAchievement, GrGallery} from "react-icons/gr";
import {ImBlog} from "react-icons/im";
import States from "./States";
import ContextState from "./components/Context/ContextState";
import StateCon from "./components/Context/CreateContext";

function App() {
  const states = useContext(StateCon);
  const {pageRoute, setPageRoute} = states
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["css"]);
  const [mode, setMode] = useState(true);
  const [clicked, setClicked] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (cookies.CSS_Website !== "undefined" && cookies.CSS_Website) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    // const setNav = States().setNav
  }, [cookies.CSS_Website]);

  // console.log(setNav("hello world"));
  // console.log(States.nav);

  useEffect(() => {
    if (cookies.Mode !== "false" && cookies.Mode) {
      setMode(true);
    } else {
      setMode(false);
    }
    // console.log(States());
  }, [cookies.Mode]);

  const handleRouteChange = (e, str) => {
    setPageRoute(str);
    if (e && e.stopPropagation) {
      e.stopPropagation(); //for w3c browsers
      e.cancelBubble = true; //for microsoft browsers
    }
  };

  return (
    <>
      <CookiesProvider>
        <Navbar
          setIn={setAuthenticated}
          In={authenticated}
          mode={mode}
          setMode={setMode}
          />
        {authenticated ? (
          <div className={mode ? "App bright" : "App dark"}>
            <div
              className={
                clicked
                  ? "controlBoard expandControl text-white"
                  : "controlBoard shrinkControl text-white"
                }
                onClick={() => setClicked(!clicked)}
                title="Control Board (Click to expand)"
                >
              <p
                id="eve"
                onClick={(e) => { handleRouteChange(e, "events") }}
                className={pageRoute === 'events' ? "activeLink":''}
              >
                <MdEventNote /> {clicked ? "events" : ""}
              </p>
              <p
                id="eve"
                onClick={(e) => { handleRouteChange(e, "achievements") }}
                className={pageRoute === 'achievements' ? "activeLink":''}
                >
                <GrAchievement /> {clicked ? "achievements" : ""}
              </p>
              <p
                id="eve"
                onClick={(e) => { handleRouteChange(e, "members") }}
                className={pageRoute === 'members' ? "activeLink":''}
              >
                <MdGroups /> {clicked ? "members" : ""}
              </p>
              <p
                id="eve"
                onClick={(e) => { handleRouteChange(e, "blogs") }}
                className={pageRoute === 'blog' ? "activeLink":''}
                >
                <ImBlog /> {clicked ? "blog" : ""}
              </p>
              <p
                id="mem"
                onClick={(e) => { handleRouteChange(e, "gallery") }}
                className={pageRoute === 'gallery' ? "activeLink":''}
                >
                <GrGallery /> {clicked ? "gallery" : ""}
              </p>
            </div>
            <div className="pages">
              {pageRoute ? (
                <MemberPage mode={mode} />
                ) : (
                  <EventPage mode={mode} />
                  )}
            </div>
          </div>
        ) : (
          <Login setIn={setAuthenticated} In={authenticated} mode={mode} />
        )}
      </CookiesProvider>
      
      </>
  );
}

export default App;
