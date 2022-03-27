import React, {useState} from 'react';

const ShowFilterOption = ({ setShowFilter, data, setData }) => {

   const [status, setStatus] = useState(null);

   const showFilterResults = (e) => {
      e.preventDefault();

      if(status){
         let filterData = data.filter(item => item.status === status);

         setData(filterData)
         setShowFilter(false);
      }
   }


   return (
      <div className='modal' onClick={() => setShowFilter(false)}>
         <div className='modal-content' onClick={e => e.stopPropagation()}>
            <div className='option-list-container'>
               <h4 className='option-list-container-heading'>Status</h4>

               <div className='option-list-items' onChange={(e) => setStatus(e.target.value)}>
                  <div className='option-list-item'>
                     <input type="radio" name="status" value="Delivered" id="delivered" />
                     <label htmlFor="delivered">Delivered</label>
                  </div>

                  <div className='option-list-item'>
                     <input type="radio" name="status" value="Prepared" id="prepared" />
                     <label htmlFor="prepared">Prepared</label>
                  </div>

                  <div className='option-list-item'>
                     <input type="radio" name="status" value="Completed" id="completed" />
                     <label htmlFor="completed">Completed</label>
                  </div>

                  <div className='option-list-item'>
                     <input type="radio" name="status" value="Prepone" id="prepone" />
                     <label htmlFor="prepone">Prepone</label>
                  </div>
               </div>
            </div>

            <div className='show-results-btn'>
               <button type='button' onClick={showFilterResults}>Show Results</button>
            </div>
         </div>
      </div>
   )
}


export default ShowFilterOption;

