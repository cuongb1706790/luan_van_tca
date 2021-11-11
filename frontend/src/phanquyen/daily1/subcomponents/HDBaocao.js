import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackdropMaterial from "../../../components/BackdropMaterial";
import ModalChitietBaocao from "../../../components/ModalChitietBaocao";
import TableBaocao from "../tables/subtables/TableBaocao";

const HDBaocao = ({ payload: tiendoId, setActive }) => {
  const [loading, setLoading] = useState(false);
  const [singleTiendo, setSingleTiendo] = useState(null);
  const [dsBaocao, setDsBaocao] = useState([]);
  const [singleBaocao, setSingleBaocao] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const onClickGetBaocao = async (baocaoId) => {
    //
  };

  const fetchDsTiendo = async () => {
    //
  };

  useEffect(() => {
    fetchDsTiendo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <TitleBack
          TitleBack
          onClick={() => {
            setActive({
              code: 3,
              present: "tiendo",
              payload: "",
            });
          }}
        >
          <i class="fas fa-angle-left"></i>
          <span>Quay lại danh sách tiến độ</span>
        </TitleBack>
        <FilterSection>
          <TitleWrapper>
            <Title>Danh sách báo cáo - tiến độ "{singleTiendo?.ten}"</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim báo cáo theo tên, công dụng"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>

          <TableSection>
            <TableBaocao
              dsBaocao={dsBaocao}
              tiendoId={tiendoId}
              onClickGetBaocao={onClickGetBaocao}
            />
          </TableSection>
        </FilterSection>
      </Wrapper>

      <ModalChitietBaocao
        open={modalOpen}
        onClose={handleCloseModal}
        baocao={singleBaocao}
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
const TitleBack = styled.h5`
  margin-top: -10px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  font-family: "Poppins", sans-serif;
  i {
    color: rgba(0, 0, 0, 0.35);
    margin-right: 10px;
    font-size: 20px;
  }
`;

export default HDBaocao;
