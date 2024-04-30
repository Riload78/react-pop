import P from 'prop-types'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalConfirm = ({ lanchTitle, modalText, actionText, action }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        {lanchTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={action}>
            {actionText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalConfirm.propTypes = {
  action: P.func.isRequired,
  modalText: P.string.isRequired,
  lanchTitle: P.string.isRequired,
  actionText: P.string.isRequired,
}

export default ModalConfirm
