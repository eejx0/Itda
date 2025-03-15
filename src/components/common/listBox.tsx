"use client"

import styled from "styled-components"
import Link from "next/link";

export default function ListBox() {
    return (
        <Wrapper>
            <Link href={'/id'}>
                <ContentWrapper>
                    <LikeImg />
                    <ContentBox>
                        <Title>제목</Title>
                        <Author>작가</Author>
                        <Content>니네 내일 세상이 멸망하면 뭐부터 할건지 생각해봄?? 근데 나는 진짜 모르겠음.. 이 부분에다가 이제 이야기 내용 일부분을 넣는건데
                        내일 급식 뭐지 아 집 가고 싶다.. 누룽이 씻겨야되는데;;아무것도 하기싫다 냐먀냐먀냠</Content>
                    </ContentBox>
                </ContentWrapper>
            </Link>
            <Line />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 20px;
    cursor: pointer;
    height: 90px;
`;

const LikeImg = styled.div`
    width: 94px;
    height: 94px;
    background-color: black;
    border-radius: 10px;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    flex: 1;
    min-width: 0;
`;

const Title = styled.p`
    font-size: 17px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Author = styled.p`
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Content = styled.p`
    font-size: 15px;
    color: rgba(0,0,0,0.5);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.2);
`;