import { confirmable, createConfirmation, ConfirmDialog } from 'react-confirm';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';



// Itse dialogikomponentti, joka kysyy käyttäjältä vahvistuksen
const ConfirmationDialog: ConfirmDialog<{ confirmation: string }, boolean> = ({
    show,
    proceed,
    confirmation,
  }) => (
    <Dialog open={show} onClose={() => proceed(false)}>
      <DialogTitle>{confirmation}</DialogTitle>
      <DialogActions>
        <Button onClick={() => proceed(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => proceed(true)} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

// Viedään toiminnallinen confirm-funktio
export default createConfirmation(confirmable(ConfirmationDialog));