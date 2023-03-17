import axios, { AxiosResponse } from "axios";
import { Clinic, VetClinic } from "../types";

export const formatClinics = (clinics: VetClinic[]): Clinic[] => {
    return clinics.map((clinic) => ({
        name: clinic.clinicName,
        stateName: clinic.stateCode,
        availability: clinic.opening,
    }));
};

export const fetchClinics = async <T>(
    url: string
): Promise<AxiosResponse<T>> => {
    const response = await axios.get<T>(url);
    return response;
};
