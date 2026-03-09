import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Modal, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateHomeCategoryForm from "./UpdateHomeCategoryForm";

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

function HomeCategoryTable({categories}) {
  const [selectedCategory, setSelectedCategory] =
    React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (category) => () => {
    setSelectedCategory(category);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>image</StyledTableCell>
              <StyledTableCell align="right">category</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map(
              (category, index) => (
                <StyledTableRow key={category.categoryId}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {category.id}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <img
                      className="w-20 rounded-md"
                      src={category.image}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right" component="th" scope="row">
                    {category.categoryId}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <IconButton onClick={handleOpen(category)}>
                      <EditIcon className="text-orange-400 cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateHomeCategoryForm
            category={selectedCategory}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
}


export default HomeCategoryTable