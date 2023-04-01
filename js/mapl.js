function interpret(code) {
    try {
        const statements = code.split(';');
        const tree = {};

        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i].trim();

            if (statement !== '') {
                const parts = statement.split(' ');

                if (parts[0] === 'seed') {
                    const name = parts[1];
                    const args = parts[2];
                    const lastIndex = parts.length - 1;
                    const body = parts.slice(3, lastIndex + 1).join(" ");
                    const fn = new Function(...args, body);
                    tree[name] = fn;
                } else if (parts[0] === 'leaf') {
                    const lastIndex = parts.length - 1;
                    const value = parts.slice(3, lastIndex + 1).join(" ");
                    const variable = parts[1];
                    tree[variable] = eval(value);
                } else if (parts[0] === 'branch') {
                    const variable = parts[1];
                    const lastIndex = parts.length - 1;
                    const value = eval(parts.slice(3, lastIndex + 1).join(" "));
                    tree[variable] = value;
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
        }

        return tree;
    } catch (error) {
        mobizScriptGUIDebug(error)
    }
}