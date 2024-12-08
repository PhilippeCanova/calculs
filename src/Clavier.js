import {  TextField } from '@mui/material';
import PropTypes from 'prop-types';

function Clavier({onChange, value}) {
  
  const handleChangeResponse = (event) => {
    onChange(event.target.value)
  }

  return (
    <TextField id="outlined-basic" label="Réponse" variant="outlined" type="number" value={value} onChange={handleChangeResponse}/>
  );
}
Clavier.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange: PropTypes.func
};
export default Clavier;
