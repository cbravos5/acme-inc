# Summary

- [About](#about)
- [Quick Start](#start)
- [Technical persistence details](#technical-details)
- [Built using](#built_using)

# About <a id="about"></a>

This project is a WebApp built with NextJs 13, that simulates a fictional company named Acme inc. that sells generic products.

# Quick Start <a id="start"></a>

### Clone the repository:
```bash
git clone https://github.com/cbravos5/acme-inc.git
```

### CD into reposory folder and install the app packages:
```bash
npm install
```

### Set the enviroment variables:

Create a **.env** file according to the example in **.env.example**

## Start the app in development mode:
```bash
npm run dev
```

## Usage
The default app URL is http://localhost:3000.

- **'/'**
  - Paged products list, with search bar and starred filter.
- **'/sign-in'**
  - Form to sing in in the application
- **'/sign-up'**
  - Form to create your account
- **'/products/[id]'**
  - Product specific page containing all product details
- **'/checkout'**
  - Page containing all the products added to cart (only allows finishing if signed in)

## Technical details
This project uses frontend only tools, so the persistence is made using localStorage.

Below, are some details about how each model persistence works:
- **User data**:
  - When the user creates an account, his basic info is stored in the localStorage with his password encrypted.
  - When the user wishes to sign in, the storage is searched for the user and, if found, the password and password hash are compared.
- **Products**
  - When first accessed, the application verifies if there is a stored list of products and create a global instance to get the same products every time. If no product is stored, then it's generated a new list and stored.
- **Starred Products**
  - The list of starred products is also stored in the localStorage. When a signed user stars a product, it triggers a function call that stores the product id and the user email.
- **Cart**
  - The products cart is the only model that is not persisted. Everytime the page is reloaded the cart loses its state.

## Built using <a id="built_using"></a>

- [NextJs](https://nextjs.org/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Main language
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Jotai](hhttps://jotai.org/) - State Management Library