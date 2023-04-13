import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { Dialog, DialogContent, Slide, AppBar, Toolbar,Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogControlProps {
  children: (openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => React.ReactNode;
}

const DialogsControlFullScreen = ({ children }: DialogControlProps) => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [dialogTitle, setDialogTitle] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDialogs = (content: React.ReactNode, title: React.ReactNode) => {
    setDialogContent(content);
    setDialogTitle(title);
    setIsOpen(true);
  };

  const closeDialogs = () => {
    setDialogContent(null);
    setDialogTitle(null);
    setIsOpen(false);
  };

  const theme = useTheme();

  return (
    <>
      {children(openDialogs, closeDialogs)}
      <Dialog open={isOpen} onClose={closeDialogs} fullScreen TransitionComponent={Transition}>
        {dialogContent && (
          <>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <Typography sx={{ ml: 2, flex: 1, color: `${theme.palette.text.light}` }} variant="h6" component="div">
                  {dialogTitle}
                </Typography>
              </Toolbar>
            </AppBar>
            <DialogContent>
                {dialogContent}
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default DialogsControlFullScreen;
