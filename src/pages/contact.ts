import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
})

export async function post(s){
  console.log(s)
  return new Response(null, { status: 200})
}

export async function get(request){
  console.log(request)
  console.log("HELLO")
  return new Response(null, { status: 200})
}

export async function ss({ params }) {

  console.log(params);
  return
  try {
    // const formData = JSON.parse(request.body)

    if (!formData) {
      return new Response(null, { status: 404})
    }

    const { 
      name,
      phone,
      note,
    } = formData

    await notion.pages.create({
      parent: { database_id: import.meta.env.NOTION_DB_ID },
      properties: {
        'Name': {
          title: [ { text: { content: name }}]
        },
        'Phone': { 
          rich_text: [{ text: { content: phone }}]
        },
        'Note': {
          rich_text: [ { text: { content: note}}]
        },
      }
    })

    return new Response(JSON.stringify({ message: "success"}), { status: 200})

  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch(error.code) {
        case ClientErrorCode.RequestTimeout:
          return new Response(
            JSON.stringify({ message: "Timeout request..."}), 
            {status: 408})
          case APIErrorCode.ObjectNotFound:
            return new Response(
              JSON.stringify({ message: "Invalid Database ID"}), 
              {status: 400})
          case APIErrorCode.Unauthorized:
            return new Response(
              JSON.stringify({ message: "Unauthorized. Please provide valid credentials to Notion API"}), 
                {status: 401})
          default:
            return new Response(
              JSON.stringify({ message: "Something has went wrong.. Please try again later" }),
              { status: 400})
      }
    }
  }
}