import { TableRow, TableCell, Skeleton, Stack } from "@mui/material";

function CategoryTableSkeleton() {
    return (
        <TableRow>
            {/* noteEn + noteAr */}
            <TableCell>
                <Skeleton width={120} height={28} />
                <Skeleton width={100} height={20} />
            </TableCell>

            {/* link */}
            <TableCell>
                <Skeleton width={200} height={22} />
            </TableCell>

            {/* image button OR text */}
            <TableCell>
                <Skeleton variant="rectangular" width={70} height={28} sx={{ borderRadius: 1 }} />
            </TableCell>

            {/* status chip */}
             <TableCell>
                <Skeleton variant="rectangular" width={76} height={23} sx={{ borderRadius: 4 }} />
            </TableCell>

            {/* createdAt */}
            <TableCell>
                <Skeleton width={80} height={22} />
            </TableCell>

            {/* action buttons */}
            <TableCell align="center">
                <Stack
                    direction="row"
                    spacing={.5}
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
