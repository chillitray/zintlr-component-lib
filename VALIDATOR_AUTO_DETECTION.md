# Validator Auto-Detection for Request Caller

This feature allows the `request_caller` to automatically detect and use Yup validators from the main repository where this component library is used, eliminating the need to manually pass validators for each request.

## Features

- **Auto-detection**: Automatically finds validators using multiple strategies
- **Multiple Sources**: Supports global scope, meta tags, localStorage, and custom loaders
- **Caching**: Caches validators in localStorage for better performance
- **Fallback**: Gracefully falls back to no validation if validators aren't found
- **Flexible**: Can be configured to use specific detection strategies

## Usage

### Basic Usage (Auto-Detection Enabled by Default)

```javascript
import { request_caller } from 'zintlr-component-lib';

// Validators will be auto-detected
const response = await request_caller({
  method: 'post',
  endpoint: '/api/users',
  data: { name: 'John', email: 'john@example.com' },
  domain: 'https://api.example.com',
});
```

### Using Helper Functions

```javascript
import {
  createRequestCaller,
  initializeValidators,
  addValidators
} from 'zintlr-component-lib';

// Initialize validators at app startup
initializeValidators({
  '/api/users': {
    name: yup.string().required(),
    email: yup.string().email().required(),
  },
  '/api/posts': {
    title: yup.string().required(),
    content: yup.string().min(10),
  },
});

// Create a configured request caller
const apiCaller = createRequestCaller({
  domain: 'https://api.example.com',
  successToast: true,
});

// Use the configured caller
const response = await apiCaller({
  method: 'post',
  endpoint: '/api/users',
  data: { name: 'John', email: 'john@example.com' },
});
```

### Manual Validator Management

```javascript
import { addValidators, clearValidators } from 'zintlr-component-lib';

// Add validators dynamically
addValidators({
  '/api/comments': {
    text: yup.string().required().min(1),
    postId: yup.number().required(),
  },
});

// Clear all validators
clearValidators();
```

## Auto-Detection Strategies

### 1. Global Scope Detection

The auto-detector checks for validators in the global scope (window object):

```javascript
// In your main app, expose validators globally
window.yupValidators = {
  '/api/users': {
    name: yup.string().required(),
    email: yup.string().email().required(),
  },
};

// Or use other common names
window.validators = { /* your validators */ };
window.validationSchemas = { /* your validators */ };
window.YUP_VALIDATORS = { /* your validators */ };
```

### 2. Meta Tags Detection

Add validators to your HTML using meta tags:

```html
<meta name="yup-validators" content='{
  "/api/users": {
    "name": {"type": "string", "required": true},
    "email": {"type": "string", "email": true, "required": true}
  }
}' />
```

### 3. Script Tag Detection

Add validators using data attributes on script tags:

```html
<script data-validators='{
  "/api/users": {
    "name": {"type": "string", "required": true},
    "email": {"type": "string", "email": true, "required": true}
  }
}'>
</script>
```

### 4. Custom Loader Function

Provide a custom function to load validators:

```javascript
import { request_caller } from 'zintlr-component-lib';

const response = await request_caller({
  method: 'post',
  endpoint: '/api/users',
  data: { name: 'John', email: 'john@example.com' },
  domain: 'https://api.example.com',
  validatorOptions: {
    customLoader: async () => {
      // Load validators from your preferred source
      const response = await fetch('/api/validators');
      return response.json();
    },
  },
});
```

## Configuration Options

### Auto-Detection Options

```javascript
const response = await request_caller({
  // ... other options
  autoDetectValidators: true, // Enable/disable auto-detection
  validatorOptions: {
    useGlobalScope: true,     // Check global scope
    useMetaTags: true,        // Check meta tags
    useLocalStorage: true,    // Check localStorage
    customLoader: null,       // Custom loader function
  },
});
```

### Disable Auto-Detection

```javascript
const response = await request_caller({
  method: 'post',
  endpoint: '/api/users',
  data: { name: 'John', email: 'john@example.com' },
  domain: 'https://api.example.com',
  autoDetectValidators: false, // Disable auto-detection
  yup_validators: {            // Use manual validators
    '/api/users': {
      name: yup.string().required(),
      email: yup.string().email().required(),
    },
  },
});
```

## Validator Schema Format

Validators should be objects where keys are endpoints and values are Yup schemas:

```javascript
const validators = {
  '/api/users': {
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number().min(18, 'Must be at least 18'),
  },
  '/api/posts': {
    title: yup.string().required('Title is required').min(3, 'Title too short'),
    content: yup.string().required('Content is required').min(10, 'Content too short'),
    tags: yup.array().of(yup.string()),
  },
};
```

## Error Handling

The auto-detection system is designed to fail gracefully:

- If no validators are found, validation is skipped
- If validators are found but invalid, validation errors are shown
- All detection failures are logged as warnings, not errors

## Performance Considerations

- Validators are cached in localStorage for better performance
- Auto-detection only runs once per session (unless cleared)
- Custom loaders can implement their own caching strategies

## Migration from Manual Validators

If you're currently passing validators manually:

```javascript
// Before
const response = await request_caller({
  method: 'post',
  endpoint: '/api/users',
  data: userData,
  yup_validators: {
    '/api/users': userValidatorSchema,
  },
});

// After (with auto-detection)
const response = await request_caller({
  method: 'post',
  endpoint: '/api/users',
  data: userData,
  // yup_validators is optional now
});
```

## Best Practices

1. **Initialize Early**: Set up validators at app startup using `initializeValidators()`
2. **Use Consistent Endpoints**: Use the same endpoint format consistently
3. **Cache Strategically**: Use localStorage caching for better performance
4. **Handle Errors Gracefully**: Always provide fallback behavior
5. **Test Auto-Detection**: Verify that your validators are being detected correctly

## Troubleshooting

### Validators Not Being Detected

1. Check if validators are properly exposed in global scope
2. Verify meta tag format and content
3. Check browser console for detection warnings
4. Use `validatorAutoDetector.validators` to inspect loaded validators

### Validation Not Working

1. Ensure endpoint keys match exactly
2. Check that Yup schemas are properly formatted
3. Verify that `autoDetectValidators` is enabled
4. Check for validation errors in console

### Performance Issues

1. Use localStorage caching
2. Initialize validators once at startup
3. Avoid dynamic validator loading in hot paths
4. Consider using `createRequestCaller()` for better performance
