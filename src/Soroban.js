
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



function SorobanColumn({onChange, value, separator}) {

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

  let leftborder = ""
  if (separator != undefined) leftborder = "0.5em solid " + separator
  return (
    <Box sx={{borderRight:"0.5em solid brown", display:"flex", flexDirection:"column", borderLeft:leftborder}} >
      <SorobanQuinaire value={value < 5 ? 0 : 5} onChange={handleChangeQuinaire}/>
      <SorobanUnaires value={value>4 ? value-5 : value} onChange={handleChangeUnaire}/>
      <Typography>{value}</Typography>
    </Box>
  );
}
SorobanColumn.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange: PropTypes.func,
  separator: PropTypes.string
};


function get_rank_number(value, rang){
  const formated = Number.parseFloat(value).toFixed(2).toString()
  let fin = formated.length - (3+rang)
  const car = formated.charAt(fin)
  if (car === '') return 0
  return parseInt(car)
} 

function Soroban({onChange, value}) {
  let intValue = value
  if (value === '') intValue = 0
  
  const handeChange = (new_decimale, rang) => {
    const formated = Number.parseFloat(intValue).toFixed(2).toString().padStart(15, '0')
    let fin = formated.length - (3+rang)
    let new_string = formated.substring(0,fin) + new_decimale + formated.substring(fin+1)
    onChange(parseFloat(new_string))
  }

  let soroban_colunm = []
  for (let i=8; i>-3; i--) {
    let separator
    if (i===-1) separator = "red"
    if (i!=0) soroban_colunm.push(<SorobanColumn key={i} separator={separator} value={get_rank_number(intValue,i)} onChange={(val) => handeChange(val, i)}/>)
  }
  return (
    <Box sx={{display: "flex", flexDirection:"row", border:"0.5em solid brown"}}>
    {soroban_colunm}
    </Box>
  
  );
}
Soroban.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange: PropTypes.func
};
export default Soroban;
