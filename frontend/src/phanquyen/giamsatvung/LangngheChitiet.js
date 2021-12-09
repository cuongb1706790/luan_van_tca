import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
<<<<<<< HEAD
=======
  Filter,
  FilterSection,
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
<<<<<<< HEAD
=======
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
} from "./styledComponents";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
<<<<<<< HEAD
import chitiet from "../../assets/icons/chitiet.png";
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import _ten from "../../assets/icons/ten.png";
import _tinh from "../../assets/icons/tinh.png";
import _huyen from "../../assets/icons/huyen.png";
import loai from "../../assets/icons/loai.png";
<<<<<<< HEAD
=======
import TableHodan from "../daily2/tables/TableHodan";
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

const LangngheChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleLN, setSingleLN] = useState(null);
<<<<<<< HEAD
=======
  const [dsHodan, setDsHodan] = useState([]);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
  const { id: langngheId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.singleLangnghe(langngheId);
<<<<<<< HEAD
=======
    let { hodan } = await apiLangnghe.dsHodan(langngheId);
    hodan = hodan.map((hd) => ({ ...hd, langnghe: hd.langnghe.ten }));
    setDsHodan(hodan);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
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
<<<<<<< HEAD
              <Input type="text" value={singleLN?.ten} />
=======
              <Input type="text" value={singleLN?.ten} disabled />
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_tinh} alt="tinh" />
                <span>Tỉnh:</span>
              </Label>
<<<<<<< HEAD
              <Input type="text" value={singleLN?.tinh} />
=======
              <Input type="text" value={singleLN?.tinh} disabled />
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_huyen} alt="_huyen" />
                <span>Huyện:</span>
              </Label>
<<<<<<< HEAD
              <Input type="text" value={singleLN?.huyen} />
=======
              <Input type="text" value={singleLN?.huyen} disabled />
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={loai} alt="loai" />
                <span>Loại sản phẩm:</span>
              </Label>
              <Input
                type="text"
                value={singleLN?.loaisanpham.map((lsp) => lsp.ten).join(", ")}
<<<<<<< HEAD
              />
            </FormGroup>
          </FormContent>
=======
                disabled
              />
            </FormGroup>
          </FormContent>

          <FilterSection className="px-4 mt-3">
            <TitleWrapper>
              <Title className="pl-0">Danh sách hộ dân</Title>
            </TitleWrapper>
            <Filter className="pl-0">
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim hộ dân theo tên đại diện, số điện thoại, cmnd, tài khoản, năm sinh"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection className="noCheckbox">
              <TableHodan dsHodan={dsHodan} readOnly />
            </TableSection>
          </FilterSection>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        </Form>
      </Content>
    </Container>
  );
};

export default LangngheChitiet;
