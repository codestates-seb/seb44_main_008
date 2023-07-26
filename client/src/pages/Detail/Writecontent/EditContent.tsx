import React, { useRef, useState, useEffect, useCallback } from 'react';
import { styled } from 'styled-components';
import { Props } from './type';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import Loading from '../../../components/Common/Loading/Loading';
import ErrorPage from '../../ErrorPage/ErrorPage';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editReview } from '../../../api/reviewItem/reviewItem';
import { getAllTags } from '../../../api/tags/getTags';
import { getItem } from '../../../api/reviewItem/reviewItem';
import { useNavigate, useParams } from 'react-router-dom';

const EditContent = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();

  const [fileURL, setFileURL] = useState<string>('');
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string | undefined>('');
  const [selectedTags, setSelectedTags] = useState<
    { tagId: number; tagName: string }[]
  >([]);
  const [content, setContent] = useState<string>('');

  // 유효성 검사
  const [titleErr, setTitleErr] = useState<boolean>(true);
  const [TagErr, setTagErr] = useState<boolean>(true);
  const [contentErr, setContentErr] = useState<boolean>(true);

  // react-query
  const { data: tagData, isSuccess } = useQuery(['tags'], () => getAllTags());

  const {
    data: oldData,
    isLoading,
    error,
  } = useQuery(['oldData', reviewId], () => getItem(reviewId));

  const queryClient = useQueryClient();

  const mutationPatch = useMutation(editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['EditReview']), navigate(`/mypage`);
    },
  });

  // useEffect
  useEffect(() => {
    setTitle(oldData?.title);
    setContent(oldData?.review);
    setSelectedTags(oldData?.tags);
  }, [oldData]);

  // 이미지 관련 함수
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files);

      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  const onClickImg = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (imgUploadInput.current) {
      imgUploadInput.current.click();
    }
  };

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.placeholder === '게시글 제목을 입력하세요.') {
        setTitle(event.target.value);
        setTitleErr(true);
      } else {
        setContent(event.currentTarget.value);
        setContentErr(true);
      }
    },
    [],
  );

  const onClickTag = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLButtonElement;

    const element = document.getElementById(target.id)?.classList;
    const newTagId: number = Number(target.id);
    const newTagName: string = target.name.substr(1);
    const tagIdArray = selectedTags.map(tagObject => tagObject.tagId);

    if (tagIdArray.indexOf(newTagId) != -1) {
      element?.toggle('clicked');
      const deletedTagList = selectedTags.filter(tag => tag.tagId != newTagId);
      setSelectedTags(deletedTagList);
    } else if (selectedTags.length >= 3) {
      alert('태그는 최대 3개까지 선택 가능합니다.');
    } else {
      element?.toggle('clicked');
      const newTag = {
        tagId: newTagId,
        tagName: newTagName,
      };
      setSelectedTags([...selectedTags, newTag]);
      setTagErr(true);
    }
  };

  const onClickSubmitButton = () => {
    title?.length === 0
      ? setTitleErr(false)
      : selectedTags[0] === undefined
      ? setTagErr(false)
      : content.length <= 10
      ? setContentErr(false)
      : (async () => {
          const confirmed = window.confirm('게시글을 수정하시겠습니까?');

          if (confirmed) {
            const editData = {
              reviewId: reviewId,
              patch: {
                title: title,
                review: content,
                tags: selectedTags,
              },
              thumbnail: file ? file[0] : undefined,
            };

            await mutationPatch.mutateAsync(editData);
          }
          alert('게시글이 수정되었습니다.');
        })();
  };

  const onClickMovieTitle = () => {
    alert('영화명은 수정이 불가능합니다🙇‍♀️');
  };

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
        <WriteWrapper>
          <div>
            <WriteImgDiv>
              <img
                src={fileURL ? fileURL : oldData?.thumbnail}
                alt="thumbnail"
                onClick={onClickImg}
              ></img>
              <input
                type="file"
                accept="image/*"
                required
                ref={imgUploadInput}
                onChange={onImageChange}
              />
            </WriteImgDiv>

            <div className="input--wrapper">
              <Input
                placeholder="게시글 제목을 입력하세요."
                value={oldData?.title}
                isvalid={titleErr}
                onChange={onChangeInput}
                width="100%"
              ></Input>
              <div className="movie--title--div" onClick={onClickMovieTitle}>
                <Input
                  value={oldData?.movie.title}
                  placeholder="영화 제목을 입력하세요."
                  isvalid={true}
                  onChange={onChangeInput}
                  width="100%"
                ></Input>
              </div>
            </div>

            <TagContainer>
              <WriteTagMeta isvalid={TagErr.toString()}>
                <h3>태그</h3>
                <p>최소 1개 이상의 태그를 선택해 주세요.</p>
              </WriteTagMeta>
              <WriteTagList>
                {tagData?.map(tag => {
                  const isMyTag = selectedTags?.some(
                    myTag => myTag.tagId === tag.tagId,
                  );
                  return (
                    <li key={tag.tagId}>
                      {isMyTag ? (
                        <Button
                          value={`#${tag.tagName}`}
                          id={tag.tagId}
                          width={'100%'}
                          onClick={onClickTag}
                          type="button"
                          theme="variant"
                        />
                      ) : (
                        <Button
                          value={`#${tag.tagName}`}
                          id={tag.tagId}
                          width={'100%'}
                          onClick={onClickTag}
                          type="button"
                        />
                      )}
                    </li>
                  );
                })}
              </WriteTagList>
            </TagContainer>

            <WriteContentInput
              value={content}
              placeholder="이 영화는 어땠나요?"
              onChange={onChangeInput}
              isvalid={contentErr.toString()}
            ></WriteContentInput>

            <Button
              value={'수정하기'}
              width={'80%'}
              onClick={onClickSubmitButton}
            ></Button>
          </div>
        </WriteWrapper>
      </StyleSheetManager>
    );
  }
};

