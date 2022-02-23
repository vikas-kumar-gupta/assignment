module.exports.sum = (req, res) => {
    const data = req.body;
    res.send({"sum" : data.a + data.b});
}

module.exports.sub = (req, res) => {
    const data = req.body;
    res.send({"sub" : data.a - data.b});
}

module.exports.mul = (req, res) => {
    const data = req.body;
    res.send({"mul" : data.a * data.b});
}

module.exports.div = (req, res) => {
    const data = req.body;
    res.send({"div" : data.a / data.b});
}

module.exports.sqrt = (req, res) => {
    const data = req.body;
    res.send({"sqrt" : Math.sqrt(data.a)});
}

module.exports.cbrt = (req, res) => {
    const data = req.body;
    res.send({"cbrt" : Math.cbrt(data.a)});
}

module.exports.sin = (req, res) => {
    const data = req.body;
    res.send({"sin" : Math.sin(data.a)});
}

module.exports.cos = (req, res) => {
    const data = req.body;
    res.send({"cos" : Math.cos(data.a)});
}