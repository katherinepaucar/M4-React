import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Character} from "./../rick-and-morty-characters.vm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
interface Props{
  characters: Character[];
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const CharacterTableList: React.FC<Props> = (props) => {
    const {characters} = props;
  return (
    <>
      <Table sx={{ width: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters &&
            characters.length > 0 &&
            characters.map((character) => (
              <StyledTableRow key={character.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  <img src={character.image} />
                </StyledTableCell>
                <StyledTableCell align="center">{character.id}</StyledTableCell>
                <StyledTableCell align="center">{character.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/character-detail/${character.id}`}>{character.name}</Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
