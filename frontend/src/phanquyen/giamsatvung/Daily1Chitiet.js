import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import daily2Icon from "../../assets/icons/daily2.png";
import DL1Vattu from "./subcomponents/DL1Vattu";
import DL1Congcu from "./subcomponents/DL1Congcu";
import DL1Daily2 from "./subcomponents/DL1Daily2";
import DL1CongcuPhanphat from "./subcomponents/DL1CongcuPhanphat";
import DL1VattuPhanphat from "./subcomponents/DL1VattuPhanphat";
import DL1CongcuPPChitiet from "./subcomponents/DL1CongcuPPChitiet";
import DL1VattuPPChitiet from "./subcomponents/DL1VattuPPChitiet";

const Daily1Chitiet = (props) => {
  const [active, setActive] = useState({
    code: 1,
    present: "congcu",
    payload: "",
  });
  const { id: daily1Id } = props.match.params;

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách đại lý 1"
          titleBack
          onClick={() => props.history.push("/giamsatvung/daily1")}
        />
        <Content>
          <Boxes>
            <Box
              onClick={() =>
                setActive({
                  code: 1,
                  present: "congcu",
                  payload: "",
                })
              }
              className={active.code === 1 && "active"}
            >
              <i class="fas fa-tools"></i>
              <BoxTitle>Công cụ</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 2,
                  present: "vattu",
                  payload: "",
                })
              }
              className={active.code === 2 && "active"}
            >
              <i class="fab fa-accusoft"></i>
              <BoxTitle>Vật tư</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 3,
                  present: "daily2",
                  payload: "",
                })
              }
              className={active.code === 3 && "active"}
            >
              <img src={daily2Icon} width="36" alt="daily2" />
              <BoxTitle>Đại lý cấp 2</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 4,
                  present: "congcupp",
                  payload: "",
                })
              }
              className={(active.code === 4 || active.code === 6) && "active"}
            >
              <i class="fas fa-tools"></i>
              <BoxTitle>Công cụ phân phát</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 5,
                  present: "vattupp",
                  payload: "",
                })
              }
              className={(active.code === 5 || active.code === 7) && "active"}
            >
              <i class="fab fa-accusoft"></i>
              <BoxTitle>Vật tư phân phát</BoxTitle>
            </Box>
          </Boxes>

          <SubComponents>
            {active.code === 1 ? (
              <DL1Congcu daily1Id={daily1Id} />
            ) : active.code === 2 ? (
              <DL1Vattu daily1Id={daily1Id} />
            ) : active.code === 3 ? (
              <DL1Daily2 daily1Id={daily1Id} />
            ) : active.code === 4 ? (
              <DL1CongcuPhanphat daily1Id={daily1Id} setActive={setActive} />
            ) : active.code === 5 ? (
              <DL1VattuPhanphat daily1Id={daily1Id} setActive={setActive} />
            ) : active.code === 6 ? (
              <DL1CongcuPPChitiet
                payload={active.payload}
                daily1Id={daily1Id}
                setActive={setActive}
              />
            ) : active.code === 7 ? (
              <DL1VattuPPChitiet
                payload={active.payload}
                daily1Id={daily1Id}
                setActive={setActive}
              />
            ) : null}
          </SubComponents>
        </Content>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Boxes = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Box = styled.div`
  width: 280px;
  padding: 26px 36px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 0%;
    bottom: -16px;
    height: 6px;
    border-radius: 4px;
    transition: width 350ms;
  }
  &.active {
    &::after {
      width: 100%;
    }
  }
  i {
    color: #fff;
    font-size: 28px;
  }
  &:nth-child(1) {
    background: #da542e;
    &::after {
      background: #da542e;
    }
    &:hover {
      background: #b03e1e;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #b03e1e;
    }
  }
  &:nth-child(2) {
    background: #2255a4;
    &::after {
      background: #2255a4;
    }
    &:hover {
      background: #163d7a;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #163d7a;
    }
  }
  &:nth-child(3) {
    background: #27a9e3;
    &::after {
      background: #27a9e3;
    }
    &:hover {
      background: #1d86b5;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #1d86b5;
    }
  }
  &:nth-child(4) {
    background: #28b779;
    &::after {
      background: #28b779;
    }
    &:hover {
      background: #1c8c5c;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #1c8c5c;
    }
  }
  &:nth-child(5) {
    background: #ffb848;
    &::after {
      background: #ffb848;
    }
    &:hover {
      background: #d99c3d;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #d99c3d;
    }
  }
`;
const BoxTitle = styled.div`
  font-size: 16px;
  color: #fff;
  margin-top: 16px;
  font-family: "Poppins", sans-serif;
`;
const SubComponents = styled.div`
  display: block;
  margin-top: 36px;
`;

export default Daily1Chitiet;
