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
import { MemberEntity } from "../github-members-list.vm";

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
    members: MemberEntity[];
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

export const MemberList: React.FC<Props> = (props) => {
    const {members} = props;
  return (
    <>
      <Table sx={{ width: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Avatar</StyledTableCell>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members &&
            members.length > 0 &&
            members.map((member) => (
              <StyledTableRow key={member.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  <img src={member.avatarUrl} />
                </StyledTableCell>
                <StyledTableCell align="center">{member.id}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/detail/${member.login}`}>{member.login}</Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
