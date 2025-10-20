import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    useTheme,
    IconButton,
} from "@mui/material"
import { Zap } from "lucide-react"
import Register from "../../components/auth/Register"
import Login from "../../components/auth/Login"
import { styles } from "./styles"
import { useEffect, useState } from "react"
import SendForgetPasswordEmail from "../../components/auth/SendForgetPasswordEmail"
import ResetPasswordWithOTP from "../../components/auth/ResetPasswordWithOTP"
import { useTranslation } from "react-i18next"
import { Close } from "@mui/icons-material"
import usePhone from "../../hooks/usePhone"
export function AuthDialog({ openAuthDialog, onOpenChange }) {
    const { i18n, t } = useTranslation()
    const {isPhone}=usePhone()
    const theme = useTheme()
    const style = styles(theme,isPhone)
    const [mode, setMode] = useState(null)
    const [emailForReset, setEmailForReset] = useState(null)
    const handleClose = () => {
        onOpenChange({ open: false, mode: null });
    }
    useEffect(() => {
        setMode(openAuthDialog.mode);
    }, [openAuthDialog]);
    useEffect(() => {
        const validModes = ["register", "login", "forgetpassword", "sendcode"];
        if (!validModes.includes(mode)) {
            handleClose()
        }
    }, [mode]);

    return (
        <Dialog
            open={openAuthDialog.open}
            onClose={() => { onOpenChange({ open: false, mode: null });}}
            PaperProps={{ sx: style.dialogPaper }}
        >
            <DialogContent sx={style.dialogContent}>
                {/* close dialog button */}

                <IconButton onClick={() => { handleClose() }} sx={{ position: 'absolute', top: 5, ...(i18n.language === 'en' ? { right: 5 } : { left: 5 }) }}>
                    <Close />
                </IconButton>
                {/* Left side - Character Image */}
                <Box sx={style.leftSide}>
                    {/* Overlay gradient for smooth blending */}
                    <Box sx={style.overlayGradient} />

                    {/* Background Image */}
                    <Box
                        component="img"
                        src={theme.palette.mode === 'dark' ? "/image/auth/7.png" : "/image/auth/6.png"}
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
                            {t('register.footer_text')}
                        </Typography>
                    </Box>
                </Box>
                {/* right side */}
                <Box sx={style.rightSide}>
                    {(() => {
                        switch (mode) {
                            case "register":
                                return <Register setMode={setMode} />;
                            case "login":
                                return <Login setMode={setMode} />;
                            case "forgetpassword":
                                return <SendForgetPasswordEmail setEmailForReset={setEmailForReset} setMode={setMode} />;
                            case "sendcode":
                                return <ResetPasswordWithOTP emailForReset={emailForReset} setMode={setMode} />;
                            default:
                                return null;
                        }
                    })()}
                </Box>
            </DialogContent>
        </Dialog>
    )
}
