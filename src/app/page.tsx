"use client"

import SideBar from "@/components/common/sideBar";
import styled from "styled-components";
import CommonInput from "@/components/common/input";
import ListBox from "@/components/common/listBox";
import CurrentStoryBox from "@/components/common/currentStoryBox";
import { NoContentCard } from "@/components/common/noContentCard";
import Footer from "@/components/common/footer";
import { useState } from "react";

export default function Home() {
  const [closed, setClosed] = useState(false);
  const [isEmpty, ] = useState(true);

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
                <ListBox />
                <ListBox />
                <ListBox />
                <ListBox />
                <ListBox />
                <ListBox />
                <ListBox />
                <ListBox />
              </ListWrapper>
            </LeftBox>
            <RightBox>
              <button>작성</button>
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
  margin-left: ${({$closed}) => ($closed ? "90px" : "250px")};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
  transition: margin-left 0.3s ease;
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

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  > button {
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
      &:hover {
        background-color: #FF86CE;
      }
  }
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