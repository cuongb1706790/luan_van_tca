import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";

const LoaiSanphamThem = (props) => {
  const [spLangnghe, setSpLangnghe] = useState({
    ma: "",
    ten: "",
    mota: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const emptyFields = () => {
    if (!spLangnghe.ma || !spLangnghe.ten) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setSpLangnghe({
      ...spLangnghe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const { success } = await apiLoaiSanpham.themLoaiSanpham(spLangnghe);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
        setErrMsg("");
      }
    }
  };

  const resetFields = () => {
    setSpLangnghe({
      ma: "",
      ten: "",
      mota: "",
    });
  };

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách loại sản phẩm"
          titleBack
          onClick={() => props.history.push("/admin/loaisanpham")}
          headerRight={
            <button className="btn btn-primary px-4" onClick={handleSubmit}>
              Lưu
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Thêm loại sản phẩm</FormTitle>

              <FormGroup>
                <Label>Mã loại:</Label>
                <Input
                  placeholder="Nhập mã"
                  type="text"
                  name="ma"
                  value={spLangnghe.ma}
                  onChange={handleChange}
                />
                {!spLangnghe.ma && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Tên loại:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={spLangnghe.ten}
                  onChange={handleChange}
                />
                {!spLangnghe.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Mô tả:</Label>
                <TextArea
                  placeholder="Nhập mô tả"
                  rows="5"
                  name="mota"
                  value={spLangnghe.mota}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 20px 100px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const FormContent = styled.div`
  width: 600px;
  margin: auto;
  font-family: "Poppins", sans-serif;
`;
const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  color: #555;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const Label = styled.span`
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 10px;
`;
const Input = styled.input`
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
const TextArea = styled.textarea`
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
const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default LoaiSanphamThem;
