import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import { TYPES_CALCUL_AVAILABLES } from './calcul';
import Soroban from './Soroban';
import Clavier from './Clavier';
import { useLocation} from "react-router";


function pick_random_calcul_type(calcul_list) {
  const random = Math.floor(Math.random() * calcul_list.length);
  return new TYPES_CALCUL_AVAILABLES[calcul_list[random]].calcul()
}

function App() {
  const [selected, setSelected] = useState(Object.keys(TYPES_CALCUL_AVAILABLES));
  const [calcul, setCalcul] = useState(pick_random_calcul_type(selected))
  const [response, setResponse] = useState('');
  const [isOk, setIsOk] = useState();
  
  const {pathname} = useLocation()

  const handleChange = (event) => {
    const temp = selected.filter(el => el !== event.target.name)
    if (temp.length === 0) return 
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

  const handleChangeResponse = (value) => {
    setResponse(value)
  }

  let colorButton = "blue"
  let message = "Bravo !";
  if (isOk === true) colorButton = "green"
  if (isOk === false) {
    colorButton = "red"
    message =  calcul.response_message
  }
  let paddle = <Clavier onChange={handleChangeResponse} value={response} />
  if (pathname === "/calcul/soroban") paddle = <Soroban onChange={handleChangeResponse} value={response} />

  return (
    <Box sx={{display: "flex", flexDirection:"column", width:"90%", margin:"auto", padding:"1em"}}>
    <Typography variant="h5" sx={{textAlign:"center"}}>{calcul.operation }</Typography>
     
     {paddle}

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
