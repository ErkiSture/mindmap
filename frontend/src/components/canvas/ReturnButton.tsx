//import '../styling/index.css'
import '../../styling/ReturnButton.css'
import { useNavigate } from 'react-router-dom'


export default function ReturnButton() {
  const navigate = useNavigate()

  return (
    <div>
      <button className='return-button canvas-overlay-item' onClick={() => {navigate(-1)}}>Return</button>
    </div>
  )
}