export function classnames(...args: any[]) {
    if (!args.length || args.length == 1) return;
    let style = args.shift();
    let elementClassnames: any[] = [];
    args.forEach(arg => {
        if (typeof arg == 'string') {
            elementClassnames.push(arg);
        } else {
            for (let key in arg) {
                if (arg[key]) {
                    elementClassnames.push(key);
                }
            }
        }
    });
    return elementClassnames.reduce(function (memo, item) {
        return Object.assign(memo, style[item]);
    }, {});
}

/**按ascii码从小到大排序
 *
 * @param obj
 * @returns {string}
 */
export function sort_ascii(obj: { [propName: string]: string | number; }): string {
    let arr = new Array();
    let num = 0;
    for (let i in obj) {
        arr[num] = i;
        num++;
    }
    let sortArr = arr.sort();
    let str = '';             //自定义排序字符串
    for (let i in sortArr) {
        str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
    }
    //去除两侧字符串
    let char = '&'
    str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');

    return str;
}

/**
 * This method is similar to lodash `flowRight`. It permits to easily compose
 * several high order components.
 *
 * @static
 * @category Utilities
 * @param {...Function} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * const enhance = compose(pure, withProps({foo: 'bar'}));
 * const Component = enhance(MyComponent);
 */
export function compose(): Function {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    if (funcs.length === 0) {
        //@ts-ignore
        return _identity2.default;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(undefined, arguments));
        };
    });
}