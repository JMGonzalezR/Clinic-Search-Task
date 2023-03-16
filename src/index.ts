import express, { Request, Response } from "express";
import axios from "axios";

interface Clinic {
    name: string;
    state: string;
    availability: {
        from: string;
        to: string;
    };
}

const app = express();

app.get("/clinics", async (req: Request, res: Response) => {
    const { name, state, from, to } = req.query;

    try {
        const response = await axios.get<Clinic[]>(
            "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json"
        );
        const clinics = response.data;

        res.send(clinics);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
