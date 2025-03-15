"use client"

import styled from "styled-components"

export default function HoverContent() {
    return (
        <Wrapper>표지에 넣을 사진이에요 😉</Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    width: 220px;
    height: 40px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: rgba(0,0,0,0.53);
    background-color: white;
    border-radius: 5px;
    left: 115px;
    top: 0;
`;