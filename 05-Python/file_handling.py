import csv

with open('employees.csv','w',newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(["hello","hi","123"])


    