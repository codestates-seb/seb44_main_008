import { styled } from 'styled-components';

export const AccountWrap = styled.div`
  padding: 8rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 31.25rem;
  margin: 0 auto;
  min-height: calc(100vh - 10.9rem);
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 2rem;
    }
    .signImg {
      position: relative;
      width: 10rem;
      height: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      overflow: hidden;
      margin: 0 auto 3rem;
      label {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      input[type='file'] {
        display: none;
      }
    }
  }
  .snsButton {
    margin-top: 2rem;
    color: var(--white-color);
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 0.8rem;
      font-size: 1rem;
    }
  }
  .tagBtnWrap {
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 2rem;
    }
  }
  input[type='date'] {
    &::-webkit-calendar-picker-indicator {
      color: #fff;
      opacity: 0;
      width: 100%;
      position: absolute;
      right: 0;
    }
  }
`;
