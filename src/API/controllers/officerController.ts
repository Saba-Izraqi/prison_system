// import { Request, Response } from "express";
// import { OfficerRepository } from "../../infrastructure/repo/officerRepository";
// import { OfficerRole,Shift } from "../../domain/enums";
// import bcrypt from "bcrypt";

// const officerRepo = new OfficerRepository();

// export const createOfficer = async (req: Request, res: Response) => {

//     try{
//         const { name, username , password,shift,role,assignedPrisonId } = req.body;

//         const requiredFields = [name, username, password, shift, role, assignedPrisonId];
//         for (const field of requiredFields) {
//             if (!field) {
//                 return res.status(400).json({ message: "All fields are required" });
//             }
//         }
//         if (!Object.values(OfficerRole).includes(role)) {
//             return res.status(400).json({ message: "Invalid officer role" });
//         }
//         if (!Object.values(Shift).includes(shift)) {
//             return res.status(400).json({ message: "Invalid shift" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const officerData = {
//             id,
//             name,
//             username,
//             password: hashedPassword,
//             shift,
//             role,
//             assignedPrisonId,
//             prison: { id: assignedPrisonId },
//             cells: [],
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         };
        
//         const createdOfficer = await officerRepo.create(officerData);
        
//         return res.status(201).json({
//             message: "Officer created successfully",
//             data : createdOfficer,
//         });
//     }catch (error : any) {
//         console.error("Error creating officer:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message,
//         });
//     };
// };
