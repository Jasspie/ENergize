### ENergize

A full stack application that allows users to create recipes and track them in terms of its environmental sustainability and nutritional benefits. [Click here to see the demo.](https://energize.netlify.app/)

Recipes can be created based off a list of pre-defined ingredients, that use Python for it's data collection and analysis. For each ingredient, Selenium WebDriver and BeautifulSoup are used to scrape articles from the top search results on the web. The content from these websites are summarized and then analyzed using OpenAI's GPT-3 model to generate the "ENergize Score" for each ingredient.

On the frontend, ENergize uses React and Bootstrap. Firebase is used to handle user authentication, and to store user recipes within Cloud Storage and Cloud Firestore.

## Login

![image](https://user-images.githubusercontent.com/65046640/129987541-8e564ce7-adea-4c69-b239-007c68f7601a.png)

## Dashboard

![image](https://user-images.githubusercontent.com/65046640/129987856-a36b0fb4-0f9b-4552-90a9-a2042b2a41a8.png)

## Recipe Creation

![image](https://user-images.githubusercontent.com/65046640/129987924-eca4c356-3459-471f-8fce-4a8475ee0212.png)

# Ingredient Details

![image](https://user-images.githubusercontent.com/65046640/129987985-64bcaa74-f9b5-4b69-811d-1109d80deaf7.png)

# Recipe Creation Overview

![image](https://user-images.githubusercontent.com/65046640/129988109-301a43bb-31cb-4c7c-9c71-0e27d77567fb.png)

# Recipe Overview

![image](https://user-images.githubusercontent.com/65046640/129988242-b4573fce-8c2f-4a56-93e2-f1efa05c8236.png)
