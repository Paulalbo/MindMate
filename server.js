import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import events from './src/assets/data.json' assert { type: "json" };



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// API to get events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// API to update event status
app.put('/api/events/:eventId', (req, res) => {
  const { eventId } = req.params;
  const { finished } = req.body;

  events = events.map(event =>
    event.id === eventId ? { ...event, finished } : event
  );

  res.json(events);
});

// Start the server
const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
