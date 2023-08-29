import { Character } from "../types";

export function filterCharacters(allCharacters: Character[], characterName: string, howMany: number, side: string, universe: string, team: string, gender: string, race: string, includeNameOrExactName: boolean, characterOrFullName: boolean) {
    let firstFilter: Character[] = []
    const randomizedArray = allCharacters.sort(() => Math.random() - 0.5);

    // filter name
    firstFilter = filterName(firstFilter, randomizedArray, characterName, includeNameOrExactName, characterOrFullName);

    // filter how Many
    firstFilter = firstFilter.reduce((acc: Character[], current: Character) => {
        if ((howMany === 0 || howMany === null) || acc.length < howMany) {
            let isMatched = 0

            // filter attributes
            isMatched = (team === 'All' || current.connections.groupAffiliation?.toLowerCase().includes(team.toLowerCase())) ? isMatched + 1 : isMatched
            isMatched = (race === 'All' || (current.appearance.race !== null && current.appearance.race.toLowerCase().includes(race.toLowerCase()))) ? isMatched + 1 : isMatched
            isMatched = (gender === 'All' || current.appearance.gender === gender) ? isMatched + 1 : isMatched
            isMatched = (side === 'All' || current.biography.alignment === side) ? isMatched + 1 : isMatched
            isMatched = (universe === 'All' || current.biography.publisher === universe) ? isMatched + 1 : isMatched

            if (isMatched === 5) acc.push(current)
        }

        return acc
    }, [])

    return firstFilter
}


function filterName(firstFilter: Character[], randomizedArray: Character[], characterName: string, includeNameOrExactName: boolean, characterOrFullName: boolean) {
    if (characterName === "") {
        firstFilter = randomizedArray;
    }

    if (characterName !== "") {
        let resultArr: Character[] = [];
        let name = [characterName];

        if (characterName.includes(",")) name = characterName.split(",").map(current => current.trim());

        name.forEach((currentName) => {
            randomizedArray.forEach(charac => {
                let comparison;

                if (includeNameOrExactName === true) {
                    comparison = characterOrFullName === false
                        ? charac.name.toLowerCase().includes(currentName.toLowerCase())
                        : charac.biography.fullName.toLowerCase().includes(currentName.toLowerCase());
                } else {
                    comparison = characterOrFullName === false
                        ? charac.name.toLowerCase() === currentName.toLowerCase()
                        : charac.biography.fullName.toLowerCase() === currentName.toLowerCase();
                }

                if (comparison === true && (!resultArr.some(obj => obj.name === currentName) || includeNameOrExactName === true)) {
                    resultArr.push(charac);
                }
            });
        });
        firstFilter = resultArr;
    }
    return firstFilter;
}