const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');



require('../database/conn');
// const User = require('../models/userSchema');
// const Admin = require('../models/adminSchema');
// const Salecar = require('../models/salecarSchema');
// const Cart = require('../models/cartSchema');
// const Rentcar = require('../models/rentcarSchema');
// const Rentcart = require('../models/rentcartSchema');
// const Salecarincomes = require('../models/saleCarIncomeSchema');
// const Rentcarincomes = require('../models/rentCarIncomeSchema');
// const Salecarreviews = require('../models/carreviewSchema');
// const Rentcarreviews = require('../models/rentcarreviewSchema');




router.get('/', (req, res) =>{
    res.send('home page router')
});


// Client Side Modules ---for-- SignIn, SignUp, SignOut, Contactform
router.use(require('../clientSideModules/signup'))
router.use(require('../clientSideModules/signin'))
router.use(require('../clientSideModules/signout'))
router.use(require('../clientSideModules/getdata'))
router.use(require('../clientSideModules/contactform'))

// Client Side Modules ---for-- Sale Cars
router.use(require('../clientSideModules/displayallsalecars'))
router.use(require('../clientSideModules/exploreallsalecars'))
router.use(require('../clientSideModules/salecarsearch'))
router.use(require('../clientSideModules/reviewsforsalecars'))
router.use(require('../clientSideModules/addtocartforsalecars'))
router.use(require('../clientSideModules/displaysalecartdata'))
router.use(require('../clientSideModules/deletesalecartitem'))
router.use(require('../clientSideModules/paymentmethodsalecars'))
router.use(require('../clientSideModules/updatedbaftersoldcar'))

// Client Side Modules ---for-- Rent Cars
router.use(require('../clientSideModules/displayallrentcars'))
router.use(require('../clientSideModules/exploreallrentcars'))
router.use(require('../clientSideModules/rentcarsearch'))
router.use(require('../clientSideModules/reviewsforrentcars'))
router.use(require('../clientSideModules/addtocartforrentcars'))
router.use(require('../clientSideModules/displayrentcartdata'))
router.use(require('../clientSideModules/paymentmethoderentcars'))
router.use(require('../clientSideModules/updatedbafetrrentedcar'))






// Admin Side Modules---for--- SignIn, SignOut
router.use(require('../adminSideModules/signinadmin'))
router.use(require('../adminSideModules/signoutadmin'))
router.use(require('../adminSideModules/getadmindata'))

// Admin Side Modules---for--- Sale Cars
router.use(require('../adminSideModules/addsalecars'))
router.use(require('../adminSideModules/getallsalecars'))
router.use(require('../adminSideModules/deletesalecars'))
router.use(require('../adminSideModules/incomeforsalecars'))

// Admin Side Modules---for--- Rent Cars
router.use(require('../adminSideModules/addrentcars'))
router.use(require('../adminSideModules/getallrentcars'))
router.use(require('../adminSideModules/incomeforrentcars'))

// Admin Side Modules---for--- Users
router.use(require('../adminSideModules/deleteuser'))
router.use(require('../adminSideModules/getallusers'))
router.use(require('../adminSideModules/deletemessage'))








module.exports = router;