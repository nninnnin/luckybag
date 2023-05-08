import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

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

function BokjimanmiList() {
  let {
    globalState: { bokjumaniList, isMyRoom },
  } = useContext(GlobalContext);

  const slicedBokList = bokjumaniList.slice(0, 16);

  slicedBokList.map((bok) => {
    let source;

    switch (bok.type) {
      case 1:
        source = bokjumaniSource1;
        break;
      case 2:
        source = bokjumaniSource2;
        break;
      case 3:
        source = bokjumaniSource3;
        break;
      case 4:
        source = bokjumaniSource4;
        break;
      case 5:
        source = bokjumaniSource5;
        break;
      case 6:
        source = bokjumaniSource6;
        break;
      case 7:
        source = bokjumaniSource7;
        break;
      case 8:
        source = bokjumaniSource8;
        break;
      case 9:
        source = bokjumaniSource9;
        break;
      default:
        source = bokjumaniSource1;
        break;
    }

    bok.image_url = source;

    return bok;
  });

  const location = useLocation();
  const navigate = useNavigate();

  function handleBokjumaniClick(bokId) {
    navigate(`bokjumani/${bokId}`, {
      state: { backgroundLocation: location },
    });
  }

  return (
    <Container isMyRoom={isMyRoom}>
      <BokjumaniContainer>
        {slicedBokList.map((bok) => {
          return (
            <BokjumaniWrapper key={bok._id}>
              <Bokjumani
                src={bok.image_url}
                onClick={() => handleBokjumaniClick(bok._id)}
              />
              <BokjumaniAuthor>{bok.author}</BokjumaniAuthor>
            </BokjumaniWrapper>
          );
        })}
      </BokjumaniContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;

  position: absolute;
  top: ${({ isMyRoom }) => (isMyRoom ? "64%" : "50%")};
  left: 50%;
  transform: translate(-50%);
`;
const BokjumaniContainer = styled.div`
  width: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const BokjumaniWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 10px;

  & > img {
    height: 50px;
    width: auto;
  }

  & > span {
    flex: 1;
  }
`;
const Bokjumani = styled.img`
  position: relative;
  margin: 0 -10px;
  margin-bottom: 3px;

  cursor: pointer;
`;
const BokjumaniAuthor = styled.span`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 4px;
  font-size: 0.5em;
  box-shadow: 0.5px 0.5px 1.5px black;
  width: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: scale(0.8);
`;

export default BokjimanmiList;
