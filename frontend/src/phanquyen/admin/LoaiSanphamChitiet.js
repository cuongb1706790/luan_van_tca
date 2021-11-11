import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";

const LoaiSanphamChitiet = (props) => {
  const [loaiSanpham, setLoaiSanpham] = useState(null);
  const { id: loaiSanphamId } = props.match.params;
  const [loading, setLoading] = useState(false);

  const fetchSingleSanpham = async () => {
    setLoading(true);
    const { loaiSanpham } = await apiLoaiSanpham.singleLoaiSanpham(
      loaiSanphamId
    );
    setLoaiSanpham(loaiSanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách loại sản phẩm"
          titleBack
          onClick={() => props.history.push("/admin/loaisanpham")}
          headerRight={
            <button
              className="btn btn-primary px-3"
              onClick={() =>
                props.history.push(
                  `/admin/loaisanpham/chinhsua/${loaiSanphamId}`
                )
              }
            >
              Chỉnh sửa
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Chi tiết loại sản phẩm</FormTitle>
              <FormGroup>
                <Label>Mã loại:</Label>
                <Input type="text" value={loaiSanpham?.ma} />
              </FormGroup>
              <FormGroup>
                <Label>Tên loại:</Label>
                <Input type="text" value={loaiSanpham?.ten} />
              </FormGroup>
              <FormGroup>
                <Label>Mô tả:</Label>
                <TextArea rows="5" value={loaiSanpham?.mota} />
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

export default LoaiSanphamChitiet;
