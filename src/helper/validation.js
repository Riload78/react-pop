const validation = objValidation => {
  const errors = []

  if (!objValidation.name) {
    errors.push('Name cannot be empty.')
  }

  if (objValidation.price === 0 ) {
    errors.push('Price must not be zero.')
  }

  if (objValidation.tags.length === 0) {
    errors.push('At least one tag must be selected.')
  }

  return errors
}

export default validation
