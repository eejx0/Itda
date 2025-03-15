"use client"

import styled from "styled-components"

export default function CurrentStoryBox() {
    return (
        <Wrapper>
            <LikeImg />
            <Author>작가</Author>
            <Title>제목</Title>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const LikeImg = styled.div`
    width: 100%;
    height: 152px;
    background-color: black;
    border-radius: 20px;
`;

const Author = styled.p`
    font-size: 15px;
`;

const Title = styled.p`
    font-size: 17px;
    font-weight: 700;
`;