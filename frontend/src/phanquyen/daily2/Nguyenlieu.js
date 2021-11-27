import React, { useEffect, useState } from "react";
import TableNguyenlieu from "./tables/TableNguyenlieu";
import { useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";
import {
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";
import Header from "../../components/Header";
import apiDaily2 from "../../axios/apiDaily2";

const Nguyenlieu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "donvitinh"]);
  const [loading, setLoading] = useState(false);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsNguyenlieu = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { dsnguyenlieu } = await apiDaily2.dsNguyenlieu(daily2._id);
    dsnguyenlieu = dsnguyenlieu.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
    }));
    setDsNguyenlieu(dsnguyenlieu);
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
    fetchDsNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Nguyên liệu" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách nguyên liệu</Title>
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

            <TableSection className="noCheckbox">
              <TableNguyenlieu dsNguyenlieu={search(dsNguyenlieu)} />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Nguyenlieu;
