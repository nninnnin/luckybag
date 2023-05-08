import React, { useContext } from "react";
import styled from "styled-components";

import BasketSource from "@assets/items/basket.svg";
import BasketCoverSource from "@assets/items/basket-cover.svg";
import BokjumaniSource5 from "@assets/bokjumani/bok5.svg";
import BokjumaniSource6 from "@assets/bokjumani/bok6.svg";
import BokjumaniSource9 from "@assets/bokjumani/bok9.svg";

import { GlobalContext } from "@src/App";

const Container = styled.div`
  width: 34%;
  position: absolute;
  top: 60.43%;
  top: ${({ isMyRoom }) => (isMyRoom ? "60.43%" : "46.5%")};
  right: 4%;
`;
const Basket = styled.img`
  width: 100%;

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
`;
const BasketCover = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`;
const BokjumaniWrapper = styled.div`
  transform: translate(${({ spreadRatio }) => spreadRatio * 0.8}%);
`;
const Bokjumani = styled.img`
  height: 50px;
  width: 75px;
  position: absolute;
  bottom: ${({ order }) => (order === 2 ? "4vh" : "1vh")};
  right: ${({ order, spreadRatio }) => order * spreadRatio}%;
  z-index: ${({ zIndex }) => zIndex * 10};

  cursor: pointer;
`;

function BasketComponent() {
  const {
    globalState: { isMyRoom },
  } = useContext(GlobalContext);

  const spreadRatio = 17;

  return (
    <Container isMyRoom={isMyRoom}>
      <Basket src={BasketSource} />
      <BasketCover src={BasketCoverSource} />

      <BokjumaniWrapper spreadRatio={spreadRatio}>
        <Bokjumani
          src={BokjumaniSource9}
          order={3}
          spreadRatio={spreadRatio}
          zIndex={2}
          style={{ marginRight: "6px" }}
        />
        <Bokjumani
          src={BokjumaniSource6}
          order={2}
          spreadRatio={spreadRatio}
          zIndex={1}
        />
        <Bokjumani
          src={BokjumaniSource5}
          order={1}
          spreadRatio={spreadRatio}
          zIndex={3}
        />
      </BokjumaniWrapper>
    </Container>
  );
}

export default BasketComponent;
