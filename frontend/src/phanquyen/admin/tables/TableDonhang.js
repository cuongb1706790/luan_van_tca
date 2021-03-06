import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useHistory } from "react-router-dom";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { formatMoney, getComparator } from "../../../utils";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsDonhang } from "./headCells";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import DialogMaterial from "../../../components/DialogMaterial";
import TableButton from "../../../components/TableButton";
import { toast } from "react-toastify";
<<<<<<< HEAD
<<<<<<< HEAD
import apiLoaiSanpham from "../../../axios/apiLoaiSanpham";
=======
import apiDonhang from "../../../axios/apiDonhang";
import { Link } from "react-router-dom";
>>>>>>> khanhduy
=======
import apiDonhang from "../../../axios/apiDonhang";
import { Link } from "react-router-dom";
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

const EnhancedTableToolbar = ({
  numSelected,
  rowsSelected,
  onClickChitiet,
  onClickCapnhat,
  onClickXoa,
}) => {
  return numSelected > 0 ? (
    <>
      <Toolbar
        sx={{
          pl: { sm: 7 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            <div className="d-flex align-items-center">
              {rowsSelected.length === 1 ? (
                <>
                  <TableButton onClick={onClickChitiet}>Chi ti???t</TableButton>
                  <TableButton onClick={onClickCapnhat}>C???p nh???t</TableButton>
                  <TableButton onClick={onClickXoa}>X??a</TableButton>
                </>
              ) : (
                <TableButton onClick={onClickXoa}>X??a</TableButton>
              )}
            </div>
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
      </Toolbar>
    </>
  ) : null;
};

const TableDonhang = ({ dsDonhang = [], setRowsRemoved }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickChitiet = () =>
    history.push(`/admin/donhang/chitiet/${selected[0]}`);

  const onClickCapnhat = () =>
    history.push(`/admin/donhang/chinhsua/${selected[0]}`);

  const onClickXoa = () => handleOpen();

  const handleDeleteRow = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
    const { success } = await apiLoaiSanpham.xoaNhieuLoaiSanpham({
=======
    const { success } = await apiDonhang.xoaNhieuDonhang({
>>>>>>> khanhduy
=======
    const { success } = await apiDonhang.xoaNhieuDonhang({
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
      arrOfIds: selected,
    });
    if (success) {
      toast.success("X??a th??nh c??ng!", { theme: "colored" });
      setRowsRemoved(true);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsDonhang.map((item) => item._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsDonhang.length) : 0;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            rowsSelected={selected}
            onClickChitiet={onClickChitiet}
            onClickCapnhat={onClickCapnhat}
            onClickXoa={onClickXoa}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
              id="tableMaterial"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={dsDonhang.length}
                headCells={headCellsDonhang}
              />
              <TableBody>
                {dsDonhang
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
<<<<<<< HEAD
<<<<<<< HEAD
                        <TableCell align="right">{row.ma}</TableCell>
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                        <TableCell align="right">
                          <Link to={`/admin/donhang/chitiet/${row._id}`}>
                            {row.ma}
                          </Link>
                        </TableCell>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                        <TableCell align="right">{row.tongsanpham}</TableCell>
                        <TableCell align="right">{row.tongcongcu}</TableCell>
                        <TableCell align="right">{row.tongvattu}</TableCell>
                        <TableCell align="right">
                          {row.tongnguyenlieu}
                        </TableCell>
                        <TableCell align="right">
                          {formatMoney(row.tongdongia)}
                        </TableCell>
                        <TableCell align="right">{row.ngaytao}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={dsDonhang.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            component="div"
          />
        </Paper>
      </Box>

      <DialogMaterial
        open={open}
        onClose={handleClose}
<<<<<<< HEAD
<<<<<<< HEAD
        title="X??a s???n ph???m l??ng ngh???"
        content="B???n ch???c x??a s???n ph???m l??ng ngh??? n??y ch????"
=======
        title="X??a ????n h??ng"
        content="B???n ch???c x??a ????n h??ng n??y ch????"
>>>>>>> khanhduy
=======
        title="X??a ????n h??ng"
        content="B???n ch???c x??a ????n h??ng n??y ch????"
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        text1="H???y"
        text2="X??a"
        onClick1={handleClose}
        onClick2={handleDeleteRow}
      />
    </>
  );
};

export default TableDonhang;
