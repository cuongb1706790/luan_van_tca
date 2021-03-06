import React from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
<<<<<<< HEAD
<<<<<<< HEAD
import styled from "styled-components";
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import {
  AddButton,
  BtnRight,
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";

<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import TableDonhang from "./tables/TableDonhang";
import apiDonhang from "../../axios/apiDonhang";

const Donhang = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma", "ten", "mota"]);
  const [loading, setLoading] = React.useState(false);
  const [dsDonhang, setDsDonhang] = React.useState([]);
  const [rowsRemoved, setRowsRemoved] = React.useState(false);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.allDsDonhang();
    setDsDonhang(donhang);
    setLoading(false);
  };

  const search = (dsSanpham) => {
    return (
      dsSanpham &&
      dsSanpham.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    setRowsRemoved(false);
    fetchDsSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
      <Wrapper>
        <Header title="Đơn hàng" />
        <Content>
          <BtnRight>
            <button
              className="btn btn-primary px-4"
              onClick={() => props.history.push("/admin/donhang/them")}
            >
              Thêm
            </button>
=======
      <Container>
        <Header title="Đơn hàng" />
        <Content>
          <BtnRight>
            <AddButton
              className="btn btn-primary"
              onClick={() => props.history.push("/admin/donhang/them")}
            >
              <span>Thêm</span>
              <i class="fas fa-plus-circle"></i>
            </AddButton>
>>>>>>> khanhduy
          </BtnRight>
=======
      <Container>
        <Header title="Đơn hàng" />
        <Content>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đơn hàng</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/donhang/them")}
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
                  placeholder="Tìm đơn hàng theo mã"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableDonhang
                dsDonhang={dsDonhang}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
<<<<<<< HEAD
<<<<<<< HEAD
      </Wrapper>
=======
      </Container>
>>>>>>> khanhduy
=======
      </Container>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
    </>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
`;
const BtnRight = styled.div`
  text-align: right;
  background-color: #fff;
  margin-bottom: 16px;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
`;

const FilterSection = styled.div`
  background: #fff;
`;
const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
  font-family: "Poppins", sans-serif;
  display: inline-block;
  border-bottom: 2px solid #1e93e8;
`;
const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Filter = styled.div`
  background: #fff;
  padding: 14px 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const SearchBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 50%;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(0, 0, 0, 0.35);
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #182537;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      font-family: "Poppins", sans-serif;
    }
  }
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

=======
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
export default Donhang;
