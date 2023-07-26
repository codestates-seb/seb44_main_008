import { styled } from 'styled-components';

export const AccountWrap = styled.div`
  padding: 8rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 31.25rem;
  margin: 0 auto;
  min-height: calc(100vh - 8rem);
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 0.5rem;
      width: 100%;
    }
    .signImg {
      position: relative;
      width: 10rem;
      height: 10rem;
      border-radius: 100%;
      overflow: hidden;
      margin: 0 auto 0;
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
      opacity: 0;
      width: 100%;
      position: absolute;
      right: 0;
    }
  }
  .inputBox {
    margin-bottom: 1.5rem;
    &.imgBox {
      text-align: center;
      span {
        display: block;
        padding-top: 1rem;
      }
    }
    & > span {
      color: var(--white-color);
    }
    &.birthInput {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        color: var(--white-color);
        opacity: 0.8;
      }
      > div {
        width: 80%;
      }
    }
  }
  @media (max-width: 1100px) {
  }
  @media (max-width: 500px) {
    margin-top: 40px;
    padding: 5rem 0;
    max-width: 90%;
    .inputBox {
      margin-bottom: 1rem;
      &.imgBox {
        span {
          padding-top: 0.5rem;
        }
      }
      & > span {
        font-size: 0.8rem;
      }
    }
  }
`;
