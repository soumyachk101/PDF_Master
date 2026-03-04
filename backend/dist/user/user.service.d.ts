import { PrismaService } from '../common/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        subscription: {
            id: string;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            createdAt: Date;
            updatedAt: Date;
            plan: import(".prisma/client").$Enums.PlanType;
            stripeCustomerId: string | null;
            stripeSubscriptionId: string | null;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            userId: string;
        } | null;
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        usageRecords: {
            id: string;
            createdAt: Date;
            userId: string | null;
            toolType: import(".prisma/client").$Enums.JobType;
            ipAddress: string;
            fileCount: number;
            totalSize: bigint;
        }[];
    }>;
}
