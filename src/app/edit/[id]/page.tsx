"use client"

import SideBar from "@/components/common/sideBar"
import styled from "styled-components"
import { useState, useEffect } from "react"
import Image from "next/image"
import Advertisement from "../../../assets/imgs/advertisement.png"
import Check from "../../../assets/imgs/check.svg"
import { useParams } from "next/navigation"
import { db } from "@/firebase"
import { useRef } from "react"
import { getAuth } from "firebase/auth"
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore"

interface EditPostType {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  completed: boolean
}

interface ContentType {
  id: string
  content: string
  author: string
  createdAt: string
}

type FirebaseTimestamp = {
    toDate: () => Date
}

const formatDate = (dateValue: FirebaseTimestamp | Date | string | null | undefined): string => {
    try {
      let date: Date
  
      if (dateValue && typeof (dateValue as FirebaseTimestamp).toDate === "function") {
        date = (dateValue as FirebaseTimestamp).toDate()
      } else if (dateValue instanceof Date) {
        date = dateValue
      } else if (typeof dateValue === "string") {
        date = new Date(dateValue)
      } else {
        return "날짜 없음"
      }
  
      return date.toISOString().slice(0, 10).replace(/-/g, ".")
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error)
      return "날짜 오류"
    }
  }

export default function EditContent() {
  const [closed, setClosed] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [post, setPost] = useState<EditPostType | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [contents, setContents] = useState<ContentType[]>([])
  const { id } = useParams<{ id: string }>()
  const postId = id 

  const fetchNickname = async (uid: string) => {
    const userDocRef = doc(db, "users", uid)
    const userSnap = await getDoc(userDocRef)
    if (userSnap.exists()) {
      const data = userSnap.data()
      return data.nickname 
    } else {
      console.warn("유저 정보를 찾을 수 없음")
      return "알 수 없음"
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) { return }

      try {
        const docRef = doc(db, "posts", postId as string)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const postData = { id: docSnap.id, ...data } as EditPostType
          setPost(postData)
          setChecked(postData.completed)
        } else {
          console.log("문서가 존재하지 않습니다")
        }
      } catch (error) {
        console.error("포스트 가져오기 오류:", error)
      }
    }

    fetchPost()
  }, [postId])

  useEffect(() => {
    const fetchContents = async () => {
      if (!postId) { return }

      try {
        const contentsRef = collection(db, "posts", postId, "contents")
        const contentsQuery = query(contentsRef, orderBy("createdAt", "asc"))
        const contentsSnap = await getDocs(contentsQuery)
        const contentsList = contentsSnap.docs.map((doc) => {
          const data = { id: doc.id, ...doc.data() }
          return data
        }) as ContentType[]

        setContents(contentsList)
      } catch (error) {
        console.error("컨텐츠 가져오기 오류:", error)
      }
    }

    if (post) {
      fetchContents()
    }
  }, [postId, post])

  const handleSave = async () => {
    if (!postId) return
  
    try {
      const auth = getAuth()
      const user = auth.currentUser
      const uid = user?.uid
  
      if (!uid) {
        alert("로그인된 유저 정보가 없습니다!")
        return
      }
  
      const nickname = await fetchNickname(uid)
  
      if (checked) {
        const postRef = doc(db, "posts", postId)
        await updateDoc(postRef, { completed: true })
  
        if (textareaRef.current && textareaRef.current.value.trim()) {
          const contentsRef = collection(db, "posts", postId, "contents")
          await addDoc(contentsRef, {
            content: textareaRef.current.value.trim(),
            author: nickname,
            createdAt: new Date().toISOString(),
          })
        }
  
        alert("이야기가 완결되었습니다")
  
        if (post) {
          setPost({ ...post, completed: true })
        }
      } else {
        if (!textareaRef.current || !textareaRef.current.value.trim()) {
          alert("내용을 입력해주세요.")
          return
        }
  
        const contentsRef = collection(db, "posts", postId, "contents")
        const newContentDoc = await addDoc(contentsRef, {
          content: textareaRef.current.value.trim(),
          author: nickname,
          createdAt: new Date().toISOString(),
        })
  
        const newContent: ContentType = {
          id: newContentDoc.id,
          content: textareaRef.current.value.trim(),
          author: nickname,
          createdAt: new Date().toISOString(),
        }
  
        setContents((prev) => [...prev, newContent])
        textareaRef.current.value = ""
        textareaRef.current.style.height = "auto"
        alert("내용이 저장되었습니다!")
      }
    } catch (error) {
      console.error("저장 중 오류:", error)
    }
  }

  const handleTextareaChange = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  return (
    <Wrapper>
      <SideBar closed={closed} setClosed={setClosed} />
      <Container $closed={closed}>
        <ContentWrapper>
          <HeadWrapper>
            <CompleteWrapper>
              <p>완결</p>
              <CheckBox $checked={checked} onClick={() => setChecked((prev) => !prev)}>
                <Image src={Check || "/placeholder.svg"} alt="" />
              </CheckBox>
            </CompleteWrapper>
          </HeadWrapper>
          <ContentBox>
            <InnerScrollBox>
              <Title>{post?.title || "로딩 중..."}</Title>
              <Line />
              <Content>{post?.content || "로딩 중..."}</Content>
              <Line />
              <TextWrapper>
                <Author>{post?.author || "로딩 중..."}</Author>
                <CreatedAt>{post?.createdAt ? formatDate(post.createdAt) : "로딩 중..."}</CreatedAt>
              </TextWrapper>
              <Line />
              {contents.map((item) => (
                <div style={{display: 'flex', flexDirection:'column', gap: '15px'}} key={item.id}>
                  <Content>{item.content}</Content>
                  <Line />
                  <TextWrapper>
                    <Author>{item.author}</Author>
                    <CreatedAt>{formatDate(item.createdAt)}</CreatedAt>
                  </TextWrapper>
                  <Line />
                </div>
              ))}
              <Textarea ref={textareaRef} placeholder="내용을 작성하세요" onChange={handleTextareaChange} />
            </InnerScrollBox>
          </ContentBox>
        </ContentWrapper>
        <SideWrapper>
          <Image src={Advertisement || "/placeholder.svg"} alt="" style={{ width: "100%", height: "384px" }} />
          <button onClick={handleSave}>저장</button>
        </SideWrapper>
      </Container>
    </Wrapper>
  )
}

// 스타일 컴포넌트들은 동일하게 유지
const Wrapper = styled.div`
    display: flex;
`

const Container = styled.div<{ $closed: boolean }>`
    margin-left: ${({ $closed }) => ($closed ? "90px" : "250px")}; 
    transition: margin-left 0.3s ease;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    padding: 55px;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 74%;
`

const HeadWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
`

const CompleteWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    > p {
        font-weight: 600;
        font-size: 15px;
    }
`

const CheckBox = styled.div<{ $checked: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    border: 1px solid #FFACDD;
    background-color: ${({ $checked }) => ($checked ? "#FFACDD" : "white")};
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`

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
`

const InnerScrollBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

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
`

const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgba(0,0,0,0.2);
`

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
`

const Title = styled.p`
    font-size: 20px;
    font-weight: 600;
    width: 100%;
`

const Content = styled.p`
    font-size: 15px;
    line-height: 25px;
    width: 100%;
    white-space: pre-line;
`

const TextWrapper = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    margin-left: auto;
`

const Author = styled.p`
    font-size: 15px;
`

const CreatedAt = styled.p`
    font-size: 13px;
    color: rgba(0,0,0,0.2);
`
