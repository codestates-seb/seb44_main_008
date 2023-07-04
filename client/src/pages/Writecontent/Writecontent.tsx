import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';

import Input from '../../components/Input/Input';
import HashBtn from '../../components/HashBtn/HashBtn';

const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 3rem 0;

  background-color: #17191C;

  & > div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 90%;
  }
`

const WriteImgDiv = styled.div`
  width: 25rem;
  height: 18rem;
  margin-bottom: 2rem;

  & > img {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    background-color: #232323;
    border-radius: 1rem;
    object-fit: cover;
  }

  & > input {
    display: none;
  }
`

const TagContainer = styled.div`
  display: flex;

  width: 80%;
  margin-top: 2rem;
  
`

const WriteTagMeta = styled.div`
  display: flex;
  flex-direction: column;


  padding-top: 1rem;
  padding-right: 1rem;
  width: 16%;

  border-right: solid 1px #666666;
  color: #666666;

  & > h3 {
    font-size: 1rem;
  }

  & > p{
    padding-top: 0.5rem;
    font-size: 0.8rem;
  }
`

const WriteTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  width: 84%;
  padding-left: 2rem;

  & > li {
    width: 15.5%;
  }
`

const WriteContentInput = styled.textarea`
  width: 80%;
  min-height: 30rem;
  margin-top: 2rem;
  padding: 1rem;

  color: white;
  background-color: #232323;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  border: none;
 
 &:focus {
  outline: none;
 }
`

const Writecontent = ()  => {

  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const tags = ['로맨스', '호러','판타지', '스포츠','SF','액션','애니메이션','코미디','범죄','힐링','미스테리','뮤지컬']

  const [title, setTitle] = useState<string>('');
  const [movieName, setMovieName] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [content, setContent] = useState<string>('')

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files);

      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  const onClickImg  = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.preventDefault();
    if (imgUploadInput.current) {
      imgUploadInput.current.click();
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.placeholder === "게시글 제목을 입력하세요."){
      setTitle(event.target.value);
    }
    else if(event.target.placeholder === "영화 제목을 입력하세요."){
      setMovieName(event.target.value);
    }
    else{
      setContent(event.target.value)
    }
  }

  const onClickTag = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
    const newTag = event.target.name;
    if(selectedTags.length >= 3) {
      alert('태그는 최대 3개까지 선택 가능합니다.')
    }
    else {
      setSelectedTags([...selectedTags, newTag]);
    }
  }

  console.log(selectedTags)
  return (
  <WriteWrapper>
    <div>
      <WriteImgDiv>
        <img src={
            fileURL
              ? fileURL
              : "/imgs/InputImg.png"
          }
          alt="thumbnail" 
          onClick={onClickImg}>
        </img>
        <input
          type="file"
          accept="image/*"
          required
          ref={imgUploadInput}
          onChange={onImageChange}
        />
      </WriteImgDiv>

      <Input placeholder="게시글 제목을 입력하세요." isvalid={true} onChange={onChangeInput}></Input>
      <Input placeholder="영화 제목을 입력하세요." isvalid={true} onChange={onChangeInput}></Input>
      
      <TagContainer>
        <WriteTagMeta>
          <h3>태그</h3>
          <p>최소 1개 이상의 태그를 선택해 주세요.</p>
        </WriteTagMeta>
        <WriteTagList>
          {tags.map((hashItem, idx) => {
                return (
                  <li key={idx}>
                    <HashBtn value={hashItem} type="write" />
                  </li>
                );
          })}
        </WriteTagList>
      </TagContainer>

      <WriteContentInput placeholder="이 영화는 어땠나요?" onChange={onChangeInput}>
      </WriteContentInput>
    </div>
  </WriteWrapper>)
};

export default Writecontent;
