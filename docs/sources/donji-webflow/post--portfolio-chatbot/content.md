<!-- source: https://donji.webflow.io/post/portfolio-chatbot | title: Portfolio Chatbot - UIUXer  - Webflow HTML website template -->

![Banner Link Arrow](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/626ed9ada82a8505fd6ab82c_banner-title-arrow.svg)

Back To List Of Blogs → /blog

# Portfolio Chatbot

![Blog Single Image](https://cdn.prod.website-files.com/626ed9ada82a85619f6ab7f6/64ae3476e73acf7a926c8849_chatbot%20blog%20image.png)

My goal was to create an interactive portfolio chatbot, providing a new way for people to engage with my portfolio. To try it out, click on the robot face at the bottom right.

This was built using a vector database and the OpenAI API for the backend, with Streamlit for the frontend. Although I learned much of this from a tutorial, I took the time to understand the Python code and customized the frontend to a new chat interface, which I deployed on my website. In addition, I engineered the prompts to generate improved responses.

Streamlit, the frontend, is an intuitive Python framework that simplifies the creation of single-page applications. Langchain is a library that facilitates app development using large language models (LLMs), like ChatGPT, GPT-3, and GPT-4. Besides simplifying the process, Langchain also provides tools for vectorizing data, enabling GPT-3 to process large volumes of information which it then organizes and stores in a vector database. Moreover, Langchain allows you to create agents, which are programs capable of executing code snippets, such as API requests, in response to specific prompts.

In the past, for a voice-activated bot to execute a command like "set a 10-minute timer," it had to be hard-coded to listen for those exact words. However, with agents, bots can understand more abstract instructions. For example, if you say, "I need to take the lasagna out of the oven in ten minutes," the bot will still set a 10-minute timer using the agent feature.

Vector databases are an exciting piece of technology. They power features like search recommendations on platforms like Amazon, and allow chatbots to sift through extensive data to provide a response. You could think of vector databases as a book for a robot. Usually, when you ask ChatGPT a question, your prompt can't be too long due to a character limit. Vector databases help overcome this limitation by storing information as vectors, across multiple dimensions. For instance, the word "dog" will have a closer distance to "cat" than "car." So, when you enter a prompt, the program scans the database looking for words closest to the provided prompt, retrieves the most relevant paragraph chunks, and includes those chunks in the prompt sent to OpenAI's GPT-3 LLM.

For this bot, I extracted all the text and linked pages, and also spent a few hours writing to fill the bot with sufficient content. Next, I plan to add a Langchain agent that identifies questions my bot cannot answer, which will help me determine what to add to my vector database. The way this will work is by setting the bot to record the prompt prior to an answer along the lines of "I don't know." The responses will need to be stored in a database, possibly SQL, which I'm still learning to program. Once stored, I'll create another Streamlit app to display these responses.

I also plan to add this explanation to the bot, so if anyone inquires about the bot's creation, it can either provide a link to this page or give a direct answer. Recently, I gained access to the GPT-4 API, so I'll be updating the bot with that LLM.

One challenge I encountered was that the GitHub repo contains my keys to the OpenAI API and Pinecone API, so I haven't been able to publicly post it. Fortunately, I discovered that Streamlit provides a secure place to store keys, which can be safely injected into a public repo without exposure. This is something I'll need to set up before I can publish and share my project.

‍

![Blog Author Image](https://cdn.prod.website-files.com/626ed9ada82a85619f6ab7f6/64124149dee86c5d9e2998d3_Screen%20Shot%202023-03-15%20at%203.04.28%20PM.png)

Donji Yamada-Dessert → /author/donji

Product Designer

Donji is a Product Designer with 10 years of experience. His interests include AI prompt engineering, surfing, and going to Art Museums.

![Author Social Icon](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/64123f95dee86c8dc2297f29_YouTube%20-%20Original.png)

![Author Social Icon](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/64123f94e3567dafbe1ff544_Twitter%20-%20Original.png)

![Author Social Icon](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/64123f94501609b4ccfd073f_LinkedIn%20-%20Original.png)
