export default function Item(props) {
  const {name, id, checked} = props.children
  const {handleCheck} = props

  const styleChecked = {
    display: "flex",
    borderRadius: "3px",
    backgroundColor: "#D3C1B3"
  }
  const styleNormal = {
    display: "flex",
    borderRadius: "3px",
    backgroundColor: "#D3C1B3"
  }
  const cssLabel = {
    userSelect: "none",
    width: "100%",
    padding: "10px 5px",
    textDecoration: checked ? "line-through" : "none",
    // textShadow: checked ? "0px 0px 1px black": "none",
    // fontWeight: checked ? "bold" : "normal",
    color: "black"
  }
  const itemStyle = checked ? styleChecked : styleNormal

  const displayName = name[0].toUpperCase() + name.slice(1)

  return (
    <li
      style={itemStyle}
    >
      <input 
        type="checkbox" 
        name={name} 
        id={id}
        style={{display: "none"}}
        onChange={handleCheck} 
        checked={checked ? true : false}
      />
      <label 
        htmlFor={id}
        style={cssLabel}
      >
        {displayName}
      </label>
      {
        !checked && 
          <button 
            type="button"
            name={id}
            style={{
              border: "none",
              borderRadius: "3px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: "#CF3232",
              padding: "0 10px",
              color: "white"
            }}
          >
            Delete
          </button>
      }      
    </li>
  )
}