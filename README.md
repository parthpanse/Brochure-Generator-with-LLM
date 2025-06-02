# AI-Powered Company Brochure Generator

A MERN stack web application that automatically generates professional company brochures by intelligently scraping and analyzing company websites.

## Features

- Input company name and website URL to generate a professional brochure
- Intelligent website scraping and content analysis
- Beautiful markdown output
- Responsive web design
- Save and manage generated brochures
- User authentication (optional)

## Tech Stack

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js/Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI GPT-4
- **Additional Tools**: Python (for web scraping), BeautifulSoup4

## Project Structure

```
brochure-generator/
├── client/                 # React frontend
├── server/                 # Node.js/Express backend
├── python-service/         # Python scraping service
└── README.md
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install

   # Install Python dependencies
   cd ../python-service
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Create `.env` files in both server and python-service directories
   - Add required environment variables (see .env.example files)

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start

   # Start Python service
   cd ../python-service
   python app.py
   ```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Python Service (.env)
```
OPENAI_API_KEY=your_openai_api_key
FLASK_PORT=5001
```

## API Endpoints

### POST /api/brochure/generate
Generate a new brochure
```json
{
  "companyName": "Company Name",
  "websiteUrl": "https://company.com"
}
```

### GET /api/brochure/:id
Retrieve a generated brochure

### GET /api/brochures
List all generated brochures

## License

<<<<<<< HEAD
MIT 
=======
MIT 
>>>>>>> ee7a80ec8c93600ce8c7f8909dac15c678086506
