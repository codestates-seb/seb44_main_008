import React, { useCallback, useEffect, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { PopperDetailData } from './popperType';
import { PopperBox } from './PopperStyle';
import Button from '../../../Common/Button/Button';
import { GetPotItem, JoinPot } from '../../../../api/pot/pot';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';
import Loading from '../../../Common/Loading/Loading';
import { getDate } from '../../../../assets/commonts/common';

type PopperDetailProps = {
  currentId: number;
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRender: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
};

const PopperDetail: React.FC<PopperDetailProps> = ({
  currentId,
  setCurrentID,
  setCurrentRender,
  currentPage,
}) => {
  const id = currentId;
  const [groups, setGroups] = useState<PopperDetailData>({});

  const clickEdit = () => {
    setCurrentRender('Edit');
    setCurrentID(id);
  };

  const joinPotData = {
    groupId: id,
    currentParticipant: 10,
  };
  const SubmitEvent = () => {
    writeMutations.mutate(joinPotData);
  };
  const writeMutations = useMutation({
    mutationFn: () => JoinPot(id, joinPotData),
    onSuccess(data) {
      setCurrentRender('List');
    },
    onError(err) {
      console.log(err);
    },
  });
  const {
    data: dataItem,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['groupInfo', id],
    queryFn: () => {
      return GetPotItem(id);
    },
  });

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }

  console.log(id);

  return (
    <PopperBox>
      <h2 className="popperTitle">
        지금 이 영화를 <br />
        같이 보고 싶어하는 팝퍼🍿
      </h2>
      <div className="popperDetail">
        <h4>{dataItem.data.title}</h4>
        <ol>
          <li>일시 :{getDate(dataItem.data.meetingDate)}</li>
          <li>장소: {dataItem.data.location}</li>
          <li>모집 인원: 최대 {dataItem.data.maxCapacity}명</li>
        </ol>
        <p>{dataItem.data.content}</p>
      </div>
      <div className="popperButtonWrap">
        {currentPage === 'popDetail' && (
          <>
            <Button
              value="↩"
              onClick={() => {
                setCurrentRender('List');
              }}
              width="2.438rem"
            />
            <div className="popDetailButtonBox">
              <Button
                value="모집 신청"
                width="100%"
                theme="variant"
                type="button"
                onClick={SubmitEvent}
              />
            </div>
          </>
        )}
        {currentPage === 'myPageMyPop' && (
          <>
            <div className="popDetailButtonBox w100">
              <Button value="수정하기" width="49%" onClick={clickEdit} />
              <Button value="모집 삭제" width="49%" theme="variant" />
            </div>
          </>
        )}

        {currentPage === 'myPageOtherPop' && (
          <>
            <div className="popDetailButtonBox w100">
              <Button value="팟 참여 취소하기" width="100%" theme="variant" />
            </div>
          </>
        )}
      </div>
    </PopperBox>
  );
};

export default PopperDetail;
