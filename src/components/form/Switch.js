import Form from 'react-bootstrap/Form'
import P from 'prop-types'
import { useState } from 'react'
const Switch = ({ id }) => {
  const [isSwitchChecked, setIsSwhichChecked] = useState(false)
  const handlerSwitch = event => {
    console.log(event)
    const isChecked = event.target.checked
    setIsSwhichChecked(isChecked)
  }
  return (
    <Form.Check
      type='switch'
      id={id}
      label={isSwitchChecked ? 'Venta' : 'Compra'}
      checked={isSwitchChecked}
      onChange={handlerSwitch}
    />
  )
}
Switch.propTypes = {
  id: P.string.isRequired,
  checked: P.func.isRequired,
  label: P.func.isRequired,
}

export default Switch
