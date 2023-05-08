import React, { useContext } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { GlobalContext } from "@src/App";

import signBoardBackgroundSource from "@assets/background/signboard.png";
import inventoryButtonSource from "@assets/buttons/inventory-button.svg";
import linkShareButtonSource from "@assets/buttons/link-share-button.svg";

function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    globalState: { roomOwner, bokjumaniList, isMyRoom },
  } = useContext(GlobalContext);

  const handleInventoryButtonClick = () => {
    console.log(location);

    navigate("bokjumani/inventory", {
      state: { backgroundLocation: location },
    });
  };

  const handleMyRoomLinkSharingButtonClick = async () => {
    const roomUri = location.pathname;

    if (navigator.share) {
      navigator.share({
        title: "복주머니",
        text: "내 방에 놀러와!",
        url: roomUri,
      });

      return;
    }

    navigator.clipboard.writeText(roomUri);
    const readText = await navigator.clipboard.readText();

    if (readText === roomUri) {
      alert("내 방 링크가 복사되었어요!");
    }
  };

  return (
    <HeaderContainer>
      <SignageWrapper>
        <Signage>
          {roomOwner}님에게 복주머니 {bokjumaniList.length}개 가 전달됐어요
        </Signage>
      </SignageWrapper>
      {isMyRoom && (
        <ButtonSection>
          <InventoryButton
            src={inventoryButtonSource}
            onClick={handleInventoryButtonClick}
          />
          <MyRoomLinkSharingButton
            src={linkShareButtonSource}
            onClick={handleMyRoomLinkSharingButtonClick}
          />
        </ButtonSection>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const SignageWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0 2%;
  padding-top: 1%;

  position: relative;
  top: 6%;

  background-image: url(${signBoardBackgroundSource});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const Signage = styled.marquee`
  width: 100%;
  padding: 5px;

  border-radius: 5px;
  color: yellow;
  line-height: 2em;

  font-family: "BMEULJIRO";
  font-size: 2.6vh;
  word-break: keep-all;
`;

const ButtonSection = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
`;

const InventoryButton = styled.img`
  width: 40%;
  margin: 4px 1%;
  margin-bottom: 21px;
`;
const MyRoomLinkSharingButton = styled.img`
  width: 40%;
  margin: 4px 1%;
  margin-bottom: 21px;
`;

export default AppHeader;
