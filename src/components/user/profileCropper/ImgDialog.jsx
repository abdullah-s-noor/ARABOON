import React from 'react'
import { withStyles } from '@mui/styles'
import { AppBar, Box, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <Box>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.onClose}
                aria-label="Close"
              >
                <Close />
              </IconButton>
              <Typography
                color="inherit"
                className={classes.flex}
              >
                Cropped image
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.imgContainer}>
            <img src={this.props.img} alt="Cropped" className={classes.img} />
          </div>
        </Box>
      </Dialog>
    )
  }
}

// @ts-ignore
export default withStyles(styles)(ImgDialog)
