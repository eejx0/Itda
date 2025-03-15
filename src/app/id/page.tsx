"use client"

import styled from "styled-components"
import SideBar from "@/components/common/sideBar";
import { useState } from "react";

export default function UserStoryDetail() {
    const [closed, setClosed] = useState<boolean>(false);

    return (
        <Wrapper>
            <SideBar closed={closed} setClosed={setClosed} />
            <ContainerWrapper $closed={closed} >
                <Container>
                    <Img />
                    <TitleWrapper>
                        <Title>제목</Title>
                        <Author>작가</Author>
                    </TitleWrapper>
                    <Content>내용</Content>
                </Container>
            </ContainerWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
`;

const ContainerWrapper = styled.div<{ $closed: boolean }>`
    width: 100%;
    transition: margin-left 0.3s ease;
    margin-left: ${({$closed}) => ($closed ? "90px" : "250px")};
    margin-bottom: 100px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    gap: 50px;
`;

const Img = styled.div`
    width: 100px;
    height: 100px;
    background-color: black;
    border-radius: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Title = styled.p`
    font-size: 25px;
    font-weight: 600;
`;

const Author = styled.p`
    font-size: 15px;
`;

const Content = styled.p`
    font-size: 15px;
`;