#პირველი დავალება
total = 0
num = 2 
 

while num <= 10:
    total += num
    num += 2  

print("Sum of even numbers from 1 to 10:", total)

#მეორე დავალება
num = 1
while num <= 20:
    if num % 3 == 0 and num % 5 == 0:
        print(num)
    num += 1


    # მესამე დავალება
for num in range(1, 101):
    if num % 5 == 0:
        print(num)


# ბოლო დავალება
for num in range(1, 21):
    if num % 6 == 0:
        print(num)

