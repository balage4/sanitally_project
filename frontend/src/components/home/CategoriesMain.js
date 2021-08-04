/* eslint-disable react/prop-types */
export default function Categories({ categories }) {
  return (
    <div className="d-flex categories">

      {categories.map(category => (
        <div>
          <h4>{category.categoryName}</h4>
          <p>{category.categoryNotes}</p>
        </div>
      ))}
    </div>
  )
}