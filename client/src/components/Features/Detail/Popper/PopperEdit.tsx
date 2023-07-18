import { useEffect, useState } from 'react';
import Button from '../../../Common/Button/Button';
import Input from '../../../Common/Input/Input';
import { PopperBox } from './PopperStyle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetTabCModal } from '../../../../api/user/userTab/userTab';
import Loading from '../../../Common/Loading/Loading';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';

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
  const [title, setTitle] = useState<string | undefined>('');
  const [location, setLocation] = useState<string | undefined>('');
  const [person, setPerson] = useState<number | undefined>(0);
  const [meeting, setMeeting] = useState('');
  const [checkTitle, setCheckTitle] = useState<boolean>(false);
  const [checkLocation, setCheckLocation] = useState<boolean>(false);
  const [checkPerson, setCheckPerson] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['modalContent', currentId],
    queryFn: () => GetTabCModal(currentId),
  });
  const haveTitle = title || data?.title || '';
  const haveLocation = location || data?.location || '';
  const havePerson = person || data?.maxCapacity || 0;
  const haveMeeting = meeting || data?.meetingDate || '';

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setLocation(data.location);
      setPerson(data.maxCapacity);
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
  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <PopperBox>
        <h2 className="popperTitle">
          다른 팝퍼들과 <br />
          함께 보면 재미가 2배!🍿
        </h2>
        <div className="popperWrite">
          <Input
            value={haveTitle}
            placeholder="팟 모집글 제목을 입력하세요."
            id="title"
            onChange={titleChange}
            isvalid={true}
            width="100%"
          />

          <div className="dateBox">
            <input type="datetime-local" className="dateInput" id="dateInput" />
          </div>
          <Input
            value={haveLocation}
            id="location"
            placeholder="장소를 입력하세요."
            onChange={locationChange}
            isvalid={true}
            width="100%"
          />
          <Input
            type="number"
            id="person"
            value={havePerson}
            placeholder="모집 인원을 입력하세요."
            onChange={personChange}
            isvalid={true}
            width="100%"
          />
          <textarea
            className="popTextArea"
            placeholder="간단한 팟 소개글을 작성해보세요!"
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
                type="variant"
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
                type="variant"
              />
            </>
          )}
        </div>
      </PopperBox>
    );
  }
};

export default PopperEdit;
