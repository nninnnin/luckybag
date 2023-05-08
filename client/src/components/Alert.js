import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import alertImageSource from "@assets/alert/block-message.svg";
import closeButtonSource from "@assets/buttons/close.svg";

const Container = styled.div`
  width: 70%;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const Image = styled.img`
  width: 100%;
`;

const CloseButton = styled.img`
  width: 40px;
  position: absolute;
  top: -30px;
  right: 0;
`;

function Alert() {
  const navigate = useNavigate();

  function handleCloseButtonClick() {
    navigate(-1);
  }

  return (
    <>
      <Container>
        <Image src={alertImageSource} />
        <CloseButton src={closeButtonSource} onClick={handleCloseButtonClick} />
      </Container>
    </>
  );
}

export default Alert;
