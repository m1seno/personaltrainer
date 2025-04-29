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

// https://www.youtube.com/watch?v=_8YaUjcL0sw
// Haetaan asiakkaat REST API:sta
export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get<{ _embedded: { customers: Customer[] } }>(
    BASE_URL + "/customers"
  );
  return response.data._embedded.customers;
};

export type Training = {
  date: string;
  duration: number;
  activity: string;
  customer?: Customer;
  _links: {
    self: { href: string };
    training: { href: string };
    customer: { href: string };
  }
}

// Haetaan harjoitukset REST API:sta
export const getTrainings = async (): Promise<Training[]> => {
  const response = await axios.get<{ _embedded: { trainings: Training[] } }>(
    BASE_URL + "/trainings"
  );

  const trainings = response.data._embedded.trainings;

  // Haetaan asiakkaan tiedot jokaiselle harjoitukselle
  const trainingsWithCustomers = await Promise.allSettled(
    trainings.map(async (training) => {
      if (training._links.customer) {
        try {
          const customerResponse = await axios.get<Customer>(
            training._links.customer.href
          );
          training.customer = customerResponse.data; // Lisätään asiakasobjekti harjoitukseen
        } catch (error) {
          console.error("Asiakastietojen haku epäonnistui:", error);
        }
      }
      return training;
    })
  );

  // https://stackoverflow.com/questions/64928212/how-to-use-promise-allsettled-with-typescript
  // Suodatetaan vain onnistuneet tulokset ja palautetaan ne
  return trainingsWithCustomers
    .filter((result): result is PromiseFulfilledResult<Training> => result.status === "fulfilled")
    .map((result) => result.value);
};
