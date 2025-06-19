"use client"

import styled from "styled-components"
import SideBar from "@/components/common/sideBar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface PostType {
    id: string;
    title: string;
    author: string;
    content: string;
}

export default function UserStoryDetail() {
    const [closed, setClosed] = useState<boolean>(false);
    const [post, setPost] = useState<PostType | null>(null);
    const params = useParams();
    const id = params?.id as string;

    useEffect(() => {
        const fetchPost = async () => {
          if (!id) return;
          try {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              const data = docSnap.data();
      
              let fullContent = data.content;
      
              if (data.completed) {
                const contentsRef = collection(db, "posts", id, "contents");
                const contentsSnap = await getDocs(contentsRef);
      
                const sorted = contentsSnap.docs
                  .map((doc) => doc.data())
                  .sort((a, b) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return dateA - dateB;
                  });
      
                const allContents = sorted.map((item) => item.content).join("\n\n");
                fullContent = `${data.content}\n\n${allContents}`;
              }
      
              setPost({
                id,
                title: data.title,
                author: data.author,
                content: fullContent,
              });
            } else {
              console.log("문서가 존재하지 않습니다.");
            }
          } catch (err) {
            console.error('글 상세보기 실패:', err);
          }
        };
      
        fetchPost();
      }, [id]);      

    return (
        <Wrapper>
            <SideBar closed={closed} setClosed={setClosed} />
            <ContainerWrapper $closed={closed} >
                <Container>
                    <Img />
                    <TitleWrapper>
                        <Title>{post?.title || '로딩 중...'}</Title>
                        <Author>{post?.author || '로딩 중...'}</Author>
                    </TitleWrapper>
                    <Content>{post?.content || '로딩 중...'}</Content>
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
    white-space: pre-line;
`;