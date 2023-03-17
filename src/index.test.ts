import request from "supertest";
import app from "./index";

describe("GET /clinics", () => {
    it("should return clinics filtered by name", async () => {
        const response = await request(app).get("/clinics?name=City");
        expect(response.status).toBe(200);

        expect(response.body[0].name).toBe("City Vet Clinic");
    });

    it("should return clinics filtered by state", async () => {
        const response = await request(app).get("/clinics?state=CA");
        expect(response.status).toBe(200);

        expect(response.body[0].stateName).toBe("California");
    });

    it("should return clinics filtered by availability from and to", async () => {
        const response = await request(app).get("/clinics?from=08:00&to=17:00");
        expect(response.status).toBe(200);

        expect(response.body[0].availability).toEqual({
            from: "07:00",
            to: "22:00",
        });
    });

    it("should return clinics filtered by from", async () => {
        const response = await request(app).get("/clinics?from=08:00");
        expect(response.status).toBe(200);

        expect(response.body[0].availability.from).toEqual("07:00");
    });

    it("should return clinics filtered by to", async () => {
        const response = await request(app).get("/clinics?to=17:00");
        expect(response.status).toBe(200);

        expect(response.body[0].availability.to).toEqual("19:30");
    });

    it("should return filtered by all the field", async () => {
        const response = await request(app)
            .get("/clinics")
            .query({
                name: "Tufts",
                state: "Kansas",
                from: "10:00",
                to: "18:00",
            })
            .expect(200);

        expect(response.body).toEqual([
            {
                name: "Tufts Medical Center",
                stateName: "Kansas",
                availability: {
                    from: "10:00",
                    to: "23:00",
                },
            },
        ]);
    });

    it("should return an empty array if no clinics match the search criteria", async () => {
        const response = await request(app)
            .get("/clinics")
            .query({
                name: "Invalid",
                state: "Invalid",
                from: "10:00",
                to: "18:00",
            })
            .expect(200);

        expect(response.body).toEqual([]);
    });

    it("should return an error message if there is an error fetching the clinics", async () => {
        const mockError = new Error("Failed to fetch clinics");
        jest.spyOn(require("axios"), "get").mockRejectedValueOnce(mockError);

        const response = await request(app).get("/clinics").expect(500);

        expect(response.text).toEqual("Error fetching clinics");
    });
});
