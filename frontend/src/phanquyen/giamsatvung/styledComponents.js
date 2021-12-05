import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
  .MuiButtonBase-root {
    outline: none;
  }
`;

export const BtnRight = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
  i {
    font-size: 22px;
    margin-left: 8px;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-left: 6px;
    font-size: 20px;
  }
`;

export const FilterSection = styled.div`
  background: #fff;
`;

export const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  color: #1e93e8;
  display: inline-block;
  border-bottom: 2px solid #1e93e8;
`;

export const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    margin-right: 10px;
  }
`;

export const Filter = styled.div`
  background: #fff;
  padding: 14px 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SearchBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 50%;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(0, 0, 0, 0.35);
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #182537;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      font-family: "Poppins", sans-serif;
    }
  }
`;

export const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
  &.noCheckbox {
    th:first-child,
    td:first-child {
      display: none;
    }
  }
`;

export const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;

export const Label = styled.span`
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  img {
    width: 24px;
    margin-right: 14px;
    opacity: 0.7;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 26px;
  font-family: "Poppins", sans-serif;
  &.dh {
    margin-bottom: 16px;
    img {
      width: 24px;
      margin-right: 8px;
      opacity: 0.6;
    }
    span {
      font-family: "Montserrat", sans-serif;
    }
    span:last-child {
      font-weight: 500;
      margin-left: 16px;
    }
  }
`;

export const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  color: #27a9e3;
  margin-bottom: 36px;
  margin-top: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  img {
    width: 24px;
  }
  img:first-child {
    margin-right: 36px;
  }
  img:last-child {
    margin-left: 36px;
  }
`;

export const FormContent = styled.div`
  width: 750px;
  margin: auto;
`;

export const Form = styled.div`
  background: #fff;
  padding: 36px 20px 100px 36px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;
export const CrossButton = styled.button`
  border: none;
  margin-left: 10px;
  background: #fff;
  outline: none;
  i {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    outline: none;
  }
`;
export const PlusButton = styled.button`
  margin-left: 20px;
  background: #fff;
  border: none;
  outline: none;
  i {
    font-size: 13px;
    color: #0088ff;
    width: 25px;
    height: 25px;
    line-height: 20px;
    border: 3px solid #0088ff;
    text-align: center;
    border-radius: 50%;
  }
  span {
    color: #0088ff;
    margin-left: 8px;
  }
  &:active {
    outline: none;
  }
`;

export const TableTitle = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  img {
    width: 24px;
    margin-right: 8px;
    opacity: 0.6;
  }
`;

export const Total = styled.span`
  font-size: 15px;
  margin-right: 10px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
`;

export const TotalValue = styled.span`
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
`;

export const FilterWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 14px;
  padding-left: 17px;
  padding-right: 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const BoxInfoTitle = styled.h6`
  margin-bottom: 16px;
  color: #0088ff;
`;

export const BoxInfo = styled.div`
  width: 380px;
  padding: 26px;
  /* border: 1px solid #0088ff; */
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  display: inline-block;
  text-align: left;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 36px;
  span {
    font-size: 15px;
    margin-right: 10px;
  }
  img {
    width: 16px;
    margin-right: 8px;
    opacity: 0.6;
  }
  td {
    padding-bottom: 6px;
    min-width: 100px;
    vertical-align: top;
    font-size: 14px;
  }
`;

export const TiendoProcessText = styled.div`
  display: inline-block;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  color: #1c7ed6;
  &:hover {
    color: #11548f;
  }
  span {
    margin-right: 8px;
    margin-left: 8px;
    font-family: "Montserrat", sans-serif;
  }
`;

export const TiendoProcess = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const InputSoluong = styled.input`
  text-align: center;
  width: 70px;
  outline: none;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 255, 0.25);
  &:focus {
    outline: none;
    border: 1px solid rgba(0, 0, 255, 0.5);
  }
`;

export const Alert = styled.div`
  display: block;
  border-radius: 4px;
  text-align: left;
  background: transparent;
  font-family: "poppins", sans-serif;
  font-size: 15px;
  margin: 16px 0 48px 0;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    margin-top: -30px;
  }
  .title > span {
    color: rgb(95, 33, 32);
  }
  .content > p {
    margin: 0;
    color: #555;
    font-size: 14px;
    font-family: "montserrat", sans-serif;
    padding: 2px 0;
    span {
      color: #111;
      font-weight: 500;
      margin-left: 10px;
    }
  }
`;
