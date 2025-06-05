// Using standard JSON

// Define a type for the schema structure (copy or import from original location)
export interface ActionSchema {
  name: string;
  description: string;
  parameters: {
    properties: Record<string, any>;
    required?: string[];
    type: string;
    title?: string;
  };
  response?: any;
  appName?: string;
  appId?: string;
  version?: string;
  available_versions?: string[];
  tags?: string[];
  logo?: string;
  display_name?: string;
  enabled?: boolean;
}

/**
 * Generates Python code for making a direct API call to execute a Composio action.
 */
export function generateApiCode(schema: ActionSchema): string {
  if (!schema || !schema.name) return "";

  const functionName = schema.name;
  const parameters = schema.parameters?.properties || {};
  const requiredParams = schema.parameters?.required || [];

  let functionParams = "entity_id, connected_account_id";
  let functionParamsDoc = `
    Args:
        entity_id (str): The entity ID
        connected_account_id (str): The connected account ID`;
  let payloadEntries = "";
  let exampleUsageParams = "";

  Object.keys(parameters).forEach((param) => {
    if (param !== "entityId" && param !== "connectedAccountId") {
      const paramInfo = parameters[param];
      const paramType =
        paramInfo.type === "string"
          ? "str"
          : paramInfo.type === "number" || paramInfo.type === "integer"
            ? "int"
            : paramInfo.type === "boolean"
              ? "bool"
              : paramInfo.type === "array"
                ? "list"
                : paramInfo.type === "object"
                  ? "dict"
                  : "any";
      const isRequired = requiredParams.includes(param);
      let exampleValue = "";

      if (isRequired) {
        functionParams += `, ${param}`;
      } else {
        let defaultValue = "None";
        if (paramInfo.default === null) {
          defaultValue = "None";
        } else if (paramInfo.type === "string") {
          defaultValue = '""';
        } else if (paramInfo.type === "array") {
          defaultValue = "[]";
        } else if (paramInfo.type === "object") {
          defaultValue = "{}";
        } else if (paramInfo.type === "boolean") {
          defaultValue = "False";
        }

        functionParams += `, ${param}=${defaultValue}`;
      }

      // Determine example value (used in comments)
      if (paramInfo.type === "string") {
        exampleValue = `"example_${param}"`;
      } else if (paramInfo.type === "number" || paramInfo.type === "integer") {
        exampleValue = "0";
      } else if (paramInfo.type === "boolean") {
        exampleValue = "False";
      } else if (paramInfo.type === "array") {
        exampleValue = "[]";
      } else if (paramInfo.type === "object") {
        exampleValue = "{}";
      } else {
        exampleValue = "None";
      }

      functionParamsDoc += `
        ${param} (${paramType})${isRequired ? "" : " (optional)"}: ${
          paramInfo.description || `The ${param} parameter`
        }`;
      payloadEntries += `            "${param}": ${param},\n`;
      exampleUsageParams += `,\n#         ${param}=${exampleValue}`;
    }
  });

  const apiCode = `# Function to execute ${functionName} using direct API call
def execute_${functionName.toLowerCase()}_api(${functionParams}):
    """
    Execute the ${functionName} action via the Composio API.
    ${functionParamsDoc}
        
    Returns:
        dict: The result of the action execution
    """
    import requests
    import os
    
    # API configuration
    api_key = os.environ.get("COMPOSIO_API_KEY", "api_key_here")
    # org_api_key = os.environ.get("COMPOSIO_ORG_API_KEY", "YOUR_ORG_API_KEY")
    
    # API endpoint
    url = f"https://backend.composio.dev/api/v2/actions/${functionName}/execute"
    
    # Headers
    headers = {
        "x-api-key": api_key,
        # "x-org-api-key": org_api_key,
        "Content-Type": "application/json"
    }
    
    # Prepare request payload
    payload = {
        "entityId": entity_id,
        "connectedAccountId": connected_account_id,
        "input": {
${payloadEntries.trimEnd()}
        }
    }
    
    # Make the API request
    response = requests.post(url, json=payload, headers=headers)
    
    # Check for errors
    if response.status_code != 200:
        error_msg = f"API error: {response.status_code} - {response.text}"
        raise Exception(error_msg)
        
    # Parse and return the response
    result = response.json()
    
    # Check for execution errors
    if not result.get("successful", False):
        error_msg = f"Execution error: {result.get('error', 'Unknown error')}"
        raise Exception(error_msg)
        
    return result.get("data", {})

# Example usage:
# try:
#     result = execute_${functionName.toLowerCase()}_api(
#         entity_id="entityId",
#         connected_account_id="connectedAccountId"${exampleUsageParams}
#     )
#     print(result)
# except Exception as e:
#     print(f"Error: {str(e)}")
`;

  return apiCode;
}

