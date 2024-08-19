from g4f.client import Client

client = Client()

crop_type = "corn"
planting_date = "2023-09-01"
soil_condition = "pH 6.5, low nitrogen"
weather_forecast = "moderate rainfall"

system_message = {
    "role": "system",
    "content": "You are an expert agricultural assistant specialized in generating fertilizer schedules in Sri Lankan agriculture. You will be given input based on {crop_type}, {soil_condition}, {planting_date}, and {weather_forecast}. Your task is to provide a detailed fertilizer schedule in JSON format, specifying the stages of plant growth, the types of fertilizers to be used, the application amounts, and the recommended dates for application. Ensure that the schedule is practical and tailored to the specific needs of the crop and conditions provided based on Sri Lankan agriculture."
}

# Example user input
user_input = {
    "role": "user",
    "content": {
        "crop_type": "rice",
        "planting_date": "2023-09-01",
        "soil_condition": "pH 6.5, low nitrogen",
        "weather_forecast": "moderate rainfall"
    }
}


# Call the GPT API
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[system_message, user_input]
)

print(response.choices[0].message.content)
