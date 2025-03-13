"use client"

import styled from "styled-components"
import Search from "../../assets/imgs/search.svg";
import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function CommonInput({ value, onChange, placeholder }:InputProps) {
    return (
        <Wrapper>
            <Image src={Search} alt="" />
            <input placeholder={placeholder} type="text" value={value} onChange={onChange} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 239px;
    height: 40px;
    border-radius: 100px;
    border: 1px solid rgba(0,0,0,0.2);
    padding-left: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding-right: 15px;
    > input {
        border: none;
        outline: none;
        width: 100%;
        font-size: 13px;
    }
    ::placeholder {
        color: rgba(0,0,0,0.3);
    }
`;