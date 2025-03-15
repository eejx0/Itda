"use client"

import SideBar from "@/components/common/sideBar";
import styled from "styled-components";
import CommonInput from "@/components/common/input";
import ListBox from "@/components/common/listBox";
import CurrentStoryBox from "@/components/common/currentStoryBox";
import { NoContentCard } from "@/components/common/noContentCard";
import { useState } from "react";

export default function BookDetail() {
  const [closed, setClosed] = useState(false);
  const [isEmpty, ] = useState(false);

  return (
    <Wrapper>
      <SideBar closed={closed} setClosed={setClosed}/>
      <Container $closed={closed}>
        <h3>&quot;책제목&quot;</h3>
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
  height: 100vh;
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
  height: calc(100vh - 235px);
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
  height: 100%;
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
  height: calc(100vh - 235px);
  /* overflow-y: auto; */
  padding-bottom: 100px;
  margin-top: 30px;
`;

const NoContentCardWrapper = styled.div`
  flex: 0.9;
  margin-bottom: 30px;
`;