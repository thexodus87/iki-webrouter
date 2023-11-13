import React, { useEffect, useState } from "react";
import { NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

function Register({metin}) {
 
  
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
   
  return (
    <div>
    <Form id="search-form" role="search">
      <input
        id="q"
        className={searching ? "loading" : ""}
        aria-label="Search contacts"
        placeholder= {metin.text()}
        type="search"
        name="q"
        defaultValue={q}
        onChange={(event) => {
          const isFirstSearch = q == null;
          submit(event.currentTarget.form, {
            replace: !isFirstSearch,
          });
          submit(event.currentTarget.form);
        }}
      />
      <div id="search-spinner" aria-hidden hidden={!searching} />
      <div className="sr-only" aria-live="polite"></div>
    </Form>
    <Form method="post">
      <button type="submit">Yeni</button>
    </Form>
  </div>
  )
}

export default Register