/**
 * Generates Python code for initiating an OAuth connection using Composio Toolset.
 */
export function generateOAuthCode(): string {
  // This code was mostly static, ensure it matches the original state
  const oauthCode = `# OAuth Connection Helper Function
def create_oauth_connection(integration_id, entity_id):
    """
    Initiate an OAuth connection for an integration.
    
    Args:
        integration_id (str): The ID of the integration to connect to
        entity_id (str): The entity ID for the connection
        
    Returns:
        dict: A dictionary containing the redirect URL and connected account ID
    """
    try:
        from composio_openai import ComposioToolSet
        
        # Initialize the Composio client
        toolset = ComposioToolSet(api_key="YOUR_API_KEY")
        
        # Initiate the connection
        connection_request = toolset.initiate_connection(
            integration_id=integration_id,
            entity_id=entity_id,
        )
        
        # Extract the required fields
        redirect_url = getattr(connection_request, 'redirectUrl', "")
        connected_account_id = getattr(connection_request, 'connectedAccountId', "")
        
        if not redirect_url or not connected_account_id:
            raise Exception("Connection initiated but required response fields are missing")
            
        return {
            "redirect_url": redirect_url,
            "connected_account_id": connected_account_id
        }
    except Exception as e:
        raise Exception(f"Error creating connection: {str(e)}")

# Example usage:
# result = create_oauth_connection(
#     integration_id="integration_id_here",
#     entity_id="entity_id_here"
# )
# 
# # Access the redirect URL to complete OAuth flow
# redirect_url = result["redirect_url"]
# connected_account_id = result["connected_account_id"]`;
  return oauthCode;
}

/**
 * Generates Python code demonstrating OpenAI function calling integration with a Composio action.
 */
