import { styled } from 'styled-components';

export const PopperBox = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 7px;
  padding: 1.5rem 1rem;
  .popperTitle {
    font-size: 1.3rem;
    color: var(--white-color);
    margin-bottom: 1.2rem;
  }
  .popperList {
    max-height: 60vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 6px;
      padding-left: 10px;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #000;
      background-clip: padding-box;
      border-left: 5px solid transparent;
    }
    ul {
      > li {
        background-color: var(--main-dark-color);
        border-radius: 7px;
        padding: 1rem;
        margin-bottom: 0.6rem;
        &:last-child {
          margin-bottom: 0;
        }
        button {
          color: var(--white-color);
          width: 100%;
          text-align: left;
          h4 {
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
          }
          li {
            font-size: 0.8rem;
            line-height: 1.3rem;
          }
          > div {
            position: relative;
            .profileImgWrap {
              display: flex;
              position: absolute;
              right: 0;
              bottom: 0;
              .imgBox {
                width: 2rem;
                height: 2rem;
                border-radius: 100%;
                overflow: hidden;
                margin-left: -5px;
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
  .popperDetail {
    text-align: center;
    color: var(--white-color);
    padding: 1.875rem;
    background-color: var(--main-dark-color);
    border-radius: 7px;
    h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    ol {
      margin: 1.2rem 0;
      li {
        font-size: 1rem;
        line-height: 1.4rem;
      }
    }
    p {
      font-size: 0.9rem;
      line-height: 1.3rem;
      word-break: keep-all;
    }
  }
  .popperWrite {
    padding: 1.875rem;
    background-color: var(--main-dark-color);
    border-radius: 7px;
    input {
      margin-bottom: 0.9rem;
    }
    .dateBox {
      position: relative;
      input {
        width: 100%;
        background-color: var(--main-dark-color);
        color: #888;
        font-size: 1rem;
        border: 0;
        border-bottom: 2px solid var(--ghost-color);
        padding: 0.7rem;
        height: 100%;
        &::-webkit-calendar-picker-indicator {
          color: #fff;
          opacity: 0;
          width: 100%;
          position: absolute;
          right: 0;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .popTextArea {
      width: 100%;
      background-color: var(--main-dark-color);
      color: #888;
      font-size: 1.1rem;
      border: 0;
      border-bottom: 2px solid var(--ghost-color);
      padding: 0.7rem;
      &:focus {
        outline: none;
      }
    }
  }
  .popperButtonWrap {
    margin-top: 1.2rem;
    display: flex;
    justify-content: space-between;
    .popDetailButtonBox {
      display: flex;
      justify-content: space-between;
      width: calc(100% - 3.5rem);
    }
    button {
      display: flex;
      justify-content: center;
    }
  }
`;
