
export const SortingByDate = (customersList, setData, sort) => {
   let jsonParse = customersList.map(item => (
      { 
         ...item, 
         date: Date.parse(item.date.split("/").reverse().join('-'))
      }
   ))

   if(sort === "ASC"){
      let newList = [];

      jsonParse.sort((a,b) => a.date - b.date).map(item => {
         let dateFormat = changeToDate(item.date);
         item.date = dateFormat;
         newList.push(item);
      });
      console.log(newList)
      setData(newList);
      
   }else if(sort === "DES"){
      let newList = [];

      jsonParse.sort((a,b) => b.date - a.date).map(item => {
         let dateFormat = changeToDate(item.date).split('/');
         let temp = dateFormat[0];
         dateFormat[0] = dateFormat[1];
         dateFormat[1] = temp;
         item.date = dateFormat.join("/");
         newList.push(item);
      });
      console.log(newList)
      setData(newList);
   }
}

function changeToDate(timestamp){
   let unix_timestamp = timestamp;

   // Create a new JavaScript Date object based on the timestamp
   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
   let date = new Date(unix_timestamp).toLocaleDateString("en-IN");

   // Hours part from the time
   return date;
}


