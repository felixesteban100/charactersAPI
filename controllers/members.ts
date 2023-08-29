// const Members = require('../models/Members')

// import { Request, Response } from 'express';
// import { StatusCodes } from "http-status-codes"
// const { BadRequestError, NotFoundError } = require('../errors/index')

// interface CustomRequest extends Request {
//     user: {
//         userId: string;
//     };
// }

// async function getAllMembers(req: Request, res: Response){
//     const members = await Members.find({})
//     res.status(StatusCodes.OK).json({ members, count: members.length })
// }

// async function getSingleMember(req: CustomRequest, res: Response){
//     const { user: { userId }, params: { id: memberId } } = req

//     const member = await Members.findOne({ _id: memberId, createdBy: userId })

//     if(!member) throw NotFoundError(`Not member with id ${memberId}`)

//     res.status(StatusCodes.OK).json({ member })
// }

// async function postMember(req: CustomRequest, res: Response){
//     req.body.createdBy = req.user.userId
//     const member = await Members.create(req.body)
//     res.status(StatusCodes.CREATED).send({ member })
// }

// async function patchMember(req: CustomRequest, res: Response){
//     const {
//         body: { name, age, bornDate, status },
//         user: { userId },
//         params: { id: memberId }
//     } = req

//     if(name === '' || age === '' || bornDate === '') throw new BadRequestError('All fields cannot be empty')

//     const member = await Members.findByIdAndUpdate(
//         { _id: memberId, createdBy: userId },
//         req.body,
//         {new: true, runValidators: true}
//     )

//     if(!member) throw new NotFoundError(`No member found with id ${memberId}`)

//     res.status(StatusCodes.OK).json({ member })
// }

// async function deleteMember(req: CustomRequest, res: Response){
//     const {
//         body: { name, age, bornDate, status },
//         user: { userId },
//         params: { id: memberId }
//     } = req

//     const member = await Members.findOneAndRemove({
//         _id: memberId,
//         createdBy: userId
//     })

//     if(!member) throw new NotFoundError(`No member with id ${memberId}`)

//     res.status(StatusCodes.OK).json({ msg: 'Member deleted'})
// }

// module.exports = {
//     getAllMembers,
//     getSingleMember,
//     postMember,
//     patchMember,
//     deleteMember
// }