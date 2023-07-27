// @mui
import {
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function TableSkeleton() {
  let array = Array.from({ length: 4 }, (v, i) => i);
  let arrayRow = Array.from({ length: 5 }, (v, i) => i);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Stack spacing={1} direction="row" alignItems="center">
              {array.map((item, index) => (
                <Skeleton key={index} variant="text" width={290} height={30} />
              ))}
            </Stack>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {arrayRow.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Stack spacing={2} direction="row" alignItems="center">
                {array.map((item, index) => (
                  <Skeleton key={index} variant="text" width={290} height={30} />
                ))}
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
