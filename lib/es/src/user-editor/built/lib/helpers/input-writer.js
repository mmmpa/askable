var input_form_1 = require('../components/input-form');
function writeInput(self, type, name, placeholder, label, errors) {
    if (errors === void 0) { errors = {}; }
    return React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
        errors: errors, type: type, name: name, placeholder: placeholder, label: label, value: self.state[name],
        onChange: function (v) {
            var p = {};
            p[name] = v;
            self.setState(p);
        }
    })));
}
exports.writeInput = writeInput;
//# sourceMappingURL=input-writer.js.map