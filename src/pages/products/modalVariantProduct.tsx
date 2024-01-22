/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface IModalVariantModel {
  open: boolean
  setOpen: (value: boolean) => void
  onSelect: (value: any) => void
}

export default function ModalVariantProductView(props: IModalVariantModel) {
  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending anonymous location
            data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose()
              props.onSelect('')
            }}
            autoFocus
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}