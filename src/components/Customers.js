import React, { useState } from 'react';
import { SortingByDate } from './SortFilter';

const Customers = ({ customersList, setData }) => {
   const [sortOption, setSortOption] = useState(false);

   const getStatusColor = (status) => {
      let statusInfo = status.toLowerCase();

      if(statusInfo == 'delivered'){
         return 'blue';
      }else if(statusInfo == 'prepared'){
         return 'yellow';
      }else if(statusInfo == 'completed'){
         return 'green';
      }else if(statusInfo == 'prepone'){
         return 'red';
      }
   }


   return (
      <table className='customers-detail-table'>
         <thead className='customers-detail-row customers-list-headings'>
            <tr>
               <th className='order-id-heading'>ORDER ID <i className="fa-solid fa-angle-down"></i></th>
               <th className='customer-info-heading'>CUSTOMER <i className="fa-solid fa-angle-down"></i></th>
               <th className='address-info-heading'>ADDRESS <i className="fa-solid fa-angle-down"></i></th>
               <th className='product-info-heading'>PRODUCT <i className="fa-solid fa-angle-down"></i></th>
               <th onClick={() => setSortOption(!sortOption)} className='date-order-heading'>Date Order <i className="fa-solid fa-angle-down"></i>
                  {
                     sortOption && 
                     (
                        <div className='sort-options'>
                           <span onClick={() => SortingByDate(customersList, setData, 'ASC')}>Ascending</span>
                           <span onClick={() => SortingByDate(customersList, setData, 'DES')}>Descending</span>
                        </div>
                     )
                  }
               </th>
               <th className='status-info-heading'>STATUS</th>
            </tr>
         </thead>

         <tbody className='detail-row'>
            {
               customersList.map(cus => {
                  return (
                     <tr key={cus.order_id} className="customers-detail-row">
                        <td className='order-id-info'>{cus.order_id}</td>
                        <td className='customer-name-info'>{cus.customer}</td>

                        <td className='address-country-info'>
                           <p className='country-info'>{cus.country}</p>
                           <p className='address-info'>{cus.address}</p>
                        </td>

                        <td className='product-info'>
                           <p className='product-title-info'>{cus.product_title}</p>
                           <p className='product-des-info'>{cus.product_description}</p>
                        </td>

                        <td className='date-order-info'>{cus.date}</td>
                        <td className={`status-info ${getStatusColor(cus.status)}`}>{cus.status}</td>
                     </tr>
                  )
               }) 
            }
         </tbody>
      </table>
   )
}

export default Customers;


// function sortTheTable(jsonData, sort ){


// }



// console.log(sortTheTable(jsonData, "DES"))