// Components/About.js
import React from "react";

/**
 * About Component
 * A brief overview of the SwiftNotes application.
 */
const About = () => {
  return (
    <div>
      <h2>About SwiftNotes</h2>
      <p>
        Welcome to SwiftNotes, a simple and intuitive note-taking application
        built with the MERN (MongoDB, Express, React, Node.js) stack. SwiftNotes
        allows you to create, edit, and organize your notes seamlessly.
      </p>

      <h4>Key Features:</h4>
      <ul>
        <li>
          <strong>Effortless Note Management:</strong> SwiftNotes provides an
          easy-to-use interface for adding, editing, and deleting notes.
        </li>
        <li>
          <strong>Real-time Editing:</strong> Edit your notes on-the-fly with
          the interactive modal interface.
        </li>
        <li>
          <strong>User Authentication:</strong> Secure your notes by logging in
          with your credentials. Enjoy a personalized note-taking experience.
        </li>
        <li>
          <strong>Responsive Design:</strong> SwiftNotes is designed to work
          seamlessly across various devices, ensuring a consistent user
          experience.
        </li>
      </ul>

      <h4>Technologies Used:</h4>
      <ul>
        <li>
          <strong>Frontend:</strong> React.js, React Router, Bootstrap
        </li>
        <li>
          <strong>Backend:</strong> Node.js, Express.js
        </li>
        <li>
          <strong>Database:</strong> MongoDB (with Mongoose)
        </li>
        <li>
          <strong>State Management:</strong> React Context API
        </li>
        <li>
          <strong>Authentication:</strong> JWT (JSON Web Tokens)
        </li>
      </ul>

      <p>
        Whether you're jotting down ideas, creating to-do lists, or organizing
        your thoughts, SwiftNotes is here to simplify your note-taking
        experience. Start Swift, Stay Organized!
      </p>
    </div>
  );
};

export default About;
