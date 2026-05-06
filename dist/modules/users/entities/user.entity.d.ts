import { Role } from '../../../common/enums/role.enum';
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Role;
    isActive: boolean;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(plainPassword: string): Promise<boolean>;
}
