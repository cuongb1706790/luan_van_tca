import React from "react";
import TableDaily1 from "./tables/TableDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header";

const Daily1 = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ten", "sdt", "email", "taikhoan"]);
  const [loading, setLoading] = React.useState(false);
  const [dsDaily1, setDsDaily1] = React.useState([]);
  const [bophankdInfo, setbophankdInfo] = React.useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [success, setSuccess] = React.useState(false);

  const fetchDsDaily1 = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const {
      daily1: { daily1 },
    } = await apiBophankd.bophankdDsDaily1(bophankd._id);
    setDsDaily1(daily1 && daily1.length ? daily1 : []);
    setbophankdInfo(bophankd);
    setLoading(false);
  };

  const search = (dsDaily1) => {
    return (
      dsDaily1 &&
      dsDaily1.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    setSuccess(false);
    fetchDsDaily1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Đại lý cấp 1" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đại lý cấp 1</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim đại lý theo tên, số điện thoại, email và tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableDaily1
                dsDaily1={search(dsDaily1)}
                setSuccess={setSuccess}
                bophankdId={bophankdInfo._id}
                setRefresh={props.setRefresh}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Wrapper>
    </>
  );
};

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
  th:first-child {
    display: none;
  }
  td:first-child {
    display: none;
  }
`;

export default Daily1;
