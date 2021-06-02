import React from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { OneononesRepository } from '../../../Core/Repositories/OneononesRepository';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';

interface OneononeDeleteProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

export const OneononeDelete: React.FC<OneononeDeleteProps> = ({ open, onClose, oneonone }: OneononeDeleteProps) => {
  const user = AuthenticationRepository.user;

  const remove = () => {
    OneononesRepository.delete(oneonone.id)
      .then(_ => alert('Deleted!'))
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(onClose);
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton onClick={onClose} edge="start">
              <Close />
            </IconButton>
            <Typography variant="h6">
              Cancel one-on-one
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12} sm={12} md={6} lg={4} xl={3}>
            {user.id !== oneonone.leader.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Leader</Typography>
                <Typography variant="body1">{oneonone.leader.name}</Typography>
              </Grid>
            }

            {user.id !== oneonone.led.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Led</Typography>
                <Typography variant="body1">{oneonone.led.name}</Typography>
              </Grid>
            }

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Frequency</Typography>
              <Typography variant="body1">{FrequencyEnum[oneonone.frequency]}</Typography>
            </Grid>
          </Grid>

          <div className="flex mt2" style={{ gap: '1rem' }}>
            <Button onClick={onClose} startIcon={<Close />}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={remove} startIcon={<Delete />}>Remove</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}