import React from "react";
import TableSanpham from "./tables/TableSanpham";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import {
<<<<<<< HEAD
  BtnRight,
=======
  AddButton,
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

import apiSanpham from "../../axios/apiSanpham";

const Sanpham = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma", "ten", "loai", "nhanhieu"]);
  const [loading, setLoading] = React.useState(false);
  const [dsSanpham, setDsSanpham] = React.useState([]);
  const [rowsRemoved, setRowsRemoved] = React.useState(false);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { sanpham } = await apiSanpham.dsSanpham();
    setDsSanpham(sanpham);
    setLoading(false);
  };

  const search = (dsSanpham) => {
    return (
      dsSanpham &&
      dsSanpham.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    setRowsRemoved(false);
    fetchDsSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Sản phẩm" />

        <Content>
<<<<<<< HEAD
          <BtnRight>
            <button
              className="btn btn-primary px-3"
              onClick={() => props.history.push("/admin/sanpham/them")}
            >
              Thêm
              <i class="fas fa-plus-circle"></i>
            </button>
          </BtnRight>
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
          <FilterSection>
            <TitleWrapper>
              <Title>Tất cả sản phẩm</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/sanpham/them")}
              >
                <span>Thêm</span>
                <i class="fas fa-plus-circle"></i>
              </AddButton>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm sản phẩm theo tên, loại, nhãn hiệu"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableSanpham
                dsSanpham={search(dsSanpham)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Sanpham;
