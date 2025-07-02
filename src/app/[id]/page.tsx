"use client"

import styled from "styled-components"
import SideBar from "@/components/common/sideBar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import AuthorNameBox from "@/components/common/authorNameBox";

interface ContentItem {
    content: string;
    author: string;
    createdAt: string;
  }
  
  interface PostType {
    id: string;
    title: string;
    author: string;
    content: string;
    contents: ContentItem[];
  }

export default function UserStoryDetail() {
    const [closed, setClosed] = useState<boolean>(false);
    const [post, setPost] = useState<PostType | null>(null);
    const params = useParams();
    const id = params?.id as string;
    const [hoveredAuthor, setHoveredAuthor] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

    const handleMouseEnter = (author: string, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({ x: rect.left, y: rect.top - 33 });
        setHoveredAuthor(author);
      };
    
      const handleMouseLeave = () => {
        setHoveredAuthor(null);
        setTooltipPos(null);
      };    

    useEffect(() => {
        const fetchPost = async () => {
          if (!id) return;
      
          try {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
      
            if (!docSnap.exists()) {
              console.log("문서가 존재하지 않습니다.");
              return;
            }
      
            const data = docSnap.data();
      
            let contents: ContentItem[] = [];
            if (data.completed) {
              const contentsRef = collection(db, "posts", id, "contents");
              const contentsSnap = await getDocs(contentsRef);
      
              contents = contentsSnap.docs
                .map((doc) => doc.data() as ContentItem)
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            }
      
            setPost({
              id,
              title: data.title,
              author: data.author,
              content: data.content,
              contents,
            });
          } catch (err) {
            console.error("글 상세보기 실패:", err);
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
                    <Content>
                        {post?.content.split("\n").map((line, idx) => (
                            <p
                                key={"main-" + idx}
                                onMouseEnter={(e) => handleMouseEnter(post.author, e)}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: "pointer" }}
                            >
                                {line}
                            </p>
                        ))}

                        {post?.contents.map((item, idx) => (
                            <p
                                key={"content-" + idx}
                                onMouseEnter={(e) => handleMouseEnter(item.author, e)}
                                onMouseLeave={handleMouseLeave}
                                style={{marginTop: '10px', marginBottom: "10px", cursor: "pointer" }}
                            >
                                {item.content}
                            </p>
                        ))}
                    </Content>
                    {hoveredAuthor && tooltipPos && (
                        <TooltipWrapper style={{ top: tooltipPos.y, left: tooltipPos.x, position: "fixed" }}>
                            <AuthorNameBox author={hoveredAuthor} />
                        </TooltipWrapper>
                    )}
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

const Content = styled.div`
    font-size: 15px;
    white-space: pre-line;
`;

const TooltipWrapper = styled.div`
  z-index: 9999;
  pointer-events: none;
`;
