import { TableRow, TableCell, Skeleton, Stack } from "@mui/material";

function CategoryTableSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton width={80} height={30} />
                <Skeleton width={60} height={18} />
            </TableCell>
            <TableCell>
                <Skeleton width={25} height={28} />
            </TableCell>
            <TableCell>
                <Skeleton variant="rectangular" width={76} height={23} sx={{ borderRadius: 4 }} />
            </TableCell>
            <TableCell>
                <Skeleton width={80} height={22} />
            </TableCell>
            <TableCell align="center">
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                >
                    <Skeleton variant="circular" width={25} height={25} sx={{  }}  />
                    <Skeleton variant="circular" width={25} height={25} sx={{mx:"15px !important"}} />
                    <Skeleton variant="circular" width={25} height={25} sx={{}} />
            </Stack>
            </TableCell>
        </TableRow>
    );
}

export default CategoryTableSkeleton;
