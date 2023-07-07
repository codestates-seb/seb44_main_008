import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { PopperDetailData } from './popperType';
import { PopperBox } from './PopperStyle';
import Button from '../../../Common/Button/Button';

const response = {
  data: {
    groupId: 1,
    title: '맥주 두 캔들고 같이 봐요!',
    meetingDate: '2023-06-30T20:00',
    location: 'Watcha Party',
    maxCapacity: 5,
    content: ` 안녕하세요! 사회에 찌든 직장인 입니다. 리뷰 읽으니 집사로서 보지
    않으면 안될 것 같더라구요! 저랑 같이 저녁 드시고 맥주 한 캔 까면서
    고양이의 보은 같이 보실 5분 모집합니다! 편하게 신청해주세요!`,
  },
};

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
  const navigate = useNavigate();
  const [groups, setGroups] = useState<PopperDetailData>({});

  const clickEdit = () => {
    setCurrentRender('Edit');
    setCurrentID(id);
  };

  const getData = useCallback(async () => {
    try {
      // const response = await axios.get(`/groups/${id}`);
      setGroups(response.data);
    } catch (err) {
      console.log('err', err);
    }
  }, [id]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <PopperBox>
      <h2 className="popperTitle">지금 이 영화를 같이 보고 싶어하는 팝퍼🍿</h2>
      <div className="popperDetail">
        <h4>{groups.title}</h4>
        <ol>
          <li>일시 : {groups.meetingDate}</li>
          <li>장소: {groups.location}</li>
          <li>모집 인원: 최대 {groups.maxCapacity}명</li>
        </ol>
        <p>{groups.content}</p>
      </div>
      <div className="popperButtonWrap">
        <Button
          value="↩"
          onClick={() => {
            setCurrentRender('List');
          }}
          width="2.438rem"
        />
        <div className="popDetailButtonBox">
          {currentPage === 'popDetail' && (
            <Button value="모집 신청" width="100%" type="variant" />
          )}
          {currentPage === 'myPageMyPop' && (
            <>
              <Button value="수정하기" width="49%" onClick={clickEdit} />
              <Button value="모집 삭제" width="49%" type="variant" />
            </>
          )}
          {currentPage === 'myPageOtherPop' && (
            <Button value="팟 참여 취소하기" width="100%" type="variant" />
          )}
        </div>
      </div>
    </PopperBox>
  );
};

export default PopperDetail;
