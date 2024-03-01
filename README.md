# ChatBot using Gemini API with MongoDB Integration and Docker Deployment

This project aims to create a ChatBot using the Gemini API for natural language processing. The conversations with the ChatBot will be stored in a MongoDB database for future reference and analysis. Additionally, the project utilizes Docker to containerize the ChatBot application and MongoDB, enabling easy deployment and communication between the two containers.

## Features
- Utilizes Gemini API for natural language processing and ChatBot functionality.
- Stores conversations in a MongoDB database for persistence and analysis.
- Dockerized deployment for easy setup and management.
- Enables communication between the ChatBot application and MongoDB container.

## Technologies Used
- Gemini API
- MongoDB
- Docker

## Setup Instructions
1. Clone the repository from GitHub:

```
git clone https://github.com/JeddineO/GeminiChatbot.git
```

2. Navigate to the project directory:

```
cd GeminiChatbot
```

3. Set up Gemini API credentials:
   - Obtain API credentials from Gemini and replace them in the appropriate configuration file (e.g., `app.js`).

4. Configure MongoDB connection:
   - Update the MongoDB connection settings in the ChatBot application to point to your MongoDB instance.

5. Build Docker containers:
   - Use Dockerfile(s) provided in the repository to build Docker images for both the ChatBot application and MongoDB container.

6. Run Docker containers:
   - Start both Docker containers, ensuring they can communicate with each other.

7. Test the setup:
   - Interact with the ChatBot to verify its functionality and ensure conversations are being stored in MongoDB.

## Usage
- Once the setup is complete, users can interact with the ChatBot using predefined commands or natural language input.
- Conversations will be stored in the MongoDB database, allowing for analysis and retrieval of past interactions.

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository's `master` branch.



