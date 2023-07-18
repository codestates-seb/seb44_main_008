import React, { useEffect, useState } from 'react';
import Button from '../../../Common/Button/Button';
import Input from '../../../Common/Input/Input';
import { PopperBox } from './PopperStyle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetTabCModal,
  PatchTabCModal,
} from '../../../../api/user/userTab/userTab';
import Loading from '../../../Common/Loading/Loading';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';
import { data } from '../../../../api/pot/pot';

interface ModalData {
  groupId: number;
  modalData: data;
}

type PoppeEditProps = {
  currentId: number;
  setCurrentRender: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
};

const PopperEdit: React.FC<PoppeEditProps> = ({
  currentId,
  setCurrentRender,
  currentPage,
}) => {
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['modalContent', currentId],
    queryFn: () => GetTabCModal(currentId),
  });
  const [title, setTitle] = useState<string | undefined>('');
  const [location, setLocation] = useState<string | undefined>('');
  const [person, setPerson] = useState<number | undefined>(0);
  const [meeting, setMeeting] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');
  const [checkTitle, setCheckTitle] = useState<boolean>(false);
  const [checkLocation, setCheckLocation] = useState<boolean>(false);
  const [checkPerson, setCheckPerson] = useState<boolean>(false);
  const [checkContent, setCheckContent] = useState(false);
  const queryClient = useQueryClient();
  const mutationPatch = useMutation({
    mutationFn: (modalData: ModalData) => PatchTabCModal(modalData),
    onSuccess: () => {
      queryClient.invalidateQueries(['modalContent', currentId]),
        setCurrentRender('Detail');
    },
  });
  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setLocation(data.location);
      setPerson(data.maxCapacity);
      setMeeting(data.meetingDate);
      setContent(data?.content);
    }
  }, [data]);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckTitle(false);
    setTitle(e.currentTarget.value);
  };

  const locationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckLocation(false);
    setLocation(e.currentTarget.value);
  };

  const personChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPerson(false);
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setPerson(value);
  };

  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeeting(e.target.value);
  };
  const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckContent(false);
    setContent(e.target.value);
  };

  const modalData: data = {
    title: title,
    meetingDate: meeting,
    location: location,
    maxCapacity: person,
    content: content,
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed = window.confirm('팟 정보를 수정하시겠습니까?');
    if (confirmed) {
      mutationPatch.mutate({ groupId: currentId, modalData: modalData });
    }
    alert('팟 정보가 수정되었습니다.');
  };

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <PopperBox>
        <form>
          <h2 className="popperTitle">
            다른 팝퍼들과 <br />
            함께 보면 재미가 2배!🍿
          </h2>
          <div className="popperWrite">
            <Input
              value={data.title}
              placeholder="팟 모집글 제목을 입력하세요."
              id="title"
              onChange={titleChange}
              isvalid={'true'}
              width="100%"
            />
            <div className="dateBox">
              <input
                type="datetime-local"
                className="dateInput"
                id="dateInput"
                style={{ color: 'white' }}
                value={meeting}
                onChange={dateChange}
              />
            </div>
            <Input
              value={data.location}
              id="location"
              placeholder="장소를 입력하세요."
              onChange={locationChange}
              isvalid={true}
              width="100%"
            />
            <Input
              type="number"
              id="person"
              value={data.maxCapacity}
              placeholder="모집 인원을 입력하세요."
              onChange={personChange}
              isvalid={true}
              width="100%"
            />
            <textarea
              className="popTextArea"
              placeholder="간단한 팟 소개글을 작성해보세요!"
              value={content}
              onChange={contentChange}
            ></textarea>
          </div>
          <div className="popperButtonWrap">
            {currentPage === 'popDetail' && (
              <>
                <Button
                  value="↩"
                  width="2.438rem"
                  onClick={() => {
                    setCurrentRender('List');
                  }}
                />
                <Button
                  value="수정하기"
                  width="calc(100% - 3.5rem)"
                  theme="variant"
                />
              </>
            )}
            {currentPage === 'myPageMyPop' && (
              <>
                <Button
                  value="↩"
                  width="2.438rem"
                  onClick={() => {
                    setCurrentRender('Detail');
                  }}
                />
                <Button
                  value="수정하기"
                  width="calc(100% - 3.5rem)"
                  theme="variant"
                  type="submit"
                  onClick={submitHandler}
                />
              </>
            )}
          </div>
        </form>
      </PopperBox>
    );
  }
};

export default PopperEdit;
