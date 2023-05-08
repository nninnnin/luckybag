import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

import AppHeader from "@components/AppHeader";
import Room from "@components/Room";
import { GlobalContext } from "@src/App";

import horangSource1 from "@assets/gif/bok1.gif";
import horangSource2 from "@assets/gif/bok2.gif";
import horangSource3 from "@assets/gif/bok3.gif";
import horangSource4 from "@assets/gif/bok4.gif";
import horangSource5 from "@assets/gif/bok5.gif";
import horangSource6 from "@assets/gif/bok6.gif";
import horangSource7 from "@assets/gif/bok7.gif";
import horangSource8 from "@assets/gif/bok8.gif";
import horangSource9 from "@assets/gif/bok9.gif";

const horangSourceList = {
  1: horangSource1,
  2: horangSource2,
  3: horangSource3,
  4: horangSource4,
  5: horangSource5,
  6: horangSource6,
  7: horangSource7,
  8: horangSource8,
  9: horangSource9,
};

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const { dispatch } = useContext(GlobalContext);

  const [createdBokType, setCreatedBokType] = useState(1);
  const [showHorang, setShowHorang] = useState(false);

  useEffect(() => {
    if (!location.state?.isBokjumaniCreated) return;

    setShowHorang(true);
    setCreatedBokType(location.state.createdBokType);

    setTimeout(() => {
      setShowHorang(false);
      history.replaceState({}, document.title);
    }, 1400);
  }, [location.state?.isBokjumaniCreated]);

  // prevent scrolling
  useEffect(() => {
    const removeEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const disableScroll = () => {
      document
        .querySelector("body")
        .addEventListener("touchmove", removeEvent, { passive: false });
      document
        .querySelector("body")
        .addEventListener("onclick", removeEvent, { passive: false });
      document
        .querySelector("body")
        .addEventListener("mousewheel", removeEvent, { passive: false });
    };

    disableScroll();
  }, []);

  useEffect(async () => {
    const isSignUpPage = location.pathname.split("/")[1] === "signUp";
    const isSelectionPage = location.pathname.split("/")[1] === "select";
    const isBokjumaniDetailPage =
      location.pathname.split("/")[1] === "bokjumani";

    if (isSignUpPage || isSelectionPage || isBokjumaniDetailPage) return;

    const userRoomId = location.pathname.split("/")[1];

    const cookie = Cookie.get();

    // "/"
    if (!userRoomId) {
      // logged in
      if (cookie.user) {
        const user = JSON.parse(cookie.user);
        // 방으로 보낸다
        navigate(`/${user.room_uri}`, { replace: true });

        return;
      } else {
        // not logged in
        // 로그인 페이지로
        navigate("/login", { replace: true });

        return;
      }
    }

    const {
      data: { result, user, message },
    } = await axios(`${process.env.REACT_APP_SERVER_URL}/room/${userRoomId}`);

    if (result === "failed") {
      // 잘못된 방(삭제된 유저의 roomId)에 들어온 상태
      console.log(message);

      alert("잘못된 링크입니다!");

      // 쿠키 날려버리자!
      function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }

      deleteAllCookies();

      navigate("/login", { replace: true });

      return;
    }

    // 해당 방 owner 의 데이터를 성공적으로 가져온 경우
    dispatch({ type: "SET_ROOM_OWNER", payload: user.name });
    dispatch({ type: "SET_BOKJUMANI_LIST", payload: user.bokjumani_list });
  }, [location.state?.isBokjumaniCreated, location.state?.isFirstAtHome]);

  const horangSource = horangSourceList[createdBokType];

  return (
    <Container>
      <AppHeader />

      <RoomWrapper>
        <Room />
        {showHorang && <Horang src={horangSource} />}
      </RoomWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: solid 5px #5e3618;
  border-radius: 10px;
  padding: 1.5%;

  background-color: #976e3d;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

const RoomWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Horang = styled.img`
  width: 150px;
  position: absolute;
  top: 20%;
  left: 0;
`;

export default React.memo(Home);
