"use client"

import SideBar from "@/components/common/sideBar";
import styled from "styled-components";
import CommonInput from "@/components/common/input";
import ListBox from "@/components/common/listBox";
import CurrentStoryBox from "@/components/common/currentStoryBox";
import { NoContentCard } from "@/components/common/noContentCard";
import Footer from "@/components/common/footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  completed: boolean;
  createdAt: string;
}

export default function Home() {
  const [closed, setClosed] = useState(false);
  const [isEmpty, ] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(postData);
    };

    fetchPosts();
  }, []);


  return (
    <Wrapper>
      <SideBar closed={closed} setClosed={setClosed}/>
      <ContainerWrapper $closed={closed}>
        <Container>
          <h3>안녕하세요, 의진님  💬</h3>
          <BoxWrapper>
            <LeftBox>
              <CommonInput placeholder="글을 검색하세요"/>
              <ListWrapper>
                {posts
                  .filter((post) => post.completed)
                  .map((post) => (
                    <ListBox key={post.id} post={post} />
                ))}
              </ListWrapper>
            </LeftBox>
            <RightBox>
              <StyledLink href={'/post'}>
                작성
              </StyledLink>
              <h3>연재되고 있는 글</h3>
              {isEmpty ? 
                <NoContentCardWrapper>
                  <NoContentCard />
                </NoContentCardWrapper> : (
                <CurrentStoriesWrapper>
                  <CurrentStoryBox />
                  <CurrentStoryBox />
                  <CurrentStoryBox />
                  <CurrentStoryBox />
                  <CurrentStoryBox />
                  <CurrentStoryBox />
                </CurrentStoriesWrapper>
              )}
            </RightBox>
          </BoxWrapper>
        </Container>
        <Footer />
      </ContainerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const ContainerWrapper = styled.div<{ $closed: boolean }>`
  position: relative;
  flex: 1;
  overflow: auto;
  width: 100%;
  transition: margin-left 0.3s ease;
  margin-left: ${({$closed}) => ($closed ? "90px" :'250px')};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 208px;
  > h3 {
    font-size: 23px;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  height: 100%;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  padding-bottom: 100px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
`;

const StyledLink = styled(Link)`
  height: 35px;
  width: 60px;
  background-color: #FFACDD;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  color: white;
  border: none;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #FF86CE;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  > h3 {
    margin-top: 40px;
  }
`;

const CurrentStoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 100px;
  margin-top: 30px;
`;

const NoContentCardWrapper = styled.div`
  margin-bottom: 30px;
  height: 400px;
`;