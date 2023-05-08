import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import bok1Source from "@assets/bokjumani/selective/bok1.svg";
import bok2Source from "@assets/bokjumani/selective/bok2.svg";
import bok3Source from "@assets/bokjumani/selective/bok3.svg";
import bok4Source from "@assets/bokjumani/selective/bok4.svg";
import bok5Source from "@assets/bokjumani/selective/bok5.svg";
import bok6Source from "@assets/bokjumani/selective/bok6.svg";
import bok7Source from "@assets/bokjumani/selective/bok7.svg";
import bok8Source from "@assets/bokjumani/selective/bok8.svg";
import bok9Source from "@assets/bokjumani/selective/bok9.svg";

import backgroundSource from "@assets/background/modal-background-select.png";
import backButtonSource from "@assets/buttons/back.svg";
import nextButtonSource from "@assets/buttons/next.svg";

const bokSourceList = [
  bok1Source,
  bok2Source,
  bok3Source,
  bok4Source,
  bok5Source,
  bok6Source,
  bok7Source,
  bok8Source,
  bok9Source,
];

import { GlobalContext } from "@src/App";

function Create() {
  const {
    globalState: { roomOwner, selectedBok },
    dispatch,
  } = useContext(GlobalContext);

  const location = useLocation();
  const navigate = useNavigate();

  function handleRandomSelectionButtonClick() {
    dispatch({
      type: "SET_SELECTED_BOK",
      payload: Math.floor(Math.random() * 9) + 1,
    });
  }

  function handleBokClick(e, bokIndex) {
    dispatch({
      type: "SET_SELECTED_BOK",
      payload: bokIndex,
    });
  }

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleNextButtonClick() {
    if (!selectedBok) return;

    navigate("/create", {
      state: {
        backgroundLocation: { ...location.state.backgroundLocation },
      },
    });
  }

  return (
    <Container>
      <ModalHeader>
        <BackButton src={backButtonSource} onClick={handleBackButtonClick} />
        <NextButton
          src={nextButtonSource}
          onClick={handleNextButtonClick}
          disabled={!selectedBok}
        />
      </ModalHeader>

      <SelectBox>
        <Header>{roomOwner} 님에게</Header>
        <SubHeader>
          {/* <span onClick={handleRandomSelectionButtonClick}>랜덤 선택</span> */}
        </SubHeader>
        <BokList>
          {bokSourceList.map((bokSource, index) => {
            const bokIndex = index + 1;

            return (
              <Bok
                key={"bok" + bokIndex}
                src={bokSource}
                isSelected={selectedBok === bokIndex}
                onClick={(e) => handleBokClick(e, bokIndex)}
              />
            );
          })}
        </BokList>
      </SelectBox>
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

  display: flex;
  flex-direction: column;

  background-image: url(${backgroundSource});
  background-position: top;
  background-size: contain;
`;

const ModalHeader = styled.div`
  flex: 1;

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 3.5%;
`;

const ButtonImage = styled.img`
  width: 20%;
  cursor: pointer;
`;
const BackButton = styled(ButtonImage)``;
const NextButton = styled(ButtonImage)`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SelectBox = styled.div`
  width: 100%;
  height: 90%;

  margin-top: auto;
`;

const Header = styled.h2`
  position: absolute;
  top: 0.5%;
  left: 50%;
  transform: translate(-50%);

  font-size: 5vw;
  font-family: "BMEULJIRO";
  font-weight: 500;
  text-align: center;

  @media (min-width: 400px) {
    font-size: 20px;
  }
`;

const SubHeader = styled.h4`
  font-size: 4vw;
  font-family: "BMEULJIRO";
  font-weight: 500;
  padding: 0 1em;

  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (min-width: 400px) {
    font-size: 16px;
  }

  & > span {
    color: white;
    background-color: #c1bc40;
    border: 3px solid #e1e141;
    border-radius: 5px;
    padding: 3px;
    font-size: 0.6em;

    cursor: pointer;
  }
`;

const BokList = styled.div`
  position: absolute;
  top: 25.8%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Bok = styled.img`
  width: 28%;
  margin: 1%;

  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
  border-radius: ${({ isSelected }) => (isSelected ? "5px" : "7px")};

  cursor: pointer;
`;

export default Create;
