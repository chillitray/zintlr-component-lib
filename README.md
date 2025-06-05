# Zintlr Component Library

A React component library by Zintlr.

## Installation

```bash
npm install zintlr-component-lib
```

## Usage

```jsx
import { HelpSupport, AccountSection } from 'zintlr-component-lib';

// Using components
function App() {
  return (
    <div>
      <HelpSupport />
      <AccountSection />
    </div>
  );
}

// Using API utilities
import { requestCaller } from 'zintlr-component-lib';

async function fetchData() {
  const response = await requestCaller({
    url: '/api/endpoint',
    method: 'GET'
  });
  return response;
}
```

## Available Components

### HelpSupport
Help and support information display component.

### AccountSection
User account management component.

## Utilities

### requestCaller
API request utility for making HTTP requests.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build package
npm run build:package
```

## License

ISC © Zintlr Private Limited 