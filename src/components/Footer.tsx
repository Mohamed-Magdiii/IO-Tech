  import React from "react";

  const Footer: React.FC =  React.memo(() => {
    return (
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-gray-800 text-white p-4 text-center ">
        <p>&copy; {new Date().getFullYear()} IO-Tech. All rights reserved.</p>
      </footer>
    );
  });

  export default Footer;
