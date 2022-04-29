import PropTypes from 'prop-types'


const Button = ({ color, text, onClick}) => {
  return (
 <button onClick = {onClick} 
 style={{color: color}}
     className='btn'>{text}
     </button>
  )
}


Button.defaultProps = {
    color: 'white',
}
 
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button