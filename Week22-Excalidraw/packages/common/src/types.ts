import {z} from 'zod';


export const UserSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(8),
    email: z.string().email(),
});


export const SigninSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(8),
})


export const createRoomSchema = UserSchema.extend({
    roomName: z.string().min(3).max(50),
     
})