"use client"

import SideBar from "@/components/common/sideBar"
import styled from "styled-components";
import { useState, useEffect } from "react";
import Image from "next/image";
import Advertisement from "../../../assets/imgs/advertisement.png";
import Check from "../../../assets/imgs/check.svg";
import { useParams } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRef } from "react";
// import Picture from "../../../assets/imgs/picture.svg";

interface EditPostType {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    completed: boolean;
}

export default function EditContent() {
    const [closed, setClosed] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [post, setPost] = useState<EditPostType | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaChange = () => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const params = useParams();
    const postId = params?.id;

    useEffect(() => {
        const fetchPost = async () => {
          if (!postId) return;
      
          const docRef = doc(db, "posts", postId as string);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const data = docSnap.data() as Omit<EditPostType, "id">;
            setPost({ id: docSnap.id, ...data });
          }
        };
      
        fetchPost();
    }, [postId]);
    
    return (
        <Wrapper>
            <SideBar closed={closed} setClosed={setClosed}/>
            <Container $closed={closed}>
                <ContentWrapper>
                    <HeadWrapper>
                        {/* <UploadPicture></UploadPicture> */}
                        <CompleteWrapper>
                            <p>완결</p>
                            <CheckBox $checked={checked} onClick={() => setChecked(prev => !prev)}>
                                <Image src={Check} alt="" />
                            </CheckBox>
                        </CompleteWrapper> 
                    </HeadWrapper>
                    <ContentBox>
                        <InnerScrollBox>
                            <Title>{post?.title}</Title>
                            <Line />
                            <Content>
                                옛날로 돌아가보면 사실 74 월드컵 네덜란드는 지금의 시선으로 보면 되게 형편없습니다. 
                                보다가 계속 꺼버리고 결국엔 대부분의 경기들을 풀 타임 시청을 못하긴 했는데 (아리고 사키의 밀란까진 어떻게 됐는데 그 이전은 풀 타임 시청이 안 되더라구요. 
                                원래 다시 보기라는 거 자체를 안 좋아하긴 하는데 옛날 경기 다 보고나서 다시 보기는 정말 할 게 못 된다는 걸 느끼고 그 후로 지나간 경기들이나 옛날 경기들은 안 찾아봅니다.) 
                                모두가 미친듯이 뛰어다니긴 하는데 되게 무질서하고 중구난방이었습니다. 
                                근데 당시에 충격적이었던 건 그거죠. 
                                축구란 스포츠는 긴 거리를 돌파하고 상대 수비수들을 박스 근처에서 현란하게 제끼면서 골키퍼를 넘어서는 그런 스포츠였는데 다른 의미로 접근한 거였으니까요.
                            </Content>
                            <Line />
                            <TextWrapper>
                                <Author>냠냠님</Author>
                                <CreatedAt>2025.06.11</CreatedAt>
                            </TextWrapper>
                            <Line />
                            <Content>
                                옛날로 돌아가보면 사실 74 월드컵 네덜란드는 지금의 시선으로 보면 되게 형편없습니다. 
                                보다가 계속 꺼버리고 결국엔 대부분의 경기들을 풀 타임 시청을 못하긴 했는데 (아리고 사키의 밀란까진 어떻게 됐는데 그 이전은 풀 타임 시청이 안 되더라

                            </Content>
                            <Line />
                            <TextWrapper>
                                <Author>으진님</Author>
                                <CreatedAt>2025.06.12</CreatedAt>
                            </TextWrapper>
                            <Line />
                            <Textarea
                                ref={textareaRef}
                                placeholder="내용을 작성하세요"
                                onChange={handleTextareaChange}
                            />
                        </InnerScrollBox>
                    </ContentBox>
                </ContentWrapper>
                <SideWrapper>
                    <Image src={Advertisement} alt="" style={{width: "100%", height: '384px'}} />
                    <button>저장</button>
                </SideWrapper>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
`;

const Container = styled.div<{ $closed: boolean }>`
    margin-left: ${({ $closed }) => ($closed ? "90px" : "250px")}; 
    transition: margin-left 0.3s ease;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    padding: 55px;
`;

// const UploadPicture = styled.div`
//     background-image: url(${Picture.src});
//     width: 100px;
//     height: 100px;
//     background-size: cover;
//     background-position: center;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     position: relative;
// `;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 74%;
`;

const HeadWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
`;

const CompleteWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    > p {
        font-weight: 600;
        font-size: 15px;
    }
`;

const CheckBox = styled.div<{ $checked: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    border: 1px solid #FFACDD;
    background-color: ${({ $checked }) => $checked ? "#FFACDD" : "white"};
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`;

const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    margin-top: 40px;
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.07);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 30px 25px 30px 25px;
    
`;

const InnerScrollBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Textarea = styled.textarea`
    resize: none;
    width: 100%;
    font-family: pretendard;
    font-size: 15px;
    border: none;
    outline: none;
    line-height: 25px;
    overflow: hidden;
    min-height: 80px; 
    box-sizing: border-box;
    ::placeholder{
        color: rgba(0,0,0,0.3);
    }
`;

const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgba(0,0,0,0.2);
`;

const SideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    width: 254px;
    > button {
        width: 100%;
        height: 35px;
        background-color: #FFACDD;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        color: white;
        font-size: 14px;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
            background-color: #FF86CE;
        }
    }
`;


const Title = styled.p`
    font-size: 20px;
    font-weight: 600;
    width: 100%;
`;

const Content = styled.p`
    font-size: 15px;
    line-height: 25px;
    width: 100%;
`;

const TextWrapper = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    margin-left: auto;
`;

const Author = styled.p`
    font-size: 15px;
`;

const CreatedAt = styled.p`
    font-size: 13px;
    color: rgba(0,0,0,0.2);
`;