# This code is designed to find a specific sum from a list of numbers. Its input 
# was typically a copied list of numbers from a SQL query

def f(values, i, S, memorized_number):
      if i >= len(values): return 1 if S == 0 else 0 # If i is less than the length of the ibput values and S == 1 then there is no combination of values that add to the target value
      if (i, S) not in memorized_number:  # Check if value has not been calculated.
        count = f(values, i + 1, S, memorized_number)
        count += f(values, i + 1, S - values[i], memorized_number)
        memorized_number[(i, S)] = count  # Memorize calculated result.
      return memorized_number[(i, S)]     # Return memorized number

def g(values, S, memorized_number):
      subset = []
      for i, x in enumerate(values):        # Check if there is still a solution if we include values[i]
        if f(values, i + 1, S - x, memorized_number)> 0:
          subset.append(x) 
          S -= x
      return subset

values = [1, 2, 3, 10, 15, 25, 30, 57, 84, 121, 201, 203, 253] # Copy the numbers from the Maptitude SQL Query into a list here
target = 278 # Use the current population deviation from Maptitude for the target sum
memorized_number = dict() # Assign a memorized number to a dictionary
if f(values, 0, target, memorized_number) == 0: print("The input list contains no combinations of values that sum to the target value.")
else: print(g(values, target, memorized_number)) # Print the combination of numbers that yields the target value
 
## The default values successfully yield the list [1, 2, 3, 10, 57, 84, 121]. These census blocks would still have to be 
## contiguous to 
