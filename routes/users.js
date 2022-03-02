const express = require('express');
const router = express.Router();
const {userController} = require('../controller/users')

router.post('/new-user', userController.postUserData);              // done
router.get('/all-users', userController.getAllUserData);            // done
router.get('/:id', userController.getUserData);                     // done
router.delete('/:id/delete', userController.deleteUserData);        // done

/*
FIXME: 
1. put methode is not validated  :(
*/
router.put('/:id/update-all', userController.updateAllUserData);    // pending validation
router.patch('/:id/update-few', userController.updateFewUserData);  // done


module.exports = router;