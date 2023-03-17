import express, { Request, Response } from "express";
import { Clinic, VetClinic } from "./types";
import { formatClinics, fetchClinics } from "./utils";

const app = express();

app.get("/clinics", async (req: Request, res: Response) => {
    const { name, state, from, to } = req.query;

    try {
        const dentalClinicsResponse = await fetchClinics<Clinic[]>(
            "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json"
        );
        const dentalClinics = dentalClinicsResponse.data;

        const vetClinicsResponse = await fetchClinics<VetClinic[]>(
            "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json"
        );
        const vetClinics = formatClinics(vetClinicsResponse.data);

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
