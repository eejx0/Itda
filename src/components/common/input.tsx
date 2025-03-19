"use client"

import styled from "styled-components"
import Search from "../../assets/imgs/search.svg";
import Image from "next/image";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function CommonInput({ value, onChange, placeholder }:InputProps) {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <Wrapper $isFocus={isFocus}>
            <Image src={Search} alt="" />
            <input 
                onBlur={() => setIsFocus(false)}
                onFocus={() => setIsFocus(true)} 
                placeholder={placeholder} 
                type="text" 
                value={value} 
                onChange={onChange}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div<{$isFocus: boolean}>`
    width: 239px;
    height: 35px;
    border-radius: 100px;
    padding-left: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding-right: 15px;
    border: ${({$isFocus}) => $isFocus ? "1px solid #FFACDD" : "1px solid rgba(0,0,0,0.2)"};
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