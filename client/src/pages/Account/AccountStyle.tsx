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
      width: 10rem;
      height: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
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
`;
