import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    useTheme,
} from "@mui/material"
import { Zap } from "lucide-react"
import Register from "../../components/auth/Register"
import Login from "../../components/auth/Login"
import { styles } from "./styles"
import { useState } from "react"
import SendForgetPasswordEmail from "../../components/auth/SendForgetPasswordEmail"
import CodeConfirmation from "../../components/auth/CodeConfirmation"
export function AuthDialog({ open, onOpenChange }) {
    const theme = useTheme()
    const style = styles(theme)
    const [mode,setMode]=useState('register')
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
                    {mode==="register"?<Register setMode={setMode} />:
                    mode==='login'?<Login setMode={setMode}/>:
                    mode==='forgetpassword'?<SendForgetPasswordEmail setMode={setMode}/>:
                    mode==='sendcode'?<CodeConfirmation setMode={setMode}/>:
                    null
                    }
                </Box>

            </DialogContent>
        </Dialog>
    )
}
