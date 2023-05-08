import { last } from "lodash";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import backgroundSource from "@assets/background/bok-details-background.png";
import backButtonSource from "@assets/buttons/back.svg";

import bokjumaniSource1 from "@assets/bokjumani/bok1.svg";
import bokjumaniSource2 from "@assets/bokjumani/bok2.svg";
import bokjumaniSource3 from "@assets/bokjumani/bok3.svg";
import bokjumaniSource4 from "@assets/bokjumani/bok4.svg";
import bokjumaniSource5 from "@assets/bokjumani/bok5.svg";
import bokjumaniSource6 from "@assets/bokjumani/bok6.svg";
import bokjumaniSource7 from "@assets/bokjumani/bok7.svg";
import bokjumaniSource8 from "@assets/bokjumani/bok8.svg";
import bokjumaniSource9 from "@assets/bokjumani/bok9.svg";

import { GlobalContext } from "@src/App";

const bokSourceList = {
  1: bokjumaniSource1,
  2: bokjumaniSource2,
  3: bokjumaniSource3,
  4: bokjumaniSource4,
  5: bokjumaniSource5,
  6: bokjumaniSource6,
  7: bokjumaniSource7,
  8: bokjumaniSource8,
  9: bokjumaniSource9,
};

function BokjumaniDetails() {
  const {
    globalState: { bokjumaniList },
  } = useContext(GlobalContext);

  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();
  const bokjumaniId = last(location.pathname.split("/"));

  const navigate = useNavigate();

  const bokjumani = bokjumaniList.find((el) => el._id === bokjumaniId);

  const { author, greeting, type } = bokjumani;

  const source = bokSourceList[type];

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <Container>
      <Author>{author}</Author>

      <BokjumaniWrapper>
        <BokjumaniImage
          src={source}
          onLoad={() => setIsLoaded(true)}
          isLoaded={isLoaded}
        />
        <BokjumaniTag isLoaded={isLoaded}>{author}</BokjumaniTag>
      </BokjumaniWrapper>

      <Greeting isLoaded={isLoaded}>{greeting}</Greeting>

      <BackButton src={backButtonSource} onClick={handleBackButtonClick} />
    </Container>
  );
}

const Container = styled.div`
  width: 342px;
  height: 540.16px;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);

  background-image: url(${backgroundSource});
  background-size: contain;
  background-position: top;
`;

const ButtonImage = styled.img`
  width: 18%;

  cursor: pointer;
`;
const BackButton = styled(ButtonImage)`
  position: absolute;
  top: 2.3%;
  left: 3.7%;
`;

const Author = styled.span`
  position: absolute;
  top: 3.5%;
  left: 50%;
  transform: translate(-50%);

  font-family: "BMEULJIRO";
  font-size: 1.3em;
`;

const Greeting = styled.p`
  visibility: ${({ isLoaded }) => (isLoaded ? "visible" : "hidden")};

  width: 80%;

  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);

  font-family: "BMEULJIRO";
`;

const BokjumaniWrapper = styled.div`
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BokjumaniImage = styled.img`
  visibility: ${({ isLoaded }) => (isLoaded ? "visible" : "hidden")};
  height: 85px;
  margin-bottom: 7px;
`;
const BokjumaniTag = styled.span`
  visibility: ${({ isLoaded }) => (isLoaded ? "visible" : "hidden")};

  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 3% 7%;
  font-size: 0.5em;
  box-shadow: 0.5px 0.5px 1.5px black;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
`;

export default BokjumaniDetails;
