const expressModule = require('express')
const routerCharacters = expressModule.Router()

const {
    // getAllCharacters,
    getLast5Characters,
    getFilteredCharacters,

    getCharactersById
    // getAllMembers,
    // getSingleMember,
    // postMember,
    // patchMember,
    // deleteMember
} = require('../controllers/characters')

routerCharacters.route('/')
// .get(getAllCharacters)
.get(getLast5Characters)

// .post(postMember)
// .get(getAllMembers)

// routerMembers.route('/:id')
// .get(getSingleMember)
// .patch(patchMember)
// .delete(deleteMember)

routerCharacters.route('/charactersids')
.get(getCharactersById)

routerCharacters
// .route('/filter/:howMany/:side/:universe/:team/:gender/:race/:includeNameOrExactName/:characterOrFullName/:characterName')
.route('/filter') //?characterName&howMany&side&universe&team&gender&race&includeNameOrExactName&characterOrFullName
.get(getFilteredCharacters)


//   0/good/Marvel Comics/All/All/All/false/false
// /0/good/Marvel Comics/All/All/All/false/false

module.exports = routerCharacters