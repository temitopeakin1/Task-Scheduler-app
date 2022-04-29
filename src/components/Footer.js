import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <footer>
    <p>Developed by Akinmegha Temitope</p>
    <Link to="/about" style={{ color: "red", textDecoration: 'none'}}>About</Link>
    </footer>
  )
}

export default Footer

