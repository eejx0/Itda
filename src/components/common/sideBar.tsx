"use client";

import styled from "styled-components";
import Logo from "../../assets/imgs/logo.svg";
import TextLogo from "../../assets/imgs/textLogo.svg";
import Home from "../../assets/imgs/sideBar/home.svg";
import Write from "../../assets/imgs/sideBar/write.svg";
import Book from "../../assets/imgs/sideBar/book.svg";
import My from "../../assets/imgs/sideBar/my.svg";
import { Dispatch, SetStateAction, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface SideBarProps {
    closed: boolean;
    setClosed: Dispatch<SetStateAction<boolean>>;
}

export default function SideBar({ closed, setClosed }: SideBarProps) {
    const [width, setWidth] = useState(250);
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem("closedSidebar");
        if (savedState !== null) {
            setClosed(savedState === "true");
        }

        const savedWidth = localStorage.getItem("sidebarWidth");
        if (savedWidth) {
            setWidth(parseInt(savedWidth, 10));
        }
    }, []);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (!isResizing) return;
        
        requestAnimationFrame(() => {
            const newWidth = Math.max(250, Math.min(400, e.clientX));
            setWidth(newWidth);
            localStorage.setItem("sidebarWidth", String(newWidth));
        });
    }, [isResizing]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", resize);
            document.addEventListener("mouseup", stopResizing);
        }
        return () => {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing, stopResizing, resize]);

    return (
        <Wrapper style={{ width: closed ? "90px" : `${width}px` }}>
            <LogoBox onClick={() => setClosed(!closed)}>
                <Image src={Logo} alt="" />
                {!closed && <Image src={TextLogo} alt="잇다" />}
            </LogoBox>
            <NavigationBox>
                <Link href={"/"}>
                    <Nav>
                        <Image src={Home} alt="홈" />
                        {!closed && <p>홈</p>}
                    </Nav>
                </Link>
                <Link href={"/post"}>
                    <Nav>
                        <Image src={Write} alt="글 쓰기" />
                        {!closed && <p>글 쓰기</p>}
                    </Nav>
                </Link>
                <Link href={"/book"}>
                    <Nav>
                        <Image src={Book} alt="책" />
                        {!closed && <p>책</p>}
                    </Nav>
                </Link>
                <Link href={"/mypage"}>
                    <Nav>
                        <Image src={My} alt="마이페이지" />
                        {!closed && <p>마이페이지</p>}
                    </Nav>
                </Link>
            </NavigationBox>
            <ResizeHandle onMouseDown={startResizing} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    padding: 33px 25px;
    display: flex;
    flex-direction: column;
    gap: 85px;
    background-color: white;
    z-index: 1000;
    transition: width 0.1s ease-out;
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
    transition: 0.1s;
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

const ResizeHandle = styled.div`
    width: 5px;
    cursor: ew-resize;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    transition: 0.2s;
`;

