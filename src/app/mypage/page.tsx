"use client"

import styled from "styled-components"
import SideBar from "@/components/common/sideBar";
import ListBox from "@/components/common/listBox";
import Image from "next/image";
import Person from "../../assets/imgs/person/writePersonImg.png";
import Link from "next/link";
import { useState } from "react";

export default function MyPage() {
    const [closed, setClosed] = useState(false);
    const [isEmpty, ] = useState(false);

    return (
        <Wrapper>
            <SideBar closed={closed} setClosed={setClosed}/>
            <ConatainerWrapper $closed={closed}>
                <Container>
                    <TextWrapper>
                        <p className="head">IF 스토리</p>
                        <TitleWrapper>
                            <p>의진님이</p>
                            <p className="colorText">적은 이야기</p>
                        </TitleWrapper>
                    </TextWrapper>
                    {isEmpty ? 
                        <NoContentWrapper>
                            <Image src={Person} alt="" style={{width: '153px', height: '178px'}}/>
                            <p>작성한 글이 없어요</p>
                            <StyledLink href={'/post'}>작성</StyledLink>
                        </NoContentWrapper> : (
                        <ListBoxWrapper>
                            <ListBox />
                            <ListBox />
                            <ListBox />
                            <ListBox />
                            <ListBox />
                            <ListBox />
                        </ListBoxWrapper>
                    )}
                </Container>
            </ConatainerWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
`;

const ConatainerWrapper = styled.div<{ $closed: boolean }>`
    width: 100%;
    transition: margin-left 0.3s ease;
    margin-left: ${({$closed}) => ($closed ? "90px" : "250px")};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
    position: relative;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    > .head {
        font-size: 15px;
        font-weight: 600;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    > p {
        font-size: 25px;
        font-weight: 700;
    }
    > .colorText {
        color: #FFACDD;
        margin-left: 7px;
    }
`;

const ListBoxWrapper = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 100px;
`;

const NoContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute; 
    top: 40vh;
    left: 50%; 
    transform: translate(-50%, -50%);
    text-align: center;
    > p {
        font-weight: 600;
        font-size: 15px;
        margin-top: 40px;
    }
    > button {
        
    }
`;

const StyledLink = styled(Link)`
    width: 148px;
    height: 28px;
    border: none;
    border-radius: 10px;
    background-color: #FFACDD;
    color: white;
    font-weight: 600;
    font-size: 13px;
    margin-top: 15px;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #FF86CE;
    }
`;