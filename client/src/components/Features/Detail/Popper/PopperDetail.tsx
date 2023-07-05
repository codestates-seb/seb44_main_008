import { PopperBox } from './PopperStyle';
import Button from '../../../Common/Button/Button';

const PopperDetail = () => {
  return (
    <PopperBox>
      <h2 className="popperTitle">지금 이 영화를 같이 보고 싶어하는 팝퍼🍿</h2>
      <div className="popperDetail">
        <h4>맥주 한 캔들고 같이 봐요! ✨</h4>
        <ol>
          <li>일시 : 2023년 6월 30일 저녁 8시</li>
          <li>장소: Watcha Party</li>
          <li>모집 인원: 4/5</li>
        </ol>
        <p>
          안녕하세요! 사회에 찌든 직장인 입니다. 리뷰 읽으니 집사로서 보지
          않으면 안될 것 같더라구요! 저랑 같이 저녁 드시고 맥주 한 캔 까면서
          고양이의 보은 같이 보실 4분 모집합니다! 편하게 신청해주세요!
        </p>
      </div>
      <div className="popperButtonWrap">
        <Button value="↩" width="2.438rem" />
        <Button value="모집 신청" width="calc(100% - 3.5rem)" type="variant" />
      </div>
    </PopperBox>
  );
};

export default PopperDetail;
