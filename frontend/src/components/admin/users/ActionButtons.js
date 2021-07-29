/* eslint-disable react/prop-types */
export default function ActionButtons({
  buttonsArray,
  actionId,
  handleActionButtons
}) {
  return (
    <>
      {buttonsArray.map(action => (
        <button
          key={`actionKey_${action}_${actionId}`}
          type="button"
          className={`btn btn-${action === 'Törlés' ? 'danger' : 'primary'} m-1`}
          name={action}
          data-id={actionId}
          onClick={handleActionButtons}
        >{action}</button>
      ))}
    </>
  )
}