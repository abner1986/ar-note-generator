const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Try these endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test/db`);
});