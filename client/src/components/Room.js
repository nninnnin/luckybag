import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import List from "./bokjumani/List";
import Basket from "./Basket";

import brickSource from "@assets/background/brick.png";
import wallpaperSource from "@assets/background/wallpaper.png";
import windowSource from "@assets/gif/window.gif";
import tvAndCabinetSource from "@assets/items/tv-and-cabinet.svg";
import createButtonSource from "@assets/buttons/create.svg";
import myHomeButtonSource from "@assets/buttons/my-home.svg";

import calendar16Source from "@assets/calendar/16.png";
import calendar17Source from "@assets/calendar/17.png";
import calendar18Source from "@assets/calendar/18.png";
import calendar19Source from "@assets/calendar/19.png";
import calendar20Source from "@assets/calendar/20.png";
import calendar21Source from "@assets/calendar/21.png";
import calendar22Source from "@assets/calendar/22.png";
import calendar23Source from "@assets/calendar/23.png";
import calendar24Source from "@assets/calendar/24.png";
import calendar25Source from "@assets/calendar/25.png";
import calendar26Source from "@assets/calendar/26.png";
import calendar27Source from "@assets/calendar/27.png";
import calendar28Source from "@assets/calendar/28.png";
import calendar29Source from "@assets/calendar/29.png";
import calendar30Source from "@assets/calendar/30.png";
import calendar31Source from "@assets/calendar/31.png";

import { GlobalContext } from "@src/App";

const calendarSourceList = {
  calendar16Source,
  calendar17Source,
  calendar18Source,
  calendar19Source,
  calendar20Source,
  calendar21Source,
  calendar22Source,
  calendar23Source,
  calendar24Source,
  calendar25Source,
  calendar26Source,
  calendar27Source,
  calendar28Source,
  calendar29Source,
  calendar30Source,
  calendar31Source,
};

const Container = styled.div`
  width: 340px;
  /* height: 500px; */
  height: ${({ isMyRoom }) => (isMyRoom ? "500px" : "560px")};

  position: relative;

  background-image: url(${brickSource});
  background-position: bottom -21px right 0px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;

  overflow: hidden;
`;
const Wallpaper = styled.img`
  background-image: url(${wallpaperSource});
  background-size: cover;

  position: absolute;
  top: 0;
  height: ${({ isMyRoom }) => (isMyRoom ? "286px" : "248px")};
  width: 100%;
`;
const Window = styled.img`
  width: 52%;
  position: absolute;
  top: ${({ isMyRoom }) => (isMyRoom ? "14%" : "6%")};
  left: 13%;
`;
const TVandCabinet = styled.img`
  width: 50%;
  position: absolute;
  top: ${({ isMyRoom }) => (isMyRoom ? "34.5%" : "23.5%")};
  left: 5%;
`;
const Calendar = styled.img`
  width: 18%;
  position: absolute;
  top: ${({ isMyRoom }) => (isMyRoom ? "23%" : "14%")};
  right: 13%;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  left: 50%;
  bottom: 4%;
  transform: translate(-50%);

  & > img {
    margin-bottom: 3%;
  }
`;

const ButtonImage = styled.img`
  cursor: pointer;
  align-self: center;
`;

const CreateButton = styled(ButtonImage)`
  width: 85%;
`;
const MyHomeButton = styled(ButtonImage)`
  width: 85%;
`;

function Room() {
  const {
    globalState: { isMyRoom },
  } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();
  const cookie = Cookie.get();

  function handleMyHomeButtonClick() {
    if (!cookie.user) {
      navigate("/login");

      return;
    }

    const roomUri = JSON.parse(cookie.user).room_uri;

    navigate(`/${roomUri}`, { replace: true, state: { isFirstAtHome: true } });
  }

  const calendarSource =
    calendarSourceList[`calendar${new Date().getDate()}Source`];

  return (
    <Container isMyRoom={isMyRoom}>
      <Wallpaper isMyRoom={isMyRoom} />
      <Window src={windowSource} isMyRoom={isMyRoom} />
      <Basket />
      <TVandCabinet src={tvAndCabinetSource} isMyRoom={isMyRoom} />
      <Calendar
        src={calendarSource ? calendarSource : calendar16Source}
        isMyRoom={isMyRoom}
      />

      <List />

      {!isMyRoom && (
        <ButtonSection>
          <Link
            to="/select"
            state={{
              backgroundLocation: location,
            }}
            style={{ textAlign: "center" }}
          >
            <CreateButton src={createButtonSource} />
          </Link>
          <MyHomeButton
            src={myHomeButtonSource}
            onClick={handleMyHomeButtonClick}
          />
        </ButtonSection>
      )}
    </Container>
  );
}

export default Room;
