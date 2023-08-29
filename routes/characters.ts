const expressModule = require('express')
const routerCharacters = expressModule.Router()

const {
    getAllCharacters,
    getFilteredCharacters

    // getAllMembers,
    // getSingleMember,
    // postMember,
    // patchMember,
    // deleteMember
} = require('../controllers/characters')

routerCharacters.route('/')
.get(getAllCharacters)

// .post(postMember)
// .get(getAllMembers)

// routerMembers.route('/:id')
// .get(getSingleMember)
// .patch(patchMember)
// .delete(deleteMember)


routerCharacters
// .route('/filter/:howMany/:side/:universe/:team/:gender/:race/:includeNameOrExactName/:characterOrFullName/:characterName')
.route('/filter') //?characterName&howMany&side&universe&team&gender&race&includeNameOrExactName&characterOrFullName
.get(getFilteredCharacters)


//   0/good/Marvel Comics/All/All/All/false/false
// /0/good/Marvel Comics/All/All/All/false/false

module.exports = routerCharacters