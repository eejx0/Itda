"use client"

import Image from "next/image";
import Person from "../../assets/imgs/personImg.png";
import Logo from "../../assets/imgs/logo.svg"
import AuthInput from "@/components/auth/input";
import styled from "styled-components";

export default function SignUp() {
    return (
        <Wrapper>
            <Container>
                <LeftBox>
                    <Image 
                        src={Person} 
                        alt="" 
                        width={250} 
                        style={{position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)"}}
                    />
                </LeftBox>
                <RightBox>
                    <ContentBox>
                        <TitleBox>
                            <Image src={Logo} alt="잇다" />
                            <h3>회원가입</h3>
                        </TitleBox>
                        <InputBox>
                            <AuthInput label="닉네임" />
                            <AuthInput label="아이디" />
                            <AuthInput label="비밀번호" isPassword />
                        </InputBox>
                        <button>회원가입</button>
                    </ContentBox>
                </RightBox>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Container = styled.div`
    display: flex;
    width: 55vw;
    height: 65vh;
    gap: 30px;
`;

const LeftBox = styled.div`
    width: 50%;
    background-color: rgba(255, 172, 221, 0.17);
    height: 100%;
    border-radius: 30px;
    position: relative;
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.06);
`;

const RightBox = styled.div`
    width: 50%;
    height: 100%;
    border-radius: 30px;
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 36px 30px 36px;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    height: 100%;
    position: relative;
    > button {
        height: 35px;
        width: 100%;
        position: absolute;
        bottom: 0px;
        background-color: #FFACDD;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        color: white;
        transition: 0.2s;
        &:hover {
            background-color: #FF86CE;
        }
    }
`;

const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    > h3 {
        font-size: 25px;
    }
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;