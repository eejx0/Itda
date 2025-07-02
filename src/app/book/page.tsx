"use client"

import styled from "styled-components"
import SideBar from "@/components/common/sideBar";
import CommonInput from "@/components/common/input";    
import Footer from "@/components/common/footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

interface Book {
    title: string;
    author: string;
    image: string;
    isbn: string;
}

const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!;

export default function BookList() {
    const [closed, setClosed] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('')
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const res = await axios.get("https://openapi.naver.com/v1/search/book.json", {
              params: {
                query: query.trim() || "프로그래밍",
                display: 20, 
                start: 1,
              },
              headers: {
                "X-Naver-Client-Id": CLIENT_ID,
                "X-Naver-Client-Secret": CLIENT_SECRET,
              },
            });
    
            const items = res.data.items;
            setBooks(items);
          } catch (err) {
            console.error("네이버 책 API 오류:", err);
          }
        };
    
        fetchBooks();
      }, [query]);

    return (
        <Wrapper>
            <SideBar closed={closed} setClosed={setClosed}/>
            <ContainerWrapper $closed={closed}>
                <Container>
                    <TextWrapper>
                        <p className="head">IF 스토리</p>
                        <TitleWrapper>
                            <p>나의 상상은</p>
                            <p className="colorText">현실</p>
                            <p>이 된다</p>
                        </TitleWrapper>
                    </TextWrapper>
                    <CommonInputWrapper>
                        <CommonInput
                            placeholder="책 제목을 검색하세요"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </CommonInputWrapper>
                    <BookListWrapper>
                    {books.map((book) => (
                        <Link key={book.isbn} href={`/book/${book.isbn}`}>
                            <BookWrapper>
                            <BookPicture style={{ backgroundImage: `url(${book.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <BookTextWrapper>
                                <p className="title">{book.title.replace(/<[^>]*>?/g, "")}</p>
                                <p className="author">{book.author}</p>
                            </BookTextWrapper>
                            </BookWrapper>
                        </Link>
                    ))}
                    </BookListWrapper>
                </Container>
                <Footer />
            </ContainerWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
`;

const ContainerWrapper = styled.div<{ $closed: boolean }>`
    position: relative;
    flex: 1;
    overflow: auto;
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
  margin-bottom: 70px;
  gap: 30px;
  padding-bottom: 258px;
  > h3 {
    font-size: 23px;
  }
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

const CommonInputWrapper = styled.div`
    display: flex;
    margin-left: auto;
`;

const BookListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    row-gap: 45px;
    column-gap: 20px;
    width: 100%;
`;

const BookWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    cursor: pointer;
`;

const BookPicture = styled.div`
    width: auto;
    height: auto;
    background-color: black;
    border: 1px solid black;
    aspect-ratio: 3/4;
    border-radius: 10px;
`;

const BookTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    .title {
        font-size: 15px;
        font-weight: 600;
    }
    .author {
        font-size: 12px;
        color: #8C8C8C;
    }
`;