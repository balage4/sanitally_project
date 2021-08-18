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
          className={`btn ${action === 'Törlés' ? 'delete-button' : 'modify-button'} m-1`}
          name={action}
          data-id={actionId}
          onClick={handleActionButtons}
        >{action}</button>
      ))}
    </>
  )
}