import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto prose">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to BotAlto. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>

      <h2>2. Information We Collect</h2>
      <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform or otherwise when you contact us.</p>
      <p>The personal information we collect may include the following: Name, Email Address, Bot Tokens, and Command data.</p>

      <h2>3. How We Use Your Information</h2>
      <p>We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
      
      <h2>4. Will Your Information Be Shared With Anyone?</h2>
      <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
    </div>
  );
};

export default Privacy;
