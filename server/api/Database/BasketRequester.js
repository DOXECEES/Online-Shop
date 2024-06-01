// const db = require('./MainDBRequester');

// function getBasket(email, callback) {
//     console.log(email);
//     const getBasket = 'SELECT * FROM basket WHERE userId = ?';

//     db.query('SELECT * FROM user WHERE email=?', [email], (error_, results_) => {
//         if (error_) {
//             console.error('Error looking for user:', error_);
//             callback.result.status(500).json({ message: 'Произошла ошибка. Попробуйте позже' });
//         }
//         else {
//             db.query(getBasket, results_.id, (error_, results_) => {
//                 if (error_) {
//                     console.error('Error looking for basket:', error_);
//                     callback.result.status(500).json({ message: 'Произошла ошибка. Попробуйте позже' });
//                 }
//                 else {
//                     callback.result.status(200).json(results_);
//                 }

//             });
//         }
//     });
// }

// module.exports = { getBasket };
