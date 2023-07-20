import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { GetPotItem, JoinPot } from '../../../../api/pot/pot';
import {
  DeleteCModal,
  DeleteDModal,
} from '../../../../api/user/userTab/userTab';
import { getDate } from '../../../../assets/commonts/common';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';
import Button from '../../../Common/Button/Button';
import Loading from '../../../Common/Loading/Loading';
import { PopperBox } from './PopperStyle';
import { PopperDetailData } from './popperType';
import { AxiosError } from '../../../../assets/type/errorType';

type PopperDetailProps = {
  reviewId: string;
  currentId: number;
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRender: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
};

const PopperDetail: React.FC<PopperDetailProps> = ({
  reviewId,
  currentId,
  setCurrentID,
  setCurrentRender,
  currentPage,
}) => {
  const id = currentId;
  const queryClient = useQueryClient();
  const { openScroll } = useBodyScrollLock();

  const delPopMutation = useMutation(DeleteCModal);
  const deleteHandler = (groupId: number) => {
    const confirmed = window.confirm('정말 이 모집을 삭제하시겠습니까?');
    if (confirmed) {
      delPopMutation.mutate(groupId);
      alert('모집이 삭제되었습니다.');
      openScroll();
    }
  };
  const delPartyMutation = useMutation(DeleteDModal, {
    onError: () => {
      alert(
        "'내가 모집중인 팟'이기 때문에 '내가 모집중인 팟'에서 삭제해야합니다.",
      ),
        location.reload();
    },
  });
  const deletePartyHandler = (groupId: number) => {
    const confirmed = window.confirm('정말 이 파티를 나가시겠습니까?');
    if (confirmed) {
      delPartyMutation.mutate(groupId);
      alert('파티에서 제외되었습니다.');
      openScroll();
    }
  };

  const clickEdit = () => {
    setCurrentRender('Edit');
    setCurrentID(id);
  };

  const mutationJoin = useMutation(JoinPot, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ReviewInfo', reviewId]);
      setCurrentRender('List');
      alert('모집신청이 완료되었습니다.');
    },
    onError(err: AxiosError) {
      const errMsg = err.response?.data.message;
      alert(errMsg);
      console.log('err', err);
    },
  });
  const SubmitEvent = (groupId: number) => {
    mutationJoin.mutate(groupId);
  };

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

  if (isSuccess) {
    return (
      <PopperBox>
        <h2 className="popperTitle">
          지금 이 영화를 <br />
          같이 보고 싶어하는 팝퍼🍿
        </h2>
        <div className="popperDetail">
          <h4>{dataItem.title}</h4>
          <ol>
            <li>일시 :{getDate(dataItem.meetingDate)}</li>
            <li>장소: {dataItem.location}</li>
            <li>모집 인원: 최대 {dataItem.maxCapacity}명</li>
          </ol>
          <p>{dataItem.content}</p>
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
                  onClick={() => {
                    SubmitEvent(dataItem.groupId);
                  }}
                />
              </div>
            </>
          )}
          {currentPage === 'myPageMyPop' && (
            <>
              <div className="popDetailButtonBox w100">
                <Button value="수정하기" width="49%" onClick={clickEdit} />
                <Button
                  value="모집 삭제"
                  width="49%"
                  theme="variant"
                  onClick={() => deleteHandler(id)}
                />
              </div>
            </>
          )}

          {currentPage === 'myPageOtherPop' && (
            <>
              <div className="popDetailButtonBox w100">
                <Button
                  value="팟 참여 취소하기"
                  width="100%"
                  theme="variant"
                  onClick={() => deletePartyHandler(id)}
                />
              </div>
            </>
          )}
        </div>
      </PopperBox>
    );
  }
};

export default PopperDetail;
