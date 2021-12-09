import React, { useEffect, useState } from "react";
import TableNguyenlieu from "./tables/TableNguyenlieu";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackdropMaterial from "../../components/BackdropMaterial";
<<<<<<< HEAD
<<<<<<< HEAD
import styled from "styled-components";
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
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
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import Header from "../../components/Header";
import apiDaily1 from "../../axios/apiDaily1";
import ModalHuloi from "../../components/ModalHuloi";

const Nguyenlieu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "donvitinh"]);
  const [loading, setLoading] = useState(false);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  //---------------
  const [open, setOpen] = useState(false);
  const [dsNguyenlieuHuloiShow, setDsNguyenlieuHuloiShow] = useState([]);
  const [dsNguyenlieuHuloi, setDsNguyenlieuHuloi] = useState([]);
  const [daily1Info, setDaily1Info] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dsnguyenlieu",
  });

  const handleClick = async () => {
    const { success } = await apiDaily1.themNguyenlieuHuloi(daily1Info._id, {
      dsnglLoi: dsNguyenlieuHuloi,
    });
    if (success) {
      setOpen(false);
      toast.success("Thêm thành công!", { theme: "colored" });
      fetchDsNguyenlieu();
    }
  };

  const fetchDsNguyenlieu = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { dsnguyenlieu } = await apiDaily1.dsNguyenlieu(daily1._id);
    dsnguyenlieu = dsnguyenlieu.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
    }));
    let { dsnguyenlieuhuloi } = await apiDaily1.dsNguyenlieuHuloi(daily1._id);
    dsnguyenlieuhuloi = dsnguyenlieuhuloi.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
    }));
    setDaily1Info(daily1);
    setDsNguyenlieuHuloiShow(dsnguyenlieuhuloi);
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
<<<<<<< HEAD
<<<<<<< HEAD
      <Wrapper>
=======
      <Container>
>>>>>>> khanhduy
=======
      <Container>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        <Header title="Nguyên liệu" />
        <Content>
          <div className="text-right mb-3">
            {active.code === 1 ? (
              <button
                className="btn btn-primary px-4"
                onClick={() =>
                  setActive({ code: 2, present: "dsnguyenlieuhuloi" })
                }
              >
                Hư lỗi
              </button>
            ) : (
              <button
                className="btn btn-primary px-3"
                onClick={() => setActive({ code: 1, present: "dsnguyenlieu" })}
              >
                Danh sách
              </button>
            )}
          </div>
          <FilterSection>
            <TitleWrapper>
              <Title>
                {active.code === 1
                  ? "Danh sách nguyên liệu"
                  : "Danh sách nguyên liệu hư lỗi"}
              </Title>
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

<<<<<<< HEAD
<<<<<<< HEAD
            <TableSection>
=======
            <TableSection className="noCheckbox">
>>>>>>> khanhduy
              <TableNguyenlieu dsNguyenlieu={search(dsNguyenlieu)} />
            </TableSection>
          </FilterSection>
        </Content>
<<<<<<< HEAD
      </Wrapper>
=======
      </Container>
>>>>>>> khanhduy
=======
            {active.code === 1 ? (
              <TableSection>
                <TableNguyenlieu
                  dsNguyenlieu={search(dsNguyenlieu)}
                  setOpen={setOpen}
                  setDsNguyenlieuHuloi={setDsNguyenlieuHuloi}
                />
              </TableSection>
            ) : active.code === 2 ? (
              <TableSection className="noCheckbox">
                <TableNguyenlieu
                  dsNguyenlieu={dsNguyenlieuHuloiShow}
                  dsnguyenlieuhuloi
                />
              </TableSection>
            ) : null}
          </FilterSection>
        </Content>
      </Container>

      <ModalHuloi
        type="nguyenlieu"
        open={open}
        setOpen={setOpen}
        dsNguyenlieuHuloi={dsNguyenlieuHuloi}
        setDsNguyenlieuHuloi={setDsNguyenlieuHuloi}
        onClick={handleClick}
      />
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
  th:first-child,
  td:first-child {
    display: none;
  }
`;

=======
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
export default Nguyenlieu;
