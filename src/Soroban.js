
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';


function SorobanQuinaire({onChange, value}) {
  let position = "flex-start"
  if (value >= 5) position = "flex-end"
  const handleChange = () => {
    const new_value = value
    if (new_value >= 5) {
      onChange(new_value - 5)
    } else {
      onChange(new_value + 5)
    }
  }
  return (
    <Box sx={{display:"flex", flexDirection:"column", border:"0.1em solid yellow", minHeight:"2em", minWidth:"1em", justifyContent:position}} >
      <Box sx={{height:"1em", width:"1em", backgroundColor:"blue", }} onClick={handleChange}></Box>
    </Box>
  );
}
SorobanQuinaire.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange: PropTypes.func
};

function SorobanUnaires({onChange, value}) {

  let complement = value - 5
  if (complement < 0) complement = value
  
  const handleChange = (index) => {
    const new_value = value
    if (new_value < index ) {
      onChange(index)
    } else {
      onChange(index-1)
    }
  }

  const gap = "1em"
  let [margin1, margin2, margin3, margin4] =  ["0.1em", "0.1em", "0.1em", "0.1em"]
  if (complement === 0) margin1 = gap
  if (complement === 1) margin2 = gap
  if (complement === 2) margin3 = gap
  if (complement === 3) margin4 = gap
  return (
    <Box sx={{display:"flex", flexDirection:"column", borderTop:"0.2em solid brown", minHeight:"5em", minWidth:"1em", justifyContent:"flex-start", 
    
  }} >
      <Box sx={{height:"1em", width:"1em", backgroundColor:"blue", marginTop:margin1}} onClick={() => handleChange(1)}></Box>
      <Box sx={{height:"1em", width:"1em", backgroundColor:"blue", marginTop:margin2 }} onClick={() => handleChange(2)}></Box>
      <Box sx={{height:"1em", width:"1em", backgroundColor:"blue", marginTop:margin3}} onClick={() => handleChange(3)}></Box>
      <Box sx={{height:"1em", width:"1em", backgroundColor:"blue", marginTop:margin4 }} onClick={() => handleChange(4)}></Box>
    </Box>
  );
}
SorobanUnaires.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange: PropTypes.func
};



function SorobanColumn({onChange, value}) {
  const handleChangeUnaire = (unaire) => {
    const new_value = value
    if (new_value < 5) onChange(unaire) 
    else onChange(5 + unaire)
  }
  const handleChangeQuinaire = (quinaire) => {
    const new_value = value
    if (new_value < 5) onChange(new_value + 5 ) 
    else onChange(new_value - 5)
  }


  return (
    <Box sx={{borderRight:"0.5em solid brown", display:"flex", flexDirection:"column"}} >
      <SorobanQuinaire value={value < 5 ? 0 : 5} onChange={handleChangeQuinaire}/>
      <SorobanUnaires value={value>4 ? value-5 : value} onChange={handleChangeUnaire}/>
      <Typography>{value}</Typography>
    </Box>
  );
}
SorobanColumn.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange: PropTypes.func
};


function get_decimal(value, decimale){
  let dessus = Math.floor(value / Math.pow(10, decimale+1))*Math.pow(10, decimale+1)
  let restant = value - dessus

  let dessous = Math.floor(restant / Math.pow(10, decimale-1))

  
  let temp = restant - dessous
  console.debug(value, decimale, dessus, dessous, temp)
  return value
} 

function Soroban({onChange, value}) {
  let intValue = value
  if (value === '') intValue = 0
  
  const handeChange = (new_decimale, puissance) => {

    onChange(new_decimale)
  }

  

  return (
    <Box sx={{display: "flex", flexDirection:"row", border:"0.5em solid brown"}}>
    <SorobanColumn value={get_decimal(intValue,6)} onChange={(val) => handeChange(val, 6)}/>
    <SorobanColumn value={get_decimal(intValue,5)} onChange={(val) => handeChange(val, 5)}/>
    <SorobanColumn value={get_decimal(intValue,4)} onChange={(val) => handeChange(val, 4)}/>
    <SorobanColumn value={get_decimal(intValue,3)} onChange={(val) => handeChange(val, 3)}/>
    <SorobanColumn value={get_decimal(intValue,2)}  onChange={(val) => handeChange(val, 2)}/>
    <SorobanColumn value={get_decimal(intValue,1)} onChange={(val) => handeChange(val, 1)}/>
    <SorobanColumn value={get_decimal(intValue,0)} onChange={(val) => handeChange(val, 0)} />
    
    </Box>
  
  );
}
Soroban.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange: PropTypes.func
};
export default Soroban;
