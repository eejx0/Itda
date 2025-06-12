"use client"

import styled from "styled-components"
import Link from "next/link";

interface ListBoxProps {
    id: string;
    title: string;
    author: string;
    content: string;
}

export default function ListBox({ post }: {post: ListBoxProps}) {

    return (
        <Wrapper>
            <Link href={`/${post.id}`}>
                <ContentWrapper>
                    <LikeImg />
                    <ContentBox>
                        <Title>{post.title}</Title>
                        <Author>{post.author}</Author>
                        <Content>{post.content}</Content>
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