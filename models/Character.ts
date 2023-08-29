import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        slug: String,
        powerstats: {
            intelligence: Number,
            strength: Number,
            speed: Number,
            durability: Number,
            power: Number,
            combat: Number,
        },
        appearance: {
            gender: String,
            race: String,
            height: Array,
            weight: Array,
            eyeColor: String,
            hairColor: String,
        },
        biography: {
            fullName: String,
            alterEgos: String,
            aliases: Array,
            placeOfBirth: String,
            firstAppearance: String,
            publisher: String,
            alignment: String,
        },
        work : {
            occupation: String,
            base: String,
        },
        connections: {
            groupAffiliation: String,
            relatives: String,
        },
        images: {
            xs: String,
            sm: String,
            md: String,
            lg: String,
        }
    },
    { timestamps:true }
)

module.exports = mongoose.model("Character", CharacterSchema)