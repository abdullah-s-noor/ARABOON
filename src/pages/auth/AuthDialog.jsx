import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    useTheme,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Lock, Person, FlashAuto } from "@mui/icons-material"
import { Zap } from "lucide-react"
import Register from "../../components/auth/register/Register"
import Login from "../../components/auth/login/Login"
import { styles } from "./styles"
export function AuthDialog({ mode, open, onOpenChange }) {
    const theme = useTheme()
    const style = styles(theme)
    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            PaperProps={{ sx: style.dialogPaper }}
        >
            <DialogContent sx={style.dialogContent}>
                {/* Left side - Character Image */}
                <Box sx={style.leftSide}>
                    {/* Overlay gradient for smooth blending */}
                    <Box sx={style.overlayGradient} />

                    {/* Background Image */}
                    <Box
                        component="img"
                        src={theme.palette.mode === 'dark' ? "/image/auth/5.png" :"/image/auth/6.png"}
                        alt="Mystical Character"
                        sx={style.bgImage}
                    />

                    {/* Bottom Text */}
                    <Box sx={style.bottomTextContainer}>
                        <Box sx={style.bottomTextInner}>
                            <Zap size={20} />
                            <Typography sx={style.topTypography}>
                                ARABOON
                            </Typography>
                            <Zap size={20} />
                        </Box>

                        <Typography sx={style.bottomTypography}>
                            "True strength comes from within. Channel your energy and transcend your limits."
                        </Typography>
                    </Box>
                </Box>
                {/* right side */}
                <Box sx={style.rightSide}>
                    <Register />
                </Box>

            </DialogContent>
        </Dialog>
    )
}
