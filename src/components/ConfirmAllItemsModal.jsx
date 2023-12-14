export default function ConfirmAllItemsModal(props) {
  const {handleSubmit} = props

  return (
    <form onSubmit={handleSubmit}>
      <p>Did you buy all the items?</p>
      <button>Yes!</button>
    </form>
  )
}