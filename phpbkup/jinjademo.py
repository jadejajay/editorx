import re

reflections = {
    "i am": "you are",
    "i was": "you were",
    "i": "you",
    "i'm": "you are",
    "i'd": "you would",
    "i've": "you have",
    "i'll": "you will",
    "my": "your",
    "you are": "I am",
    "you were": "I was",
    "you've": "I have",
    "you'll": "I will",
    "your": "my",
    "yours": "mine",
    "you": "me",
    "me": "you",
}


class Chat:
    def __init__(self, pairs, reflections={}):
        self._pairs = [(re.compile(x, re.IGNORECASE), y) for (x, y) in pairs]
        self._reflections = reflections
        self._regex = self._compile_reflections()

    def _compile_reflections(self):
        sorted_refl = sorted(self._reflections, key=len, reverse=True)
        return re.compile(
            r"\b({})\b".format("|".join(map(re.escape, sorted_refl))), re.IGNORECASE
        )

    def _substitute(self, str):
        return self._regex.sub(
            lambda mo: self._reflections[mo.string[mo.start() : mo.end()]], str.lower()
        )

    def wildcards(self, response, match):
        pos = response.find("%")
        while pos >= 0:
            num = int(response[pos + 1 : pos + 2])
            response = (
                response[:pos]
                + self._substitute(match.group(num))
                + response[pos + 2 :]
            )
            pos = response.find("%")
        return response

    def respond(self,str):
        # check each pattern
        for (pattern, response) in self._pairs:
            match = pattern.match(str)

            # did the pattern match?
            if match:
                resp = response(match)  # The response function is called with the match
                # return resp
                resp = self.wildcards(resp, match)  # process wildcards

                # fix munged punctuation at the end
                if resp[-2:] == "?.":
                    resp = resp[:-2] + "."
                if resp[-2:] == "??":
                    resp = resp[:-2] + "?"
                return resp


    # Hold a conversation with a chatbot
    def converse(self, quit="quit"):
        user_input = ""
        while user_input != quit:
            user_input = quit
            try:
                user_input = input(">")
            except EOFError:
                print(user_input)
            if user_input != 'quit':
                if user_input:
                    while user_input[-1] in "?!.":
                        user_input = user_input[:-1]
                    if (self.respond(user_input)):
                        print(self.respond(user_input))
                    else:
                        print("Sorry, I don't understand.")

# Define response functions that accept the match
def start_response(match):
    try:
        num_int = int(match.group(1))
    except ValueError:
        x = input("Enter number to double -> ")
        num_int = int(x)  # Assign a default value
    num_int *= 2 
    return f"result is :{num_int}"

def stop_response(match):
    return f"Stopping the {match.group(1)}"

def execute_response(match):
    return f"Executing the {match.group(1)} function"

# Define pattern-response pairs
pairs = [
    [r"double (.+)", start_response],
    [r"stop (.+)", stop_response],
    [r"execute (.+)", execute_response]
]

chatbot = Chat(pairs, reflections)
chatbot.converse(quit="quit")

"""
import importlib

# Define the file name (excluding the ".py" extension)
module_name = "my_function"

# Dynamically import the module
module = importlib.import_module(module_name)

# Access the function assuming there's only one function in the module
function_name = dir(module)[0]
my_function = getattr(module, function_name)

# Call the function
result = my_function()
print(result)

"""
"""
import subprocess

# The command to execute
command = "ls /nonexistent_directory"

# Execute the command using subprocess.run
result = subprocess.run(command, shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)

# Check the return code to detect problems
if result.returncode == 0:
    print("Command executed successfully.")
else:
    print(f"Command encountered an error. Exit code: {result.returncode}")
print("Standard Output:", result.stdout.decode())
print("Standard Error:", result.stderr.decode())
"""