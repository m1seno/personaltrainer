import axios from "axios";

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Tyyppimääritys GET-pyynnölle, joka sisältää linkit
export type CustomerGet = {
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

// Tyyppimääritys POST-pyynnölle, joka ei sisällä linkkejä
export type CustomerPost = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
};

export type Training = {
  date: string;
  duration: number;
  activity: string;
  customer?: CustomerGet;
  _links: {
    self: { href: string };
    training: { href: string };
    customer: { href: string };
  };
};

// https://www.youtube.com/watch?v=_8YaUjcL0sw
// Haetaan asiakkaat REST API:sta
export const getCustomers = async (): Promise<CustomerGet[]> => {
  const response = await axios.get<{ _embedded: { customers: CustomerGet[] } }>(
    BASE_URL + "/customers"
  );
  return response.data._embedded.customers;
};

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
          const customerResponse = await axios.get<CustomerGet>(
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
      (result): result is PromiseFulfilledResult<Training> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);
};

// Lisätään asiakas POST-pyynnöllä
export const addCustomer = async (customer: CustomerPost) => {
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

export const updateCustomer = async (customer: CustomerGet) => {
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

export const deleteCustomer = async (customer: CustomerGet) => {
  const {_links } = customer;

  await axios.delete(_links.self.href);
};
