import express, { Request, Response } from "express";
import axios from "axios";

interface Clinic {
    name: string;
    stateName: string;
    availability: {
        from: string;
        to: string;
    };
}

interface VetClinic {
    clinicName: string;
    stateCode: string;
    opening: {
        from: string;
        to: string;
    };
}

const app = express();

app.get("/clinics", async (req: Request, res: Response) => {
    const { name, state, from, to } = req.query;

    try {
        const dentalClinicsResponse = await axios.get<Clinic[]>(
            "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json"
        );
        const dentalClinics = dentalClinicsResponse.data;

        const vetClinicsResponse = await axios.get<VetClinic[]>(
            "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json"
        );
        const vetClinics = vetClinicsResponse.data.map((clinic) => ({
            name: clinic.clinicName,
            stateName: clinic.stateCode,
            availability: clinic.opening,
        }));

        const clinics: Clinic[] = [...dentalClinics, ...vetClinics];

        const filteredClinics = clinics.filter((clinic) => {
            if (
                typeof name === "string" &&
                !clinic.name.toLowerCase().includes(name.toLowerCase())
            ) {
                return false;
            }

            if (
                typeof state === "string" &&
                !clinic.stateName.toLowerCase().includes(state.toLowerCase())
            ) {
                return false;
            }

            if (typeof from === "string" && clinic.availability.from > from) {
                return false;
            }

            if (typeof to === "string" && clinic.availability.to < to) {
                return false;
            }

            return true;
        });

        res.status(200).json(filteredClinics);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching clinics");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 8000");
});

export default app;
