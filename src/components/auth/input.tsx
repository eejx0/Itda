"use client"

import styled from "styled-components"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isPassword?: boolean;
    label?: string;
}

export default function AuthInput({ type, value, onChange, isPassword, label }: InputProps) {
    return (
        <Wrapper>
            {label && <p>{label}</p>}
            <input 
                type={isPassword ? "password" : type}
                value={value}
                onChange={onChange}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    > p {
        font-size: 15px;
        font-weight: 600;
    }
    > input {
        font-size: 13px;
        width: 100%;
        height: 35px;
        padding-left: 15px;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 5px;
    }
    > input:focus {
        border: 1px solid #FFACDD;
        outline: none;
    }
`;