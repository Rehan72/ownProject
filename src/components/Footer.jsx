import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#A3A3CC] text-[#292966] p-6">
      <div className="container mx-auto text-center ">
        &copy; {new Date().getFullYear()} ITC Smart Card. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;