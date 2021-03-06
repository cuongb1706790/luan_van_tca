import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  AddButton,
<<<<<<< HEAD
  BtnRight,
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";
import TableLangnghe from "./tables/TableLangnghe";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";

const Langnghe = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "tinh", "huyen", "sanphamchinh"]);
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsLangnghe = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    setDsLangnghe(langnghe && langnghe.length ? langnghe : []);
    setLoading(false);
  };

  const search = (dsLangnghe) => {
    return (
      dsLangnghe &&
      dsLangnghe.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsLangnghe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Làng nghề" />
        <Content>
<<<<<<< HEAD
          <BtnRight>
            <AddButton
              className="btn btn-primary"
              onClick={() => props.history.push("/giamsatvung/langnghe/them")}
            >
              <span>Thêm</span>
              <i class="fas fa-plus-circle"></i>
            </AddButton>
          </BtnRight>
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách làng nghề</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/giamsatvung/langnghe/them")}
              >
                <span>Thêm</span>
                <i class="fas fa-plus-circle"></i>
              </AddButton>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim làng nghề theo tên, tỉnh, huyện, loại sản phẩm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableLangnghe
                dsLangnghe={search(dsLangnghe)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Langnghe;
