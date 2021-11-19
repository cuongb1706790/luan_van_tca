import React, { useEffect, useState } from "react";
import TableDaily2 from "./tables/TableDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiDaily1 from "../../axios/apiDaily1";
import styled from "styled-components";
import Header from "../../components/Header";

const Daily2 = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsDaily2, setDsDaily2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchData = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const { daily2 } = await apiDaily1.dsDaily2(daily1._id);
    setDsDaily2(daily2 && daily2.length ? daily2 : []);
    setLoading(false);
  };

  const search = (dsDaily2) => {
    return (
      dsDaily2 &&
      dsDaily2.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Đại lý cấp 2" />
        <Content>
          <BtnRight>
            <button
              className="btn btn-primary px-4"
              onClick={() => props.history.push("/daily1/daily2/them")}
            >
              Thêm
            </button>
          </BtnRight>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đại lý cấp 2</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm đại lý theo tên, số điện thoại, email và tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableDaily2
                dsDaily2={search(dsDaily2)}
                setRowsRemoved={setRowsRemoved}
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
  font-family: "Poppins", sans-serif;
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
`;

export default Daily2;
