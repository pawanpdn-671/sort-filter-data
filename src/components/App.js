import React, { useState, useEffect } from 'react';
import './App.css';
import Customers from './Customers';
import ShowFilterOption from './ShowFilterOption';

const App = () => {

  const [defResponse, setDefResponse] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showFilterBox, setShowFilterBox] = useState(false);

  const getCustomersList = async() => {
    const data = await fetch('https://my-json-server.typicode.com/Ved-X/assignment/orders');
    const customersList = await data.json();
    
    if(customersList.length > 0){
      setDefResponse(customersList);
      setTempData(customersList);
    }
  }


  useEffect(() => {
    getCustomersList();
  }, []);


  useEffect(() => {
    if(userInput === ''){
      document.querySelector('.clear-search-btn').style.display="none";
      document.querySelector('#search-input').focus();

    }else{
      document.querySelector('.clear-search-btn').style.display="block";
    }
  }, [userInput]);


  const searchCustomer = (e) => {
    let customerName = e.target.value;
    setUserInput(customerName);
  
    const filteredData = defResponse.filter((entry) => {
      if (entry.customer) {
        let regex = new RegExp(customerName, "i");
        return regex.test(entry.customer);
      }
    });

    setTempData(filteredData);
  }


  return (
    <div className="container">
      <div className='dashboard'>
        <h3 className='dashboard-heading'>All Orders <span><sup>{defResponse.length}</sup></span></h3>

        <div className='dashboard-search-filter-container'>
          <div className='dashboard-search-container'>
            <input type="text" id="search-input" value={userInput} onChange={searchCustomer} />

            <i className="fa-solid fa-magnifying-glass search-bar-icon"></i>

            <i className="fa-solid fa-xmark clear-search-btn" onClick={() => setUserInput('')}></i>
          </div>

          <div className='dashboard-filter-container' onClick={() => setShowFilterBox(true)}>
            <i className="fa-solid fa-arrow-down-short-wide"></i>
            <span>Filter</span>
          </div>
        </div>

        {
          showFilterBox && <ShowFilterOption setShowFilter={setShowFilterBox} data={defResponse} setData={setTempData} />
        }

        <React.Fragment>
          {
            defResponse.length > 0 &&  <Customers setData={setTempData} customersList={tempData} /> 
          }
        </React.Fragment>      
      </div>
    </div>
  )
}

export default App;


