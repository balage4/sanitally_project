/* eslint-disable react/prop-types */
export default function InputFieldSet({
  name,
  type,
  labelText,
  fieldValues,
  errors,
  handleInputChange,
  handleInputBlur,
  required,
  reference,
  optionsarray
}) {
  const label = (<label htmlFor={name}>{labelText}</label>);
  let input;

  if (type === 'text') {
    input = (
      <>
        {label}
        <input
          className="form-control"
          name={name}
          id={name}
          type={type}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        />
      </>)
  } else if (type === 'textarea') {
    input = (
      <>
        {label}
        <textarea
          className="form-control"
          name={name}
          id={name}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        />
      </>)
  } else if (type === 'select') {
    input = (
      <>
        {label}
        <select
          className="form-control"
          type={type}
          name={name}
          id={name}
          value={fieldValues[name]}
          onChange={handleInputChange}
          optionsarray={optionsarray}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        >
          <option value=''>Válassz!</option>
          {optionsarray && (optionsarray.map(option => (
            <option
              key={option}
              value={option}>{option}</option>
          )))}
        </select>
      </>)
  } else if (type === 'checkbox') {
    input = (
      <div className="form-group" data-checkboxgroup={name}>
        <label htmlFor={name}>{labelText}</label>
        {optionsarray.map(option => (
          <div className="form-check">
            <input
              className="form-check-input"
              key={option}
              type={type}
              id={option}
              name={option}
              value={option}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              ref={reference}
            />
            <label className="form-check-label" htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    )
  } else if (type === 'radio') {
    input = (
      <>
        <label htmlFor={name}>{labelText}</label>
        {optionsarray.map(option => (
          <div className="form-check">
            <input
              className="form-check-input"
              key={option}
              type={type}
              id={option}
              name={name}
              value={option}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              ref={reference}
            />
            <label className="form-check-label" htmlFor={option}>{option}</label>
          </div>
        ))}
      </>
    )
  } else if (type === 'password') {
    input = (
      <>
        {label}
        <input
          className="form-control"
          name={name}
          id={name}
          type={type}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        />
      </>)
  } else if (type === 'number') {
    input = (
      <>
        {label}
        <input
          className="form-control"
          name={name}
          id={name}
          type={type}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        />
      </>)
  } else if (type === 'email') {
    input = (
      <>
        {label}
        <input
          className="form-control"
          name={name}
          id={name}
          type={type}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        />
      </>)
  } else if (type === 'date') {
    input = (
      <>
        {label}
        <input
          className="form-control"
          name={name}
          id={name}
          type={type}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        />
      </>)
  }

  return (
    <div className={`mb-3 ${errors[name] !== '' ? "was-validated" : ""}`}>
      {input}
      <div className="invalid-feedback">
        {errors[name]}
      </div>
    </div>
  )
}
