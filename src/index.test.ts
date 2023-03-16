import request from "supertest";
import app from "./index";

describe("GET /clinics", () => {
    it("should return the list of clinics based on the search criteria", async () => {
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
                state: "Kansas",
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
