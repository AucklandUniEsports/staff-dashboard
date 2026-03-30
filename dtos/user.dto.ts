import { UserModel } from "@/app/generated/prisma/models";

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    role?: string | null;
    emailVerified: boolean | null;
    image?: string | null;
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
}

export function toUserDTO(
    user: UserModel
): UserDTO {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || null,
        emailVerified: user.emailVerified,
        image: user.image || null,
        banned: user.banned || null,
        banReason: user.banReason || null,
        banExpires: user.banExpires || null
    };
}
