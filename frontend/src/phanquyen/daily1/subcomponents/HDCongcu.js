import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiHodan from "../../../axios/apiHodan";
import BackdropMaterial from "../../../components/BackdropMaterial";
import ModalChitietCongcu from "../../../components/ModalChitietCongcu";
import TableCongcu from "../tables/subtables/TableCongcu";

const HDCongcu = ({ hodanId }) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "bophankd", "daily2"]);
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [congcu, setCongcu] = useState(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchDsCongcu = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodan(hodanId);
    const { dscongcu } = await apiHodan.dsCongcu(hodan._id);
    setDsCongcu(
      dscongcu && dscongcu.length
        ? dscongcu.map((item) => ({
            ...item,
            ten: item.congcu.ten,
            bophankd: item.phanphat.from.bophankd.ten,
            daily2: item.phanphat.to.daily2.ten,
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsCongcu) => {
    return (
      dsCongcu &&
      dsCongcu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    fetchDsCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <FilterSection>
          <TitleWrapper>
            <Title>Danh sách công cụ</Title>
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
            <TableCongcu
              dsCongcu={search(dsCongcu)}
              handleOpenModal={handleOpenModal}
              setCongcu={setCongcu}
            />
          </TableSection>
        </FilterSection>
      </Wrapper>

      <ModalChitietCongcu
        open={modalOpen}
        onClose={handleCloseModal}
        congcu={congcu}
      />
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
  table {
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
  }
`;

export default HDCongcu;
