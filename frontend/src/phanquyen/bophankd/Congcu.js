import React, { useEffect, useState } from "react";
import TableCongcu from "./tables/TableCongcu";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import {
<<<<<<< HEAD
  BtnRight,
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
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
  const [bpkdInfo, setBpkdInfo] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dscongcu",
  });

  const handleClick = async () => {
    const { success } = await apiBophankd.themCongcuHuloi(bpkdInfo._id, {
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
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    let { dscongcu } = await apiBophankd.bophankdDSCongcu(bophankd._id);
    dscongcu = dscongcu.map((cc) => ({
      ...cc.congcu,
      ...cc,
    }));
    let { dscongcuhuloi } = await apiBophankd.dsCongcuHuloi(bophankd._id);
    dscongcuhuloi = dscongcuhuloi.map((cc) => ({
      ...cc.congcu,
      ...cc,
    }));
    setBpkdInfo(bophankd);
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
      <Container>
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
            <TableSection className="noCheckbox">
              <TableCongcu dsCongcu={search(dsCongcu)} />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
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

export default Congcu;
