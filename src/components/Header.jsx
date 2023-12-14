export default function Header() {
  const cssHeader = {
    display: "flex",
    alignItems: "center",
    gap: "1em",
    paddingBottom: "10px"
  }
  const cssImage = {
    maxWidth: "70%",
    margin: "0 auto",
    paddingBottom: "1em"
  }

  return (
    <header style={cssHeader}>
      <img 
        src="../assets/logo_paulny.png" 
        alt="Logo Paulny"
        style={cssImage} 
        />
    </header>
  )
}