import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import TableGSV from "./tables/TableGSV";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiGSV from "../../axios/apiGSV";
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

const GSV = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "cmnd", "taikhoan", "email"]);
  const [dsGsv, setDsGsv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsGsv = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.dsGsv();
    //console.log(data);
    setDsGsv(
      gsv && gsv.length
        ? gsv.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsGsv) => {
    return (
      dsGsv &&
      dsGsv.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsGsv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Giám sát vùng" />
        <Content>
<<<<<<< HEAD
          <BtnRight>
            <AddButton
              className="btn btn-primary"
              onClick={() => props.history.push("/admin/gsv/them")}
            >
              <span>Thêm</span>
              <i class="fas fa-plus-circle"></i>
            </AddButton>
          </BtnRight>
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách giám sát vùng</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/gsv/them")}
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
                  placeholder="Tim giám sát vùng theo tên đại diện, số điện thoại, cmnd và tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableGSV dsGsv={search(dsGsv)} setRowsRemoved={setRowsRemoved} />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default GSV;