export default EditContent;

// Styled-Component
const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 9rem 0 2rem 0;

  background-color: #17191c;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    & > button {
      margin-top: 2rem;
    }

    & > .input--wrapper {
      width: 70%;

      & > .movie--title--div {
        width: 100%;
        margin-top: 1rem;
      }
    }
  }

  @media (max-width: 500px) {
    & > div {
      & > button {
        margin-top: 1.5rem;
      }

      & > .input--wrapper {
        width: 75%;
      }
    }
  }
`;

const WriteImgDiv = styled.div`
  width: 25rem;
  height: 18rem;
  margin-bottom: 2rem;

  cursor: pointer;

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

  @media (max-width: 500px) {
    width: 80%;
    height: 13rem;
    margin-bottom: 2rem;
  }
`;

const TagContainer = styled.div`
  display: flex;

  width: 80%;
  margin-top: 2rem;

  @media (max-width: 500px) {
    width: 85%;
    margin-top: 1rem;
  }
`;

const WriteTagMeta = styled.div<Props>`
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

  & > p {
    color: ${({ isvalid }) => (isvalid === 'true' ? '#666666' : '#fe2000')};
    padding-top: 0.5rem;
    font-size: 0.8rem;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const WriteTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  width: 84%;
  padding-left: 2rem;

  & > li {
    width: 15.5%;
  }
  @media (max-width: 500px) {
    justify-content: center;
    width: 100%;
    padding-left: 0;

    & > li {
      width: 25%;
    }
  }

  @media (max-width: 850px) {
    & > li {
      width: 30%;
    }
  }
`;

const WriteContentInput = styled.textarea<Props>`
  width: 80%;
  min-height: 30rem;
  margin-top: 2rem;
  padding: 1rem;

  color: white;
  background-color: #232323;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  /* border: none; */
  resize: none;

  border: ${({ isvalid }) =>
    isvalid === 'true' ? 'none' : '2px solid #fe2000'};

  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    min-height: 20rem;
  }
`;
