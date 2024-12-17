'use client';
import React, { FormEvent, useState } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';

function MusicSchoolContactUs() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // Added name state
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Use event.currentTarget for better type safety
    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (apiKey) {
      // Append API key to form data only if it exists
      formData.append('access_key', apiKey);
    } else {
      console.error('API key is not defined');
      setErrorMessage('API key is not configured.');
      return;
    }

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Send form data to Web3Forms API
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    });

    const result = await res.json();
    if (res.ok && result.success) {
      setSubmitted(true);
      setName(''); // Clear name field
      setEmail(''); // Clear email field
      setMessage(''); // Clear message field
      setErrorMessage(''); // Clear any error message
      console.log('Email sent successfully:', result);
    } else {
      console.error('Failed to send email:', result);
      setErrorMessage(result.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20 pt-32 relative">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Contact Us
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
          We&apos;re here to help with any questions about our courses,
          programs, or events. Reach out and let us know how we can assist you
          in your musical journey.
        </p>

        {submitted ? (
          <p className="text-center text-green-500">Thank you! Your message has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
              required
            />
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
              rows={5}
              required
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Send Message
            </button>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Display error message */}
          </form>
        )}
      </div>
    </div>
  );
}

export default MusicSchoolContactUs;
