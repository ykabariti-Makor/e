# tagSplitter

The function receives a string and splits it into an array of separate tags.

The first argument is the string to be splitted.

The second argument , which is optional, is an array of separators(e.g. ["*", " ", "," ]).

- If no array of separators is passed, the function will decide what should be treated as the separator by looking for all the *special 
characters in the string and taking the most frequent one as the separator (if there are a couple of separators equally 
frequent at the top - the one that shows up first in the string is selected).

- If the array contains only one item, the function treats it as the separtor and splits the string into tags according to it.

- If the array contains more than one item, the array is treated as optional allowed separators. 
The actual separator will be the option that shows up most frequently in the passed string.

- The array of separators may only contain *special characters; otherwise, an error is thrown.

## examples: 
tagSplitter("moon,sun, earth!")  -> separator : "," 

tagSplitter("moon,sun, earth!", [" "])  -> separator : " " 

tagSplitter("moon,sun, earth!", ["!", " "])  -> separator : " " 

tagSplitter("moon,sun, earth!", ["!", "0"])  -> Error


