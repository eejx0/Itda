"use client"

import Image from "next/image";
import Person from "../../assets/imgs/person/personImg.png";
import Logo from "../../assets/imgs/logo.svg"
import AuthInput from "@/components/auth/input";
import styled from "styled-components";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase"; 
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("로그인 성공:", user);
            router.push('/');
        } catch (error) {
            console.error("로그인 오류:", error);
        }
    };

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
                            <h3>로그인</h3>
                        </TitleBox>
                        <InputBox>
                            <AuthInput label="이메일" value={email} onChange={(e) =>  setEmail(e.target.value)} />
                            <AuthInput label="비밀번호" isPassword value={password} onChange={(e) => setPassword(e.target.value)} />
                        </InputBox>
                        <button onClick={handleLogin}>로그인</button>
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