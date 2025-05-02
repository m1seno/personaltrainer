import { confirmable, createConfirmation } from 'react-confirm';
import ConfirmationDialog from '../components/ConfirmDialog';

export default createConfirmation(confirmable(ConfirmationDialog));