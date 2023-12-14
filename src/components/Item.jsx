export default function Item(props) {
  const {name, id, checked} = props.children
  const {handleCheck} = props

  const styleChecked = {
    display: "flex",
    border: "1px solid darkgreen",
    borderRadius: "5px",
    backgroundColor: "green"
  }

  const styleNormal = {
    display: "flex",
    border: "1px solid black",
    borderRadius: "5px",
  }

  const itemStyle = checked ? styleChecked : styleNormal

  return (
    <li
      style={itemStyle}
    >
      <input 
        type="checkbox" 
        name={name} 
        id={id}
        style={
          {
            display: "none"
          }
        }
        onChange={handleCheck} 
        checked={checked ? true : false}
      />
      <label 
        htmlFor={id}
        style={
          {
            userSelect: "none",
            width: "100%",
            padding: "10px 5px"
          }
        }
      
      >
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      {!checked && 
        <button 
          type="button"
          name={id}
        >
          Delete
        </button>
      }      
    </li>
  )
}