import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { WriteContentType } from './type';

import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';

const Writecontent = ()  => {

  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const tags = [
        {
          tagId: 1,
          tagName: "로맨스",
        },
        {
          tagId: 2,
          tagName: "호러",
        },
        {
          tagId: 3,
          tagName: "판타지",
        },
        {
          tagId: 4,
          tagName: "스포츠",
        },
        {
          tagId: 5,
          tagName: "SF",
        },
        {
          tagId: 6,
          tagName: "액션",
        },
        {
          tagId: 7,
          tagName: "애니메이션",
        },
        {
          tagId: 8,
          tagName: "범죄",
        },
        {
          tagId: 9,
          tagName: "힐링",
        },
        {
          tagId: 10,
          tagName: "미스테리",
        },
        {
          tagId: 11,
          tagName: "뮤지컬",
        },
        {
          tagId: 12,
          tagName: "코미디",
        },
      ]

  const [title, setTitle] = useState<string>('');
  const [movieName, setMovieName] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Object[]>([]);
  const [content, setContent] = useState<string>('')


  // 이미지 관련 함수
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
      console.log(' title set 함수 작동함')
    }
    else if(event.target.placeholder === "영화 제목을 입력하세요."){
      setMovieName(event.target.value);
      console.log(' movieName set 함수 작동함')
    }
    else{
      setContent(event.target.value)
    }
  }

  const onClickTag: void = (event: WriteContentType) => {
  
    const element = document.getElementById(event.target.id).classList;

    const newTagId: number | string = event.target.id;
    const newTagName: string = (event.target.name).substr(1);

    const tagIdArray = selectedTags.map((tagObject) => tagObject.tagId);

    if(tagIdArray.indexOf(newTagId) != -1){
      element.toggle('clicked')
      const deletedTagList = selectedTags.filter((tag) => tag.tagId != newTagId);
      setSelectedTags(deletedTagList);
    }
    else if (selectedTags.length >= 3) {
      alert('태그는 최대 3개까지 선택 가능합니다.');
    }
    else {
      element.toggle('clicked')
      const newTag = {
        tagId: newTagId,
        tagName: newTagName
      }
      setSelectedTags([...selectedTags, newTag]);
    }
  }

  console.log(selectedTags);

  const onClickSubmitButton = () => {

    // 이미지는 formData로 보내야 하기 때문에 추후 수정 
    const submitData = {
      title: title,
      movieTitle: movieName,
      review: content,
      tags : selectedTags,
      image: file,
    }

    console.log(submitData);
  }
  
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
      
      <Input value={title} placeholder="게시글 제목을 입력하세요." isvalid={true} onChange={onChangeInput} width='80%'></Input>
      <Input value={movieName} placeholder="영화 제목을 입력하세요." isvalid={true} onChange={onChangeInput} width='80%'></Input>
      
      <TagContainer>
        <WriteTagMeta>
          <h3>태그</h3>
          <p>최소 1개 이상의 태그를 선택해 주세요.</p>
        </WriteTagMeta>
        <WriteTagList>
          {tags.map((tag, idx) => {
                return (
                  <li key={idx}>
                    <Button value={`#${tag.tagName}`} id={tag.tagId} width={'100%'} onClick={onClickTag}/>
                  </li>
                );
          })}
        </WriteTagList>
      </TagContainer>

      <WriteContentInput placeholder="이 영화는 어땠나요?" onChange={onChangeInput}>
      </WriteContentInput>

      <Button value={'등록하기'} width={'80%'} onClick={onClickSubmitButton}></Button>
    </div>
  </WriteWrapper>)
};

export default Writecontent;

// Styled-Component 
const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 9rem 0 0 0;

  background-color: #17191C;

  & > div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 90%;

    & > button {
      margin-top: 2rem;
    }
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

const WriteContentInput = styled.textarea<WriteContentType>`
  width: 80%;
  min-height: 30rem;
  margin-top: 2rem;
  padding: 1rem;

  color: white;
  background-color: #232323;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  border: none;
  resize: none;
 
 &:focus {
  outline: none;
 }
`