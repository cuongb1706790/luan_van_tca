import React from "react";
import styled from "styled-components";
import apiDaily2 from "../../../axios/apiDaily2";
import BackdropMaterial from "../../../components/BackdropMaterial";
import TablePhanphatDen2 from "../tables/subtables/TablePhanphatDen2";

const DL2VattuPhanphat = ({ daily2Id, setActive }) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["bophankd", "daily1", "hodan"]);
  const [loading, setLoading] = React.useState(false);
  const [dsPhanphat, setDsPhanphat] = React.useState([]);
  const fetchDsPhanphat = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2(daily2Id);
    const { dsphanphat } = await apiDaily2.dsVattuPhanphat(daily2._id);
    setDsPhanphat(
      dsphanphat && dsphanphat.length
        ? dsphanphat.map((item) => ({
            ...item,
            bophankd: item.phanphat.from.bophankd.ten,
            daily1: item.phanphat.to.daily1.ten,
            hodan: item.phanphat.to.hodan.daidien,
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsPhanphat) => {
    return (
      dsPhanphat &&
      dsPhanphat.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    fetchDsPhanphat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <FilterSection>
        <TitleWrapper>
          <Title>Tất cả phiên phân phát</Title>
        </TitleWrapper>
        <Filter>
          <SearchBox>
            <i class="fas fa-search"></i>
            <input
              type="text"
              placeholder="Tim công cụ theo tên, công dụng"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchBox>
        </Filter>
        <TableSection>
          <TablePhanphatDen2
            dsPhanphat={search(dsPhanphat)}
            setActive={setActive}
          />
        </TableSection>
      </FilterSection>
    </Wrapper>
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

export default DL2VattuPhanphat;
