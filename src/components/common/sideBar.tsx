"use client"

import styled from "styled-components"
import Logo from "../../assets/imgs/logo.svg";
import TextLogo from "../../assets/imgs/textLogo.svg";
import Home from "../../assets/imgs/sideBar/home.svg"
import Write from "../../assets/imgs/sideBar/write.svg"
import Book from "../../assets/imgs/sideBar/book.svg"
import My from "../../assets/imgs/sideBar/my.svg"
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SideBarProps {
    closed: boolean;
    setClosed: Dispatch<SetStateAction<boolean>>;
}

export default function SideBar({closed, setClosed}:SideBarProps) {
    useEffect(() => {
        const saveState = localStorage.getItem("closedSidebar")
        if (saveState !== null) {
            setClosed(saveState === "true");
        }
    })

    const toggleSidebar = () => {
        setClosed(!closed);
        localStorage.setItem("closedSidebar", String(!closed));
    };

    return (
        <Wrapper $closed={closed}>
            <LogoBox onClick={() => toggleSidebar()}>
                <Image src={Logo} alt="" />
                {!closed && <Image src={TextLogo} alt="잇다" />}
            </LogoBox>
            <NavigationBox>
                <Link href={'/'}>
                    <Nav>
                        <Image src={Home} alt="홈" />
                        {!closed && <p>홈</p>}
                    </Nav>
                </Link>
                <Link href={'/post'}>
                    <Nav>
                        <Image src={Write} alt="글 쓰기" />
                        {!closed && <p>글 쓰기</p>}
                    </Nav>
                </Link>
                <Nav>
                    <Image src={Book} alt="책" />
                    {!closed && <p>책</p>}
                </Nav>
                <Nav>
                    <Image src={My} alt="마이페이지" />
                    {!closed && <p>마이페이지</p>}
                </Nav>
            </NavigationBox>
            
        </Wrapper>
    )
}

const Wrapper = styled.div<{ $closed: boolean }>`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: ${({ $closed }) => ($closed ? "90px" : "250px")};
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    padding: 33px 25px;
    display: flex;
    flex-direction: column;
    gap: 85px;
    transition: width 0.3s ease;
`;

const LogoBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    width: 100%;
`;

const NavigationBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    width: 100%;
    height: 40px;
    padding-left: 11px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    > p {
        font-size: 15px;
        color: rgba(0,0,0,0.5);
    }
    &:hover {
        background-color: rgba(217, 217, 217, 0.34);
        > p {
            color: black;
        }
    }
`;