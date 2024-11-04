## This code will extract numbers from strings
## It was used in the field calculator to obtain 
## the road numbers from the census dataset so 
## that the road numbers could be symbolized as 
## highway shield signs.

int(''.join(filter(str.isdigit, !FULLNAME!)))
