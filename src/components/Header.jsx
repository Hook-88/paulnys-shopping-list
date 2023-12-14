export default function Header() {
  
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1em",
        paddingBottom: "10px"
      }}
    >
      <h1
        style={{
          margin: "0"
        }}
      >PaulNy's Shopping List</h1>
      <i 
        className="fa-solid fa-basket-shopping"
        style={
          {
            fontSize: "1.8rem"
          }
        }
      ></i>
    </header>
  )
}