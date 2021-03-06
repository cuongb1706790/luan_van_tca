import React, { useEffect, useState } from "react";
import TableNguyenlieu from "./tables/TableNguyenlieu";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import {
<<<<<<< HEAD
  BtnRight,
=======
  AddButton,
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

const Nguyenlieu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "donvitinh"]);
  const [loading, setLoading] = useState(false);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsNguyenlieu = async () => {
    setLoading(true);
    const { nguyenlieu } = await apiNguyenlieu.dsNguyenlieu();
    setDsNguyenlieu(nguyenlieu);
    setLoading(false);
  };

  const search = (dsNguyenlieu) => {
    return (
      dsNguyenlieu &&
      dsNguyenlieu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Nguyên liệu" />
        <Content>
<<<<<<< HEAD
          <BtnRight>
            <button
              className="btn btn-primary"
              onClick={() => props.history.push("/admin/nguyenlieu/them")}
            >
              Thêm
              <i class="fas fa-plus-circle"></i>
            </button>
          </BtnRight>
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
          <FilterSection>
            <TitleWrapper>
              <Title>Tất cả nguyên liệu</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/nguyenlieu/them")}
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
                  placeholder="Tim nguyên liệu theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableNguyenlieu
                dsNguyenlieu={search(dsNguyenlieu)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Nguyenlieu;
