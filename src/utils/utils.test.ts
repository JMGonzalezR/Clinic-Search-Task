import { Clinic, VetClinic } from "../types";
import { formatClinics } from "./index";

jest.mock("axios");

describe("formatClinics", () => {
    it("should convert VetClinic objects to Clinic objects", () => {
        const vetClinics: VetClinic[] = [
            {
                clinicName: "ABC Veterinary Clinic",
                stateCode: "CA",
                opening: {
                    from: "09:00",
                    to: "17:00",
                },
            },
            {
                clinicName: "XYZ Animal Hospital",
                stateCode: "NY",
                opening: {
                    from: "10:00",
                    to: "18:00",
                },
            },
        ];

        const expectedClinics: Clinic[] = [
            {
                name: "ABC Veterinary Clinic",
                stateName: "CA",
                availability: {
                    from: "09:00",
                    to: "17:00",
                },
            },
            {
                name: "XYZ Animal Hospital",
                stateName: "NY",
                availability: {
                    from: "10:00",
                    to: "18:00",
                },
            },
        ];

        const actualClinics = formatClinics(vetClinics);
        expect(actualClinics).toEqual(expectedClinics);
    });
});
