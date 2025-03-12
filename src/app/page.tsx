"use client"

import SideBar from "@/components/common/sideBar";
import styled from "styled-components";
import CommonInput from "@/components/common/input";
import ListBox from "@/components/common/listBox";
import CurrentStoryBox from "@/components/common/currentStoryBox";
import { useState } from "react";

export default function Home() {
  const [closed, setClosed] = useState(false);

  return (
    <Wrapper>
      <SideBar closed={closed} setClosed={setClosed}/>
      <Container $closed={closed}>
        <h3>안녕하세요, 의진님  💬</h3>
        <BoxWrapper>
          <LeftBox>
            <CommonInput />
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
            <CurrentStoriesWrapper>
              <CurrentStoryBox />
              <CurrentStoryBox />
              <CurrentStoryBox />
              <CurrentStoryBox />
              <CurrentStoryBox />
              <CurrentStoryBox />
              <CurrentStoryBox />
              <CurrentStoryBox />
            </CurrentStoriesWrapper>
          </RightBox>
        </BoxWrapper>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Container = styled.div<{ $closed: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 70vw;
  height: calc(100vh - 160px);
  margin-left: ${({ $closed }) => ($closed ? "calc(50% - 35vw + 45px)" : "calc(50% - 35vw + 125px)")}; 
  margin-right: auto;

  transition: margin-left 0.3s ease;
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
  overflow-y: auto;
  height: calc(100vh - 120px);
  padding-bottom: 100px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  > button {
    height: 45px;
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
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding-bottom: 100px;
  margin-top: 30px;
`;