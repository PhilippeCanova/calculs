import logo from './logo.svg';
import './App.css';
import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Multiply2Numbers, Multiply3Numbers, TYPES_CALCUL_AVAILABLES } from './calcul';


const TYPES_CALCUL_SELECTED = [Multiply2Numbers, Multiply3Numbers]

function pick_random_calcul_type(calcul_list) {
  const random = Math.floor(Math.random() * calcul_list.length);
  return new TYPES_CALCUL_AVAILABLES[calcul_list[random]].calcul()
}

function App() {
  const [selected, setSelected] = useState(Object.keys(TYPES_CALCUL_AVAILABLES));
  const [calcul, setCalcul] = useState(pick_random_calcul_type(selected))
  const [response, setResponse] = useState("");
  const [isOk, setIsOk] = useState();

  const handleChange = (event) => {
    const temp = selected.filter(el => el !== event.target.name)
    if (event.target.checked) setSelected([...temp, event.target.name ]);
    else setSelected(temp)
  };


  const validate = () => {
    let validation = false;
    try {
      validation = calcul.check_result(response)
    } catch {
      validation = false
    }
      
    if ( isOk !== undefined) {
      setCalcul(pick_random_calcul_type(selected))
      setResponse("")
      setIsOk()
      return
    } else {
      setIsOk(validation)
    }
    
  }

  const handleChangeResponse = (event) => {
    console.debug(event.target.name)
    setResponse(event.target.value)
  }

  let colorButton = "blue"
  let message = "Bravo !";
  if (isOk === true) colorButton = "green"
  if (isOk === false) {
    colorButton = "red"
    message =  calcul.response_message
  }
  
  return (
    <Box sx={{display: "flex", flexDirection:"column", width:"90%", margin:"auto", padding:"1em"}}>
    <Typography variant="h5" sx={{textAlign:"center"}}>{calcul.operation }</Typography>
     <TextField id="outlined-basic" label="Réponse" variant="outlined" type="number" value={response} onChange={handleChangeResponse}/>
     {isOk === false &&
      <Typography sx={{color:colorButton}}>{message}</Typography>
    }
     <Button variant="contained" sx={{
      backgroundColor:colorButton,
      marginTop:"1em"
     }} onClick={validate}>{isOk === undefined ? "Valider" : "Rejouer"}</Button>
     

     <Box sx={{display: "flex", flexDirection:"column", width:"80%", minWidth:"10em", margin:"2em auto", padding:"1em"}}>
     <FormControl component="fieldset" variant="standard">
     <FormLabel component="legend">Types d'opérations</FormLabel>
      <FormGroup>
        {
         Object.keys(TYPES_CALCUL_AVAILABLES).map((key) => {
          const item = TYPES_CALCUL_AVAILABLES[key]
          return (
            <FormControlLabel key={key} 
            control={<Switch 
                          checked = {selected.find(el => el === key) !== undefined} 
                          onChange={handleChange} 
                          name={key} 
                      />} 
            label={item.label} />)
})
        }
        
      </FormGroup>
      </FormControl>
     </Box>
    </Box>
    
  );
}

export default App;
