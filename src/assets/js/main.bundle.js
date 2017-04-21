/*** Copyright (c) Sagar Chopada 2017*/
webpackJsonp([0], [function(a, b, c) {
    "use strict";
    Object.defineProperty(b, "__esModule", {
        value: !0
    });
    var d = c(1);
    c(2), $(function() {
        d.highlightAll(!1)
    })
}, function(a, b) {
    (function(b) {
        var c = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
            d = function() {
                var a = /\blang(?:uage)?-(\w+)\b/i,
                    b = 0,
                    d = c.Prism = {
                        util: {
                            encode: function(a) {
                                return a instanceof e ? new e(a.type, d.util.encode(a.content), a.alias) : "Array" === d.util.type(a) ? a.map(d.util.encode) : a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                            },
                            type: function(a) {
                                return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]
                            },
                            objId: function(a) {
                                return a.__id || Object.defineProperty(a, "__id", {
                                    value: ++b
                                }), a.__id
                            },
                            clone: function(a) {
                                switch (d.util.type(a)) {
                                    case "Object":
                                        var b = {};
                                        for (var c in a) a.hasOwnProperty(c) && (b[c] = d.util.clone(a[c]));
                                        return b;
                                    case "Array":
                                        return a.map && a.map(function(a) {
                                            return d.util.clone(a)
                                        })
                                }
                                return a
                            }
                        },
                        languages: {
                            extend: function(a, b) {
                                var c = d.util.clone(d.languages[a]);
                                for (var e in b) c[e] = b[e];
                                return c
                            },
                            insertBefore: function(a, b, c, e) {
                                e = e || d.languages;
                                var f = e[a];
                                if (2 == arguments.length) {
                                    c = arguments[1];
                                    for (var g in c) c.hasOwnProperty(g) && (f[g] = c[g]);
                                    return f
                                }
                                var h = {};
                                for (var i in f)
                                    if (f.hasOwnProperty(i)) {
                                        if (i == b)
                                            for (var g in c) c.hasOwnProperty(g) && (h[g] = c[g]);
                                        h[i] = f[i]
                                    }
                                return d.languages.DFS(d.languages, function(b, c) {
                                    c === e[a] && b != a && (this[b] = h)
                                }), e[a] = h
                            },
                            DFS: function(a, b, c, e) {
                                e = e || {};
                                for (var f in a) a.hasOwnProperty(f) && (b.call(a, f, a[f], c || f), "Object" !== d.util.type(a[f]) || e[d.util.objId(a[f])] ? "Array" !== d.util.type(a[f]) || e[d.util.objId(a[f])] || (e[d.util.objId(a[f])] = !0, d.languages.DFS(a[f], b, f, e)) : (e[d.util.objId(a[f])] = !0, d.languages.DFS(a[f], b, null, e)))
                            }
                        },
                        plugins: {},
                        highlightAll: function(a, b) {
                            var c = {
                                callback: b,
                                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                            };
                            d.hooks.run("before-highlightall", c);
                            for (var e, f = c.elements || document.querySelectorAll(c.selector), g = 0; e = f[g++];) d.highlightElement(e, !0 === a, c.callback)
                        },
                        highlightElement: function(b, e, f) {
                            for (var g, h, i = b; i && !a.test(i.className);) i = i.parentNode;
                            i && (g = (i.className.match(a) || [, ""])[1].toLowerCase(), h = d.languages[g]), b.className = b.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g, i = b.parentNode, /pre/i.test(i.nodeName) && (i.className = i.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g);
                            var j = b.textContent,
                                k = {
                                    element: b,
                                    language: g,
                                    grammar: h,
                                    code: j
                                };
                            if (d.hooks.run("before-sanity-check", k), !k.code || !k.grammar) return k.code && (k.element.textContent = k.code), void d.hooks.run("complete", k);
                            if (d.hooks.run("before-highlight", k), e && c.Worker) {
                                var l = new Worker(d.filename);
                                l.onmessage = function(a) {
                                    k.highlightedCode = a.data, d.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(k.element), d.hooks.run("after-highlight", k), d.hooks.run("complete", k)
                                }, l.postMessage(JSON.stringify({
                                    language: k.language,
                                    code: k.code,
                                    immediateClose: !0
                                }))
                            } else k.highlightedCode = d.highlight(k.code, k.grammar, k.language), d.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(b), d.hooks.run("after-highlight", k), d.hooks.run("complete", k)
                        },
                        highlight: function(a, b, c) {
                            var f = d.tokenize(a, b);
                            return e.stringify(d.util.encode(f), c)
                        },
                        tokenize: function(a, b, c) {
                            var e = d.Token,
                                f = [a],
                                g = b.rest;
                            if (g) {
                                for (var h in g) b[h] = g[h];
                                delete b.rest
                            }
                            a: for (var h in b)
                                if (b.hasOwnProperty(h) && b[h]) {
                                    var i = b[h];
                                    i = "Array" === d.util.type(i) ? i : [i];
                                    for (var j = 0; j < i.length; ++j) {
                                        var k = i[j],
                                            l = k.inside,
                                            m = !!k.lookbehind,
                                            n = !!k.greedy,
                                            o = 0,
                                            p = k.alias;
                                        if (n && !k.pattern.global) {
                                            var q = k.pattern.toString().match(/[imuy]*$/)[0];
                                            k.pattern = RegExp(k.pattern.source, q + "g")
                                        }
                                        k = k.pattern || k;
                                        for (var r = 0, s = 0; r < f.length; s += f[r].length, ++r) {
                                            var t = f[r];
                                            if (f.length > a.length) break a;
                                            if (!(t instanceof e)) {
                                                k.lastIndex = 0;
                                                var u = k.exec(t),
                                                    v = 1;
                                                if (!u && n && r != f.length - 1) {
                                                    if (k.lastIndex = s, !(u = k.exec(a))) break;
                                                    for (var w = u.index + (m ? u[1].length : 0), x = u.index + u[0].length, y = r, z = s, A = f.length; y < A && z < x; ++y) z += f[y].length, w >= z && (++r, s = z);
                                                    if (f[r] instanceof e || f[y - 1].greedy) continue;
                                                    v = y - r, t = a.slice(s, z), u.index -= s
                                                }
                                                if (u) {
                                                    m && (o = u[1].length);
                                                    var w = u.index + o,
                                                        u = u[0].slice(o),
                                                        x = w + u.length,
                                                        B = t.slice(0, w),
                                                        C = t.slice(x),
                                                        D = [r, v];
                                                    B && D.push(B);
                                                    var E = new e(h, l ? d.tokenize(u, l) : u, p, u, n);
                                                    D.push(E), C && D.push(C), Array.prototype.splice.apply(f, D)
                                                }
                                            }
                                        }
                                    }
                                }
                            return f
                        },
                        hooks: {
                            all: {},
                            add: function(a, b) {
                                var c = d.hooks.all;
                                c[a] = c[a] || [], c[a].push(b)
                            },
                            run: function(a, b) {
                                var c = d.hooks.all[a];
                                if (c && c.length)
                                    for (var e, f = 0; e = c[f++];) e(b)
                            }
                        }
                    },
                    e = d.Token = function(a, b, c, d, e) {
                        this.type = a, this.content = b, this.alias = c, this.length = 0 | (d || "").length, this.greedy = !!e
                    };
                if (e.stringify = function(a, b, c) {
                        if ("string" == typeof a) return a;
                        if ("Array" === d.util.type(a)) return a.map(function(c) {
                            return e.stringify(c, b, a)
                        }).join("");
                        var f = {
                            type: a.type,
                            content: e.stringify(a.content, b, c),
                            tag: "span",
                            classes: ["token", a.type],
                            attributes: {},
                            language: b,
                            parent: c
                        };
                        if ("comment" == f.type && (f.attributes.spellcheck = "true"), a.alias) {
                            var g = "Array" === d.util.type(a.alias) ? a.alias : [a.alias];
                            Array.prototype.push.apply(f.classes, g)
                        }
                        d.hooks.run("wrap", f);
                        var h = Object.keys(f.attributes).map(function(a) {
                            return a + '="' + (f.attributes[a] || "").replace(/"/g, "&quot;") + '"'
                        }).join(" ");
                        return "<" + f.tag + ' class="' + f.classes.join(" ") + '"' + (h ? " " + h : "") + ">" + f.content + "</" + f.tag + ">"
                    }, !c.document) return c.addEventListener ? (c.addEventListener("message", function(a) {
                    var b = JSON.parse(a.data),
                        e = b.language,
                        f = b.code,
                        g = b.immediateClose;
                    c.postMessage(d.highlight(f, d.languages[e], e)), g && c.close()
                }, !1), c.Prism) : c.Prism;
                var f = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
                return f && (d.filename = f.src, document.addEventListener && !f.hasAttribute("data-manual") && ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(d.highlightAll) : window.setTimeout(d.highlightAll, 16) : document.addEventListener("DOMContentLoaded", d.highlightAll))), c.Prism
            }();
        void 0 !== a && a.exports && (a.exports = d), void 0 !== b && (b.Prism = d), d.languages.markup = {
                comment: /<!--[\w\W]*?-->/,
                prolog: /<\?[\w\W]+?\?>/,
                doctype: /<!DOCTYPE[\w\W]+?>/i,
                cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
                tag: {
                    pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
                    inside: {
                        tag: {
                            pattern: /^<\/?[^\s>\/]+/i,
                            inside: {
                                punctuation: /^<\/?/,
                                namespace: /^[^\s>\/:]+:/
                            }
                        },
                        "attr-value": {
                            pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                            inside: {
                                punctuation: /[=>"']/
                            }
                        },
                        punctuation: /\/?>/,
                        "attr-name": {
                            pattern: /[^\s>\/]+/,
                            inside: {
                                namespace: /^[^\s>\/:]+:/
                            }
                        }
                    }
                },
                entity: /&#?[\da-z]{1,8};/i
            }, d.hooks.add("wrap", function(a) {
                "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
            }), d.languages.xml = d.languages.markup, d.languages.html = d.languages.markup, d.languages.mathml = d.languages.markup, d.languages.svg = d.languages.markup, d.languages.css = {
                comment: /\/\*[\w\W]*?\*\//,
                atrule: {
                    pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
                    inside: {
                        rule: /@[\w-]+/
                    }
                },
                url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
                selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
                string: {
                    pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
                    greedy: !0
                },
                property: /(\b|\B)[\w-]+(?=\s*:)/i,
                important: /\B!important\b/i,
                function: /[-a-z0-9]+(?=\()/i,
                punctuation: /[(){};:]/
            }, d.languages.css.atrule.inside.rest = d.util.clone(d.languages.css), d.languages.markup && (d.languages.insertBefore("markup", "tag", {
                style: {
                    pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
                    lookbehind: !0,
                    inside: d.languages.css,
                    alias: "language-css"
                }
            }), d.languages.insertBefore("inside", "attr-value", {
                "style-attr": {
                    pattern: /\s*style=("|').*?\1/i,
                    inside: {
                        "attr-name": {
                            pattern: /^\s*style/i,
                            inside: d.languages.markup.tag.inside
                        },
                        punctuation: /^\s*=\s*['"]|['"]\s*$/,
                        "attr-value": {
                            pattern: /.+/i,
                            inside: d.languages.css
                        }
                    },
                    alias: "language-css"
                }
            }, d.languages.markup.tag)), d.languages.clike = {
                comment: [{
                    pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
                    lookbehind: !0
                }, {
                    pattern: /(^|[^\\:])\/\/.*/,
                    lookbehind: !0
                }],
                string: {
                    pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                    greedy: !0
                },
                "class-name": {
                    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
                    lookbehind: !0,
                    inside: {
                        punctuation: /(\.|\\)/
                    }
                },
                keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
                boolean: /\b(true|false)\b/,
                function: /[a-z0-9_]+(?=\()/i,
                number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
                operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
                punctuation: /[{}[\];(),.:]/
            }, d.languages.javascript = d.languages.extend("clike", {
                keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
                number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
                function: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
                operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
            }), d.languages.insertBefore("javascript", "keyword", {
                regex: {
                    pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
                    lookbehind: !0,
                    greedy: !0
                }
            }), d.languages.insertBefore("javascript", "string", {
                "template-string": {
                    pattern: /`(?:\\\\|\\?[^\\])*?`/,
                    greedy: !0,
                    inside: {
                        interpolation: {
                            pattern: /\$\{[^}]+\}/,
                            inside: {
                                "interpolation-punctuation": {
                                    pattern: /^\$\{|\}$/,
                                    alias: "punctuation"
                                },
                                rest: d.languages.javascript
                            }
                        },
                        string: /[\s\S]+/
                    }
                }
            }), d.languages.markup && d.languages.insertBefore("markup", "tag", {
                script: {
                    pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
                    lookbehind: !0,
                    inside: d.languages.javascript,
                    alias: "language-javascript"
                }
            }), d.languages.js = d.languages.javascript,
            function() {
                "undefined" != typeof self && self.Prism && self.document && document.querySelector && (self.Prism.fileHighlight = function() {
                    var a = {
                        js: "javascript",
                        py: "python",
                        rb: "ruby",
                        ps1: "powershell",
                        psm1: "powershell",
                        sh: "bash",
                        bat: "batch",
                        h: "c",
                        tex: "latex"
                    };
                    Array.prototype.forEach && Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(b) {
                        for (var c, e = b.getAttribute("data-src"), f = b, g = /\blang(?:uage)?-(?!\*)(\w+)\b/i; f && !g.test(f.className);) f = f.parentNode;
                        if (f && (c = (b.className.match(g) || [, ""])[1]), !c) {
                            var h = (e.match(/\.(\w+)$/) || [, ""])[1];
                            c = a[h] || h
                        }
                        var i = document.createElement("code");
                        i.className = "language-" + c, b.textContent = "", i.textContent = "Loading…", b.appendChild(i);
                        var j = new XMLHttpRequest;
                        j.open("GET", e, !0), j.onreadystatechange = function() {
                            4 == j.readyState && (j.status < 400 && j.responseText ? (i.textContent = j.responseText, d.highlightElement(i)) : j.status >= 400 ? i.textContent = "✖ Error " + j.status + " while fetching file: " + j.statusText : i.textContent = "✖ Error: File does not exist or is empty")
                        }, j.send(null)
                    })
                }, document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight))
            }()
    }).call(b, function() {
        return this
    }())
}, function(a, b, c) {
    var d, e;
    ! function(b, c) {
        "use strict";
        "object" == typeof a && "object" == typeof a.exports ? a.exports = b.document ? c(b, !0) : function(a) {
            if (!a.document) throw new Error("jQuery requires a window with a document");
            return c(a)
        } : c(b)
    }("undefined" != typeof window ? window : this, function(c, f) {
        "use strict";

        function g(a, b) {
            b = b || ga;
            var c = b.createElement("script");
            c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
        }

        function h(a) {
            var b = !!a && "length" in a && a.length,
                c = sa.type(a);
            return "function" !== c && !sa.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
        }

        function i(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }

        function j(a, b, c) {
            return sa.isFunction(b) ? sa.grep(a, function(a, d) {
                return !!b.call(a, d, a) !== c
            }) : b.nodeType ? sa.grep(a, function(a) {
                return a === b !== c
            }) : "string" != typeof b ? sa.grep(a, function(a) {
                return la.call(b, a) > -1 !== c
            }) : za.test(b) ? sa.filter(b, a, c) : (b = sa.filter(b, a), sa.grep(a, function(a) {
                return la.call(b, a) > -1 !== c && 1 === a.nodeType
            }))
        }

        function k(a, b) {
            for (;
                (a = a[b]) && 1 !== a.nodeType;);
            return a
        }

        function l(a) {
            var b = {};
            return sa.each(a.match(Ea) || [], function(a, c) {
                b[c] = !0
            }), b
        }

        function m(a) {
            return a
        }

        function n(a) {
            throw a
        }

        function o(a, b, c, d) {
            var e;
            try {
                a && sa.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && sa.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d))
            } catch (a) {
                c.apply(void 0, [a])
            }
        }

        function p() {
            ga.removeEventListener("DOMContentLoaded", p), c.removeEventListener("load", p), sa.ready()
        }

        function q() {
            this.expando = sa.expando + q.uid++
        }

        function r(a) {
            return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : La.test(a) ? JSON.parse(a) : a)
        }

        function s(a, b, c) {
            var d;
            if (void 0 === c && 1 === a.nodeType)
                if (d = "data-" + b.replace(Ma, "-$&").toLowerCase(), "string" == typeof(c = a.getAttribute(d))) {
                    try {
                        c = r(c)
                    } catch (a) {}
                    Ka.set(a, b, c)
                } else c = void 0;
            return c
        }

        function t(a, b, c, d) {
            var e, f = 1,
                g = 20,
                h = d ? function() {
                    return d.cur()
                } : function() {
                    return sa.css(a, b, "")
                },
                i = h(),
                j = c && c[3] || (sa.cssNumber[b] ? "" : "px"),
                k = (sa.cssNumber[b] || "px" !== j && +i) && Oa.exec(sa.css(a, b));
            if (k && k[3] !== j) {
                j = j || k[3], c = c || [], k = +i || 1;
                do {
                    f = f || ".5", k /= f, sa.style(a, b, k + j)
                } while (f !== (f = h() / i) && 1 !== f && --g)
            }
            return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
        }

        function u(a) {
            var b, c = a.ownerDocument,
                d = a.nodeName,
                e = Sa[d];
            return e || (b = c.body.appendChild(c.createElement(d)), e = sa.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), Sa[d] = e, e)
        }

        function v(a, b) {
            for (var c, d, e = [], f = 0, g = a.length; f < g; f++) d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = Ja.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && Qa(d) && (e[f] = u(d))) : "none" !== c && (e[f] = "none", Ja.set(d, "display", c)));
            for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
            return a
        }

        function w(a, b) {
            var c;
            return c = void 0 !== a.getElementsByTagName ? a.getElementsByTagName(b || "*") : void 0 !== a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && i(a, b) ? sa.merge([a], c) : c
        }

        function x(a, b) {
            for (var c = 0, d = a.length; c < d; c++) Ja.set(a[c], "globalEval", !b || Ja.get(b[c], "globalEval"))
        }

        function y(a, b, c, d, e) {
            for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++)
                if ((f = a[n]) || 0 === f)
                    if ("object" === sa.type(f)) sa.merge(m, f.nodeType ? [f] : f);
                    else if (Xa.test(f)) {
                for (g = g || l.appendChild(b.createElement("div")), h = (Ua.exec(f) || ["", ""])[1].toLowerCase(), i = Wa[h] || Wa._default, g.innerHTML = i[1] + sa.htmlPrefilter(f) + i[2], k = i[0]; k--;) g = g.lastChild;
                sa.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
            } else m.push(b.createTextNode(f));
            for (l.textContent = "", n = 0; f = m[n++];)
                if (d && sa.inArray(f, d) > -1) e && e.push(f);
                else if (j = sa.contains(f.ownerDocument, f), g = w(l.appendChild(f), "script"), j && x(g), c)
                for (k = 0; f = g[k++];) Va.test(f.type || "") && c.push(f);
            return l
        }

        function z() {
            return !0
        }

        function A() {
            return !1
        }

        function B() {
            try {
                return ga.activeElement
            } catch (a) {}
        }

        function C(a, b, c, d, e, f) {
            var g, h;
            if ("object" == typeof b) {
                "string" != typeof c && (d = d || c, c = void 0);
                for (h in b) C(a, h, c, d, b[h], f);
                return a
            }
            if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), !1 === e) e = A;
            else if (!e) return a;
            return 1 === f && (g = e, e = function(a) {
                return sa().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = sa.guid++)), a.each(function() {
                sa.event.add(this, b, e, d, c)
            })
        }

        function D(a, b) {
            return i(a, "table") && i(11 !== b.nodeType ? b : b.firstChild, "tr") ? sa(">tbody", a)[0] || a : a
        }

        function E(a) {
            return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
        }

        function F(a) {
            var b = cb.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function G(a, b) {
            var c, d, e, f, g, h, i, j;
            if (1 === b.nodeType) {
                if (Ja.hasData(a) && (f = Ja.access(a), g = Ja.set(b, f), j = f.events)) {
                    delete g.handle, g.events = {};
                    for (e in j)
                        for (c = 0, d = j[e].length; c < d; c++) sa.event.add(b, e, j[e][c])
                }
                Ka.hasData(a) && (h = Ka.access(a), i = sa.extend({}, h), Ka.set(b, i))
            }
        }

        function H(a, b) {
            var c = b.nodeName.toLowerCase();
            "input" === c && Ta.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
        }

        function I(a, b, c, d) {
            b = ja.apply([], b);
            var e, f, h, i, j, k, l = 0,
                m = a.length,
                n = m - 1,
                o = b[0],
                p = sa.isFunction(o);
            if (p || m > 1 && "string" == typeof o && !ra.checkClone && bb.test(o)) return a.each(function(e) {
                var f = a.eq(e);
                p && (b[0] = o.call(this, e, f.html())), I(f, b, c, d)
            });
            if (m && (e = y(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
                for (h = sa.map(w(e, "script"), E), i = h.length; l < m; l++) j = e, l !== n && (j = sa.clone(j, !0, !0), i && sa.merge(h, w(j, "script"))), c.call(a[l], j, l);
                if (i)
                    for (k = h[h.length - 1].ownerDocument, sa.map(h, F), l = 0; l < i; l++) j = h[l], Va.test(j.type || "") && !Ja.access(j, "globalEval") && sa.contains(k, j) && (j.src ? sa._evalUrl && sa._evalUrl(j.src) : g(j.textContent.replace(db, ""), k))
            }
            return a
        }

        function J(a, b, c) {
            for (var d, e = b ? sa.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || sa.cleanData(w(d)), d.parentNode && (c && sa.contains(d.ownerDocument, d) && x(w(d, "script")), d.parentNode.removeChild(d));
            return a
        }

        function K(a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || gb(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || sa.contains(a.ownerDocument, a) || (g = sa.style(a, b)), !ra.pixelMarginRight() && fb.test(g) && eb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
        }

        function L(a, b) {
            return {
                get: function() {
                    return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }

        function M(a) {
            if (a in mb) return a;
            for (var b = a[0].toUpperCase() + a.slice(1), c = lb.length; c--;)
                if ((a = lb[c] + b) in mb) return a
        }

        function N(a) {
            var b = sa.cssProps[a];
            return b || (b = sa.cssProps[a] = M(a) || a), b
        }

        function O(a, b, c) {
            var d = Oa.exec(b);
            return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
        }

        function P(a, b, c, d, e) {
            var f, g = 0;
            for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) "margin" === c && (g += sa.css(a, c + Pa[f], !0, e)), d ? ("content" === c && (g -= sa.css(a, "padding" + Pa[f], !0, e)), "margin" !== c && (g -= sa.css(a, "border" + Pa[f] + "Width", !0, e))) : (g += sa.css(a, "padding" + Pa[f], !0, e), "padding" !== c && (g += sa.css(a, "border" + Pa[f] + "Width", !0, e)));
            return g
        }

        function Q(a, b, c) {
            var d, e = gb(a),
                f = K(a, b, e),
                g = "border-box" === sa.css(a, "boxSizing", !1, e);
            return fb.test(f) ? f : (d = g && (ra.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), (f = parseFloat(f) || 0) + P(a, b, c || (g ? "border" : "content"), d, e) + "px")
        }

        function R(a, b, c, d, e) {
            return new R.prototype.init(a, b, c, d, e)
        }

        function S() {
            ob && (!1 === ga.hidden && c.requestAnimationFrame ? c.requestAnimationFrame(S) : c.setTimeout(S, sa.fx.interval), sa.fx.tick())
        }

        function T() {
            return c.setTimeout(function() {
                nb = void 0
            }), nb = sa.now()
        }

        function U(a, b) {
            var c, d = 0,
                e = {
                    height: a
                };
            for (b = b ? 1 : 0; d < 4; d += 2 - b) c = Pa[d], e["margin" + c] = e["padding" + c] = a;
            return b && (e.opacity = e.width = a), e
        }

        function V(a, b, c) {
            for (var d, e = (Y.tweeners[b] || []).concat(Y.tweeners["*"]), f = 0, g = e.length; f < g; f++)
                if (d = e[f].call(c, b, a)) return d
        }

        function W(a, b, c) {
            var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b,
                m = this,
                n = {},
                o = a.style,
                p = a.nodeType && Qa(a),
                q = Ja.get(a, "fxshow");
            c.queue || (g = sa._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function() {
                g.unqueued || h()
            }), g.unqueued++, m.always(function() {
                m.always(function() {
                    g.unqueued--, sa.queue(a, "fx").length || g.empty.fire()
                })
            }));
            for (d in b)
                if (e = b[d], pb.test(e)) {
                    if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                        if ("show" !== e || !q || void 0 === q[d]) continue;
                        p = !0
                    }
                    n[d] = q && q[d] || sa.style(a, d)
                }
            if ((i = !sa.isEmptyObject(b)) || !sa.isEmptyObject(n)) {
                l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = Ja.get(a, "display")), k = sa.css(a, "display"), "none" === k && (j ? k = j : (v([a], !0), j = a.style.display || j, k = sa.css(a, "display"), v([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === sa.css(a, "float") && (i || (m.done(function() {
                    o.display = j
                }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function() {
                    o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
                })), i = !1;
                for (d in n) i || (q ? "hidden" in q && (p = q.hidden) : q = Ja.access(a, "fxshow", {
                    display: j
                }), f && (q.hidden = !p), p && v([a], !0), m.done(function() {
                    p || v([a]), Ja.remove(a, "fxshow");
                    for (d in n) sa.style(a, d, n[d])
                })), i = V(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0))
            }
        }

        function X(a, b) {
            var c, d, e, f, g;
            for (c in a)
                if (d = sa.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), (g = sa.cssHooks[d]) && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f) c in a || (a[c] = f[c], b[c] = e)
                } else b[d] = e
        }

        function Y(a, b, c) {
            var d, e, f = 0,
                g = Y.prefilters.length,
                h = sa.Deferred().always(function() {
                    delete i.elem
                }),
                i = function() {
                    if (e) return !1;
                    for (var b = nb || T(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1)
                },
                j = h.promise({
                    elem: a,
                    props: sa.extend({}, b),
                    opts: sa.extend(!0, {
                        specialEasing: {},
                        easing: sa.easing._default
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: nb || T(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c) {
                        var d = sa.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d), d
                    },
                    stop: function(b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        for (e = !0; c < d; c++) j.tweens[c].run(1);
                        return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            for (X(k, j.opts.specialEasing); f < g; f++)
                if (d = Y.prefilters[f].call(j, a, k, j.opts)) return sa.isFunction(d.stop) && (sa._queueHooks(j.elem, j.opts.queue).stop = sa.proxy(d.stop, d)), d;
            return sa.map(k, V, j), sa.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), sa.fx.timer(sa.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j
        }

        function Z(a) {
            return (a.match(Ea) || []).join(" ")
        }

        function $(a) {
            return a.getAttribute && a.getAttribute("class") || ""
        }

        function _(a, b, c, d) {
            var e;
            if (Array.isArray(b)) sa.each(b, function(b, e) {
                c || zb.test(a) ? d(a, e) : _(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
            });
            else if (c || "object" !== sa.type(b)) d(a, b);
            else
                for (e in b) _(a + "[" + e + "]", b[e], c, d)
        }

        function aa(a) {
            return function(b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0,
                    f = b.toLowerCase().match(Ea) || [];
                if (sa.isFunction(c))
                    for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function ba(a, b, c, d) {
            function e(h) {
                var i;
                return f[h] = !0, sa.each(a[h] || [], function(a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                }), i
            }
            var f = {},
                g = a === Gb;
            return e(b.dataTypes[0]) || !f["*"] && e("*")
        }

        function ca(a, b) {
            var c, d, e = sa.ajaxSettings.flatOptions || {};
            for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
            return d && sa.extend(!0, a, d), a
        }

        function da(a, b, c) {
            for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
            if (d)
                for (e in h)
                    if (h[e] && h[e].test(d)) {
                        i.unshift(e);
                        break
                    }
            if (i[0] in c) f = i[0];
            else {
                for (e in c) {
                    if (!i[0] || a.converters[e + " " + i[0]]) {
                        f = e;
                        break
                    }
                    g || (g = e)
                }
                f = f || g
            }
            if (f) return f !== i[0] && i.unshift(f), c[f]
        }

        function ea(a, b, c, d) {
            var e, f, g, h, i, j = {},
                k = a.dataTypes.slice();
            if (k[1])
                for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f;)
                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                    if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) {
                if (!(g = j[i + " " + f] || j["* " + f]))
                    for (e in j)
                        if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                            !0 === g ? g = j[e] : !0 !== j[e] && (f = h[0], k.unshift(h[1]));
                            break
                        }
                if (!0 !== g)
                    if (g && a.throws) b = g(b);
                    else try {
                        b = g(b)
                    } catch (a) {
                        return {
                            state: "parsererror",
                            error: g ? a : "No conversion from " + i + " to " + f
                        }
                    }
            }
            return {
                state: "success",
                data: b
            }
        }
        var fa = [],
            ga = c.document,
            ha = Object.getPrototypeOf,
            ia = fa.slice,
            ja = fa.concat,
            ka = fa.push,
            la = fa.indexOf,
            ma = {},
            na = ma.toString,
            oa = ma.hasOwnProperty,
            pa = oa.toString,
            qa = pa.call(Object),
            ra = {},
            sa = function(a, b) {
                return new sa.fn.init(a, b)
            },
            ta = function(a, b) {
                return b.toUpperCase()
            };
        sa.fn = sa.prototype = {
            jquery: "3.2.1",
            constructor: sa,
            length: 0,
            toArray: function() {
                return ia.call(this)
            },
            get: function(a) {
                return null == a ? ia.call(this) : a < 0 ? this[a + this.length] : this[a]
            },
            pushStack: function(a) {
                var b = sa.merge(this.constructor(), a);
                return b.prevObject = this, b
            },
            each: function(a) {
                return sa.each(this, a)
            },
            map: function(a) {
                return this.pushStack(sa.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            slice: function() {
                return this.pushStack(ia.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(a) {
                var b = this.length,
                    c = +a + (a < 0 ? b : 0);
                return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ka,
            sort: fa.sort,
            splice: fa.splice
        }, sa.extend = sa.fn.extend = function() {
            var a, b, c, d, e, f, g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || sa.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)
                if (null != (a = arguments[h]))
                    for (b in a) c = g[b], d = a[b], g !== d && (j && d && (sa.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && sa.isPlainObject(c) ? c : {}, g[b] = sa.extend(j, f, d)) : void 0 !== d && (g[b] = d));
            return g
        }, sa.extend({
            expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(a) {
                throw new Error(a)
            },
            noop: function() {},
            isFunction: function(a) {
                return "function" === sa.type(a)
            },
            isWindow: function(a) {
                return null != a && a === a.window
            },
            isNumeric: function(a) {
                var b = sa.type(a);
                return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
            },
            isPlainObject: function(a) {
                var b, c;
                return !(!a || "[object Object]" !== na.call(a)) && (!(b = ha(a)) || "function" == typeof(c = oa.call(b, "constructor") && b.constructor) && pa.call(c) === qa)
            },
            isEmptyObject: function(a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            type: function(a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ma[na.call(a)] || "object" : typeof a
            },
            globalEval: function(a) {
                g(a)
            },
            camelCase: function(a) {
                return a.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, ta)
            },
            each: function(a, b) {
                var c, d = 0;
                if (h(a))
                    for (c = a.length; d < c && !1 !== b.call(a[d], d, a[d]); d++);
                else
                    for (d in a)
                        if (!1 === b.call(a[d], d, a[d])) break; return a
            },
            trim: function(a) {
                return null == a ? "" : (a + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            },
            makeArray: function(a, b) {
                var c = b || [];
                return null != a && (h(Object(a)) ? sa.merge(c, "string" == typeof a ? [a] : a) : ka.call(c, a)), c
            },
            inArray: function(a, b, c) {
                return null == b ? -1 : la.call(b, a, c)
            },
            merge: function(a, b) {
                for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
                return a.length = e, a
            },
            grep: function(a, b, c) {
                for (var d = [], e = 0, f = a.length, g = !c; e < f; e++) !b(a[e], e) !== g && d.push(a[e]);
                return d
            },
            map: function(a, b, c) {
                var d, e, f = 0,
                    g = [];
                if (h(a))
                    for (d = a.length; f < d; f++) null != (e = b(a[f], f, c)) && g.push(e);
                else
                    for (f in a) null != (e = b(a[f], f, c)) && g.push(e);
                return ja.apply([], g)
            },
            guid: 1,
            proxy: function(a, b) {
                var c, d, e;
                if ("string" == typeof b && (c = a[b], b = a, a = c), sa.isFunction(a)) return d = ia.call(arguments, 2), e = function() {
                    return a.apply(b || this, d.concat(ia.call(arguments)))
                }, e.guid = a.guid = a.guid || sa.guid++, e
            },
            now: Date.now,
            support: ra
        }), "function" == typeof Symbol && (sa.fn[Symbol.iterator] = fa[Symbol.iterator]), sa.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
            ma["[object " + b + "]"] = b.toLowerCase()
        });
        var ua = function(a) {
            function b(a, b, c, d) {
                var e, f, g, h, i, k, m, n = b && b.ownerDocument,
                    o = b ? b.nodeType : 9;
                if (c = c || [], "string" != typeof a || !a || 1 !== o && 9 !== o && 11 !== o) return c;
                if (!d && ((b ? b.ownerDocument || b : N) !== F && E(b), b = b || F, H)) {
                    if (11 !== o && (i = pa.exec(a)))
                        if (e = i[1]) {
                            if (9 === o) {
                                if (!(g = b.getElementById(e))) return c;
                                if (g.id === e) return c.push(g), c
                            } else if (n && (g = n.getElementById(e)) && L(b, g) && g.id === e) return c.push(g), c
                        } else {
                            if (i[2]) return Y.apply(c, b.getElementsByTagName(a)), c;
                            if ((e = i[3]) && u.getElementsByClassName && b.getElementsByClassName) return Y.apply(c, b.getElementsByClassName(e)), c
                        }
                    if (u.qsa && !S[a + " "] && (!I || !I.test(a))) {
                        if (1 !== o) n = b, m = a;
                        else if ("object" !== b.nodeName.toLowerCase()) {
                            for ((h = b.getAttribute("id")) ? h = h.replace(ta, ua) : b.setAttribute("id", h = M), k = y(a), f = k.length; f--;) k[f] = "#" + h + " " + l(k[f]);
                            m = k.join(","), n = qa.test(a) && j(b.parentNode) || b
                        }
                        if (m) try {
                            return Y.apply(c, n.querySelectorAll(m)), c
                        } catch (a) {} finally {
                            h === M && b.removeAttribute("id")
                        }
                    }
                }
                return A(a.replace(fa, "$1"), b, c, d)
            }

            function c() {
                function a(c, d) {
                    return b.push(c + " ") > v.cacheLength && delete a[b.shift()], a[c + " "] = d
                }
                var b = [];
                return a
            }

            function d(a) {
                return a[M] = !0, a
            }

            function e(a) {
                var b = F.createElement("fieldset");
                try {
                    return !!a(b)
                } catch (a) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function f(a, b) {
                for (var c = a.split("|"), d = c.length; d--;) v.attrHandle[c[d]] = b
            }

            function g(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                if (d) return d;
                if (c)
                    for (; c = c.nextSibling;)
                        if (c === b) return -1;
                return a ? 1 : -1
            }

            function h(a) {
                return function(b) {
                    return "form" in b ? b.parentNode && !1 === b.disabled ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && wa(b) === a : b.disabled === a : "label" in b && b.disabled === a
                }
            }

            function i(a) {
                return d(function(b) {
                    return b = +b, d(function(c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function j(a) {
                return a && void 0 !== a.getElementsByTagName && a
            }

            function k() {}

            function l(a) {
                for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
                return d
            }

            function m(a, b, c) {
                var d = b.dir,
                    e = b.next,
                    f = e || d,
                    g = c && "parentNode" === f,
                    h = P++;
                return b.first ? function(b, c, e) {
                    for (; b = b[d];)
                        if (1 === b.nodeType || g) return a(b, c, e);
                    return !1
                } : function(b, c, i) {
                    var j, k, l, m = [O, h];
                    if (i) {
                        for (; b = b[d];)
                            if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                    } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || g)
                                if (l = b[M] || (b[M] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;
                                else {
                                    if ((j = k[f]) && j[0] === O && j[1] === h) return m[2] = j[2];
                                    if (k[f] = m, m[2] = a(b, c, i)) return !0
                                } return !1
                }
            }

            function n(a) {
                return a.length > 1 ? function(b, c, d) {
                    for (var e = a.length; e--;)
                        if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function o(a, c, d) {
                for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
                return d
            }

            function p(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                return g
            }

            function q(a, b, c, e, f, g) {
                return e && !e[M] && (e = q(e)), f && !f[M] && (f = q(f, g)), d(function(d, g, h, i) {
                    var j, k, l, m = [],
                        n = [],
                        q = g.length,
                        r = d || o(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || !d && b ? r : p(r, m, a, h, i),
                        t = c ? f || (d ? a : q || e) ? [] : g : s;
                    if (c && c(s, t, h, i), e)
                        for (j = p(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                f(null, t = [], j, i)
                            }
                            for (k = t.length; k--;)(l = t[k]) && (j = f ? $(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                        }
                    } else t = p(t === g ? t.splice(q, t.length) : t), f ? f(null, g, t, i) : Y.apply(g, t)
                })
            }

            function r(a) {
                for (var b, c, d, e = a.length, f = v.relative[a[0].type], g = f || v.relative[" "], h = f ? 1 : 0, i = m(function(a) {
                        return a === b
                    }, g, !0), j = m(function(a) {
                        return $(b, a) > -1
                    }, g, !0), k = [function(a, c, d) {
                        var e = !f && (d || c !== B) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                        return b = null, e
                    }]; h < e; h++)
                    if (c = v.relative[a[h].type]) k = [m(n(k), c)];
                    else {
                        if (c = v.filter[a[h].type].apply(null, a[h].matches), c[M]) {
                            for (d = ++h; d < e && !v.relative[a[d].type]; d++);
                            return q(h > 1 && n(k), h > 1 && l(a.slice(0, h - 1).concat({
                                value: " " === a[h - 2].type ? "*" : ""
                            })).replace(fa, "$1"), c, h < d && r(a.slice(h, d)), d < e && r(a = a.slice(d)), d < e && l(a))
                        }
                        k.push(c)
                    }
                return n(k)
            }

            function s(a, c) {
                var e = c.length > 0,
                    f = a.length > 0,
                    g = function(d, g, h, i, j) {
                        var k, l, m, n = 0,
                            o = "0",
                            q = d && [],
                            r = [],
                            s = B,
                            t = d || f && v.find.TAG("*", j),
                            u = O += null == s ? 1 : Math.random() || .1,
                            w = t.length;
                        for (j && (B = g === F || g || j); o !== w && null != (k = t[o]); o++) {
                            if (f && k) {
                                for (l = 0, g || k.ownerDocument === F || (E(k), h = !H); m = a[l++];)
                                    if (m(k, g || F, h)) {
                                        i.push(k);
                                        break
                                    }
                                j && (O = u)
                            }
                            e && ((k = !m && k) && n--, d && q.push(k))
                        }
                        if (n += o, e && o !== n) {
                            for (l = 0; m = c[l++];) m(q, r, g, h);
                            if (d) {
                                if (n > 0)
                                    for (; o--;) q[o] || r[o] || (r[o] = W.call(i));
                                r = p(r)
                            }
                            Y.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                        }
                        return j && (O = u, B = s), q
                    };
                return e ? d(g) : g
            }
            var t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M = "sizzle" + 1 * new Date,
                N = a.document,
                O = 0,
                P = 0,
                Q = c(),
                R = c(),
                S = c(),
                T = function(a, b) {
                    return a === b && (D = !0), 0
                },
                U = {}.hasOwnProperty,
                V = [],
                W = V.pop,
                X = V.push,
                Y = V.push,
                Z = V.slice,
                $ = function(a, b) {
                    for (var c = 0, d = a.length; c < d; c++)
                        if (a[c] === b) return c;
                    return -1
                },
                _ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                aa = "[\\x20\\t\\r\\n\\f]",
                ba = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                ca = "\\[" + aa + "*(" + ba + ")(?:" + aa + "*([*^$|!~]?=)" + aa + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ba + "))|)" + aa + "*\\]",
                da = ":(" + ba + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ca + ")*)|.*)\\)|)",
                ea = new RegExp(aa + "+", "g"),
                fa = new RegExp("^" + aa + "+|((?:^|[^\\\\])(?:\\\\.)*)" + aa + "+$", "g"),
                ga = new RegExp("^" + aa + "*," + aa + "*"),
                ha = new RegExp("^" + aa + "*([>+~]|" + aa + ")" + aa + "*"),
                ia = new RegExp("=" + aa + "*([^\\]'\"]*?)" + aa + "*\\]", "g"),
                ja = new RegExp(da),
                ka = new RegExp("^" + ba + "$"),
                la = {
                    ID: new RegExp("^#(" + ba + ")"),
                    CLASS: new RegExp("^\\.(" + ba + ")"),
                    TAG: new RegExp("^(" + ba + "|[*])"),
                    ATTR: new RegExp("^" + ca),
                    PSEUDO: new RegExp("^" + da),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + aa + "*(even|odd|(([+-]|)(\\d*)n|)" + aa + "*(?:([+-]|)" + aa + "*(\\d+)|))" + aa + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + _ + ")$", "i"),
                    needsContext: new RegExp("^" + aa + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + aa + "*((?:-\\d)?\\d*)" + aa + "*\\)|)(?=[^-]|$)", "i")
                },
                ma = /^(?:input|select|textarea|button)$/i,
                na = /^h\d$/i,
                oa = /^[^{]+\{\s*\[native \w/,
                pa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                qa = /[+~]/,
                ra = new RegExp("\\\\([\\da-f]{1,6}" + aa + "?|(" + aa + ")|.)", "ig"),
                sa = function(a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                },
                ta = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                ua = function(a, b) {
                    return b ? "\0" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
                },
                va = function() {
                    E()
                },
                wa = m(function(a) {
                    return !0 === a.disabled && ("form" in a || "label" in a)
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                Y.apply(V = Z.call(N.childNodes), N.childNodes), V[N.childNodes.length].nodeType
            } catch (a) {
                Y = {
                    apply: V.length ? function(a, b) {
                        X.apply(a, Z.call(b))
                    } : function(a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
                }
            }
            u = b.support = {}, x = b.isXML = function(a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return !!b && "HTML" !== b.nodeName
            }, E = b.setDocument = function(a) {
                var b, c, d = a ? a.ownerDocument || a : N;
                return d !== F && 9 === d.nodeType && d.documentElement ? (F = d, G = F.documentElement, H = !x(F), N !== F && (c = F.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", va, !1) : c.attachEvent && c.attachEvent("onunload", va)), u.attributes = e(function(a) {
                    return a.className = "i", !a.getAttribute("className")
                }), u.getElementsByTagName = e(function(a) {
                    return a.appendChild(F.createComment("")), !a.getElementsByTagName("*").length
                }), u.getElementsByClassName = oa.test(F.getElementsByClassName), u.getById = e(function(a) {
                    return G.appendChild(a).id = M, !F.getElementsByName || !F.getElementsByName(M).length
                }), u.getById ? (v.filter.ID = function(a) {
                    var b = a.replace(ra, sa);
                    return function(a) {
                        return a.getAttribute("id") === b
                    }
                }, v.find.ID = function(a, b) {
                    if (void 0 !== b.getElementById && H) {
                        var c = b.getElementById(a);
                        return c ? [c] : []
                    }
                }) : (v.filter.ID = function(a) {
                    var b = a.replace(ra, sa);
                    return function(a) {
                        var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }, v.find.ID = function(a, b) {
                    if (void 0 !== b.getElementById && H) {
                        var c, d, e, f = b.getElementById(a);
                        if (f) {
                            if ((c = f.getAttributeNode("id")) && c.value === a) return [f];
                            for (e = b.getElementsByName(a), d = 0; f = e[d++];)
                                if ((c = f.getAttributeNode("id")) && c.value === a) return [f]
                        }
                        return []
                    }
                }), v.find.TAG = u.getElementsByTagName ? function(a, b) {
                    return void 0 !== b.getElementsByTagName ? b.getElementsByTagName(a) : u.qsa ? b.querySelectorAll(a) : void 0
                } : function(a, b) {
                    var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, v.find.CLASS = u.getElementsByClassName && function(a, b) {
                    if (void 0 !== b.getElementsByClassName && H) return b.getElementsByClassName(a)
                }, J = [], I = [], (u.qsa = oa.test(F.querySelectorAll)) && (e(function(a) {
                    G.appendChild(a).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + aa + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || I.push("\\[" + aa + "*(?:value|" + _ + ")"), a.querySelectorAll("[id~=" + M + "-]").length || I.push("~="), a.querySelectorAll(":checked").length || I.push(":checked"), a.querySelectorAll("a#" + M + "+*").length || I.push(".#.+[+~]")
                }), e(function(a) {
                    a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var b = F.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && I.push("name" + aa + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && I.push(":enabled", ":disabled"), G.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && I.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), I.push(",.*:")
                })), (u.matchesSelector = oa.test(K = G.matches || G.webkitMatchesSelector || G.mozMatchesSelector || G.oMatchesSelector || G.msMatchesSelector)) && e(function(a) {
                    u.disconnectedMatch = K.call(a, "*"), K.call(a, "[s!='']:x"), J.push("!=", da)
                }), I = I.length && new RegExp(I.join("|")), J = J.length && new RegExp(J.join("|")), b = oa.test(G.compareDocumentPosition), L = b || oa.test(G.contains) ? function(a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function(a, b) {
                    if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0;
                    return !1
                }, T = b ? function(a, b) {
                    if (a === b) return D = !0, 0;
                    var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return c || (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !u.sortDetached && b.compareDocumentPosition(a) === c ? a === F || a.ownerDocument === N && L(N, a) ? -1 : b === F || b.ownerDocument === N && L(N, b) ? 1 : C ? $(C, a) - $(C, b) : 0 : 4 & c ? -1 : 1)
                } : function(a, b) {
                    if (a === b) return D = !0, 0;
                    var c, d = 0,
                        e = a.parentNode,
                        f = b.parentNode,
                        h = [a],
                        i = [b];
                    if (!e || !f) return a === F ? -1 : b === F ? 1 : e ? -1 : f ? 1 : C ? $(C, a) - $(C, b) : 0;
                    if (e === f) return g(a, b);
                    for (c = a; c = c.parentNode;) h.unshift(c);
                    for (c = b; c = c.parentNode;) i.unshift(c);
                    for (; h[d] === i[d];) d++;
                    return d ? g(h[d], i[d]) : h[d] === N ? -1 : i[d] === N ? 1 : 0
                }, F) : F
            }, b.matches = function(a, c) {
                return b(a, null, null, c)
            }, b.matchesSelector = function(a, c) {
                if ((a.ownerDocument || a) !== F && E(a), c = c.replace(ia, "='$1']"), u.matchesSelector && H && !S[c + " "] && (!J || !J.test(c)) && (!I || !I.test(c))) try {
                    var d = K.call(a, c);
                    if (d || u.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (a) {}
                return b(c, F, null, [a]).length > 0
            }, b.contains = function(a, b) {
                return (a.ownerDocument || a) !== F && E(a), L(a, b)
            }, b.attr = function(a, b) {
                (a.ownerDocument || a) !== F && E(a);
                var c = v.attrHandle[b.toLowerCase()],
                    d = c && U.call(v.attrHandle, b.toLowerCase()) ? c(a, b, !H) : void 0;
                return void 0 !== d ? d : u.attributes || !H ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }, b.escape = function(a) {
                return (a + "").replace(ta, ua)
            }, b.error = function(a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, b.uniqueSort = function(a) {
                var b, c = [],
                    d = 0,
                    e = 0;
                if (D = !u.detectDuplicates, C = !u.sortStable && a.slice(0), a.sort(T), D) {
                    for (; b = a[e++];) b === a[e] && (d = c.push(e));
                    for (; d--;) a.splice(c[d], 1)
                }
                return C = null, a
            }, w = b.getText = function(a) {
                var b, c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += w(a)
                    } else if (3 === e || 4 === e) return a.nodeValue
                } else
                    for (; b = a[d++];) c += w(b);
                return c
            }, v = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: la,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(a) {
                        return a[1] = a[1].replace(ra, sa), a[3] = (a[3] || a[4] || a[5] || "").replace(ra, sa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    },
                    CHILD: function(a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                    },
                    PSEUDO: function(a) {
                        var b, c = !a[6] && a[2];
                        return la.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ja.test(c) && (b = y(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(a) {
                        var b = a.replace(ra, sa).toLowerCase();
                        return "*" === a ? function() {
                            return !0
                        } : function(a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    },
                    CLASS: function(a) {
                        var b = Q[a + " "];
                        return b || (b = new RegExp("(^|" + aa + ")" + a + "(" + aa + "|$)")) && Q(a, function(a) {
                            return b.test("string" == typeof a.className && a.className || void 0 !== a.getAttribute && a.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(a, c, d) {
                        return function(e) {
                            var f = b.attr(e, a);
                            return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ea, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                        }
                    },
                    CHILD: function(a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e ? function(a) {
                            return !!a.parentNode
                        } : function(b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h,
                                t = !1;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (m = b; m = m[p];)
                                            if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (m = q, l = m[M] || (m[M] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === O && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();)
                                        if (1 === m.nodeType && ++t && m === b) {
                                            k[a] = [O, n, t];
                                            break
                                        }
                                } else if (s && (m = b, l = m[M] || (m[M] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === O && j[1], t = n), !1 === t)
                                    for (;
                                        (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[M] || (m[M] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [O, t]), m !== b)););
                                return (t -= e) === d || t % d == 0 && t / d >= 0
                            }
                        }
                    },
                    PSEUDO: function(a, c) {
                        var e, f = v.pseudos[a] || v.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[M] ? f(c) : f.length > 1 ? (e = [a, a, "", c], v.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                            for (var d, e = f(a, c), g = e.length; g--;) d = $(a, e[g]), a[d] = !(b[d] = e[g])
                        }) : function(a) {
                            return f(a, 0, e)
                        }) : f
                    }
                },
                pseudos: {
                    not: d(function(a) {
                        var b = [],
                            c = [],
                            e = z(a.replace(fa, "$1"));
                        return e[M] ? d(function(a, b, c, d) {
                            for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function(a, d, f) {
                            return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                        }
                    }),
                    has: d(function(a) {
                        return function(c) {
                            return b(a, c).length > 0
                        }
                    }),
                    contains: d(function(a) {
                        return a = a.replace(ra, sa),
                            function(b) {
                                return (b.textContent || b.innerText || w(b)).indexOf(a) > -1
                            }
                    }),
                    lang: d(function(a) {
                        return ka.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ra, sa).toLowerCase(),
                            function(b) {
                                var c;
                                do {
                                    if (c = H ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-")
                                } while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1
                            }
                    }),
                    target: function(b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    },
                    root: function(a) {
                        return a === G
                    },
                    focus: function(a) {
                        return a === F.activeElement && (!F.hasFocus || F.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    },
                    enabled: h(!1),
                    disabled: h(!0),
                    checked: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    },
                    selected: function(a) {
                        return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                    },
                    empty: function(a) {
                        for (a = a.firstChild; a; a = a.nextSibling)
                            if (a.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(a) {
                        return !v.pseudos.empty(a)
                    },
                    header: function(a) {
                        return na.test(a.nodeName)
                    },
                    input: function(a) {
                        return ma.test(a.nodeName)
                    },
                    button: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    },
                    text: function(a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    },
                    first: i(function() {
                        return [0]
                    }),
                    last: i(function(a, b) {
                        return [b - 1]
                    }),
                    eq: i(function(a, b, c) {
                        return [c < 0 ? c + b : c]
                    }),
                    even: i(function(a, b) {
                        for (var c = 0; c < b; c += 2) a.push(c);
                        return a
                    }),
                    odd: i(function(a, b) {
                        for (var c = 1; c < b; c += 2) a.push(c);
                        return a
                    }),
                    lt: i(function(a, b, c) {
                        for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }),
                    gt: i(function(a, b, c) {
                        for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                        return a
                    })
                }
            }, v.pseudos.nth = v.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) v.pseudos[t] = function(a) {
                return function(b) {
                    return "input" === b.nodeName.toLowerCase() && b.type === a
                }
            }(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) v.pseudos[t] = function(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }(t);
            return k.prototype = v.filters = v.pseudos, v.setFilters = new k, y = b.tokenize = function(a, c) {
                var d, e, f, g, h, i, j, k = R[a + " "];
                if (k) return c ? 0 : k.slice(0);
                for (h = a, i = [], j = v.preFilter; h;) {
                    d && !(e = ga.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ha.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(fa, " ")
                    }), h = h.slice(d.length));
                    for (g in v.filter) !(e = la[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                        value: d,
                        type: g,
                        matches: e
                    }), h = h.slice(d.length));
                    if (!d) break
                }
                return c ? h.length : h ? b.error(a) : R(a, i).slice(0)
            }, z = b.compile = function(a, b) {
                var c, d = [],
                    e = [],
                    f = S[a + " "];
                if (!f) {
                    for (b || (b = y(a)), c = b.length; c--;) f = r(b[c]), f[M] ? d.push(f) : e.push(f);
                    f = S(a, s(e, d)), f.selector = a
                }
                return f
            }, A = b.select = function(a, b, c, d) {
                var e, f, g, h, i, k = "function" == typeof a && a,
                    m = !d && y(a = k.selector || a);
                if (c = c || [], 1 === m.length) {
                    if (f = m[0] = m[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType && H && v.relative[f[1].type]) {
                        if (!(b = (v.find.ID(g.matches[0].replace(ra, sa), b) || [])[0])) return c;
                        k && (b = b.parentNode), a = a.slice(f.shift().value.length)
                    }
                    for (e = la.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !v.relative[h = g.type]);)
                        if ((i = v.find[h]) && (d = i(g.matches[0].replace(ra, sa), qa.test(f[0].type) && j(b.parentNode) || b))) {
                            if (f.splice(e, 1), !(a = d.length && l(f))) return Y.apply(c, d), c;
                            break
                        }
                }
                return (k || z(a, m))(d, b, !H, c, !b || qa.test(a) && j(b.parentNode) || b), c
            }, u.sortStable = M.split("").sort(T).join("") === M, u.detectDuplicates = !!D, E(), u.sortDetached = e(function(a) {
                return 1 & a.compareDocumentPosition(F.createElement("fieldset"))
            }), e(function(a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || f("type|href|height|width", function(a, b, c) {
                if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), u.attributes && e(function(a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || f("value", function(a, b, c) {
                if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
            }), e(function(a) {
                return null == a.getAttribute("disabled")
            }) || f(_, function(a, b, c) {
                var d;
                if (!c) return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), b
        }(c);
        sa.find = ua, sa.expr = ua.selectors, sa.expr[":"] = sa.expr.pseudos, sa.uniqueSort = sa.unique = ua.uniqueSort, sa.text = ua.getText, sa.isXMLDoc = ua.isXML, sa.contains = ua.contains, sa.escapeSelector = ua.escape;
        var va = function(a, b, c) {
                for (var d = [], e = void 0 !== c;
                    (a = a[b]) && 9 !== a.nodeType;)
                    if (1 === a.nodeType) {
                        if (e && sa(a).is(c)) break;
                        d.push(a)
                    }
                return d
            },
            wa = function(a, b) {
                for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                return c
            },
            xa = sa.expr.match.needsContext,
            ya = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            za = /^.[^:#\[\.,]*$/;
        sa.filter = function(a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? sa.find.matchesSelector(d, a) ? [d] : [] : sa.find.matches(a, sa.grep(b, function(a) {
                return 1 === a.nodeType
            }))
        }, sa.fn.extend({
            find: function(a) {
                var b, c, d = this.length,
                    e = this;
                if ("string" != typeof a) return this.pushStack(sa(a).filter(function() {
                    for (b = 0; b < d; b++)
                        if (sa.contains(e[b], this)) return !0
                }));
                for (c = this.pushStack([]), b = 0; b < d; b++) sa.find(a, e[b], c);
                return d > 1 ? sa.uniqueSort(c) : c
            },
            filter: function(a) {
                return this.pushStack(j(this, a || [], !1))
            },
            not: function(a) {
                return this.pushStack(j(this, a || [], !0))
            },
            is: function(a) {
                return !!j(this, "string" == typeof a && xa.test(a) ? sa(a) : a || [], !1).length
            }
        });
        var Aa, Ba = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (sa.fn.init = function(a, b, c) {
            var d, e;
            if (!a) return this;
            if (c = c || Aa, "string" == typeof a) {
                if (!(d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : Ba.exec(a)) || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (d[1]) {
                    if (b = b instanceof sa ? b[0] : b, sa.merge(this, sa.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : ga, !0)), ya.test(d[1]) && sa.isPlainObject(b))
                        for (d in b) sa.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                    return this
                }
                return e = ga.getElementById(d[2]), e && (this[0] = e, this.length = 1), this
            }
            return a.nodeType ? (this[0] = a, this.length = 1, this) : sa.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(sa) : sa.makeArray(a, this)
        }).prototype = sa.fn, Aa = sa(ga);
        var Ca = /^(?:parents|prev(?:Until|All))/,
            Da = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        sa.fn.extend({
            has: function(a) {
                var b = sa(a, this),
                    c = b.length;
                return this.filter(function() {
                    for (var a = 0; a < c; a++)
                        if (sa.contains(this, b[a])) return !0
                })
            },
            closest: function(a, b) {
                var c, d = 0,
                    e = this.length,
                    f = [],
                    g = "string" != typeof a && sa(a);
                if (!xa.test(a))
                    for (; d < e; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && sa.find.matchesSelector(c, a))) {
                                f.push(c);
                                break
                            }
                return this.pushStack(f.length > 1 ? sa.uniqueSort(f) : f)
            },
            index: function(a) {
                return a ? "string" == typeof a ? la.call(sa(a), this[0]) : la.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(a, b) {
                return this.pushStack(sa.uniqueSort(sa.merge(this.get(), sa(a, b))))
            },
            addBack: function(a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        }), sa.each({
            parent: function(a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            },
            parents: function(a) {
                return va(a, "parentNode")
            },
            parentsUntil: function(a, b, c) {
                return va(a, "parentNode", c)
            },
            next: function(a) {
                return k(a, "nextSibling")
            },
            prev: function(a) {
                return k(a, "previousSibling")
            },
            nextAll: function(a) {
                return va(a, "nextSibling")
            },
            prevAll: function(a) {
                return va(a, "previousSibling")
            },
            nextUntil: function(a, b, c) {
                return va(a, "nextSibling", c)
            },
            prevUntil: function(a, b, c) {
                return va(a, "previousSibling", c)
            },
            siblings: function(a) {
                return wa((a.parentNode || {}).firstChild, a)
            },
            children: function(a) {
                return wa(a.firstChild)
            },
            contents: function(a) {
                return i(a, "iframe") ? a.contentDocument : (i(a, "template") && (a = a.content || a), sa.merge([], a.childNodes))
            }
        }, function(a, b) {
            sa.fn[a] = function(c, d) {
                var e = sa.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = sa.filter(d, e)), this.length > 1 && (Da[a] || sa.uniqueSort(e), Ca.test(a) && e.reverse()), this.pushStack(e)
            }
        });
        var Ea = /[^\x20\t\r\n\f]+/g;
        sa.Callbacks = function(a) {
            a = "string" == typeof a ? l(a) : sa.extend({}, a);
            var b, c, d, e, f = [],
                g = [],
                h = -1,
                i = function() {
                    for (e = e || a.once, d = b = !0; g.length; h = -1)
                        for (c = g.shift(); ++h < f.length;) !1 === f[h].apply(c[0], c[1]) && a.stopOnFalse && (h = f.length, c = !1);
                    a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
                },
                j = {
                    add: function() {
                        return f && (c && !b && (h = f.length - 1, g.push(c)), function b(c) {
                            sa.each(c, function(c, d) {
                                sa.isFunction(d) ? a.unique && j.has(d) || f.push(d) : d && d.length && "string" !== sa.type(d) && b(d)
                            })
                        }(arguments), c && !b && i()), this
                    },
                    remove: function() {
                        return sa.each(arguments, function(a, b) {
                            for (var c;
                                (c = sa.inArray(b, f, c)) > -1;) f.splice(c, 1), c <= h && h--
                        }), this
                    },
                    has: function(a) {
                        return a ? sa.inArray(a, f) > -1 : f.length > 0
                    },
                    empty: function() {
                        return f && (f = []), this
                    },
                    disable: function() {
                        return e = g = [], f = c = "", this
                    },
                    disabled: function() {
                        return !f
                    },
                    lock: function() {
                        return e = g = [], c || b || (f = c = ""), this
                    },
                    locked: function() {
                        return !!e
                    },
                    fireWith: function(a, c) {
                        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
                    },
                    fire: function() {
                        return j.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!d
                    }
                };
            return j
        }, sa.extend({
            Deferred: function(a) {
                var b = [
                        ["notify", "progress", sa.Callbacks("memory"), sa.Callbacks("memory"), 2],
                        ["resolve", "done", sa.Callbacks("once memory"), sa.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", sa.Callbacks("once memory"), sa.Callbacks("once memory"), 1, "rejected"]
                    ],
                    d = "pending",
                    e = {
                        state: function() {
                            return d
                        },
                        always: function() {
                            return f.done(arguments).fail(arguments), this
                        },
                        catch: function(a) {
                            return e.then(null, a)
                        },
                        pipe: function() {
                            var a = arguments;
                            return sa.Deferred(function(c) {
                                sa.each(b, function(b, d) {
                                    var e = sa.isFunction(a[d[4]]) && a[d[4]];
                                    f[d[1]](function() {
                                        var a = e && e.apply(this, arguments);
                                        a && sa.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[d[0] + "With"](this, e ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        then: function(a, d, e) {
                            function f(a, b, d, e) {
                                return function() {
                                    var h = this,
                                        i = arguments,
                                        j = function() {
                                            var c, j;
                                            if (!(a < g)) {
                                                if ((c = d.apply(h, i)) === b.promise()) throw new TypeError("Thenable self-resolution");
                                                j = c && ("object" == typeof c || "function" == typeof c) && c.then, sa.isFunction(j) ? e ? j.call(c, f(g, b, m, e), f(g, b, n, e)) : (g++, j.call(c, f(g, b, m, e), f(g, b, n, e), f(g, b, m, b.notifyWith))) : (d !== m && (h = void 0, i = [c]), (e || b.resolveWith)(h, i))
                                            }
                                        },
                                        k = e ? j : function() {
                                            try {
                                                j()
                                            } catch (c) {
                                                sa.Deferred.exceptionHook && sa.Deferred.exceptionHook(c, k.stackTrace), a + 1 >= g && (d !== n && (h = void 0, i = [c]), b.rejectWith(h, i))
                                            }
                                        };
                                    a ? k() : (sa.Deferred.getStackHook && (k.stackTrace = sa.Deferred.getStackHook()), c.setTimeout(k))
                                }
                            }
                            var g = 0;
                            return sa.Deferred(function(c) {
                                b[0][3].add(f(0, c, sa.isFunction(e) ? e : m, c.notifyWith)), b[1][3].add(f(0, c, sa.isFunction(a) ? a : m)), b[2][3].add(f(0, c, sa.isFunction(d) ? d : n))
                            }).promise()
                        },
                        promise: function(a) {
                            return null != a ? sa.extend(a, e) : e
                        }
                    },
                    f = {};
                return sa.each(b, function(a, c) {
                    var g = c[2],
                        h = c[5];
                    e[c[1]] = g.add, h && g.add(function() {
                        d = h
                    }, b[3 - a][2].disable, b[0][2].lock), g.add(c[3].fire), f[c[0]] = function() {
                        return f[c[0] + "With"](this === f ? void 0 : this, arguments), this
                    }, f[c[0] + "With"] = g.fireWith
                }), e.promise(f), a && a.call(f, f), f
            },
            when: function(a) {
                var b = arguments.length,
                    c = b,
                    d = Array(c),
                    e = ia.call(arguments),
                    f = sa.Deferred(),
                    g = function(a) {
                        return function(c) {
                            d[a] = this, e[a] = arguments.length > 1 ? ia.call(arguments) : c, --b || f.resolveWith(d, e)
                        }
                    };
                if (b <= 1 && (o(a, f.done(g(c)).resolve, f.reject, !b), "pending" === f.state() || sa.isFunction(e[c] && e[c].then))) return f.then();
                for (; c--;) o(e[c], g(c), f.reject);
                return f.promise()
            }
        });
        var Fa = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        sa.Deferred.exceptionHook = function(a, b) {
            c.console && c.console.warn && a && Fa.test(a.name) && c.console.warn("jQuery.Deferred exception: " + a.message, a.stack, b)
        }, sa.readyException = function(a) {
            c.setTimeout(function() {
                throw a
            })
        };
        var Ga = sa.Deferred();
        sa.fn.ready = function(a) {
            return Ga.then(a).catch(function(a) {
                sa.readyException(a)
            }), this
        }, sa.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(a) {
                (!0 === a ? --sa.readyWait : sa.isReady) || (sa.isReady = !0, !0 !== a && --sa.readyWait > 0 || Ga.resolveWith(ga, [sa]))
            }
        }), sa.ready.then = Ga.then, "complete" === ga.readyState || "loading" !== ga.readyState && !ga.documentElement.doScroll ? c.setTimeout(sa.ready) : (ga.addEventListener("DOMContentLoaded", p), c.addEventListener("load", p));
        var Ha = function(a, b, c, d, e, f, g) {
                var h = 0,
                    i = a.length,
                    j = null == c;
                if ("object" === sa.type(c)) {
                    e = !0;
                    for (h in c) Ha(a, b, h, c[h], !0, f, g)
                } else if (void 0 !== d && (e = !0, sa.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                        return j.call(sa(a), c)
                    })), b))
                    for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            },
            Ia = function(a) {
                return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
            };
        q.uid = 1, q.prototype = {
            cache: function(a) {
                var b = a[this.expando];
                return b || (b = {}, Ia(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                    value: b,
                    configurable: !0
                }))), b
            },
            set: function(a, b, c) {
                var d, e = this.cache(a);
                if ("string" == typeof b) e[sa.camelCase(b)] = c;
                else
                    for (d in b) e[sa.camelCase(d)] = b[d];
                return e
            },
            get: function(a, b) {
                return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][sa.camelCase(b)]
            },
            access: function(a, b, c) {
                return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b)
            },
            remove: function(a, b) {
                var c, d = a[this.expando];
                if (void 0 !== d) {
                    if (void 0 !== b) {
                        Array.isArray(b) ? b = b.map(sa.camelCase) : (b = sa.camelCase(b), b = b in d ? [b] : b.match(Ea) || []), c = b.length;
                        for (; c--;) delete d[b[c]]
                    }(void 0 === b || sa.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
                }
            },
            hasData: function(a) {
                var b = a[this.expando];
                return void 0 !== b && !sa.isEmptyObject(b)
            }
        };
        var Ja = new q,
            Ka = new q,
            La = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Ma = /[A-Z]/g;
        sa.extend({
            hasData: function(a) {
                return Ka.hasData(a) || Ja.hasData(a)
            },
            data: function(a, b, c) {
                return Ka.access(a, b, c)
            },
            removeData: function(a, b) {
                Ka.remove(a, b)
            },
            _data: function(a, b, c) {
                return Ja.access(a, b, c)
            },
            _removeData: function(a, b) {
                Ja.remove(a, b)
            }
        }), sa.fn.extend({
            data: function(a, b) {
                var c, d, e, f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = Ka.get(f), 1 === f.nodeType && !Ja.get(f, "hasDataAttrs"))) {
                        for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = sa.camelCase(d.slice(5)), s(f, d, e[d])));
                        Ja.set(f, "hasDataAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function() {
                    Ka.set(this, a)
                }) : Ha(this, function(b) {
                    var c;
                    if (f && void 0 === b) {
                        if (void 0 !== (c = Ka.get(f, a))) return c;
                        if (void 0 !== (c = s(f, a))) return c
                    } else this.each(function() {
                        Ka.set(this, a, b)
                    })
                }, null, b, arguments.length > 1, null, !0)
            },
            removeData: function(a) {
                return this.each(function() {
                    Ka.remove(this, a)
                })
            }
        }), sa.extend({
            queue: function(a, b, c) {
                var d;
                if (a) return b = (b || "fx") + "queue", d = Ja.get(a, b), c && (!d || Array.isArray(c) ? d = Ja.access(a, b, sa.makeArray(c)) : d.push(c)), d || []
            },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = sa.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = sa._queueHooks(a, b),
                    g = function() {
                        sa.dequeue(a, b)
                    };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function(a, b) {
                var c = b + "queueHooks";
                return Ja.get(a, c) || Ja.access(a, c, {
                    empty: sa.Callbacks("once memory").add(function() {
                        Ja.remove(a, [b + "queue", c])
                    })
                })
            }
        }), sa.fn.extend({
            queue: function(a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? sa.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                    var c = sa.queue(this, a, b);
                    sa._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && sa.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    sa.dequeue(this, a)
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a, b) {
                var c, d = 1,
                    e = sa.Deferred(),
                    f = this,
                    g = this.length,
                    h = function() {
                        --d || e.resolveWith(f, [f])
                    };
                for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;)(c = Ja.get(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var Na = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Oa = new RegExp("^(?:([+-])=|)(" + Na + ")([a-z%]*)$", "i"),
            Pa = ["Top", "Right", "Bottom", "Left"],
            Qa = function(a, b) {
                return a = b || a, "none" === a.style.display || "" === a.style.display && sa.contains(a.ownerDocument, a) && "none" === sa.css(a, "display")
            },
            Ra = function(a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            },
            Sa = {};
        sa.fn.extend({
            show: function() {
                return v(this, !0)
            },
            hide: function() {
                return v(this)
            },
            toggle: function(a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                    Qa(this) ? sa(this).show() : sa(this).hide()
                })
            }
        });
        var Ta = /^(?:checkbox|radio)$/i,
            Ua = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Va = /^$|\/(?:java|ecma)script/i,
            Wa = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Wa.optgroup = Wa.option, Wa.tbody = Wa.tfoot = Wa.colgroup = Wa.caption = Wa.thead, Wa.th = Wa.td;
        var Xa = /<|&#?\w+;/;
        ! function() {
            var a = ga.createDocumentFragment(),
                b = a.appendChild(ga.createElement("div")),
                c = ga.createElement("input");
            c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), ra.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", ra.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
        }();
        var Ya = ga.documentElement,
            Za = /^key/,
            $a = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            _a = /^([^.]*)(?:\.(.+)|)/;
        sa.event = {
                global: {},
                add: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = Ja.get(a);
                    if (q)
                        for (c.handler && (f = c, c = f.handler, e = f.selector), e && sa.find.matchesSelector(Ya, e), c.guid || (c.guid = sa.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                                return void 0 !== sa && sa.event.triggered !== b.type ? sa.event.dispatch.apply(a, arguments) : void 0
                            }), b = (b || "").match(Ea) || [""], j = b.length; j--;) h = _a.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = sa.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = sa.event.special[n] || {}, k = sa.extend({
                            type: n,
                            origType: p,
                            data: d,
                            handler: c,
                            guid: c.guid,
                            selector: e,
                            needsContext: e && sa.expr.match.needsContext.test(e),
                            namespace: o.join(".")
                        }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && !1 !== l.setup.call(a, d, o, g) || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), sa.event.global[n] = !0)
                },
                remove: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = Ja.hasData(a) && Ja.get(a);
                    if (q && (i = q.events)) {
                        for (b = (b || "").match(Ea) || [""], j = b.length; j--;)
                            if (h = _a.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                                for (l = sa.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                                g && !m.length && (l.teardown && !1 !== l.teardown.call(a, o, q.handle) || sa.removeEvent(a, n, q.handle), delete i[n])
                            } else
                                for (n in i) sa.event.remove(a, n + b[j], c, d, !0);
                        sa.isEmptyObject(i) && Ja.remove(a, "handle events")
                    }
                },
                dispatch: function(a) {
                    var b, c, d, e, f, g, h = sa.event.fix(a),
                        i = new Array(arguments.length),
                        j = (Ja.get(this, "events") || {})[h.type] || [],
                        k = sa.event.special[h.type] || {};
                    for (i[0] = h, b = 1; b < arguments.length; b++) i[b] = arguments[b];
                    if (h.delegateTarget = this, !k.preDispatch || !1 !== k.preDispatch.call(this, h)) {
                        for (g = sa.event.handlers.call(this, h, j), b = 0;
                            (e = g[b++]) && !h.isPropagationStopped();)
                            for (h.currentTarget = e.elem, c = 0;
                                (f = e.handlers[c++]) && !h.isImmediatePropagationStopped();) h.rnamespace && !h.rnamespace.test(f.namespace) || (h.handleObj = f, h.data = f.data, void 0 !== (d = ((sa.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, i)) && !1 === (h.result = d) && (h.preventDefault(), h.stopPropagation()));
                        return k.postDispatch && k.postDispatch.call(this, h), h.result
                    }
                },
                handlers: function(a, b) {
                    var c, d, e, f, g, h = [],
                        i = b.delegateCount,
                        j = a.target;
                    if (i && j.nodeType && !("click" === a.type && a.button >= 1))
                        for (; j !== this; j = j.parentNode || this)
                            if (1 === j.nodeType && ("click" !== a.type || !0 !== j.disabled)) {
                                for (f = [], g = {}, c = 0; c < i; c++) d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? sa(e, this).index(j) > -1 : sa.find(e, this, null, [j]).length), g[e] && f.push(d);
                                f.length && h.push({
                                    elem: j,
                                    handlers: f
                                })
                            }
                    return j = this, i < b.length && h.push({
                        elem: j,
                        handlers: b.slice(i)
                    }), h
                },
                addProp: function(a, b) {
                    Object.defineProperty(sa.Event.prototype, a, {
                        enumerable: !0,
                        configurable: !0,
                        get: sa.isFunction(b) ? function() {
                            if (this.originalEvent) return b(this.originalEvent)
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[a]
                        },
                        set: function(b) {
                            Object.defineProperty(this, a, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: b
                            })
                        }
                    })
                },
                fix: function(a) {
                    return a[sa.expando] ? a : new sa.Event(a)
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== B() && this.focus) return this.focus(), !1
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === B() && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            if ("checkbox" === this.type && this.click && i(this, "input")) return this.click(), !1
                        },
                        _default: function(a) {
                            return i(a.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(a) {
                            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                }
            }, sa.removeEvent = function(a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c)
            }, sa.Event = function(a, b) {
                if (!(this instanceof sa.Event)) return new sa.Event(a, b);
                a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? z : A, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && sa.extend(this, b), this.timeStamp = a && a.timeStamp || sa.now(), this[sa.expando] = !0
            },
            sa.Event.prototype = {
                constructor: sa.Event,
                isDefaultPrevented: A,
                isPropagationStopped: A,
                isImmediatePropagationStopped: A,
                isSimulated: !1,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = z, a && !this.isSimulated && a.preventDefault()
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = z, a && !this.isSimulated && a.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var a = this.originalEvent;
                    this.isImmediatePropagationStopped = z, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
                }
            }, sa.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function(a) {
                    var b = a.button;
                    return null == a.which && Za.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && $a.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which
                }
            }, sa.event.addProp), sa.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(a, b) {
                sa.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function(a) {
                        var c, d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        return e && (e === d || sa.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                    }
                }
            }), sa.fn.extend({
                on: function(a, b, c, d) {
                    return C(this, a, b, c, d)
                },
                one: function(a, b, c, d) {
                    return C(this, a, b, c, d, 1)
                },
                off: function(a, b, c) {
                    var d, e;
                    if (a && a.preventDefault && a.handleObj) return d = a.handleObj, sa(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                    if ("object" == typeof a) {
                        for (e in a) this.off(e, b, a[e]);
                        return this
                    }
                    return !1 !== b && "function" != typeof b || (c = b, b = void 0), !1 === c && (c = A), this.each(function() {
                        sa.event.remove(this, a, c, b)
                    })
                }
            });
        var ab = /<script|<style|<link/i,
            bb = /checked\s*(?:[^=]|=\s*.checked.)/i,
            cb = /^true\/(.*)/,
            db = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        sa.extend({
            htmlPrefilter: function(a) {
                return a.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, "<$1></$2>")
            },
            clone: function(a, b, c) {
                var d, e, f, g, h = a.cloneNode(!0),
                    i = sa.contains(a.ownerDocument, a);
                if (!(ra.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || sa.isXMLDoc(a)))
                    for (g = w(h), f = w(a), d = 0, e = f.length; d < e; d++) H(f[d], g[d]);
                if (b)
                    if (c)
                        for (f = f || w(a), g = g || w(h), d = 0, e = f.length; d < e; d++) G(f[d], g[d]);
                    else G(a, h);
                return g = w(h, "script"), g.length > 0 && x(g, !i && w(a, "script")), h
            },
            cleanData: function(a) {
                for (var b, c, d, e = sa.event.special, f = 0; void 0 !== (c = a[f]); f++)
                    if (Ia(c)) {
                        if (b = c[Ja.expando]) {
                            if (b.events)
                                for (d in b.events) e[d] ? sa.event.remove(c, d) : sa.removeEvent(c, d, b.handle);
                            c[Ja.expando] = void 0
                        }
                        c[Ka.expando] && (c[Ka.expando] = void 0)
                    }
            }
        }), sa.fn.extend({
            detach: function(a) {
                return J(this, a, !0)
            },
            remove: function(a) {
                return J(this, a)
            },
            text: function(a) {
                return Ha(this, function(a) {
                    return void 0 === a ? sa.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                    })
                }, null, a, arguments.length)
            },
            append: function() {
                return I(this, arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        D(this, a).appendChild(a)
                    }
                })
            },
            prepend: function() {
                return I(this, arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = D(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            },
            before: function() {
                return I(this, arguments, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            },
            after: function() {
                return I(this, arguments, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            },
            empty: function() {
                for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (sa.cleanData(w(a, !1)), a.textContent = "");
                return this
            },
            clone: function(a, b) {
                return a = null != a && a, b = null == b ? a : b, this.map(function() {
                    return sa.clone(this, a, b)
                })
            },
            html: function(a) {
                return Ha(this, function(a) {
                    var b = this[0] || {},
                        c = 0,
                        d = this.length;
                    if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                    if ("string" == typeof a && !ab.test(a) && !Wa[(Ua.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = sa.htmlPrefilter(a);
                        try {
                            for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (sa.cleanData(w(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (a) {}
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            },
            replaceWith: function() {
                var a = [];
                return I(this, arguments, function(b) {
                    var c = this.parentNode;
                    sa.inArray(this, a) < 0 && (sa.cleanData(w(this)), c && c.replaceChild(b, this))
                }, a)
            }
        }), sa.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) {
            sa.fn[a] = function(a) {
                for (var c, d = [], e = sa(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), sa(e[g])[b](c), ka.apply(d, c.get());
                return this.pushStack(d)
            }
        });
        var eb = /^margin/,
            fb = new RegExp("^(" + Na + ")(?!px)[a-z%]+$", "i"),
            gb = function(a) {
                var b = a.ownerDocument.defaultView;
                return b && b.opener || (b = c), b.getComputedStyle(a)
            };
        ! function() {
            function a() {
                if (h) {
                    h.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Ya.appendChild(g);
                    var a = c.getComputedStyle(h);
                    b = "1%" !== a.top, f = "2px" === a.marginLeft, d = "4px" === a.width, h.style.marginRight = "50%", e = "4px" === a.marginRight, Ya.removeChild(g), h = null
                }
            }
            var b, d, e, f, g = ga.createElement("div"),
                h = ga.createElement("div");
            h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", ra.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h), sa.extend(ra, {
                pixelPosition: function() {
                    return a(), b
                },
                boxSizingReliable: function() {
                    return a(), d
                },
                pixelMarginRight: function() {
                    return a(), e
                },
                reliableMarginLeft: function() {
                    return a(), f
                }
            }))
        }();
        var hb = /^(none|table(?!-c[ea]).+)/,
            ib = /^--/,
            jb = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            kb = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            lb = ["Webkit", "Moz", "ms"],
            mb = ga.createElement("div").style;
        sa.extend({
            cssHooks: {
                opacity: {
                    get: function(a, b) {
                        if (b) {
                            var c = K(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = sa.camelCase(b),
                        i = ib.test(b),
                        j = a.style;
                    if (i || (b = N(h)), g = sa.cssHooks[b] || sa.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b];
                    f = typeof c, "string" === f && (e = Oa.exec(c)) && e[1] && (c = t(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (sa.cssNumber[h] ? "" : "px")), ra.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c))
                }
            },
            css: function(a, b, c, d) {
                var e, f, g, h = sa.camelCase(b);
                return ib.test(b) || (b = N(h)), g = sa.cssHooks[b] || sa.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = K(a, b, d)), "normal" === e && b in kb && (e = kb[b]), "" === c || c ? (f = parseFloat(e), !0 === c || isFinite(f) ? f || 0 : e) : e
            }
        }), sa.each(["height", "width"], function(a, b) {
            sa.cssHooks[b] = {
                get: function(a, c, d) {
                    if (c) return !hb.test(sa.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? Q(a, b, d) : Ra(a, jb, function() {
                        return Q(a, b, d)
                    })
                },
                set: function(a, c, d) {
                    var e, f = d && gb(a),
                        g = d && P(a, b, d, "border-box" === sa.css(a, "boxSizing", !1, f), f);
                    return g && (e = Oa.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = sa.css(a, b)), O(a, c, g)
                }
            }
        }), sa.cssHooks.marginLeft = L(ra.reliableMarginLeft, function(a, b) {
            if (b) return (parseFloat(K(a, "marginLeft")) || a.getBoundingClientRect().left - Ra(a, {
                marginLeft: 0
            }, function() {
                return a.getBoundingClientRect().left
            })) + "px"
        }), sa.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(a, b) {
            sa.cssHooks[a + b] = {
                expand: function(c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + Pa[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, eb.test(a) || (sa.cssHooks[a + b].set = O)
        }), sa.fn.extend({
            css: function(a, b) {
                return Ha(this, function(a, b, c) {
                    var d, e, f = {},
                        g = 0;
                    if (Array.isArray(b)) {
                        for (d = gb(a), e = b.length; g < e; g++) f[b[g]] = sa.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? sa.style(a, b, c) : sa.css(a, b)
                }, a, b, arguments.length > 1)
            }
        }), sa.Tween = R, R.prototype = {
            constructor: R,
            init: function(a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || sa.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (sa.cssNumber[c] ? "" : "px")
            },
            cur: function() {
                var a = R.propHooks[this.prop];
                return a && a.get ? a.get(this) : R.propHooks._default.get(this)
            },
            run: function(a) {
                var b, c = R.propHooks[this.prop];
                return this.options.duration ? this.pos = b = sa.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : R.propHooks._default.set(this), this
            }
        }, R.prototype.init.prototype = R.prototype, R.propHooks = {
            _default: {
                get: function(a) {
                    var b;
                    return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = sa.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
                },
                set: function(a) {
                    sa.fx.step[a.prop] ? sa.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[sa.cssProps[a.prop]] && !sa.cssHooks[a.prop] ? a.elem[a.prop] = a.now : sa.style(a.elem, a.prop, a.now + a.unit)
                }
            }
        }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
            set: function(a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, sa.easing = {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            },
            _default: "swing"
        }, sa.fx = R.prototype.init, sa.fx.step = {};
        var nb, ob, pb = /^(?:toggle|show|hide)$/,
            qb = /queueHooks$/;
        sa.Animation = sa.extend(Y, {
                tweeners: {
                    "*": [function(a, b) {
                        var c = this.createTween(a, b);
                        return t(c.elem, a, Oa.exec(b), c), c
                    }]
                },
                tweener: function(a, b) {
                    sa.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(Ea);
                    for (var c, d = 0, e = a.length; d < e; d++) c = a[d], Y.tweeners[c] = Y.tweeners[c] || [], Y.tweeners[c].unshift(b)
                },
                prefilters: [W],
                prefilter: function(a, b) {
                    b ? Y.prefilters.unshift(a) : Y.prefilters.push(a)
                }
            }), sa.speed = function(a, b, c) {
                var d = a && "object" == typeof a ? sa.extend({}, a) : {
                    complete: c || !c && b || sa.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !sa.isFunction(b) && b
                };
                return sa.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in sa.fx.speeds ? d.duration = sa.fx.speeds[d.duration] : d.duration = sa.fx.speeds._default), null != d.queue && !0 !== d.queue || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                    sa.isFunction(d.old) && d.old.call(this), d.queue && sa.dequeue(this, d.queue)
                }, d
            }, sa.fn.extend({
                fadeTo: function(a, b, c, d) {
                    return this.filter(Qa).css("opacity", 0).show().end().animate({
                        opacity: b
                    }, a, c, d)
                },
                animate: function(a, b, c, d) {
                    var e = sa.isEmptyObject(a),
                        f = sa.speed(b, c, d),
                        g = function() {
                            var b = Y(this, sa.extend({}, a), f);
                            (e || Ja.get(this, "finish")) && b.stop(!0)
                        };
                    return g.finish = g, e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function(a, b, c) {
                    var d = function(a) {
                        var b = a.stop;
                        delete a.stop, b(c)
                    };
                    return "string" != typeof a && (c = b, b = a, a = void 0), b && !1 !== a && this.queue(a || "fx", []), this.each(function() {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = sa.timers,
                            g = Ja.get(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g) g[e] && g[e].stop && qb.test(e) && d(g[e]);
                        for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                        !b && c || sa.dequeue(this, a)
                    })
                },
                finish: function(a) {
                    return !1 !== a && (a = a || "fx"), this.each(function() {
                        var b, c = Ja.get(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = sa.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, sa.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish
                    })
                }
            }), sa.each(["toggle", "show", "hide"], function(a, b) {
                var c = sa.fn[b];
                sa.fn[b] = function(a, d, e) {
                    return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(U(b, !0), a, d, e)
                }
            }), sa.each({
                slideDown: U("show"),
                slideUp: U("hide"),
                slideToggle: U("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(a, b) {
                sa.fn[a] = function(a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }), sa.timers = [], sa.fx.tick = function() {
                var a, b = 0,
                    c = sa.timers;
                for (nb = sa.now(); b < c.length; b++)(a = c[b])() || c[b] !== a || c.splice(b--, 1);
                c.length || sa.fx.stop(), nb = void 0
            }, sa.fx.timer = function(a) {
                sa.timers.push(a), sa.fx.start()
            }, sa.fx.interval = 13, sa.fx.start = function() {
                ob || (ob = !0, S())
            }, sa.fx.stop = function() {
                ob = null
            }, sa.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, sa.fn.delay = function(a, b) {
                return a = sa.fx ? sa.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, d) {
                    var e = c.setTimeout(b, a);
                    d.stop = function() {
                        c.clearTimeout(e)
                    }
                })
            },
            function() {
                var a = ga.createElement("input"),
                    b = ga.createElement("select"),
                    c = b.appendChild(ga.createElement("option"));
                a.type = "checkbox", ra.checkOn = "" !== a.value, ra.optSelected = c.selected, a = ga.createElement("input"), a.value = "t", a.type = "radio", ra.radioValue = "t" === a.value
            }();
        var rb, sb = sa.expr.attrHandle;
        sa.fn.extend({
            attr: function(a, b) {
                return Ha(this, sa.attr, a, b, arguments.length > 1)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    sa.removeAttr(this, a)
                })
            }
        }), sa.extend({
            attr: function(a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return void 0 === a.getAttribute ? sa.prop(a, b, c) : (1 === f && sa.isXMLDoc(a) || (e = sa.attrHooks[b.toLowerCase()] || (sa.expr.match.bool.test(b) ? rb : void 0)), void 0 !== c ? null === c ? void sa.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = sa.find.attr(a, b), null == d ? void 0 : d))
            },
            attrHooks: {
                type: {
                    set: function(a, b) {
                        if (!ra.radioValue && "radio" === b && i(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            },
            removeAttr: function(a, b) {
                var c, d = 0,
                    e = b && b.match(Ea);
                if (e && 1 === a.nodeType)
                    for (; c = e[d++];) a.removeAttribute(c)
            }
        }), rb = {
            set: function(a, b, c) {
                return !1 === b ? sa.removeAttr(a, c) : a.setAttribute(c, c), c
            }
        }, sa.each(sa.expr.match.bool.source.match(/\w+/g), function(a, b) {
            var c = sb[b] || sa.find.attr;
            sb[b] = function(a, b, d) {
                var e, f, g = b.toLowerCase();
                return d || (f = sb[g], sb[g] = e, e = null != c(a, b, d) ? g : null, sb[g] = f), e
            }
        });
        var tb = /^(?:input|select|textarea|button)$/i,
            ub = /^(?:a|area)$/i;
        sa.fn.extend({
            prop: function(a, b) {
                return Ha(this, sa.prop, a, b, arguments.length > 1)
            },
            removeProp: function(a) {
                return this.each(function() {
                    delete this[sa.propFix[a] || a]
                })
            }
        }), sa.extend({
            prop: function(a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return 1 === f && sa.isXMLDoc(a) || (b = sa.propFix[b] || b, e = sa.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
            },
            propHooks: {
                tabIndex: {
                    get: function(a) {
                        var b = sa.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : tb.test(a.nodeName) || ub.test(a.nodeName) && a.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), ra.optSelected || (sa.propHooks.selected = {
            get: function(a) {
                var b = a.parentNode;
                return b && b.parentNode && b.parentNode.selectedIndex, null
            },
            set: function(a) {
                var b = a.parentNode;
                b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
            }
        }), sa.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            sa.propFix[this.toLowerCase()] = this
        }), sa.fn.extend({
            addClass: function(a) {
                var b, c, d, e, f, g, h, i = 0;
                if (sa.isFunction(a)) return this.each(function(b) {
                    sa(this).addClass(a.call(this, b, $(this)))
                });
                if ("string" == typeof a && a)
                    for (b = a.match(Ea) || []; c = this[i++];)
                        if (e = $(c), d = 1 === c.nodeType && " " + Z(e) + " ") {
                            for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                            h = Z(d), e !== h && c.setAttribute("class", h)
                        }
                return this
            },
            removeClass: function(a) {
                var b, c, d, e, f, g, h, i = 0;
                if (sa.isFunction(a)) return this.each(function(b) {
                    sa(this).removeClass(a.call(this, b, $(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof a && a)
                    for (b = a.match(Ea) || []; c = this[i++];)
                        if (e = $(c), d = 1 === c.nodeType && " " + Z(e) + " ") {
                            for (g = 0; f = b[g++];)
                                for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
                            h = Z(d), e !== h && c.setAttribute("class", h)
                        }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : sa.isFunction(a) ? this.each(function(c) {
                    sa(this).toggleClass(a.call(this, c, $(this), b), b)
                }) : this.each(function() {
                    var b, d, e, f;
                    if ("string" === c)
                        for (d = 0, e = sa(this), f = a.match(Ea) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    else void 0 !== a && "boolean" !== c || (b = $(this), b && Ja.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || !1 === a ? "" : Ja.get(this, "__className__") || ""))
                })
            },
            hasClass: function(a) {
                var b, c, d = 0;
                for (b = " " + a + " "; c = this[d++];)
                    if (1 === c.nodeType && (" " + Z($(c)) + " ").indexOf(b) > -1) return !0;
                return !1
            }
        });
        sa.fn.extend({
            val: function(a) {
                var b, c, d, e = this[0]; {
                    if (arguments.length) return d = sa.isFunction(a), this.each(function(c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, sa(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = sa.map(e, function(a) {
                            return null == a ? "" : a + ""
                        })), (b = sa.valHooks[this.type] || sa.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    });
                    if (e) return (b = sa.valHooks[e.type] || sa.valHooks[e.nodeName.toLowerCase()]) && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(/\r/g, "") : null == c ? "" : c)
                }
            }
        }), sa.extend({
            valHooks: {
                option: {
                    get: function(a) {
                        var b = sa.find.attr(a, "value");
                        return null != b ? b : Z(sa.text(a))
                    }
                },
                select: {
                    get: function(a) {
                        var b, c, d, e = a.options,
                            f = a.selectedIndex,
                            g = "select-one" === a.type,
                            h = g ? null : [],
                            j = g ? f + 1 : e.length;
                        for (d = f < 0 ? j : g ? f : 0; d < j; d++)
                            if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !i(c.parentNode, "optgroup"))) {
                                if (b = sa(c).val(), g) return b;
                                h.push(b)
                            }
                        return h
                    },
                    set: function(a, b) {
                        for (var c, d, e = a.options, f = sa.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = sa.inArray(sa.valHooks.option.get(d), f) > -1) && (c = !0);
                        return c || (a.selectedIndex = -1), f
                    }
                }
            }
        }), sa.each(["radio", "checkbox"], function() {
            sa.valHooks[this] = {
                set: function(a, b) {
                    if (Array.isArray(b)) return a.checked = sa.inArray(sa(a).val(), b) > -1
                }
            }, ra.checkOn || (sa.valHooks[this].get = function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
        var vb = /^(?:focusinfocus|focusoutblur)$/;
        sa.extend(sa.event, {
            trigger: function(a, b, d, e) {
                var f, g, h, i, j, k, l, m = [d || ga],
                    n = oa.call(a, "type") ? a.type : a,
                    o = oa.call(a, "namespace") ? a.namespace.split(".") : [];
                if (g = h = d = d || ga, 3 !== d.nodeType && 8 !== d.nodeType && !vb.test(n + sa.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, a = a[sa.expando] ? a : new sa.Event(n, "object" == typeof a && a), a.isTrigger = e ? 2 : 3, a.namespace = o.join("."), a.rnamespace = a.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = d), b = null == b ? [a] : sa.makeArray(b, [a]), l = sa.event.special[n] || {}, e || !l.trigger || !1 !== l.trigger.apply(d, b))) {
                    if (!e && !l.noBubble && !sa.isWindow(d)) {
                        for (i = l.delegateType || n, vb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                        h === (d.ownerDocument || ga) && m.push(h.defaultView || h.parentWindow || c)
                    }
                    for (f = 0;
                        (g = m[f++]) && !a.isPropagationStopped();) a.type = f > 1 ? i : l.bindType || n, k = (Ja.get(g, "events") || {})[a.type] && Ja.get(g, "handle"), k && k.apply(g, b), (k = j && g[j]) && k.apply && Ia(g) && (a.result = k.apply(g, b), !1 === a.result && a.preventDefault());
                    return a.type = n, e || a.isDefaultPrevented() || l._default && !1 !== l._default.apply(m.pop(), b) || !Ia(d) || j && sa.isFunction(d[n]) && !sa.isWindow(d) && (h = d[j], h && (d[j] = null), sa.event.triggered = n, d[n](), sa.event.triggered = void 0, h && (d[j] = h)), a.result
                }
            },
            simulate: function(a, b, c) {
                var d = sa.extend(new sa.Event, c, {
                    type: a,
                    isSimulated: !0
                });
                sa.event.trigger(d, null, b)
            }
        }), sa.fn.extend({
            trigger: function(a, b) {
                return this.each(function() {
                    sa.event.trigger(a, b, this)
                })
            },
            triggerHandler: function(a, b) {
                var c = this[0];
                if (c) return sa.event.trigger(a, b, c, !0)
            }
        }), sa.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(a, b) {
            sa.fn[b] = function(a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), sa.fn.extend({
            hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        }), ra.focusin = "onfocusin" in c, ra.focusin || sa.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            var c = function(a) {
                sa.event.simulate(b, a.target, sa.event.fix(a))
            };
            sa.event.special[b] = {
                setup: function() {
                    var d = this.ownerDocument || this,
                        e = Ja.access(d, b);
                    e || d.addEventListener(a, c, !0), Ja.access(d, b, (e || 0) + 1)
                },
                teardown: function() {
                    var d = this.ownerDocument || this,
                        e = Ja.access(d, b) - 1;
                    e ? Ja.access(d, b, e) : (d.removeEventListener(a, c, !0), Ja.remove(d, b))
                }
            }
        });
        var wb = c.location,
            xb = sa.now(),
            yb = /\?/;
        sa.parseXML = function(a) {
            var b;
            if (!a || "string" != typeof a) return null;
            try {
                b = (new c.DOMParser).parseFromString(a, "text/xml")
            } catch (a) {
                b = void 0
            }
            return b && !b.getElementsByTagName("parsererror").length || sa.error("Invalid XML: " + a), b
        };
        var zb = /\[\]$/,
            Ab = /^(?:submit|button|image|reset|file)$/i,
            Bb = /^(?:input|select|textarea|keygen)/i;
        sa.param = function(a, b) {
            var c, d = [],
                e = function(a, b) {
                    var c = sa.isFunction(b) ? b() : b;
                    d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
                };
            if (Array.isArray(a) || a.jquery && !sa.isPlainObject(a)) sa.each(a, function() {
                e(this.name, this.value)
            });
            else
                for (c in a) _(c, a[c], b, e);
            return d.join("&")
        }, sa.fn.extend({
            serialize: function() {
                return sa.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var a = sa.prop(this, "elements");
                    return a ? sa.makeArray(a) : this
                }).filter(function() {
                    var a = this.type;
                    return this.name && !sa(this).is(":disabled") && Bb.test(this.nodeName) && !Ab.test(a) && (this.checked || !Ta.test(a))
                }).map(function(a, b) {
                    var c = sa(this).val();
                    return null == c ? null : Array.isArray(c) ? sa.map(c, function(a) {
                        return {
                            name: b.name,
                            value: a.replace(/\r?\n/g, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(/\r?\n/g, "\r\n")
                    }
                }).get()
            }
        });
        var Cb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Eb = /^(?:GET|HEAD)$/,
            Fb = {},
            Gb = {},
            Hb = "*/".concat("*"),
            Ib = ga.createElement("a");
        Ib.href = wb.href, sa.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: wb.href,
                type: "GET",
                isLocal: Db.test(wb.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Hb,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": sa.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(a, b) {
                return b ? ca(ca(a, sa.ajaxSettings), b) : ca(sa.ajaxSettings, a)
            },
            ajaxPrefilter: aa(Fb),
            ajaxTransport: aa(Gb),
            ajax: function(a, b) {
                function d(a, b, d, h) {
                    var j, m, n, u, v, w = b;
                    k || (k = !0, i && c.clearTimeout(i), e = void 0, g = h || "", x.readyState = a > 0 ? 4 : 0, j = a >= 200 && a < 300 || 304 === a, d && (u = da(o, x, d)), u = ea(o, u, x, j), j ? (o.ifModified && (v = x.getResponseHeader("Last-Modified"), v && (sa.lastModified[f] = v), (v = x.getResponseHeader("etag")) && (sa.etag[f] = v)), 204 === a || "HEAD" === o.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = u.state, m = u.data, n = u.error, j = !n)) : (n = w, !a && w || (w = "error", a < 0 && (a = 0))), x.status = a, x.statusText = (b || w) + "", j ? r.resolveWith(p, [m, w, x]) : r.rejectWith(p, [x, w, n]), x.statusCode(t), t = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [x, o, j ? m : n]), s.fireWith(p, [x, w]), l && (q.trigger("ajaxComplete", [x, o]), --sa.active || sa.event.trigger("ajaxStop")))
                }
                "object" == typeof a && (b = a, a = void 0), b = b || {};
                var e, f, g, h, i, j, k, l, m, n, o = sa.ajaxSetup({}, b),
                    p = o.context || o,
                    q = o.context && (p.nodeType || p.jquery) ? sa(p) : sa.event,
                    r = sa.Deferred(),
                    s = sa.Callbacks("once memory"),
                    t = o.statusCode || {},
                    u = {},
                    v = {},
                    w = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(a) {
                            var b;
                            if (k) {
                                if (!h)
                                    for (h = {}; b = Cb.exec(g);) h[b[1].toLowerCase()] = b[2];
                                b = h[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        },
                        getAllResponseHeaders: function() {
                            return k ? g : null
                        },
                        setRequestHeader: function(a, b) {
                            return null == k && (a = v[a.toLowerCase()] = v[a.toLowerCase()] || a, u[a] = b), this
                        },
                        overrideMimeType: function(a) {
                            return null == k && (o.mimeType = a), this
                        },
                        statusCode: function(a) {
                            var b;
                            if (a)
                                if (k) x.always(a[x.status]);
                                else
                                    for (b in a) t[b] = [t[b], a[b]];
                            return this
                        },
                        abort: function(a) {
                            var b = a || w;
                            return e && e.abort(b), d(0, b), this
                        }
                    };
                if (r.promise(x), o.url = ((a || o.url || wb.href) + "").replace(/^\/\//, wb.protocol + "//"), o.type = b.method || b.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(Ea) || [""], null == o.crossDomain) {
                    j = ga.createElement("a");
                    try {
                        j.href = o.url, j.href = j.href, o.crossDomain = Ib.protocol + "//" + Ib.host != j.protocol + "//" + j.host
                    } catch (a) {
                        o.crossDomain = !0
                    }
                }
                if (o.data && o.processData && "string" != typeof o.data && (o.data = sa.param(o.data, o.traditional)), ba(Fb, o, b, x), k) return x;
                l = sa.event && o.global, l && 0 == sa.active++ && sa.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Eb.test(o.type), f = o.url.replace(/#.*$/, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(/%20/g, "+")) : (n = o.url.slice(f.length), o.data && (f += (yb.test(f) ? "&" : "?") + o.data, delete o.data), !1 === o.cache && (f = f.replace(/([?&])_=[^&]*/, "$1"), n = (yb.test(f) ? "&" : "?") + "_=" + xb++ + n), o.url = f + n), o.ifModified && (sa.lastModified[f] && x.setRequestHeader("If-Modified-Since", sa.lastModified[f]), sa.etag[f] && x.setRequestHeader("If-None-Match", sa.etag[f])), (o.data && o.hasContent && !1 !== o.contentType || b.contentType) && x.setRequestHeader("Content-Type", o.contentType), x.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Hb + "; q=0.01" : "") : o.accepts["*"]);
                for (m in o.headers) x.setRequestHeader(m, o.headers[m]);
                if (o.beforeSend && (!1 === o.beforeSend.call(p, x, o) || k)) return x.abort();
                if (w = "abort", s.add(o.complete), x.done(o.success), x.fail(o.error), e = ba(Gb, o, b, x)) {
                    if (x.readyState = 1, l && q.trigger("ajaxSend", [x, o]), k) return x;
                    o.async && o.timeout > 0 && (i = c.setTimeout(function() {
                        x.abort("timeout")
                    }, o.timeout));
                    try {
                        k = !1, e.send(u, d)
                    } catch (a) {
                        if (k) throw a;
                        d(-1, a)
                    }
                } else d(-1, "No Transport");
                return x
            },
            getJSON: function(a, b, c) {
                return sa.get(a, b, c, "json")
            },
            getScript: function(a, b) {
                return sa.get(a, void 0, b, "script")
            }
        }), sa.each(["get", "post"], function(a, b) {
            sa[b] = function(a, c, d, e) {
                return sa.isFunction(c) && (e = e || d, d = c, c = void 0), sa.ajax(sa.extend({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                }, sa.isPlainObject(a) && a))
            }
        }), sa._evalUrl = function(a) {
            return sa.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }, sa.fn.extend({
            wrapAll: function(a) {
                var b;
                return this[0] && (sa.isFunction(a) && (a = a.call(this[0])), b = sa(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                    return a
                }).append(this)), this
            },
            wrapInner: function(a) {
                return sa.isFunction(a) ? this.each(function(b) {
                    sa(this).wrapInner(a.call(this, b))
                }) : this.each(function() {
                    var b = sa(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) {
                var b = sa.isFunction(a);
                return this.each(function(c) {
                    sa(this).wrapAll(b ? a.call(this, c) : a)
                })
            },
            unwrap: function(a) {
                return this.parent(a).not("body").each(function() {
                    sa(this).replaceWith(this.childNodes)
                }), this
            }
        }), sa.expr.pseudos.hidden = function(a) {
            return !sa.expr.pseudos.visible(a)
        }, sa.expr.pseudos.visible = function(a) {
            return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
        }, sa.ajaxSettings.xhr = function() {
            try {
                return new c.XMLHttpRequest
            } catch (a) {}
        };
        var Jb = {
                0: 200,
                1223: 204
            },
            Kb = sa.ajaxSettings.xhr();
        ra.cors = !!Kb && "withCredentials" in Kb, ra.ajax = Kb = !!Kb, sa.ajaxTransport(function(a) {
            var b, d;
            if (ra.cors || Kb && !a.crossDomain) return {
                send: function(e, f) {
                    var g, h = a.xhr();
                    if (h.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                        for (g in a.xhrFields) h[g] = a.xhrFields[g];
                    a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType), a.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    for (g in e) h.setRequestHeader(g, e[g]);
                    b = function(a) {
                        return function() {
                            b && (b = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Jb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
                                binary: h.response
                            } : {
                                text: h.responseText
                            }, h.getAllResponseHeaders()))
                        }
                    }, h.onload = b(), d = h.onerror = b("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() {
                        4 === h.readyState && c.setTimeout(function() {
                            b && d()
                        })
                    }, b = b("abort");
                    try {
                        h.send(a.hasContent && a.data || null)
                    } catch (a) {
                        if (b) throw a
                    }
                },
                abort: function() {
                    b && b()
                }
            }
        }), sa.ajaxPrefilter(function(a) {
            a.crossDomain && (a.contents.script = !1)
        }), sa.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(a) {
                    return sa.globalEval(a), a
                }
            }
        }), sa.ajaxPrefilter("script", function(a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
        }), sa.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var b, c;
                return {
                    send: function(d, e) {
                        b = sa("<script>").prop({
                            charset: a.scriptCharset,
                            src: a.url
                        }).on("load error", c = function(a) {
                            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                        }), ga.head.appendChild(b[0])
                    },
                    abort: function() {
                        c && c()
                    }
                }
            }
        });
        var Lb = [],
            Mb = /(=)\?(?=&|$)|\?\?/;
        sa.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var a = Lb.pop() || sa.expando + "_" + xb++;
                return this[a] = !0, a
            }
        }), sa.ajaxPrefilter("json jsonp", function(a, b, d) {
            var e, f, g, h = !1 !== a.jsonp && (Mb.test(a.url) ? "url" : "string" == typeof a.data && 0 === (a.contentType || "").indexOf("application/x-www-form-urlencoded") && Mb.test(a.data) && "data");
            if (h || "jsonp" === a.dataTypes[0]) return e = a.jsonpCallback = sa.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(Mb, "$1" + e) : !1 !== a.jsonp && (a.url += (yb.test(a.url) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function() {
                return g || sa.error(e + " was not called"), g[0]
            }, a.dataTypes[0] = "json", f = c[e], c[e] = function() {
                g = arguments
            }, d.always(function() {
                void 0 === f ? sa(c).removeProp(e) : c[e] = f, a[e] && (a.jsonpCallback = b.jsonpCallback, Lb.push(e)), g && sa.isFunction(f) && f(g[0]), g = f = void 0
            }), "script"
        }), ra.createHTMLDocument = function() {
            var a = ga.implementation.createHTMLDocument("").body;
            return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length
        }(), sa.parseHTML = function(a, b, c) {
            if ("string" != typeof a) return [];
            "boolean" == typeof b && (c = b, b = !1);
            var d, e, f;
            return b || (ra.createHTMLDocument ? (b = ga.implementation.createHTMLDocument(""), d = b.createElement("base"), d.href = ga.location.href, b.head.appendChild(d)) : b = ga), e = ya.exec(a), f = !c && [], e ? [b.createElement(e[1])] : (e = y([a], b, f), f && f.length && sa(f).remove(), sa.merge([], e.childNodes))
        }, sa.fn.load = function(a, b, c) {
            var d, e, f, g = this,
                h = a.indexOf(" ");
            return h > -1 && (d = Z(a.slice(h)), a = a.slice(0, h)), sa.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && sa.ajax({
                url: a,
                type: e || "GET",
                dataType: "html",
                data: b
            }).done(function(a) {
                f = arguments, g.html(d ? sa("<div>").append(sa.parseHTML(a)).find(d) : a)
            }).always(c && function(a, b) {
                g.each(function() {
                    c.apply(this, f || [a.responseText, b, a])
                })
            }), this
        }, sa.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
            sa.fn[b] = function(a) {
                return this.on(b, a)
            }
        }), sa.expr.pseudos.animated = function(a) {
            return sa.grep(sa.timers, function(b) {
                return a === b.elem
            }).length
        }, sa.offset = {
            setOffset: function(a, b, c) {
                var d, e, f, g, h, i, j, k = sa.css(a, "position"),
                    l = sa(a),
                    m = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = sa.css(a, "top"), i = sa.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), sa.isFunction(b) && (b = b.call(a, c, sa.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
            }
        }, sa.fn.extend({
            offset: function(a) {
                if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                    sa.offset.setOffset(this, a, b)
                });
                var b, c, d, e, f = this[0];
                if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, {
                    top: d.top + e.pageYOffset - c.clientTop,
                    left: d.left + e.pageXOffset - c.clientLeft
                }) : {
                    top: 0,
                    left: 0
                }
            },
            position: function() {
                if (this[0]) {
                    var a, b, c = this[0],
                        d = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === sa.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), i(a[0], "html") || (d = a.offset()), d = {
                        top: d.top + sa.css(a[0], "borderTopWidth", !0),
                        left: d.left + sa.css(a[0], "borderLeftWidth", !0)
                    }), {
                        top: b.top - d.top - sa.css(c, "marginTop", !0),
                        left: b.left - d.left - sa.css(c, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var a = this.offsetParent; a && "static" === sa.css(a, "position");) a = a.offsetParent;
                    return a || Ya
                })
            }
        }), sa.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(a, b) {
            var c = "pageYOffset" === b;
            sa.fn[a] = function(d) {
                return Ha(this, function(a, d, e) {
                    var f;
                    if (sa.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e) return f ? f[b] : a[d];
                    f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e
                }, a, d, arguments.length)
            }
        }), sa.each(["top", "left"], function(a, b) {
            sa.cssHooks[b] = L(ra.pixelPosition, function(a, c) {
                if (c) return c = K(a, b), fb.test(c) ? sa(a).position()[b] + "px" : c
            })
        }), sa.each({
            Height: "height",
            Width: "width"
        }, function(a, b) {
            sa.each({
                padding: "inner" + a,
                content: b,
                "": "outer" + a
            }, function(c, d) {
                sa.fn[d] = function(e, f) {
                    var g = arguments.length && (c || "boolean" != typeof e),
                        h = c || (!0 === e || !0 === f ? "margin" : "border");
                    return Ha(this, function(b, c, e) {
                        var f;
                        return sa.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? sa.css(b, c, h) : sa.style(b, c, e, h)
                    }, b, g ? e : void 0, g)
                }
            })
        }), sa.fn.extend({
            bind: function(a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function(a, b) {
                return this.off(a, null, b)
            },
            delegate: function(a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function(a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        }), sa.holdReady = function(a) {
            a ? sa.readyWait++ : sa.ready(!0)
        }, sa.isArray = Array.isArray, sa.parseJSON = JSON.parse, sa.nodeName = i, d = [], void 0 !== (e = function() {
            return sa
        }.apply(b, d)) && (a.exports = e);
        var Nb = c.jQuery,
            Ob = c.$;
        return sa.noConflict = function(a) {
            return c.$ === sa && (c.$ = Ob), a && c.jQuery === sa && (c.jQuery = Nb), sa
        }, f || (c.jQuery = c.$ = sa), sa
    })
}]);
//# sourceMappingURL=main.bundle.js.map