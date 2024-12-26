
import AdvanceTables from './pages/AdvanceTables'
// import Register from './pages/auth/Register'
import OperationalTable from './components/OperationalTable'
import Gallery from './pages/Gallery'
import DynamicTable from './DynamicTable'


function App() {

  return (
    <div>
      <DynamicTable />  
      {/* <AdvanceTables />   */}
      {/* <Gallery /> */}
      <OperationalTable />
      {/* <Register/> */}
    </div>
  )
}

export default App
