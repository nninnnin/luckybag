import { last } from "lodash";
import React, { createContext, useEffect, useReducer } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Select from "./components/Select";
import Create from "./components/Create";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import Details from "./components/bokjumani/Details";
import Inventory from "./components/bokjumani/Inventory";

export const GlobalContext = createContext();

function getIsOrAfterNewyearsday() {
  const date = new Date().getDate();
  const month = new Date().getMonth(); // 0 if is Jan

  const result = (month === 0 && date >= 31) || month > 0;

  return result;
}

const initialState = {
  roomOwner: "",
  isMyRoom: false,
  bokjumaniList: [],
  selectedBok: Math.floor(Math.random() * 9) + 1,
  isOrAfterNewyearsday: getIsOrAfterNewyearsday(),
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROOM_OWNER":
      return { ...state, roomOwner: action.payload };
    case "SET_IS_MY_ROOM":
      return { ...state, isMyRoom: action.payload };
    case "SET_BOKJUMANI_LIST":
      return { ...state, bokjumaniList: action.payload };
    case "SET_SELECTED_BOK":
      return { ...state, selectedBok: action.payload };
    case "SET_IS_OR_AFTER_NEWYEARSDAY":
      return { ...state, selectedBok: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const location = useLocation();
  const locationState = location.state;
  const backgroundLocation = locationState?.backgroundLocation;

  const hasModal = Boolean(backgroundLocation);

  const [globalState, dispatch] = useReducer(reducer, initialState);

  const cookie = Cookie.get();

  useEffect(() => {
    if (!cookie || !cookie.user) return;

    let isMyRoom;

    if (backgroundLocation) {
      isMyRoom =
        JSON.parse(cookie?.user).room_uri ===
        last(backgroundLocation.pathname.split("/"));
    } else {
      isMyRoom =
        JSON.parse(cookie?.user).room_uri ===
        last(location.pathname.split("/"));
    }

    if (globalState.isMyRoom === isMyRoom) return;

    dispatch({
      type: "SET_IS_MY_ROOM",
      payload: isMyRoom,
    });
  }, [cookie]);

  return (
    <GlobalContext.Provider value={{ globalState, dispatch }}>
      <Container>
        <GlobalStyle />

        {/* 기본 routes */}
        <Routes location={locationState?.backgroundLoation || locationState}>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<Home />} />
          <Route path="/create" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth" element={<Login />} />
          <Route path="/signUp" element={<Login />} />
          <Route path="/bokjumani/:bokId" element={<Home />} />
          <Route path="/:roomId" element={<Home />} />
        </Routes>

        <>
          {/* 모달 routes */}
          {locationState?.backgroundLocation && (
            <Routes>
              <Route path="/select" element={<Select />} />
              <Route path="/create" element={<Create />} />
              <Route path="/signUp" element={<SignUp />} />
              {globalState.isOrAfterNewyearsday && (
                <Route path="/:roomId/bokjumani/:bokId" element={<Details />} />
              )}
              <Route
                path="/:roomId/bokjumani/inventory"
                element={<Inventory />}
              />
            </Routes>
          )}
          {hasModal && <BlackFlim />}
        </>

        {/* alerts */}
        {!globalState.isOrAfterNewyearsday && (
          <Routes>
            <Route path="/bokjumani/:bokId" element={<Alert />} />
          </Routes>
        )}
      </Container>
    </GlobalContext.Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMEULJIRO';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/BMEULJIRO.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    /* user-select: none;
    -webkit-user-drag: none; */
    box-sizing: border-box;
  }

  html, body {
    margin: 1% 0;
    padding: 0;

    /* background-color: grey; */
    background-color: #a7845f;

    position: relative;
  }
`;

const Container = styled.div`
  width: 360px;
  height: 640px;
  max-width: 430px;
  border-radius: 9px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  overflow: hidden;
`;

const BlackFlim = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.7;

  position: fixed;
  top: 0;
  left: 0;

  border-radius: 9.5px;
`;

export default App;
