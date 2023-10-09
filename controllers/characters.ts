const Character = require('../models/Character')

import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes"
import { filterCharacters } from '../functions';
import { Character } from '../types';
// const { BadRequestError, NotFoundError } = require('../errors/index')

// interface CustomRequest extends Request {
//     user: {
//         userId: string;
//     };
// }

/* async function getAllCharacters(req: Request, res: Response) {
    const characters = await Character.find({})
    res.status(StatusCodes.OK).json(characters)
} */

async function getLast5Characters(req: Request, res: Response) {
    const characters = await Character.find({}).limit(5)
    console.log("ok")

    res.status(StatusCodes.OK).json(characters)
}

async function getFilteredCharacters(req: Request, res: Response) {
    const { characterName, howMany, side, universe, team, gender, race, includeNameOrExactName, characterOrFullName } = req.query
    const allCharacters: Character[] = await Character.find({})

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

async function getCharactersById(req: Request, res: Response){
    const allCharacters: Character[] = await Character.find({})

    const { ids } = req.query
    
    if(typeof ids === 'string' && JSON.parse(ids).length > 0){
        const founded = JSON
        .parse(ids)
        .replace(/\[|\]/g,'')
        .split(',')
        .map((idC: string) => allCharacters.find(c => c.id === parseInt(idC)))
        
        res.status(StatusCodes.OK).json(founded)
        // res.status(StatusCodes.OK).json([])
    }else{
        res.status(StatusCodes.OK).json([])
    }
}


module.exports = {
    // getAllCharacters,
    getLast5Characters,
    getFilteredCharacters,
    getCharactersById
}