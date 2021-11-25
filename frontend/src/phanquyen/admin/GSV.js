import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import TableGSV from "./tables/TableGSV";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiGSV from "../../axios/apiGSV";

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
          <BtnRight>
            <button
              className="btn btn-primary px-4"
              onClick={() => props.history.push("/admin/gsv/them")}
            >
              Thêm
            </button>
          </BtnRight>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách giám sát vùng</Title>
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
  font-family: "Roboto", sans-serif;
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

export default GSV;
