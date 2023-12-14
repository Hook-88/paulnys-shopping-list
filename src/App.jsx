import Header from "./components/Header"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"

function App() {
  //container styles
  const cssApp = {
    width: "375px",
    margin: "0 auto",
    padding: "20px 10px 10px 10px",
    display: "flex",
    flexDirection: "column",
    
  }

  return (
    <div
      style={cssApp}
    >
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App
