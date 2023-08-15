const mongoose = require('mongoose');
const Movie = require('./models/movie'); // Import your Movie model

mongoose.connect('mongodb://localhost/streamseeker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movies = [
  {
    title: 'Inception',
    release_year: 2010,
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    links: 'https://example.com/inception'
  },
  {
    title: 'The Shawshank Redemption',
    release_year: 1994,
    synopsis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    links: 'https://example.com/shawshank'
  },
  // Add more movie objects as needed
];

(async () => {
  try {
    await Movie.insertMany(movies);
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
})();
