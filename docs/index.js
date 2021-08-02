import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const PORT = 4000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./swagger.yaml')));

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}/api-docs`);
});