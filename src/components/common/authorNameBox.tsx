import styled from "styled-components"

export default function AuthorNameBox({author}: {author: string}) {
    return (
        <Wrapper>
            <p>{author}님</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 15px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.08);
    > p {
        font-size: 13px;
    }
`;