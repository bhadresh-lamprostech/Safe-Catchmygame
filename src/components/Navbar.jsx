import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import "../styles/Navbar/navbar.scss";
import Dropdown from "./users/generalblocks/Dropdown";
import logo from "../styles/logo.png";
import "../styles/Navbar/navbar.scss";
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { useAccount } from "wagmi";
import { useEnsName, useEnsAvatar } from "wagmi";
import styled from "styled-components";
// import {navbarItem} from "./users/NavbarItem"

const Navbar = ({ setOpenWalletOption }) => {
  const [showEnsName, setEnsName] = useState();
  const cookie = new Cookies();
  const { address, isConnected } = useAccount();
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);

  const onMouseEnter = () => {
    if (window.innerWidth < 200) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  // console.log(connector);

  const onMouseLeave = () => {
    if (window.innerWidth < 200) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  useEffect(() => {
    const addr = cookie.get("account");
    if (addr) {
      isConnected(addr);
    }
  }, [cookie]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const { data: ensName } = useEnsName({
    address: address,
    chainId: 5,
    onSuccess(ensName) {
      setEnsName(ensName);
      console.log("ensName", ensName);
    },
  });
  console.log(ensName);
  const { data: ensAvatar } = useEnsAvatar({
    address: address,
    chainId: 5,
    enabled: false,
    cacheTime: 2_000,

    onSuccess(ensAvatar, error) {
      console.log("success", { ensAvatar, error });
    },
  });
  console.log(ensAvatar);

  const StyledButton = styled.button`
    font-size: 1rem;
    color: white;
    border: none;
    cursor: pointer;
    padding: 8px 10px;
    background: red;
    background-size: 600% 200%;
    animation: gradient 4s linear infinite;
    animation-direction: alternate;
    border-radius: 10px;
    transition: 200ms ease;
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 6px 40px -6px #1a88f8;
    }
    &:active {
      transform: translateY(-3px);
      box-shadow: 0 6px 32px -6px #1a88f8;
    }
  `;
  useEffect(() => {
    if (address) setOpenWalletOption(false);
  }, [isConnected]);

  return (
    <>
      <div className="navbar-main">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={logo} alt="logo" height="128px"></img>
          </div>
        </div>
        {/* <div className="navbar-middle">
          <div className="searchbar">
            <input type="text" />
          </div>
        </div> */}

        {isConnected ? (
          <div className="navbar-right">
            <ul>
              <li
                className={window.location.pathname === "/" ? "active" : null}
              >
                <Link to="/">Home</Link>
              </li>
              <div className="dropdown-content"></div>
              <li
                className={
                  window.location.pathname === "/streams" ? "active" : null
                }
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <Link to="/streams">Streams</Link>
                {dropdown && <Dropdown />}
              </li>
              <li
                className={
                  window.location.pathname === "/all-artists" ? "active" : null
                }
              >
                <Link to="/all-artists">All Artists</Link>
              </li>
              <li
                className={
                  window.location.pathname === "/all-nfts" ? "active" : null
                }
              >
                <Link to="/all-nfts">All NFTs</Link>
              </li>
              <li
                className={
                  window.location.pathname === "/make-schedule"
                    ? "active"
                    : null
                }
              >
                <Link to="/make-schedule">Make Schedule</Link>
              </li>
              <li
                className={
                  window.location.pathname === "/profile" ? "active" : null
                }
              >
                <Link to="/profile">Profile</Link>
              </li>

              <ConnectKitButton.Custom>
                {({ isConnected, show, truncatedAddress }) => {
                  console.log(ensName);
                  return (
                    <StyledButton onClick={show}>
                      {ensName
                        ? ensName
                        : address.substring(0, 7) +
                          "..." +
                          address.substring(address.length - 4, address.length)}
                    </StyledButton>
                  );
                }}
              </ConnectKitButton.Custom>
            </ul>
          </div>
        ) : (
          <div className="navbar-right">
            <ul>
              <li
                className={window.location.pathname === "/" ? "active" : null}
              >
                <Link to="/">Home</Link>
              </li>
              <li>
                <ConnectKitButton.Custom>
                  {({ isConnected, show, truncatedAddress, ensName }) => {
                    return (
                      <StyledButton
                        onClick={() => {
                          show();
                          setOpenWalletOption();
                        }}
                      >
                        {"Connect Wallet"}
                      </StyledButton>
                    );
                  }}
                </ConnectKitButton.Custom>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
