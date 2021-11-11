import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackdropMaterial from "../../../components/BackdropMaterial";
import TableTiendo from "../tables/subtables/TableTiendo";

const Tiendo = ({ hodanId, setActive }) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ten", "noidung", "sanpham"]);
  const [loading, setLoading] = useState(false);
  const [dsTiendo, setDsTiendo] = useState([]);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsTiendo = async () => {
    //
  };

  const search = (dsTiendo) => {
    return (
      dsTiendo &&
      dsTiendo.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsTiendo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <FilterSection>
          <TitleWrapper>
            <Title>Danh sách tiến độ</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim tiến độ theo tên, công dụng"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>

          <TableSection>
            <TableTiendo dsTiendo={search(dsTiendo)} setActive={setActive} />
          </TableSection>
        </FilterSection>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const FilterSection = styled.div`
  background: #fff;
  height: 10vh;
`;
const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
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
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
    }
  }
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
  th:first-child {
    display: none;
  }
  td:first-child {
    display: none;
  }
`;

export default Tiendo;
