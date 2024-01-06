var lastMark = "";
var tree = {};

function evalWithVariables(func, vars) {
    return new Function("v", "with (v) { return (" + func + ")}")(vars);
}

function interpret(code) {
    try {
        const statements = code.split(';');
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i].trim();
            if (statement !== '') {
                const parts = statement.split(' ');
                maplKeywords(parts)
            }
        }
        return tree;
    } catch (error) {
        mobizScriptGUIDebug(error, lastMark)
    }
}

function maplKeywords(parts) {
    if (parts[0] === 'seed') {
        const name = parts[1];
        const args = parts[2];
        const lastIndex = parts.length - 1;
        const body = parts.slice(3, lastIndex + 1).join(" ");
        const result = body.substring(1, body.length - 1);
        const fn = new Function(...args, `with (tree) { ${result} }`);
        tree[name] = fn;
    } else if (parts[0] === 'leaf') {
        const lastIndex = parts.length - 1;
        const value = parts.slice(3, lastIndex + 1).join(" ");
        const variable = parts[1];
        tree[variable] = evalWithVariables(value, tree);
    } else if (parts[0] === 'mark') {
        const lastIndex = parts.length - 1;
        const value = parts.slice(1, lastIndex + 1).join(" ");
        lastMark = value;
    } else if (parts[0] === 'print') {
        const lastIndex = parts.length - 1;
        const value = parts.slice(1, lastIndex + 1).join(" ");
        document.getElementById("Log").innerHTML = document.getElementById("Log").innerHTML + evalWithVariables(value, tree) + "<br>"
    } else if (parts[0] === 'branch') {
        const variable = parts[1];
        const lastIndex = parts.length - 1;
        const value = evalWithVariables(parts.slice(3, lastIndex + 1).join(" "), tree);
        tree[variable] = value;
    } else if (parts[0] === 'if') {
        const condition = parts.slice(1, parts.indexOf('then')).join(' ');
        const thenIndex = parts.indexOf('then');
        const body = parts.slice(thenIndex + 1).join(' ');

        if (evalWithVariables(condition, tree)) {
            const nestedStatements = body.split(';');
            for (let j = 0; j < nestedStatements.length; j++) {
                const nestedStatement = nestedStatements[j].trim();
                const result = nestedStatement.substring(1, nestedStatement.length - 1);
                new Function(`with (tree) { ${result} }`)();
            }
        }
    } else {
        const name = parts[0];
        const operator = parts[1];
        const value = parseFloat(parts[2]);

        if (operator === '=') {
            tree[name] = value;
        } else if (operator === '+') {
            tree[name] += value;
        } else if (operator === '-') {
            tree[name] -= value;
        } else if (operator === '*') {
            tree[name] *= value;
        } else if (operator === '/') {
            tree[name] /= value;
        }
    }
}