import prisma from "../lib/prisma";
import { UserDTO, toUserDTO } from "@/dtos/user.dto";
import { UserCreateInput, UserUpdateInput } from "@/app/generated/prisma/models";

export class UserService {
    static async getAllUsers(): Promise<UserDTO[]> {
        const users = await prisma.user.findMany();
        return users.map(toUserDTO);
    }

    static async getUserById(id: string): Promise<UserDTO | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return null;
        }
        return toUserDTO(user);
    }

    static async createUser(data: UserCreateInput): Promise<UserDTO> {
        const user = await prisma.user.create({
            data,
        });

        return toUserDTO(user);
    }

    static async updateUser(
        id: string,
        data: UserUpdateInput
    ): Promise<UserDTO> {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return toUserDTO(user);
    }

    static async deleteUser(id: string) {
        const user = await prisma.user.delete({
            where: { id },
        });

        return user;
    }

    static async deleteAllUsers() {
        const result = await prisma.user.deleteMany();
        return result;
    }
    
}
