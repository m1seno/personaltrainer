import { Button } from "@mui/material";
import React from "react";
import { CustomerGet, deleteCustomer } from "../service/api";
import { toast } from "react-toastify";
import confirm from "../service/useConfirm";

interface Props {
  onCustomerDeleted: () => void; // Callback-funktio, joka kutsutaan kun asiakas on poistettu
  currentCustomer: CustomerGet;
}

export default function DeleteCustomer({
  onCustomerDeleted,
  currentCustomer,
}: Props) {
  const handleDelete = async () => {
    const confirmed = await confirm({
      confirmation: "Are you sure you want to delete this customer?", // Näytetään vahvistusdialogi
    });
    if (!confirmed) {
      return; // Käyttäjä peruutti poiston
    }
    try {
      await deleteCustomer(currentCustomer);
      toast.success("Customer deleted successfully");
      onCustomerDeleted();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete customer");
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </React.Fragment>
  );
}
