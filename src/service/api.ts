import axios from "axios";

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

export type Customer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  _links: {
    self: { href: string };
    customer: { href: string };
    trainings: { href: string };
  };
};

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get<{ _embedded: { customers: Customer[] } }>(
    BASE_URL + "/customers"
  );
  return response.data._embedded.customers;
};

export interface Training {
  date: string;
  duration: number;
  activity: string;
  _links: {
    self: { href: string };
    training: { href: string };
    customer: { href: string };
  }
}

export const getTrainings = async (): Promise<Training[]> => {
  const response = await axios.get<{ _embedded: { trainings: Training[] } }>(
    BASE_URL + "/trainings"
  );
  return response.data._embedded.trainings;
};
