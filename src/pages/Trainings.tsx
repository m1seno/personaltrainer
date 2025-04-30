import {Box, Typography} from '@mui/material';
import TrainingGrid from '../components/TrainingGrid';

const Trainings = () => {
  return (
    <Box sx={{p: 2}}>
      <Typography variant="h4" align="center" gutterBottom>
        Treenilista
      </Typography>
      <TrainingGrid />
    </Box>
  );
}

export default Trainings;