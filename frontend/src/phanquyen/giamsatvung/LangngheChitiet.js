import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
} from "./styledComponents";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import chitiet from "../../assets/icons/chitiet.png";
import _ten from "../../assets/icons/ten.png";
import _tinh from "../../assets/icons/tinh.png";
import _huyen from "../../assets/icons/huyen.png";
import loai from "../../assets/icons/loai.png";

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
            <FormTitle>
              <span>Chi tiết làng nghề</span>
            </FormTitle>

            <FormGroup>
              <Label>
                <img src={_ten} alt="ten" />
                <span>Tên làng:</span>
              </Label>
              <Input type="text" value={singleLN?.ten} />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_tinh} alt="tinh" />
                <span>Tỉnh:</span>
              </Label>
              <Input type="text" value={singleLN?.tinh} />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_huyen} alt="_huyen" />
                <span>Huyện:</span>
              </Label>
              <Input type="text" value={singleLN?.huyen} />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={loai} alt="loai" />
                <span>Loại sản phẩm:</span>
              </Label>
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

export default LangngheChitiet;
