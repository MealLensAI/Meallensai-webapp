const BACKEND_URL = 'https://new-backend-08j8.onrender.com';

exports.handler = async (event, context) => {
  // Enable CORS for all requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Extract the path from the Netlify function URL
    // e.g., /.netlify/functions/api/login -> /login
    const path = event.path.replace('/.netlify/functions/api', '');
    const url = `${BACKEND_URL}${path}`;

    console.log(`Proxying ${event.httpMethod} request to: ${url}`);

    // Prepare the request options
    const requestOptions = {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        ...event.headers,
      },
    };

    // Add body for POST, PUT, PATCH requests
    if (event.body && ['POST', 'PUT', 'PATCH'].includes(event.httpMethod)) {
      requestOptions.body = event.body;
    }

    // Make the request to your backend
    const response = await fetch(url, requestOptions);
    const responseText = await response.text();

    let responseBody;
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }

    return {
      statusCode: response.status,
      headers: {
        ...headers,
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: 'Internal server error',
        error: error.message,
      }),
    };
  }
};
