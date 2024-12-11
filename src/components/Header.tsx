import React from "react";

const Header: React.FC = React.memo(() => {
  return (
    <header className="bg-gray-500 text-center text-white p-4">
      <h1 className="text-2xl font-bold">IO-Tech</h1>
      <p>Your one-stop solution for everything!</p>
    </header>
  );
});

export default Header;
