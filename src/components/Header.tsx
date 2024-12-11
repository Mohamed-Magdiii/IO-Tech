import React from "react";

const Header: React.FC = React.memo(() => {
  return (
    <header className="bg-gray-500 text-center text-white p-4">
      <h1 className="text-2xl font-bold">IO-Tech</h1>
      <p>Electronics & Additive Manufacturing
        ...Materially Different
      </p>
    </header>
  );
});

// this is Header component will be resuable and also not need to be render every time so i used react memo
export default Header;
