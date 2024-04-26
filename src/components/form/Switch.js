import Form from 'react-bootstrap/Form'
import P from 'prop-types'
const Switch = ({ id, isSwitchChecked, handleSwitch }) => {
  return (
    <Form.Check
      type='switch'
      id={id}
      label={isSwitchChecked ? 'Venta' : 'Compra'}
      checked={isSwitchChecked}
      onChange={handleSwitch}
    />
  )
}
Switch.propTypes = {
  id: P.string.isRequired,
  isSwitchChecked: P.bool.isRequired,
  handleSwitch: P.func.isRequired,
}

export default Switch
