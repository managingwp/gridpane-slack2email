addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes('application/text')) {
    return response.text();
  } else if (contentType.includes('text/html')) {
    return response.text();
  } else {
    return response.text();
  }
}

async function handleRequest(request) {
  // check for webhook auth
  const headers = request.headers
  if (headers.get("auth") !== AUTH_TOKEN) {
    return new Response(":(", {
      headers: {'content-type': 'text/plain'},
      status: 401
    })
  }
  // check we have a POST request
  if (request.method !== "POST") {
    return new Response(
      "Only POST requests are handled.",
      {status: 200}
    )
  }
  try {
    // receive input
    const data = await request.json()
    // get title and feed name
    const RecordType = data.RecordType
    const Type = data.Type
    const MessageID = data.MessageID
    const MessageStream = data.MessageStream
    const Description = data.Description
    const Details = data.Details
    const Email = data.Email
    const From = data.From
    const Subject = data.Subject

    const text = `New Alert - ${RecordType}/${Type}\nMessageID: ${MessageID}\nMessageStream: ${MessageStream}\nDescription: ${Description}\nDetails: ${Details}\nEmail: ${Email}\nFrom: ${From}\nSubject: ${Subject}`
    const PostmarkJson = JSON.stringify(data, null, 2);

    const json = {
      "username":"Postmark",
      "text": text,
      "attachments": [
        {
          "mrkdwn_in": ["text"],
          "color": "#36a64f",
          "title": "JSON",
          "text": PostmarkJson,
        }
      ]
    }

    // Start end to slack
    const url = SLACK_WEBHOOK_URL;
    const init = {
      body: JSON.stringify(json),
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    //console.log `${init}`;
    const response = await fetch(url, init);
    const results = await gatherResponse(response);
    return new Response(results, init);
    // End send to slack
  } catch (e) {
    return new Response(`Error:  ${e}`, {status: 200})
  }
}
