import './button.css'

const Button = ({ text, type, disabled, onClick }) => {
  return (
    <button className='button' type={type} disabled={disabled} onClick={onClick}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front text">{ text }</span>
    </button> 
  )
}

export default Button