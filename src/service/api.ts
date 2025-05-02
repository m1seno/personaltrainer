import axios from "axios";

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Tyyppimääritys, joka sisältää linkit
export type CustomerAll = {
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

// Tyyppimääritys, joka ei sisällä linkkejä
type Customer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
};

// Tyyppimääritys, joka sisältää linkit
export type TrainingAll = {
  date: string;
  duration: number;
  activity: string;
  customer?: CustomerAll;
  _links: {
    self: { href: string };
    training: { href: string };
    customer: { href: string };
  };
};

type TrainingPost = {
  date: string; // ISO-8601 muoto
  activity: string;
  duration: number;
  customer: string; // asiakaslinkki
};

// https://www.youtube.com/watch?v=_8YaUjcL0sw
// Haetaan asiakkaat REST API:sta
export const getCustomers = async (): Promise<CustomerAll[]> => {
  const response = await axios.get<{ _embedded: { customers: CustomerAll[] } }>(
    BASE_URL + "/customers"
  );
  return response.data._embedded.customers;
};

// Haetaan harjoitukset REST API:sta
export const getTrainings = async (): Promise<TrainingAll[]> => {
  const response = await axios.get<{ _embedded: { trainings: TrainingAll[] } }>(
    BASE_URL + "/trainings"
  );

  const trainings = response.data._embedded.trainings;

  // Haetaan asiakkaan tiedot jokaiselle harjoitukselle
  const trainingsWithCustomers = await Promise.allSettled(
    trainings.map(async (training) => {
      if (training._links.customer) {
        try {
          const customerResponse = await axios.get<CustomerAll>(
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
    .filter(
      (result): result is PromiseFulfilledResult<TrainingAll> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);
};

// Lisätään asiakas POST-pyynnöllä
export const addCustomer = async (customer: Customer) => {
  await axios.post(
    BASE_URL + "/customers",
    customer, // Pyynnön body, joka sisältää asiakkaan tiedot
    {
      headers: {
        "Content-Type": "application/json", // Määritetään bodyn tyyppi
      },
    }
  );
};

// Muokataan asiakasta PUT-pyynnöllä
export const updateCustomer = async (customer: CustomerAll) => {
  // Asiakkaan tiedot, jotka halutaan päivittää
  const { firstname, lastname, streetaddress, postcode, city, email, phone, _links } = customer;

  await axios.put(_links.self.href, {
    firstname,
    lastname,
    streetaddress,
    postcode,
    city,
    email,
    phone,
  });
};

// Poistetaan asiakas DELETE-pyynnöllä
export const deleteCustomer = async (customer: CustomerAll) => {
  const {_links } = customer;

  await axios.delete(_links.self.href);
};

// Lisätään harjoitus POST-pyynnöllä
export const addTraining = async (training: TrainingPost) => {
  await axios.post(BASE_URL + "/trainings", training, {
    headers: { "Content-Type": "application/json" },
  });
};

// Poistetaan harjoitus DELETE-pyynnöllä
export const deleteTraining = async (training: TrainingAll) => {
  const {_links } = training;

  await axios.delete(_links.self.href);
};