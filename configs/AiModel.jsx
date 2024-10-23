/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayoutAI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following Details with field as Course Name , Description , Along with Chapter Name ,About ,Duration : Category : \"Programming\", Topic : \"Python\" , Level : \"Easy\" , Duration:\"2hrs\" , No of Chapter : 5 , in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course_name\": \"Python for Beginners: A Hands-On Introduction\",\n  \"description\": \"Learn the fundamentals of Python programming from scratch. This beginner-friendly course will guide you through the basics of syntax, data types, variables, operators, control flow, and functions. By the end of this course, you'll be able to write simple Python programs and understand the core concepts of this popular language.\",\n  \"chapters\": [\n    {\n      \"chapter_name\": \"Introduction to Python\",\n      \"about\": \"This chapter introduces the Python programming language, its history, and its applications. You'll learn how to set up your Python environment and write your first Python program.\",\n      \"duration\": \"30 minutes\"\n    },\n    {\n      \"chapter_name\": \"Data Types and Variables\",\n      \"about\": \"This chapter covers the fundamental data types in Python, such as integers, floats, strings, and booleans. You'll learn how to declare variables and assign values to them.\",\n      \"duration\": \"45 minutes\"\n    },\n    {\n      \"chapter_name\": \"Operators and Expressions\",\n      \"about\": \"Explore the different types of operators in Python, including arithmetic, comparison, logical, and assignment operators. You'll learn how to combine operators to create expressions and perform calculations.\",\n      \"duration\": \"30 minutes\"\n    },\n    {\n      \"chapter_name\": \"Control Flow Statements\",\n      \"about\": \"This chapter introduces you to control flow statements, such as if-else statements, for loops, and while loops. You'll learn how to control the execution of your code based on conditions.\",\n      \"duration\": \"30 minutes\"\n    },\n    {\n      \"chapter_name\": \"Functions\",\n      \"about\": \"Learn the concept of functions in Python. You'll understand how to define functions, pass arguments, and return values. You'll also learn about function scope and recursion.\",\n      \"duration\": \"30 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Easy\",\n  \"duration\": \"2 hours\",\n  \"no_of_chapters\": 5\n}\n```"},
          ],
        },
      ],
    });

    export const GenerateCourseContentAI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic: Python Basic, Chapter: Variables and Data Types, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Introduction to Variables\",\n    \"explanation\": \"Variables are like containers that store data in a program. They allow you to give meaningful names to values so you can easily access and manipulate them later. In Python, you declare a variable by simply assigning a value to it using the `=` operator.\",\n    \"codeExample\": \"<precode>name = \\\"Alice\\\"  # Assigning the string \\\"Alice\\\" to the variable 'name'\\nage = 30     # Assigning the integer 30 to the variable 'age'\\nprint(name)   # Output: Alice\\nprint(age)    # Output: 30\\n</precode>\"\n  },\n  {\n    \"title\": \"Variable Naming Rules\",\n    \"explanation\": \"Python has specific rules for naming variables:\\n\\n*   **Valid characters:** Variable names can consist of letters (a-z, A-Z), numbers (0-9), and underscores (_). They must start with a letter or an underscore.\\n*   **Case Sensitivity:** Python is case-sensitive. `myVariable` and `myvariable` are considered different variables.\\n*   **Keywords:** You cannot use reserved keywords like `if`, `else`, `while`, etc. as variable names.\",\n    \"codeExample\": \"<precode># Valid variable names\\nmy_variable = 10\\n_another_variable = \\\"Hello\\\"\\nvariable1 = 25.5\\n\\n# Invalid variable names\\n123variable = 10 # Starts with a number\\nmy-variable = \\\"World\\\" # Contains a hyphen\\nclass = \\\"Python\\\" #  'class' is a reserved keyword\\n</precode>\"\n  },\n  {\n    \"title\": \"Data Types\",\n    \"explanation\": \"Python supports various data types, which categorize the kind of information a variable can hold. Some common data types include:\\n\\n*   **Integer (int):** Whole numbers without decimals. Example: 10, -5, 0.\\n*   **Float (float):** Numbers with decimal points. Example: 3.14, -2.5, 0.0.\\n*   **String (str):** Text enclosed in single or double quotes. Example: \\\"Hello\\\", 'World'.\\n*   **Boolean (bool):** Represents truth values. Either `True` or `False`.\",\n    \"codeExample\": \"<precode>integer_value = 10      # int\\nfloat_value = 3.14   # float\\nstring_value = \\\"Python\\\" # str\\nboolean_value = True    # bool\\n\\nprint(type(integer_value)) # Output: <class 'int'>\\nprint(type(float_value))    # Output: <class 'float'>\\nprint(type(string_value))   # Output: <class 'str'>\\nprint(type(boolean_value))  # Output: <class 'bool'>\\n</precode>\"\n  },\n  {\n    \"title\": \"Dynamic Typing\",\n    \"explanation\": \"Python uses dynamic typing, meaning you don't have to explicitly declare the data type of a variable. Python automatically determines the data type based on the value assigned to the variable.\",\n    \"codeExample\": \"<precode>my_var = 10        # my_var is now an integer\\nmy_var = \\\"Hello\\\"   # my_var is now a string\\nmy_var = 3.14      # my_var is now a float\\n</precode>\"\n  },\n  {\n    \"title\": \"Type Conversion\",\n    \"explanation\": \"Sometimes you need to convert a variable from one data type to another. Python provides functions for type conversion:\",\n    \"codeExample\": \"<precode>number_str = \\\"10\\\"\\ninteger_value = int(number_str)  # Convert string to integer\\nprint(integer_value)       # Output: 10\\n\\nfloat_value = 3.14\\ninteger_value = int(float_value) # Convert float to integer (truncates decimal)\\nprint(integer_value)       # Output: 3\\n\\ninteger_value = 10\\nfloat_value = float(integer_value) # Convert integer to float\\nprint(float_value)        # Output: 10.0\\n</precode>\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
