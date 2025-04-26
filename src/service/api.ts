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