export function generateOpenAISchema(schema: ActionSchema): string {
  if (!schema || !schema.name) return "";

  // Generate the standalone API call function code first
  const apiFunctionCode = generateApiCode(schema);
  const apiFunctionName = `execute_${schema.name.toLowerCase()}_api`; // Get the name of the generated function

  let functionName = schema.name.toLowerCase();

  const openaiSchema: any = {
    name: functionName,
    description: schema.description || "No description provided",
    parameters: {
      type: "object",
      properties: {},
      required: schema.parameters?.required || [],
    },
  };

  const properties = schema.parameters?.properties || {};
  for (const [key, value] of Object.entries(properties)) {
    openaiSchema.parameters.properties[key] = {
      type: value.type || "string",
      description: value.description || "",
    };
    if (value.default !== undefined && value.default !== null) {
      openaiSchema.parameters.properties[key].default = value.default;
    }
    if (value.items?.enum) {
      openaiSchema.parameters.properties[key].enum = value.items.enum;
      openaiSchema.parameters.properties[key].type = value.items.type;
    }
    if (value.minimum !== undefined && value.minimum !== null) {
      openaiSchema.parameters.properties[key].minimum = value.minimum;
    }
    if (value.maximum !== undefined && value.maximum !== null) {
      openaiSchema.parameters.properties[key].maximum = value.maximum;
    }
  }

  let functionDefinitionString = "{}";
  try {
    functionDefinitionString = JSON.stringify(openaiSchema, null, 2);
  } catch (e) {
    console.error("Failed to stringify OpenAI schema:", e);
  }

  // Construct the final Python code including the API function and the class
  const openaiCode = `
import json
import os
from openai import OpenAI
from typing import Dict, Any, Optional, List, Union
from dotenv import load_dotenv

load_dotenv()

# --- Standalone API Call Function ---
${apiFunctionCode}
# --- End Standalone API Call Function ---


# --- OpenAI Integration Class ---

# Composio action configuration (used by the class and potentially the main block)
ACTION_NAME = "${schema.name}"
ACTION_DISPLAY_NAME = "${schema.display_name || schema.name}"

# Function definition dynamically generated from the Composio schema (used by the class)
FUNCTION_DEFINITION = ${functionDefinitionString}

class ComposioOpenAIIntegration:
    """
    Generic handler for any Composio action with OpenAI function calling.
    It uses the standalone '${apiFunctionName}' function within process_query to execute the action.
    """

    def __init__(
        self,
        openai_api_key: Optional[str] = None,
        action_name: str = ACTION_NAME, # Keep track of action name if needed elsewhere
        model: str = "gpt-4o"
    ):
        """Initialize the integration with OpenAI API key and configuration"""
        # Load OpenAI API key with fallback to environment variables
        self.openai_api_key = openai_api_key or os.environ.get("OPENAI_API_KEY")

        if not self.openai_api_key:
            raise ValueError("OpenAI API key is required")

        # Initialize OpenAI client
        self.client = OpenAI(api_key=self.openai_api_key)

        # Store action configuration relevant to OpenAI interaction
        self.action_name_openai = '${functionName}' # Use the lowercase name for OpenAI function def
        self.model = model
        self.function_definition = FUNCTION_DEFINITION

    def process_query(self, user_query: str, entity_id: str, connected_account_id: str, model: Optional[str] = None) -> Dict[str, Any]:
        """
        Process a user query using OpenAI function calling for the Composio action.
        Calls the standalone '${apiFunctionName}' function directly to execute the action.
        """
        try:
            query_model = model if model else self.model

            response = self.client.chat.completions.create(
                model=query_model,
                messages=[{"role": "user", "content": user_query}],
                functions=[self.function_definition],
                function_call="auto"
            )

            message = response.choices[0].message

            if not message.function_call:
                return {
                    "type": "text_response",
                    "content": message.content,
                    "success": True
                }

            function_call = message.function_call
            function_name = function_call.name # Should match self.action_name_openai

            try:
                function_args = json.loads(function_call.arguments)
            except json.JSONDecodeError:
                error_msg = f"Invalid JSON in function arguments: {function_call.arguments}"
                return {"type": "error", "error": error_msg, "success": False}

            # Call the standalone API function directly
            action_result = ${apiFunctionName}(
                entity_id=entity_id,
                connected_account_id=connected_account_id,
                **function_args
            )

            final_response = self.client.chat.completions.create(
                model=query_model,
                messages=[
                    {"role": "user", "content": user_query},
                    {
                        "role": "assistant",
                        "content": None,
                        "function_call": {
                            "name": function_name,
                            "arguments": function_call.arguments
                        }
                    },
                    {
                        "role": "function",
                        "name": function_name,
                        "content": json.dumps(action_result)
                    }
                ]
            )

            return {
                "type": "function_response",
                "success": True,
                "user_query": user_query,
                "function_name": function_name,
                "function_args": function_args,
                "composio_result": action_result,
                "ai_response": final_response.choices[0].message.content
            }

        except Exception as e:
            error_msg = f"Error processing query: {str(e)}"
            return {"type": "error", "error": error_msg, "success": False}

# --- End OpenAI Integration Class ---


# --- Example Usage ---

def main(entity_id: str, connected_account_id: str):
    """Example usage: Demonstrates processing a query with provided IDs."""

    if not entity_id or not connected_account_id:
        print("ERROR: entity_id and connected_account_id must be provided.")
        return

    integration = ComposioOpenAIIntegration()

    user_query = "I want to ${
      schema.description?.toLowerCase() ||
      `use ${functionName.replace(/_/g, " ")}`
    }"

    print(f"\\n[ Action: {ACTION_DISPLAY_NAME} ]")
    print(f"\\n[ Query: {user_query} ]")
    print("\\n[ Sending to OpenAI... ]")

    result = integration.process_query(
        user_query=user_query,
        entity_id=entity_id,
        connected_account_id=connected_account_id
    )

    if result["type"] == "function_response":
        print("\\n[ Function called successfully via OpenAI ]")
        print(f"\\nFunction name called by AI: {result['function_name']}")
        print(f"Function arguments from AI: {json.dumps(result['function_args'], indent=2)}")
        print(f"\\nResult from Composio action (${apiFunctionName}):")
        print(json.dumps(result['composio_result'], indent=2))
        print("\\nFinal AI response:")
        print(result['ai_response'])
    elif result["type"] == "text_response":
        print("\\n[ No function call needed by OpenAI ]")
        print("\\nAI response:")
        print(result['content'])
    else: # Error type
        print("\\n[ Error occurred ]")
        print(f"Error: {result['error']}")

if __name__ == "__main__":
    # Replace placeholders before running.
    example_entity_id = "YOUR_ENTITY_ID_HERE"
    example_connected_account_id = "YOUR_CONNECTED_ACCOUNT_ID_HERE"

    print("\\n--- Composio OpenAI Integration Example ---")
    if example_entity_id == "YOUR_ENTITY_ID_HERE" or example_connected_account_id == "YOUR_CONNECTED_ACCOUNT_ID_HERE":
         print("\\nERROR: Please replace placeholder IDs in the script before running.")
    else:
        try:
            main(
                entity_id=example_entity_id,
                connected_account_id=example_connected_account_id
            )
        except Exception as e:
            print(f"\\nAn unexpected error occurred during main execution: {e}")

    print("\\n--- End Example ---")

# --- End Example Usage ---
`; // End of openaiCode template literal

  return openaiCode;
}
