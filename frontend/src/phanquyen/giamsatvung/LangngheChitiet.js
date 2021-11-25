import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";

const LangngheChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleLN, setSingleLN] = useState(null);
  const { id: langngheId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.singleLangnghe(langngheId);
    setSingleLN(langnghe);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
        headerRight={<button className="btn btn-primary px-4">Lưu</button>}
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Chi tiết làng nghề</FormTitle>

            <FormGroup>
              <Label>Tên làng:</Label>
              <Input type="text" value={singleLN?.ten} />
            </FormGroup>

            <FormGroup>
              <Label>Tỉnh:</Label>
              <Input type="text" value={singleLN?.tinh} />
            </FormGroup>

            <FormGroup>
              <Label>Huyện:</Label>
              <Input type="text" value={singleLN?.huyen} />
            </FormGroup>

            <FormGroup>
              <Label>Loại sản phẩm:</Label>
              <Input
                type="text"
                value={singleLN?.loaisanpham.map((lsp) => lsp.ten).join(", ")}
              />
            </FormGroup>
          </FormContent>
        </Form>
      </Content>
    </Container>
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
  padding: 36px 20px 120px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const FormContent = styled.div`
  width: 570px;
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
  text-align: center;
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
const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default LangngheChitiet;
