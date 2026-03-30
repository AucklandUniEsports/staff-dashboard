import prisma from "@/lib/prisma";
import { LocationCreateInput, LocationUpdateInput } from "@/app/generated/prisma/models";

export class LocationService {
    static async addLocation(data: LocationCreateInput) {
        return prisma.location.create({ data });
    }

    static async getAllLocations() {
        return prisma.location.findMany();
    }

    static async getLocationById(id: number) {
        const location = await prisma.location.findUnique({ where: { id } });
        if (!location) {
            return null;
        }
        return location;
    }

    static async updateLocation(id: number, data: LocationUpdateInput) {
        return prisma.location.update({
            where: { id },
            data,
        });
    }

    static async deleteLocation(id: number) {
        return prisma.location.delete({
            where: { id },
        });
    }

    static async deleteAllLocations() {
        return prisma.location.deleteMany();
    }
}