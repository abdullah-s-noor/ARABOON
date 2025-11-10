import { TableRow, TableCell, Skeleton, Stack } from "@mui/material";

export default function UserTableSkeleton() {
    return (
        <TableRow>
            {/* Avatar */}
            <TableCell>
                <Skeleton variant="circular" width={40} height={40} />
            </TableCell>

            {/* Display Name */}
            <TableCell>
                <Skeleton width={120} height={22} />
            </TableCell>

            {/* Username */}
            <TableCell>
                <Skeleton width={100} height={20} />
            </TableCell>

            {/* Email */}
            <TableCell>
                <Skeleton width={160} height={20} />
            </TableCell>

            {/* Role Chip */}
            <TableCell>
                <Skeleton
                    variant="rounded"
                    width={70}
                    height={26}
                    sx={{ borderRadius: "12px" }}
                />
            </TableCell>

            {/* Status Chip */}
            <TableCell>
                <Skeleton
                    variant="rounded"
                    width={90}
                    height={26}
                    sx={{ borderRadius: "12px" }}
                />
            </TableCell>

            {/* Created At */}
            <TableCell>
                <Skeleton width={100} height={20} />
            </TableCell>

            {/* Last Login */}
            <TableCell>
                <Skeleton width={90} height={20} />
            </TableCell>

            {/* Actions */}
            <TableCell align="center">
                <Stack direction="row" gap={2} justifyContent="center">
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="circular" width={24} height={24} />
                </Stack>
            </TableCell>
        </TableRow>
    );
}
