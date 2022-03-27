import React, { useState } from 'react';

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


   const sortingByDate = (sort) => {
      if (sort === "ASC") {
         let jsonParse = customersList.map((item) => ({
            ...item,
            date: Date.parse(item.date.split("/").reverse().join("-")),
         }));
         
         let newList = jsonParse.sort((a, b) => a.date - b.date).map((item) => {
            let dateFormat = changeToDate(item.date).split("/").map((n) => {
               let num = parseInt(n);

               if (num < 10) {
                  return "0" + n;
               } else {
                  return n + "";
               }
            }); 
   
            item.date = dateFormat.join("/");
            return item;
         });
         // console.log(newList);
         setData(newList);

      } else if (sort === "DES") {
         let jsonParse = customersList.map((item) => ({
            ...item,
            date: Date.parse(item.date.split("/").reverse().join("-")),
         }));

         let newList = jsonParse.sort((a, b) => b.date - a.date).map((item) => {
            let dateFormat = changeToDate(item.date).split("/").map((n) => {
               let num = parseInt(n);

               if (num < 10) {
                  return "0" + n;
               } else {
                  return n + "";
               }
            });

            item.date = dateFormat.join("/");
            return item;
         });
         // console.log(newList);
         setData(newList);
      }
   };

   const changeToDate = (timestamp) => {
   let unix_timestamp = timestamp;

   // Create a new JavaScript Date object based on the timestamp
   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
   let date = new Date(unix_timestamp).toLocaleDateString("en-IN");

   // Hours part from the time
   return date;
   };


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
                           <span onClick={() => sortingByDate('ASC')}>Ascending</span>
                           <span onClick={() => sortingByDate('DES')}>Descending</span>
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
                        <td className='status-info'>
                           <p className={`status-info-box ${getStatusColor(cus.status)}`}>{cus.status}</p>
                        </td>
                     </tr>
                  )
               }) 
            }
         </tbody>
      </table>
   )
}

export default Customers;

