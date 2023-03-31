import React from "react";
import "../homepage/Landingpage.css";
import Heroimage from "./assets/Component.svg";
import Musiclogo from "./assets/music.svg";
import Livepeerlogo from "./assets/Livepeer.svg";
import Polygonelogo from "./assets/polygon.svg";
import nftportlogo from "./assets/nftport.svg";
import Zoralogo from "./assets/zora.svg";
import { Chat } from "@pushprotocol/uiweb";
function Landingpage() {
  return (
    <>
      <div className="homepage-main">
        <div className="background-color background">
          <div className="h-left">
            <img src={Heroimage} className="Heroimage" />
          </div>
          <div className="main-text">
            <div className="hero-text">
              CATCH MY <br />
              <span className="game"> GAME </span>
            </div>
            <div className="tag-line">
              DON'T MISS OUT ON YOUR FAVOURITE SPORT LIVE!
            </div>

            <div className="all-sponsers">
              <div className="flex-grow"></div>

              <img src={Livepeerlogo} className="Livepeerlogo" />
              <img src={Polygonelogo} className="Polygonelogo" />
              <img src={Zoralogo} className="Zoralogo" />
              <img src={nftportlogo} className="nftstoragelogo" />
            </div>
          </div>
        </div>
        <div>
          <Chat
            account="0x6430C47973FA053fc8F055e7935EC6C2271D5174" //user address
            supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
            apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
            env="staging"
          />
        </div>

        <div className="landigpage-footer ">
          Copyright © 2023 CatchMyGame. All Rights Reserved
        </div>
      </div>
    </>
  );
}
export default Landingpage;
