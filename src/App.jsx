import './App.css'
import Header from './components/Header'
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';

function App() {
  let [data, setData] = useState([]);

  const [activeUser, setActiveUser] = useState(localStorage.getItem("activeUser"));

  useEffect(() => {
    if (!activeUser) return;
    const fetchSeriesData = async() => {
      const localData = localStorage.getItem(`mySeriesData_${activeUser}`);
      if (localData) 
      {
        setData(JSON.parse(localData));
      } 
      else 
      {
        try
        {
          const response = await fetch(`${import.meta.env.BASE_URL}SeriesData.json`);
          const fetchData = await response.json();
          setData(fetchData);
          localStorage.setItem(`mySeriesData_${activeUser}`, JSON.stringify(fetchData));
        }
        catch(err)
        {
          console.log(err);
        }}
      }
    fetchSeriesData();
  }, [activeUser]);

  return (
    <div className='App'>
      <Header setActiveUser={setActiveUser}></Header>
      <Outlet context={{data, setData, setActiveUser}}></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App