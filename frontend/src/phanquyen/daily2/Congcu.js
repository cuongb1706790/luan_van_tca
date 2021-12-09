import React, { useEffect, useState } from "react";
import TableCongcu from "./tables/TableCongcu";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackdropMaterial from "../../components/BackdropMaterial";
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
import Header from "../../components/Header";
import apiDaily2 from "../../axios/apiDaily2";
import ModalHuloi from "../../components/ModalHuloi";

const Congcu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  //-------------------------
  const [open, setOpen] = useState(false);
  const [dsCongcuHuloiShow, setDsCongcuHuloiShow] = useState([]);
  const [dsCongcuHuloi, setDsCongcuHuloi] = useState([]);
  const [daily2Info, setDaily2Info] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dscongcu",
  });

  const handleClick = async () => {
    const { success } = await apiDaily2.themCongcuHuloi(daily2Info._id, {
      dsccLoi: dsCongcuHuloi,
    });
    if (success) {
      setOpen(false);
      toast.success("Thêm thành công!", { theme: "colored" });
      fetchDsCongcu();
    }
  };

  const fetchDsCongcu = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { dscongcu } = await apiDaily2.dsCongcu(daily2._id);
    dscongcu = dscongcu.map((cc) => ({
      ...cc.congcu,
      ...cc,
    }));
    let { dscongcuhuloi } = await apiDaily2.dsCongcuHuloi(daily2._id);
    dscongcuhuloi = dscongcuhuloi.map((cc) => ({
      ...cc.congcu,
      ...cc,
    }));
    setDaily2Info(daily2);
    setDsCongcuHuloiShow(dscongcuhuloi);
    setDsCongcu(dscongcu);
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
<<<<<<< HEAD
<<<<<<< HEAD
      <Wrapper>
=======
      <Container>
>>>>>>> khanhduy
=======
      <Container>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        <Header title="Công cụ" />
        <Content>
          <div className="text-right mb-3">
            {active.code === 1 ? (
              <button
                className="btn btn-primary px-4"
                onClick={() => setActive({ code: 2, present: "dscongcuhuloi" })}
              >
                Hư lỗi
              </button>
            ) : (
              <button
                className="btn btn-primary px-3"
                onClick={() => setActive({ code: 1, present: "dscongcu" })}
              >
                Danh sách
              </button>
            )}
          </div>
          <FilterSection>
            <TitleWrapper className="d-flex justify-content-between align-items-center">
              <Title>
                {active.code === 1
                  ? "Danh sách công cụ"
                  : "Danh sách công cụ hư lỗi"}
              </Title>
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

<<<<<<< HEAD
<<<<<<< HEAD
            <TableSection>
=======
            <TableSection className="noCheckbox">
>>>>>>> khanhduy
              <TableCongcu dsCongcu={search(dsCongcu)} />
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
                <TableCongcu
                  dsCongcu={search(dsCongcu)}
                  setOpen={setOpen}
                  setDsCongcuHuloi={setDsCongcuHuloi}
                />
              </TableSection>
            ) : active.code === 2 ? (
              <TableSection className="noCheckbox">
                <TableCongcu dsCongcu={dsCongcuHuloiShow} dscongcuhuloi />
              </TableSection>
            ) : null}
          </FilterSection>
        </Content>
      </Container>

      <ModalHuloi
        type="congcu"
        open={open}
        setOpen={setOpen}
        dsCongcuHuloi={dsCongcuHuloi}
        setDsCongcuHuloi={setDsCongcuHuloi}
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
export default Congcu;
