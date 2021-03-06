import React, { useEffect, useState } from "react";
import TableNguyenlieu from "./tables/TableNguyenlieu";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiBophankd from "../../axios/apiBophankd";
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
  const [bpkdInfo, setBpkdInfo] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dsnguyenlieu",
  });

  const handleClick = async () => {
    const { success } = await apiBophankd.themNguyenlieuHuloi(bpkdInfo._id, {
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
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    let { dsnguyenlieu } = await apiBophankd.bophankdDSNguyenlieu(bophankd._id);
    dsnguyenlieu = dsnguyenlieu.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
    }));
    let { dsnguyenlieuhuloi } = await apiBophankd.dsNguyenlieuHuloi(
      bophankd._id
    );
    dsnguyenlieuhuloi = dsnguyenlieuhuloi.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
    }));
    setBpkdInfo(bophankd);
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
      <Container>
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
            <TableSection className="noCheckbox">
              <TableNguyenlieu dsNguyenlieu={search(dsNguyenlieu)} />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
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

export default Nguyenlieu;
