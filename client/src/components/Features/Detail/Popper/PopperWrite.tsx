import { useState } from 'react';
import Button from '../../../Common/Button/Button';
import Input from '../../../Common/Input/Input';
import { PopperBox } from './PopperStyle';
import { getTodayDate } from '../../../../assets/commonts/common';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { PostPot, potData } from '../../../../api/pot/pot';

import { AxiosError } from '../../../../assets/type/errorType';

type PopperWriteProps = {
  setCurrentRender: React.Dispatch<React.SetStateAction<string>>;
  reviewId: string;
  movie: string;
};

const PopperWrite: React.FC<PopperWriteProps> = ({
  setCurrentRender,
  reviewId,
  movie,
}) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [person, setPerson] = useState<number | undefined>();
  const [body, setBody] = useState<string>('');
  const [checkTitle, setCheckTitle] = useState<boolean>(false);
  const [checkLocation, setCheckLocation] = useState<boolean>(false);
  const [checkPerson, setCheckPerson] = useState<boolean>(false);
  const today = getTodayDate();
  const [saleStartDate, setSaleStartDate] = useState(today);

  //유효성검사
  const [istitle, setIsTitle] = useState<boolean>(true);
  const [isLocation, setIsLocation] = useState<boolean>(true);
  const [isPerson, setIsPerson] = useState<boolean>(true);
  const [isBody, setIsBody] = useState<boolean>(true);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckTitle(false);
    setTitle(e.currentTarget.value);
    setIsTitle(true);
  };
  const locationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckLocation(false);
    setLocation(e.currentTarget.value);
    setIsLocation(true);
  };
  const personChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPerson(false);
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setPerson(value);
  };
  const bodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  const submitData = {
    title: title,
    meetingDate: saleStartDate,
    location: location,
    maxCapacity: person,
    content: body,
    movieTitle: movie,
  };

  const writeMutations = useMutation({
    mutationFn: (data: potData) => PostPot(reviewId, submitData),
    onSuccess: () => {
      queryClient.invalidateQueries(['ReviewInfo', reviewId]);
      setCurrentRender('List');
    },
    onError(err: AxiosError) {
      const errMsg = err.response?.data.message;
      alert(errMsg);
    },
  });

  const SubmitEvent = () => {
    if (title.length === 0) {
      setIsTitle(false);
    }
    if (location.length === 0) {
      setIsLocation(false);
    }
    if (person === undefined || person <= 1) {
      setIsPerson(false);
      alert('모집인원은 1명이상이여야 합니다.');
    }
    if (body.length === 0) {
      setIsBody(false);
    }
    if (
      title.length !== 0 &&
      location.length !== 0 &&
      person &&
      person > 1 &&
      body.length !== 0
    ) {
      writeMutations.mutate(submitData);
    }
  };
  return (
    <PopperBox>
      <h2 className="popperTitle">다른 팝퍼들과 함께 보면 재미가 2배!🍿</h2>
      <div className="popperWrite">
        <Input
          value={title}
          placeholder="팟 모집글 제목을 입력하세요."
          id="title"
          onChange={titleChange}
          isvalid={istitle}
          width="100%"
        ></Input>

        <div className="dateBox">
          <input
            type="datetime-local"
            value={saleStartDate}
            min={saleStartDate}
            onChange={e => setSaleStartDate(e.target.value)}
            className="dateInput"
            id="dateInput"
          />
        </div>
        <Input
          value={location}
          id="location"
          placeholder="장소를 입력하세요."
          onChange={locationChange}
          isvalid={isLocation}
          width="100%"
        />
        <Input
          type="number"
          id="person"
          value={person}
          placeholder="모집 인원을 선택하세요."
          onChange={personChange}
          isvalid={isPerson}
          width="100%"
          pattern="[0-9]+"
        />
        <textarea
          className={`${isBody ? 'popTextArea' : 'popTextArea on'}`}
          placeholder="간단한 팟 소개글을 작성해보세요!"
          value={body}
          onChange={bodyChange}
        ></textarea>
      </div>
      <div className="popperButtonWrap">
        <Button
          value="↩"
          onClick={() => {
            setCurrentRender('List');
          }}
          width="2.438rem"
        />
        <Button
          value="팟 모집하기"
          width="calc(100% - 3.5rem)"
          type="variant"
          onClick={SubmitEvent}
        />
      </div>
    </PopperBox>
  );
};

export default PopperWrite;
