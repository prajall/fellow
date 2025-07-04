a='somestring'

array = ['two','hello','okay']
array.append("bye")
array.insert(2,"nice")
array.pop(2)

# print(array)


set = {"one","two"}
set2 = {"two","three"}



# print(set.difference())

myfamily = {
  "child1" : {
    "name" : "Emil",
    "year" : 2004
  },
  "child2" : {
    "name" : "Tobias",
    "year" : 2007
  },
  "child3" : {
    "name" : "Linus",
    "year" : 2011
  }
}

# print(myfamily["child1"]["year"])

# def function_with_multiple_args(*args):
    # print(args)

# function_with_multiple_args("hey",{"name":"Prajal"})


lambda_function = lambda a,b,c,d,e : a+b+c+d+e

# print(lambda_function(1,2,3,4,2))

# name = input("what is your name")
# print(name)

class myClass:
    
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        return f"my name is {self.name}"

    def print_name(self):
        print("Namayewa: ",self.name)

# c = myClass("prajal");
# # print(c)
# c.print_name();

class child_class(myClass):
    def print_name(self):
        print("Children namayewa:",self.name)

child = child_class("Okay")

child.print_name();

ifStatement = 'statement' if 10<11 else "nothing"



print("if statement",ifStatement)