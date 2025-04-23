# Church CRM

A modern Church Management System built with React, featuring member management, event scheduling, donation tracking, and pastoral care tools.

## Features

- Member Management
- Event Scheduling
- Donation Tracking
- Pastoral Care
- Family Relationships
- Skills Inventory
- QR Code Attendance
- Birthday Notifications
- Follow-up Workflow

## Getting Started

### Prerequisites

- Node.js (v16.x or v18.x)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/church-crm.git
cd church-crm
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STORAGE_KEY=church_crm_storage
```

4. Start the development server:
```bash
npm start
```

## Testing

The project includes a comprehensive testing suite:

### Unit Tests
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Tests
```bash
# Run integration tests
npm run test:integration
```

### E2E Tests
```bash
# Run Cypress tests in headless mode
npm run test:e2e

# Open Cypress Test Runner
npm run test:e2e:open
```

### Accessibility Tests
```bash
# Run accessibility tests
npm run test:a11y
```

## Development

### Code Style

The project uses ESLint and Prettier for code formatting. Run linting:
```bash
npm run lint
```

### Git Workflow

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push your changes:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

### CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- Unit tests run on every push and pull request
- E2E tests run on pull requests to main/develop branches
- Accessibility tests ensure WCAG 2.0 Level AA compliance
- Code coverage reports are uploaded to Codecov

## Project Structure

```
church-crm/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   └── utils/          # Utility functions
├── cypress/
│   ├── e2e/           # E2E tests
│   └── support/       # Cypress support files
├── .github/
│   └── workflows/     # GitHub Actions
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
