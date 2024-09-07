# from g4f.client import Client

# # Create a client object
# client = Client()

# # Define the user input
# crop_type = "rice"
# soil_condition = "pH: 6.5, nitrogen: 0.5%"
# planting_date = "2022-03-01"
# weather_forecast = "sunny"

# # Define the system message content with correct placeholders
# system_message_content = (
#     "You are an expert agricultural assistant specialized in generating fertilizer schedules in Sri Lankan agriculture. "
#     "You will be given input based on {crop_type}, {soil_condition}, {planting_date}, and {weather_forecast}. "
#     "Your task is to provide a detailed fertilizer schedule in JSON format, specifying the stages of plant growth, the types of fertilizers to be used, the application amounts, "
#     "and the recommended dates for application in this format: "
#     "{"
#     "\"schedule\": {"
#         "\"fertilizer_schedule\": {"
#             "\"crop_type\": \"{crop_type}\","
#             "\"planting_date\": \"{planting_date}\","
#             "\"soil_condition\": {"
#                 "\"pH\": \"{pH}\","
#                 "\"nitrogen\": \"{nitrogen}\""
#             "},"
#             "\"weather_forecast\": \"{weather_forecast}\","
#             "\"growth_stages\": ["
#                 "{"
#                     "\"stage\": \"stage\","
#                     "\"application_date\": \"application_date\","
#                     "\"fertilizer_type\": \"fertilizer_type\","
#                     "\"amount\": \"amount\","
#                     "\"notes\": \"Provide extra notes for farmers. Include information on potential crop diseases relevant to this stage and how to prevent them.\""
#                 "}"
#             "]"
#         "}"
#     "}"
#     "}"
#     "Ensure that the schedule is practical and tailored to the specific needs of the crop and conditions provided based on Sri Lankan agriculture. "
#     "Once the farmer has provided the input, you will generate the fertilizer schedule based on the given information. "
#     "If the farmer regenerates with the same input, you should not generate anything again. "
#     "If the farmer regenerates with different input, you will generate a different fertilizer schedule."
# )

# # Create a response object by calling the create method of the completions class of the chat class of the client object
# response = client.chat.completions.create(
#     model="gpt-4o-mini",
#     messages=[
#         {"role": "system", "content": system_message_content},
#         {"role": "user", "content": "Please generate the fertilizer schedule based on the provided input.i only need fertilizer schedule in JSON format "
# # Define the user input
# "crop_type = rice"
# "soil_condition = pH: 6.5, nitrogen: 0.5%"
# "planting_date = 2022-03-01"
# "weather_forecast = sunny" }
#     ],
# )

# # Print the content of the first choice in the response object
# print(response.choices[0].message.content)
