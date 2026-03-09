import { Box, IconButton, Modal, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import EditIcon from '@mui/icons-material/Edit';
import { deleteDeal, getAllDeals } from '../../../Redux Toolkit/Admin/DealSlice';
import UpdateDealForm from './UpdateDealForm';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)"));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width,
  bgcolor: "background.paper",

  boxShadow,
  p: 4,
};
const DealsTable = () => {
  const { homePage,deal } = useAppSelector(store => store)
  const [selectedDealId, setSelectedDealId] = useState();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch()


  const handleOpen = (id) => () => {
    setSelectedDealId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = (id) => () => {
    dispatch(deleteDeal(id))
  }
  useEffect(() => {
    dispatch(getAllDeals())
  }, [])
  return (
    <>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>image</StyledTableCell>
              <StyledTableCell >category</StyledTableCell>
              <StyledTableCell >Discount</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deal.deals.map(
              (deal, index) => (
                <StyledTableRow key={deal.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <img
                      className="w-20 rounded-md"
                      src={deal.category.image}
                      alt=""
                    />
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {deal.category.categoryId}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {deal.discount}%
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <IconButton onClick={handleOpen(deal.id)}>
                      <EditIcon className="text-orange-400 cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={handleDelete(deal.id)}>
                      
                      <DeleteIcon className="text-red-600 cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>

                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedDealId && <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateDealForm id={selectedDealId} />
        </Box>
      </Modal>}


    </>
  )
}

export default DealsTable