export default function ConfirmAllItemsModal(props) {
  const {handleSubmit} = props

  const cssButton = {
    fontSize: "1rem",
    padding: ".6em 0",
    backgroundColor: "#4a8290",
    border: "1px solid #2D5058",
    borderRadius: "3px",
    color: "#efeadd",
    textShadow: "0px 0px 1px black"
  }

  return (
    <form 
      onSubmit={handleSubmit}
      style={
        {
          display: "grid"
        }
      }
    >
      <p>Did you buy all the items?</p>
      <button
        style={
          {
            fontSize: "1rem",
            padding: ".6em 0",
            backgroundColor: "#4B904A",
            border: "0px solid #2D5058",
            borderRadius: "3px",
            color: "#efeadd",
            textShadow: "0px 0px 1px black"
          }
        }
      >
        Yes!
      </button>
    </form>
  )
}