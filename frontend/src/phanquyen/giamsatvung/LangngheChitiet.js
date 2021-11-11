import React, { useEffect, useState } from "react";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";

const LangngheChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [langnghe, setLangnghe] = useState(null);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { id: langngheId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.singleLangnghe(langngheId);
    setLangnghe(langnghe);
    setLoading(false);
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
      />
      <Content>
        <FormWrapper>
          <Form>
            <FormTitle>Chi tiết làng nghề</FormTitle>
            <FormGroup>
              <Label>Tên làng:</Label>
              <Input type="text" defaultValue={langnghe?.ten} />
            </FormGroup>

            <FormGroup>
              <Label>Tỉnh:</Label>
              <Input type="text" defaultValue={langnghe?.tinh} />
            </FormGroup>

            <FormGroup>
              <Label>Huyện:</Label>
              <Input type="text" defaultValue={langnghe?.huyen} />
            </FormGroup>

            <FormGroup>
              <Label>Sản phẩm chính:</Label>
              <Input
                type="text"
                defaultValue={langnghe?.sanphamchinh
                  .map((item) => item.ten)
                  .join(", ")}
              />
            </FormGroup>
          </Form>
        </FormWrapper>
      </Content>
    </Wrapper>
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
  padding: 36px;
  font-family: "Poppins", sans-serif;
`;
const FormWrapper = styled.div`
  background: #fff;
  padding: 36px 20px 100px 36px;
  width: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const Form = styled.div`
  width: 570px;
  margin: auto;
`;
const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
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
const FormGroup = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;

export default LangngheChitiet;
