# Mobiz Advanced Programming language (MAPLScript)

A new programming language made by Mobiz

## Installing MAPLScript
To get maplscript up and running, simply install it using this command:
```bash
npm i -g https://github.com/Mobiz-Advanced-Technologies/MAPLScript.git
```

## Running Your MAPLScript Code
Running MAPLScript code is as simple as entering this command.
```bash
maplscript YOUR_FILE.mapl
```

And displaying the variables of the running code is as easy as adding an argument to the previous command.
```bash
maplscript YOUR_FILE.mapl --inspect
```

## Sample Code
Here's an illustrative code example that you can execute.
```
mark "Sample function";
seed multiply x {
    return x * x
};

mark "Variables and arrays";
leaf two = 2;
leaf twoTimesByTwo = multiply(two);
branch count = [1, two, 3, twoTimesByTwo];

mark "Sample if-then statement";
leaf twoTimesByTwois4 = "";
if twoTimesByTwo == 4 then {
	twoTimesByTwois4 = "true"
};

mark "Sample print function";
print "2 * 2 is " + twoTimesByTwo;
print "its " + twoTimesByTwois4;

mark "Seeds and if-then statements run javascript code, NOT MAPLSCRIPT!";
mark "The Javascript code cannot contain semicolons as it will conflict with the MAPLScript code.";
```