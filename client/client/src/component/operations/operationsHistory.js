// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BankHistory from './BankHistory';

// const OperationsHistory = () => {
//   const [operations, setOperations] = useState([]);

//   useEffect(() => {
//     const seekOperations = async () => {
//       try {
//         const response = await axios.get('/http://localhost:3000/history');
//         setOperations(response.data);
//       } catch (error) {
//         console.error('Error fetching bank operations:', error);
//       }
//     };

//     seekOperations();
//   }, []);

//   return (
//     <div>
//       <h1>Bank Operations History</h1>
//       <BankHistory operations={operations} />
//     </div>
//   );
// };

// export default OperationsHistory;
