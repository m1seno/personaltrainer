import axios from "axios";

const baseURL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

export interface Customer{
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
}

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await axios.get<{ content: Customer[] }>(baseURL + '/customers');
    return response.data.content;
};