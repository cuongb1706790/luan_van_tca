import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import apiHodan from "../../../axios/apiHodan";
import BackdropMaterial from "../../../components/BackdropMaterial";
import ModalChitietCongcu from "../../../components/ModalChitietCongcu";
import ButtonMaterial from "../../../components/ButtonMaterial";
import TablePhanphatChitiet from "../tables/subtables/TablePhanphatChitiet";
import InputText from "../../../components/InputText";

const HDCongcuPPChitiet = ({ payload: phanphatId, hodanId, setActive }) => {
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [dsCongcu, setDsCongcu] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [congcu, setCongcu] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOpenModal = async () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchSinglePhanphat = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodan(hodanId);
    const { phanphat } = await apiHodan.singlePhanphat(hodan._id, phanphatId);
    setPhanphat(phanphat);
    setBophankdInfo(phanphat.phanphat.from.bophankd);
    setHodanInfo(phanphat.phanphat.to.hodan);
    setDaily1Info(phanphat.phanphat.to.daily1);
    setDsCongcu(phanphat.phanphat.items);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchSinglePhanphat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

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
              code: 4,
              present: "congcupp",
              payload: "",
            });
          }}
        >
          <i class="fas fa-angle-left"></i>
          <span>Quay lại danh sách phân phát</span>
        </TitleBack>
        <Section>
          <div className="row">
            <div className="col-lg-4">
              <Title>Bộ phận kinh doanh</Title>
              <FormGroup>
                <InputText label="Tên bên cấp" value={bophankdInfo?.ten} />
              </FormGroup>

              <FormGroup>
                <InputText label="Số điện thoại" value={bophankdInfo?.sdt} />
              </FormGroup>

              <FormGroup>
                <InputText label="E-mail" value={bophankdInfo?.email} />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Địa chỉ"
                  rows={5}
                  multiline
                  value={bophankdInfo?.diachi}
                />
              </FormGroup>
            </div>
            <div className="col-lg-4">
              <Title>Đại lý cấp 1</Title>
              <FormGroup>
                <InputText label="Tên bên cấp" value={daily1Info?.ten} />
              </FormGroup>

              <FormGroup>
                <InputText label="Số điện thoại" value={daily1Info?.sdt} />
              </FormGroup>

              <FormGroup>
                <InputText label="E-mail" value={daily1Info?.email} />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Địa chỉ"
                  rows={5}
                  multiline
                  value={daily1Info?.diachi}
                />
              </FormGroup>
            </div>
            <div className="col-lg-4">
              <Title>Đại lý cấp 2</Title>
              <FormGroup>
                <InputText label="Tên đại lý nhận" value={hodanInfo?.daidien} />
              </FormGroup>

              <FormGroup>
                <InputText label="Số điện thoại" value={hodanInfo?.sdt} />
              </FormGroup>

              <FormGroup>
                <InputText label="CMND" value={hodanInfo?.cmnd} />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Địa chỉ"
                  rows={5}
                  multiline
                  value={hodanInfo?.diachi}
                />
              </FormGroup>
            </div>
          </div>
        </Section>

        <Section>
          <Title style={{ textAlign: "left" }}>Danh sách công cụ</Title>
          <TableSection>
            <TablePhanphatChitiet
              dsCongcu={dsCongcu}
              phanphat={phanphat}
              setCongcu={setCongcu}
              handleOpenModal={handleOpenModal}
            />
          </TableSection>
        </Section>
        <ButtonRight>
          {phanphat?.daxacnhan ? (
            <ButtonMaterial variant="outlined">
              <CheckIcon /> Đã xác nhận
            </ButtonMaterial>
          ) : (
            <ButtonMaterial variant="contained">Xác nhận</ButtonMaterial>
          )}
        </ButtonRight>
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
const Section = styled.div`
  padding: 26px;
  background: #fff;
  margin-bottom: 20px;
`;
const Title = styled.h6`
  text-align: center;
  margin-bottom: 20px;
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
  input,
  textarea {
    font-family: "Poppins", sans-serif;
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
const ButtonRight = styled.div`
  text-align: right;
  padding: 20px;
  background-color: #fff;
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

export default HDCongcuPPChitiet;
