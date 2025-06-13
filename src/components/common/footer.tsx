"use client"

import styled from "styled-components"
import Image from "next/image";
import Logo from "../../assets/imgs/logo.svg";
import TextLogo from "../../assets/imgs/footer/textLogo.svg";
import Github from "../../assets/imgs/footer/github.svg";
import Gmail from "../../assets/imgs/footer/gmail.svg";
import Instagram from "../../assets/imgs/footer/instagram.svg";
import Link from "next/link";

export default function Footer() {
    return (
        <Wrapper>
            <LogoWrapper>
                <Image src={Logo} alt="logo" />
                <Image src={TextLogo} alt="잇다" />
            </LogoWrapper>
            <DetailWrapper>
                <IconWrapper>
                    <Link href={'mailto:aghpt04@gmail.com'} passHref target="_blank">
                        <IconWrap>
                            <Image src={Gmail} alt="gmail" />
                        </IconWrap>
                    </Link>
                    <Link href={'https://github.com/eejx0'} passHref target="_blank">
                        <IconWrap>
                            <Image src={Github} alt="github" />
                        </IconWrap>
                    </Link>
                    <Link href={'https://www.instagram.com/ee.j_x0'} passHref target="_blank">
                        <IconWrap>
                            <Image src={Instagram} alt="instagram" />
                        </IconWrap>
                    </Link>
                </IconWrapper>
                <TextWrapper>
                    <p>@2025 의진 </p>
                    <Line />
                    <p>Built with Next</p>
                </TextWrapper>
            </DetailWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 208px;
    background-color: rgba(255, 172, 221, 0.17);
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0px 80px 0px 80px;
    justify-content: space-between;
    position: absolute;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const DetailWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 60px;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const IconWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #FFACDD;
    cursor: pointer;
`;

const TextWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 10px;
    font-weight: 400px;
    color: rgba(0,0,0,0.35);
`;

const Line = styled.div`
    height: 8px;
    width: 1px;
    background-color: rgba(0,0,0,0.35);
`;