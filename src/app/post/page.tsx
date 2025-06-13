"use client"

import styled from "styled-components"
import SideBar from "@/components/common/sideBar";
// import Picture from "../../assets/imgs/picture.svg";
// import Check from "../../assets/imgs/check.svg";
import Advertisement from "../../assets/imgs/advertisement.png";
import Check from "../../assets/imgs/check.svg";
// import HoverContent from "@/components/hoverContent";
import Image from "next/image";
import { useState } from "react";
import { db } from "@/firebase";
// import { app } from "@/firebase";
// import { uploadBytes, ref, getDownloadURL, getStorage } from "firebase/storage";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function PostContent() {
    const [closed, setClosed] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    // const [image, setImage] = useState<File | null>(null);
    // const [isHover, setIsHover] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    // const storage = getStorage(app);

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     // 이미지 부분 주석 처리
    //     // const file = e.target.files?.[0];
    //     // if (file) {
    //     //     setImage(file);
    //     // }
    // };

    const savePost = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("로그인이 필요합니다!");
            return;
        }
        try {
            // 이미지 관련 처리 주석
            // let imageUrl = "";
            // if (isImageChanged()) {
            //     const imageRef = ref(storage, `images/${Date.now()}_${image?.name}`);
            //     await uploadBytes(imageRef, image!);
            //     imageUrl = await getDownloadURL(imageRef); 
            // }

            const userDoc = await getDoc(doc(db, "users", user.uid));
            const nickname = userDoc.exists() ? userDoc.data().nickname : "익명";

            const docRef = await addDoc(collection(db, "posts"), {
                title,
                content,
                completed: checked,
                // imageUrl, // 이미지 없으니까 빼기
                createdAt: new Date(),
                author: nickname,
                authorId: user.uid
            });

            alert("포스트가 저장되었습니다!");
        } catch (error) {
            console.error("Error saving post: ", error);
            alert("포스트 저장 중 오류가 발생했습니다.");
        }
    };

    // 이미지 여부 체크 함수 주석 처리
    // const isImageChanged = () => {
    //     return !!image;
    // };

    return (
        <Wrapper>
            <SideBar closed={closed} setClosed={setClosed}/>
            <Container $closed={closed}>
                <ContentWrapper>
                    <HeadWrapper>
                        {/* <UploadPicture 
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="upload-image"
                            />
                            <label htmlFor="upload-image" style={{ width: "100%", height: "100%" }}>
                                <Image
                                    src={Picture.src}
                                    alt="Upload"
                                    width={100}
                                    height={100}
                                    style={{cursor: 'pointer'}}
                                />
                            </label>
                            {isHover && <HoverContent />}
                        </UploadPicture> */}
                        <CompleteWrapper>
                            <p>완결</p>
                            <CheckBox $checked={checked} onClick={() => setChecked(prev => !prev)}>
                                <Image src={Check} alt="" />
                            </CheckBox>
                        </CompleteWrapper> 
                    </HeadWrapper>
                    <ContentBox>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 작성하세요" type="text" />
                        <Line />
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 작성하세요" />
                    </ContentBox>
                </ContentWrapper>
                <SideWrapper>
                    <Image src={Advertisement} alt="" style={{width: "100%", height: '384px'}} />
                    <button onClick={savePost}>저장</button>
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
    margin-top: 40px;
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.07);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 30px 25px 30px 25px;
    > input {
        width: 100%;
        font-size: 20px;
        font-weight: 600;
        border: none;
        outline: none;
    }
    > input::placeholder {
        color: rgba(0,0,0,0.3);
    }
    > textarea {
        resize: none;
        width: 100%;
        height: 100%;
        font-family: pretendard;
        font-size: 15px;
        border: none;
        outline: none;
        line-height: 25px;
    }
    > textarea::placeholder {
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
