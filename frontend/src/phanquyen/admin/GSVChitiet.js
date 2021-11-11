import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import apiGSV from "../../axios/apiGSV";
import BackdropMaterial from "../../components/BackdropMaterial";

const GSVChitiet = (props) => {
  const [gsv, setGsv] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: gsvId } = props.match.params;

  const fetchSingleGSV = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsv(gsvId);
    setGsv(gsv);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleGSV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/admin/gsv")}
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Chi tiết giám sát vùng</FormTitle>

              <FormGroup>
                <Label>Tên giám sát vùng:</Label>
                <Input type="text" value={gsv?.ten} />
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input type="text" value={gsv?.sdt} />
              </FormGroup>

              <FormGroup>
                <Label>Số chứng minh nhân dân:</Label>
                <Input type="text" value={gsv?.cmnd} />
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input type="text" value={gsv?.email} />
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ:</Label>
                <TextArea
                  rows="3"
                  value={`${gsv?.xa}, ${gsv?.huyen}. ${gsv?.tinh}`}
                />
              </FormGroup>

              <FormGroup>
                <Label>Tên tài khoản:</Label>
                <Input type="text" value={gsv?.user.taikhoan} />
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
  padding: 36px 20px 70px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const FormContent = styled.div`
  width: 750px;
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

export default GSVChitiet;
