const Character = require('../models/Character')

import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes"
import { filterCharacters } from '../functions';
// const { BadRequestError, NotFoundError } = require('../errors/index')

// interface CustomRequest extends Request {
//     user: {
//         userId: string;
//     };
// }

async function getAllCharacters(req: Request, res: Response) {
    const characters = await Character.find({})
    res.status(StatusCodes.OK).json(characters)
}

async function getFilteredCharacters(req: Request, res: Response) {
    let { characterName, howMany, side, universe, team, gender, race, includeNameOrExactName, characterOrFullName } = req.query
    const allCharacters = await Character.find({})

    // console.table({ characterName, howMany, side, universe, team, gender, race, includeNameOrExactName, characterOrFullName })

    const checkCharacterName = typeof characterName !== 'string'  ? "" : characterName
    const checkHowMany = typeof howMany !== 'string'  ? 0 : parseInt(howMany)
    const checkSide = typeof side !== 'string'  ? "All" : side
    const checkUniverse = typeof universe !== 'string'  ? "All" : universe
    const checkTeam = typeof team !== 'string'  ? "All" : team
    const checkGender = typeof gender !== 'string'  ? "All" : gender
    const checkRace = typeof race !== 'string'  ? "All" : race
    const checkIncludeNameOrExactName = typeof includeNameOrExactName !== 'string'  ? false : (includeNameOrExactName === "true")
    const checkCharacterOrFullName = typeof characterOrFullName !== 'string'  ? false : (characterOrFullName === "true")

    const charactersFounded = filterCharacters(allCharacters, checkCharacterName, checkHowMany, checkSide, checkUniverse, checkTeam, checkGender, checkRace, checkIncludeNameOrExactName, checkCharacterOrFullName)

    res.status(StatusCodes.OK).json(charactersFounded)
}


module.exports = {
    getAllCharacters,
    getFilteredCharacters
}