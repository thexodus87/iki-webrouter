import React, { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import Register from "./Register";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const handleFavoriteClick = async (contactId, currentFavorite) => {
    // Burada favori durumunu güncelleyebilir veya sunucuya gönderebiliriz
    console.log(`Toggle favorite for contact ${contactId}`);
    
    // Favori durumunu yerel bir state kullanarak güncelle
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, favorite: !currentFavorite }
          : contact
      )
    );
  };

  const [stateContacts, setContacts] = useState(contacts);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Ürünler</h1>
        <Register metin={{ text: () => "Arama yapın" }} />


        <nav>
          {stateContacts.length ? (
            <ul>
              {stateContacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                  to={`contacts/${contact.id}`}
                  className={({isActive, isPending})=>
                isActive ? "active" : isPending ? "pending" : ""
                }
                  >
                    {contact.first}{contact.last}
                    <span
                    role="img"
                    aria-label="Favorite"
                    onClick={()=> handleFavoriteClick(contact.id,contact.favorite)}
                    style={{cursor:"pointer"}}
                    >
                        {contact.favorite ? "★" : "☆" }
                    </span>

                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>Kontak Bulunmuyor</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
