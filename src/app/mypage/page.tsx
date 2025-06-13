"use client"

import styled from "styled-components"
import SideBar from "@/components/common/sideBar";
// import ListBox from "@/components/common/listBox";
import Image from "next/image";
import Person from "../../assets/imgs/person/writePersonImg.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDoc, getDocs, query, collection, where, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ListBox from "@/components/common/listBox";

interface MyPostType {
    id: string;
    title: string;
    content: string;
    author: string;
    completed: boolean;
    createdAt: string;
}

export default function MyPage() {
    const [closed, setClosed] = useState(false);
    const [myPosts, setMyPosts] = useState<MyPostType[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [nickName, setNickName] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUserId(user.uid);
            try {
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const data = docSnap.data();
                setNickName(data.nickname ?? "익명");
              } else {
                setNickName("익명");
              }
            } catch (err) {
              setNickName("익명");
              console.error('사용자 정보 가져오기 오류: ', err)
            }
          } else {
            setUserId(null);
            setNickName(null);
            setMyPosts([]);
          }
        });
      
        return () => unsubscribe();
      }, []);

    useEffect(() => {
        if (!userId) return;

        async function fetchPosts() {
            try {
                const q = query(
                    collection(db, "posts"),
                    where("authorId", "==", userId)
                );
                const querySnapshot = await getDocs(q);
                const userPosts: MyPostType[] = [];
                querySnapshot.forEach((doc) => {
                    userPosts.push({
                        id: doc.id,
                        ...doc.data()
                    } as MyPostType);
                });
                setMyPosts(userPosts);
            } catch (error) {
                console.error("글 불러오기 실패", error);
            }
        }
        fetchPosts();
    }, [userId]);

    const isEmpty = myPosts.length === 0;

    return (
        <Wrapper>
            <SideBar closed={closed} setClosed={setClosed}/>
            <ConatainerWrapper $closed={closed}>
                <Container>
                    <TextWrapper>
                        <p className="head">IF 스토리</p>
                        <TitleWrapper>
                            <p>{nickName}님이</p>
                            <p className="colorText">적은 이야기</p>
                        </TitleWrapper>
                    </TextWrapper>
                    {isEmpty ? 
                        <NoContentWrapper>
                            <Image src={Person} alt="" style={{width: '153px', height: '178px'}}/>
                            <p>작성한 글이 없어요</p>
                            <StyledLink href={'/post'}>작성</StyledLink>
                        </NoContentWrapper> : (
                        <ListBoxWrapper>
                            {myPosts.map(post => (
                                <ListBox key={post.id} post={post}/>
                            ))}
                        </ListBoxWrapper>
                    )}
                </Container>
            </ConatainerWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
`;

const ConatainerWrapper = styled.div<{ $closed: boolean }>`
    width: 100%;
    transition: margin-left 0.3s ease;
    margin-left: ${({$closed}) => ($closed ? "90px" : "250px")};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
    position: relative;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    > .head {
        font-size: 15px;
        font-weight: 600;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    > p {
        font-size: 25px;
        font-weight: 700;
    }
    > .colorText {
        color: #FFACDD;
        margin-left: 7px;
    }
`;

const ListBoxWrapper = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 100px;
`;

const NoContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute; 
    top: 40vh;
    left: 50%; 
    transform: translate(-50%, -50%);
    text-align: center;
    > p {
        font-weight: 600;
        font-size: 15px;
        margin-top: 40px;
    }
    > button {
        
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