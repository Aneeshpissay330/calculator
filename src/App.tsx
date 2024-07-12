import Calculator from "./pages/Calculator"

const App = () => {
  return (
    <div className="App">
      <h1 className="text-3xl">Scientific Calculator</h1>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Calculator />
      <p className="developer">
        Developed by 🧑‍💻 <span>Aneesh Pissay</span>
      </p>
    </div>
  )
}

export default App