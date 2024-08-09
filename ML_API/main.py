from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

app = FastAPI()


import tensorflow as tf

# Load the model from the SavedModel format
model = tf.keras.models.load_model('./my_model2.keras')


@app.get("/")
def read_root():
    return {"Hello": "World"}

class InputData(BaseModel):
    values: list[float]

@app.post("/predict")
async def predict(data: InputData):
    try:
        # Convert the input data to a numpy array
        input_array = np.array(data.values).reshape(1, -1)
        # Make a prediction
        predictions = model.predict(input_array)
        # Assuming the model returns probabilities and we need to map the output
        predicted_class = np.argmax(predictions, axis=-1)  # Use appropriate method based on your model output
        # Map numerical class index to actual class labels
        class_labels = {0: 'R', 1: 'M'}
        result = class_labels.get(predicted_class[0], 'Unknown')
        
        if result == 'R':
            return {"prediction": "The object is a Rock"}
        else:
            return {"prediction": "The object is a Mine"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}