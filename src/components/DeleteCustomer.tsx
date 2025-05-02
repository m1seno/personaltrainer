import { Button } from "@mui/material";
import React from "react";
import { CustomerGet, deleteCustomer } from "../service/api";
import { toast } from "react-toastify";

interface Props {
    onCustomerDeleted: () => void; // Callback-funktio, joka kutsutaan kun asiakas on poistettu
    currentCustomer: CustomerGet;
}

export default function DeleteCustomer({onCustomerDeleted, currentCustomer}: Props) {
    
    const handleDelete = async () => {
        try {
        await deleteCustomer(currentCustomer);
        toast.success("Asiakas poistettu");
        onCustomerDeleted();
        } catch (error) {
        console.error(error);
        toast.error("Asiakkaan poisto epäonnistui");
        }
    };
    
    return (
        <React.Fragment>
        <Button variant="contained" color="error" size="small" onClick={handleDelete}>
            Delete
        </Button>
        </React.Fragment>
    );
}