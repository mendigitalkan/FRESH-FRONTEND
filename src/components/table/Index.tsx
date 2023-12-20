/* eslint-disable @typescript-eslint/no-explicit-any */
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/material'

export interface ITableTypes {
  data: any[]
  rows: any[]
  page: number
  rowsPerPage: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  tableOption?: any
}

export default function TableStyle(props: ITableTypes) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Box my={2}>{props.tableOption}</Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {props.rows.map((header, index) => {
                return (
                  <TableCell
                    key={index}
                    align={'left'}
                    style={{
                      fontSize: 'medium',
                      fontWeight: 'bold'
                    }}
                  >
                    {header.title}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((item, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  {props.rows.map((row, id) => row.data(item, id))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={props.data.length}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onPageChange={props.handleChangePage}
        onRowsPerPageChange={props.handleChangeRowsPerPage}
      />
    </Paper>
  )
}
