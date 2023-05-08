import React from "react";
import styled from "styled-components";

function Inventory() {
  return <Container>인벤토리..</Container>;
}

const Container = styled.div`
  width: 342px;
  height: 540.16px;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);

  background-color: "white";
`;

export default Inventory;
