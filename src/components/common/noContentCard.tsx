"use client"

import styled from "styled-components"
import Person from "../../assets/imgs/person/writePersonImg.png";
import Link from "next/link";
import Image from "next/image";

export const NoContentCard = () => {
    return (
        <Wrapper>
            <Image src={Person} alt="" style={{width: '153px', height: '178px'}}/>
            <p>작성되고 있는 글이 없어요</p>
            <StyledLink href={'/post'}>작성</StyledLink>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0,0,0,0.12);
    box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.12);
    margin-top: 30px;
    border-radius: 20px;
    > p {
        font-weight: 600;
        font-size: 15px;
        margin-top: 40px;
    }
`;

const StyledLink = styled(Link)`
    width: 148px;
    height: 28px;
    border: none;
    border-radius: 10px;
    background-color: #FFACDD;
    color: white;
    font-weight: 600;
    font-size: 13px;
    margin-top: 15px;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #FF86CE;
    }
`;