"use client"

import styled from "styled-components"
import Link from "next/link";

interface CurrentStoryBoxProps {
    id: string;
    title: string;
    author: string;
}

export default function CurrentStoryBox({ post }: {post: CurrentStoryBoxProps}) {
    return (
        <Wrapper>
            <Link href={`/edit/${post.id}`}>
                <ContentWrapper>
                    <LikeImg />
                    <Author>{post.author}</Author>
                    <Title>{post.title}</Title>
                </ContentWrapper>
            </Link>
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

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
`;