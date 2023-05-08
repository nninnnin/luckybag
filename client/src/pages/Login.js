import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

import backgroundSource from "@assets/background/background-login.png";
import buttonSource from "@assets/login/kakao-button.svg";
import advertisementSource from "@assets/login/advertisement.svg";
import backButtonSource from "@assets/buttons/back.svg";

import { encodeParameters } from "../utils";

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${backgroundSource});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const LoginButton = styled.img`
  width: 73%;

  position: absolute;
  top: 48.5%;
  left: 50%;
  transform: translate(-50%, -48.5%);

  cursor: pointer;
`;

const AdvertisementImage = styled.img`
  width: 92%;

  position: absolute;
  left: 50%;
  bottom: 2.2%;

  transform: translate(-50%);
`;
const BackButton = styled.img`
  width: 17%;

  position: absolute;
  top: 2.8%;
  left: 4.2%;

  cursor: pointer;
`;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(async () => {
    // useEffect 내부의 로직은 "/oauth" 즉 "카카오톡 로그인 이후" 리다이렉션 페이지에서만 실행
    const isRedirected = location.pathname === "/oauth";
    if (!isRedirected) return;

    console.log("redirected?", isRedirected);

    // 1. 카카오톡의 인가코드를 가져온다
    const authCode = location.search.split("?code=")[1];

    // 2. 카카오에 accessToken을 요청한다
    let params = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: `${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}`,
      code: authCode,
    };

    const { data } = await axios(
      "https://kauth.kakao.com/oauth/token" + "?" + encodeParameters(params)
    );

    console.log("토큰 요청 이후 받아온 데이터", data);

    const accessToken = data.access_token;

    // 3. 받아온 accessToken을 카카오에 세팅한다
    await Kakao.Auth.setAccessToken(accessToken);

    // 4. accessToken이 있으므로 유저 정보(카카오 id)를 가져올 수 있다
    const { id: kakaoId } = await Kakao.API.request({
      url: "/v2/user/me",
    });

    console.log("토큰으로 가져온 카카오 아이디", kakaoId);

    // 5. 유저의 kakaoId로 서버에 등록된 유저가 있는지 확인한다
    const { data: userData } = await axios(
      `${process.env.REACT_APP_SERVER_URL}/users`,
      {
        params: {
          kakaoId,
        },
        withCredentials: true,
      }
    );

    console.log(userData);

    const { result, user } = userData;

    // 회원으로 등록되어 있지 않은 유저일 경우
    if (result === "failed") {
      navigate("/signUp", {
        state: { backgroundLocation: location, kakaoId },
        replace: false,
      });
    }

    // 회원으로 등록되어 있는 유저일 경우
    if (result === "ok") {
      // redirect to homepage
      navigate(`/${user.room_uri}`, {
        replace: true,
      });
    }
  }, []);

  function handleLoginButtonClick() {
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI,
    });
  }

  return (
    <Container>
      <Link to="/">
        <BackButton src={backButtonSource} />
      </Link>

      <LoginButton src={buttonSource} onClick={handleLoginButtonClick} />

      {/* <AdvertisementImage src={advertisementSource} /> */}
    </Container>
  );
}

export default Login;
